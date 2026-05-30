import type { Plan } from "@/lib/constants";
import { FREE_DAILY_LIMIT } from "@/lib/constants";

export const PLAN_LABELS: Record<Plan, string> = {
  free: "Free",
  pro: "Pro",
  creator: "Creator",
};

export const PLAN_PRICES = {
  pro: { amount: 9, label: "9€/mois" },
  creator: { amount: 19, label: "19€/mois" },
};

export function getDailyLimit(plan: Plan): number | null {
  if (plan === "free") return FREE_DAILY_LIMIT;
  return null;
}

export function canAccessPremiumTemplates(plan: Plan): boolean {
  return plan === "pro" || plan === "creator";
}

export function hasUnlimitedPrompts(plan: Plan): boolean {
  return plan === "pro" || plan === "creator";
}

export function hasAdvancedVariants(plan: Plan): boolean {
  return plan === "creator";
}
