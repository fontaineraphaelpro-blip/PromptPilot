import type { Plan } from "@/lib/constants";
import { FREE_LIFETIME_LIMIT, PRO_DAILY_FAIR_USE_LIMIT } from "@/lib/constants";
import { hasUnlimitedPrompts } from "@/lib/plans";
import { prisma } from "@/lib/db";

export type UsageStatus = {
  allowed: boolean;
  used: number;
  limit: number | null;
  remaining: number | null;
  /** "lifetime" (free) ou "daily" (pro) — null si illimité */
  period: "lifetime" | "daily" | null;
};

function todayDateString(): string {
  const now = new Date();
  const paris = new Date(
    now.toLocaleString("en-US", { timeZone: "Europe/Paris" })
  );
  return paris.toISOString().split("T")[0];
}

export async function getTodayUsage(userId: string): Promise<number> {
  const today = todayDateString();
  const row = await prisma.dailyUsage.findUnique({
    where: { userId_date: { userId, date: today } },
  });
  return row?.promptCount ?? 0;
}

/** Total de prompts générés depuis la création du compte (somme des lignes journalières). */
export async function getLifetimeUsage(userId: string): Promise<number> {
  const agg = await prisma.dailyUsage.aggregate({
    where: { userId },
    _sum: { promptCount: true },
  });
  return agg._sum.promptCount ?? 0;
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
 * Vérifie la limite et incrémente atomiquement — évite le double comptage concurrent.
 * Free : quota TOTAL à vie (FREE_LIFETIME_LIMIT). Pro : plafond journalier. Creator : illimité.
 */
export async function reservePromptSlot(
  userId: string,
  plan: Plan
): Promise<UsageStatus> {
  if (plan === "creator") {
    await incrementToday(prisma, userId);
    return { allowed: true, used: 0, limit: null, remaining: null, period: null };
  }

  if (plan === "free") {
    return prisma.$transaction(async (tx) => {
      const agg = await tx.dailyUsage.aggregate({
        where: { userId },
        _sum: { promptCount: true },
      });
      const used = agg._sum.promptCount ?? 0;

      if (used >= FREE_LIFETIME_LIMIT) {
        return {
          allowed: false,
          used,
          limit: FREE_LIFETIME_LIMIT,
          remaining: 0,
          period: "lifetime" as const,
        };
      }

      await incrementToday(tx, userId);

      return {
        allowed: true,
        used: used + 1,
        limit: FREE_LIFETIME_LIMIT,
        remaining: Math.max(0, FREE_LIFETIME_LIMIT - used - 1),
        period: "lifetime" as const,
      };
    });
  }

  // Pro — plafond d'usage équitable journalier
  const today = todayDateString();
  return prisma.$transaction(async (tx) => {
    const row = await tx.dailyUsage.findUnique({
      where: { userId_date: { userId, date: today } },
    });
    const used = row?.promptCount ?? 0;

    if (used >= PRO_DAILY_FAIR_USE_LIMIT) {
      return {
        allowed: false,
        used,
        limit: PRO_DAILY_FAIR_USE_LIMIT,
        remaining: 0,
        period: "daily" as const,
      };
    }

    await incrementToday(tx, userId);

    return {
      allowed: true,
      used: used + 1,
      limit: PRO_DAILY_FAIR_USE_LIMIT,
      remaining: Math.max(0, PRO_DAILY_FAIR_USE_LIMIT - used - 1),
      period: "daily" as const,
    };
  });
}

export async function releasePromptSlot(userId: string, plan: Plan): Promise<void> {
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
  plan: Plan
): Promise<UsageStatus> {
  if (plan === "creator") {
    return { allowed: true, used: 0, limit: null, remaining: null, period: null };
  }

  if (plan === "free") {
    const used = await getLifetimeUsage(userId);
    return {
      allowed: used < FREE_LIFETIME_LIMIT,
      used,
      limit: FREE_LIFETIME_LIMIT,
      remaining: Math.max(0, FREE_LIFETIME_LIMIT - used),
      period: "lifetime",
    };
  }

  const used = await getTodayUsage(userId);
  return {
    allowed: used < PRO_DAILY_FAIR_USE_LIMIT,
    used,
    limit: PRO_DAILY_FAIR_USE_LIMIT,
    remaining: Math.max(0, PRO_DAILY_FAIR_USE_LIMIT - used),
    period: "daily",
  };
}
