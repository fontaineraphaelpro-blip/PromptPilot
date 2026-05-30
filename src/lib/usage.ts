import { FREE_DAILY_LIMIT } from "@/lib/constants";
import type { Plan } from "@/lib/constants";
import { hasUnlimitedPrompts } from "@/lib/plans";
import { createClient } from "@/lib/supabase/server";

function todayDateString(): string {
  return new Date().toISOString().split("T")[0];
}

export async function getTodayUsage(userId: string): Promise<number> {
  const supabase = await createClient();
  const today = todayDateString();

  const { data } = await supabase
    .from("daily_usage")
    .select("prompt_count")
    .eq("user_id", userId)
    .eq("date", today)
    .maybeSingle();

  return data?.prompt_count ?? 0;
}

export async function incrementUsage(userId: string): Promise<void> {
  const supabase = await createClient();
  const today = todayDateString();

  const { data: existing } = await supabase
    .from("daily_usage")
    .select("id, prompt_count")
    .eq("user_id", userId)
    .eq("date", today)
    .maybeSingle();

  if (existing) {
    await supabase
      .from("daily_usage")
      .update({ prompt_count: existing.prompt_count + 1 })
      .eq("id", existing.id);
  } else {
    await supabase.from("daily_usage").insert({
      user_id: userId,
      date: today,
      prompt_count: 1,
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
