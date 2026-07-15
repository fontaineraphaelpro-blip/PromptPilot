import type { Plan } from "@/lib/constants";
import {
  FREE_LIFETIME_LIMIT,
  STARTER_MONTHLY_LIMIT,
  PLUS_MONTHLY_LIMIT,
} from "@/lib/constants";
import { hasUnlimitedPrompts, normalizePlan } from "@/lib/plans";
import { prisma } from "@/lib/db";

export type UsageStatus = {
  allowed: boolean;
  used: number;
  limit: number | null;
  remaining: number | null;
  period: "lifetime" | "monthly" | null;
  /** Crédits one-shot restants (packs) */
  credits: number;
};

function todayDateString(): string {
  const now = new Date();
  const paris = new Date(
    now.toLocaleString("en-US", { timeZone: "Europe/Paris" })
  );
  return paris.toISOString().split("T")[0];
}

/** Préfixe YYYY-MM (Europe/Paris) pour agrégat mensuel */
function monthKey(): string {
  return todayDateString().slice(0, 7);
}

export async function getLifetimeUsage(userId: string): Promise<number> {
  const agg = await prisma.dailyUsage.aggregate({
    where: { userId },
    _sum: { promptCount: true },
  });
  return agg._sum.promptCount ?? 0;
}

export async function getMonthUsage(userId: string): Promise<number> {
  const prefix = monthKey();
  const rows = await prisma.dailyUsage.findMany({
    where: { userId, date: { startsWith: prefix } },
    select: { promptCount: true },
  });
  return rows.reduce((sum, r) => sum + r.promptCount, 0);
}

export async function getTodayUsage(userId: string): Promise<number> {
  const today = todayDateString();
  const row = await prisma.dailyUsage.findUnique({
    where: { userId_date: { userId, date: today } },
  });
  return row?.promptCount ?? 0;
}

async function getCredits(userId: string): Promise<number> {
  const profile = await prisma.profile.findUnique({
    where: { userId },
    select: { promptCredits: true },
  });
  return profile?.promptCredits ?? 0;
}

async function incrementToday(
  tx: Pick<typeof prisma, "dailyUsage">,
  userId: string
): Promise<void> {
  const today = todayDateString();
  await tx.dailyUsage.upsert({
    where: { userId_date: { userId, date: today } },
    create: { userId, date: today, promptCount: 1 },
    update: { promptCount: { increment: 1 } },
  });
}

/**
 * Free : quota à vie OU crédits packs.
 * Starter / Pro : plafond mensuel (crédits packs en plus si besoin).
 * Creator : legacy DB only (normalisé → Pro).
 */
export async function reservePromptSlot(
  userId: string,
  planInput: Plan | string
): Promise<UsageStatus> {
  const plan = normalizePlan(planInput);

  if (hasUnlimitedPrompts(plan)) {
    await incrementToday(prisma, userId);
    const credits = await getCredits(userId);
    return {
      allowed: true,
      used: 0,
      limit: null,
      remaining: null,
      period: null,
      credits,
    };
  }

  return prisma.$transaction(async (tx) => {
    const profile = await tx.profile.findUnique({
      where: { userId },
      select: { promptCredits: true },
    });
    const credits = profile?.promptCredits ?? 0;

    if (plan === "free") {
      const agg = await tx.dailyUsage.aggregate({
        where: { userId },
        _sum: { promptCount: true },
      });
      const used = agg._sum.promptCount ?? 0;
      const lifetimeLeft = Math.max(0, FREE_LIFETIME_LIMIT - used);

      if (lifetimeLeft > 0) {
        await incrementToday(tx, userId);
        return {
          allowed: true,
          used: used + 1,
          limit: FREE_LIFETIME_LIMIT,
          remaining: lifetimeLeft - 1,
          period: "lifetime" as const,
          credits,
        };
      }

      if (credits > 0) {
        await tx.profile.update({
          where: { userId },
          data: { promptCredits: { decrement: 1 } },
        });
        await incrementToday(tx, userId);
        return {
          allowed: true,
          used,
          limit: FREE_LIFETIME_LIMIT,
          remaining: 0,
          period: "lifetime" as const,
          credits: credits - 1,
        };
      }

      return {
        allowed: false,
        used,
        limit: FREE_LIFETIME_LIMIT,
        remaining: 0,
        period: "lifetime" as const,
        credits: 0,
      };
    }

    // starter / plus — mensuel, puis crédits
    const monthlyLimit =
      plan === "starter" ? STARTER_MONTHLY_LIMIT : PLUS_MONTHLY_LIMIT;
    const prefix = monthKey();
    const monthRows = await tx.dailyUsage.findMany({
      where: { userId, date: { startsWith: prefix } },
      select: { promptCount: true },
    });
    const used = monthRows.reduce((s, r) => s + r.promptCount, 0);

    if (used < monthlyLimit) {
      await incrementToday(tx, userId);
      return {
        allowed: true,
        used: used + 1,
        limit: monthlyLimit,
        remaining: monthlyLimit - used - 1,
        period: "monthly" as const,
        credits,
      };
    }

    if (credits > 0) {
      await tx.profile.update({
        where: { userId },
        data: { promptCredits: { decrement: 1 } },
      });
      await incrementToday(tx, userId);
      return {
        allowed: true,
        used,
        limit: monthlyLimit,
        remaining: 0,
        period: "monthly" as const,
        credits: credits - 1,
      };
    }

    return {
      allowed: false,
      used,
      limit: monthlyLimit,
      remaining: 0,
      period: "monthly" as const,
      credits: 0,
    };
  });
}

export async function releasePromptSlot(
  userId: string,
  planInput: Plan | string
): Promise<void> {
  const plan = normalizePlan(planInput);
  if (hasUnlimitedPrompts(plan)) return;

  const today = todayDateString();
  const row = await prisma.dailyUsage.findUnique({
    where: { userId_date: { userId, date: today } },
  });
  if (row && row.promptCount > 0) {
    await prisma.dailyUsage.update({
      where: { id: row.id },
      data: { promptCount: row.promptCount - 1 },
    });
  }
}

export async function checkUsageLimit(
  userId: string,
  planInput: Plan | string
): Promise<UsageStatus> {
  const plan = normalizePlan(planInput);
  const credits = await getCredits(userId);

  if (hasUnlimitedPrompts(plan)) {
    return {
      allowed: true,
      used: 0,
      limit: null,
      remaining: null,
      period: null,
      credits,
    };
  }

  if (plan === "free") {
    const used = await getLifetimeUsage(userId);
    const remainingQuota = Math.max(0, FREE_LIFETIME_LIMIT - used);
    const remaining = remainingQuota + credits;
    return {
      allowed: remaining > 0,
      used,
      limit: FREE_LIFETIME_LIMIT,
      remaining: remainingQuota,
      period: "lifetime",
      credits,
    };
  }

  const monthlyLimit =
    plan === "starter" ? STARTER_MONTHLY_LIMIT : PLUS_MONTHLY_LIMIT;
  const used = await getMonthUsage(userId);
  const remainingQuota = Math.max(0, monthlyLimit - used);
  return {
    allowed: remainingQuota > 0 || credits > 0,
    used,
    limit: monthlyLimit,
    remaining: remainingQuota,
    period: "monthly",
    credits,
  };
}

export async function addPromptCredits(
  userId: string,
  amount: number
): Promise<void> {
  await prisma.profile.update({
    where: { userId },
    data: { promptCredits: { increment: amount } },
  });
}
