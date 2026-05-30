import { FREE_DAILY_LIMIT } from "@/lib/constants";
import type { Plan } from "@/lib/constants";
import { hasUnlimitedPrompts } from "@/lib/plans";
import { prisma } from "@/lib/db";

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

/** Vérifie la limite et incrémente atomiquement — évite le double comptage concurrent */
export async function reservePromptSlot(
  userId: string,
  plan: Plan
): Promise<{ allowed: boolean; used: number; limit: number | null; remaining: number | null }> {
  if (hasUnlimitedPrompts(plan)) {
    const today = todayDateString();
    await prisma.dailyUsage.upsert({
      where: { userId_date: { userId, date: today } },
      create: { userId, date: today, promptCount: 1 },
      update: { promptCount: { increment: 1 } },
    });
    return { allowed: true, used: 0, limit: null, remaining: null };
  }

  const today = todayDateString();
  const limit = FREE_DAILY_LIMIT;

  return prisma.$transaction(async (tx) => {
    const row = await tx.dailyUsage.findUnique({
      where: { userId_date: { userId, date: today } },
    });
    const used = row?.promptCount ?? 0;

    if (used >= limit) {
      return {
        allowed: false,
        used,
        limit,
        remaining: 0,
      };
    }

    await tx.dailyUsage.upsert({
      where: { userId_date: { userId, date: today } },
      create: { userId, date: today, promptCount: 1 },
      update: { promptCount: { increment: 1 } },
    });

    return {
      allowed: true,
      used: used + 1,
      limit,
      remaining: Math.max(0, limit - used - 1),
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
): Promise<{ allowed: boolean; used: number; limit: number | null; remaining: number | null }> {
  if (hasUnlimitedPrompts(plan)) {
    return { allowed: true, used: 0, limit: null, remaining: null };
  }

  const used = await getTodayUsage(userId);
  const limit = FREE_DAILY_LIMIT;
  const remaining = Math.max(0, limit - used);

  return {
    allowed: used < limit,
    used,
    limit,
    remaining,
  };
}
