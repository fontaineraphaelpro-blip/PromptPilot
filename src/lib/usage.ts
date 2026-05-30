import { FREE_DAILY_LIMIT } from "@/lib/constants";
import type { Plan } from "@/lib/constants";
import { hasUnlimitedPrompts } from "@/lib/plans";
import { prisma } from "@/lib/db";

function todayDateString(): string {
  return new Date().toISOString().split("T")[0];
}

export async function getTodayUsage(userId: string): Promise<number> {
  const today = todayDateString();
  const row = await prisma.dailyUsage.findUnique({
    where: { userId_date: { userId, date: today } },
  });
  return row?.promptCount ?? 0;
}

export async function incrementUsage(userId: string): Promise<void> {
  const today = todayDateString();

  await prisma.dailyUsage.upsert({
    where: { userId_date: { userId, date: today } },
    create: { userId, date: today, promptCount: 1 },
    update: { promptCount: { increment: 1 } },
  });
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
