import type { Plan } from "@/lib/constants";
import {
  FREE_LIFETIME_LIMIT,
  STARTER_MONTHLY_LIMIT,
  PLUS_MONTHLY_LIMIT,
} from "@/lib/constants";

export const PLAN_LABELS: Record<Plan, string> = {
  free: "Free",
  starter: "Starter",
  plus: "Pro",
  /** Legacy — plus vendu, conservé pour d'anciens comptes */
  creator: "Pro",
};

export const PLAN_PRICES = {
  starter: { amount: 9, label: "9€/mois" },
  plus: { amount: 19, label: "19€/mois" },
};

/** @deprecated */
export const PRO_PRICE_ALIAS = PLAN_PRICES.plus;

/** Plans réellement vendus (Creator 39€ retiré). */
export type PaidPlan = "starter" | "plus";

export function isPaidPlan(plan: string): plan is PaidPlan {
  return plan === "starter" || plan === "plus";
}

/**
 * Normalise les anciens IDs DB / URL.
 * - ancien « pro » (9€ volume) → starter
 * - « creator » (39€, retiré) → plus (Pro)
 * - « pro » dans les URLs marketing → plus
 */
export function normalizePlan(raw: string | null | undefined): Plan {
  if (!raw) return "free";
  if (raw === "creator") return "plus";
  if (raw === "free" || raw === "starter" || raw === "plus") return raw;
  if (raw === "pro") return "starter";
  return "free";
}

/** Pour ?plan= dans l’URL → checkout */
export function planFromCheckoutQuery(raw: string | null | undefined): PaidPlan | null {
  if (!raw) return null;
  if (raw === "starter" || raw === "plus") return raw;
  if (raw === "pro" || raw === "creator") return "plus";
  return null;
}

export type PricingPlanCard = {
  id: Plan;
  name: string;
  price: string;
  period?: string;
  description: string;
  features: string[];
  cta: string;
  href: string;
  highlighted: boolean;
};

export const PRICING_PLANS: PricingPlanCard[] = [
  {
    id: "free",
    name: "Free",
    price: "0€",
    description: "Découvrir la qualité sur un vrai projet",
    features: [
      `${FREE_LIFETIME_LIMIT} briefs offerts`,
      "Variantes Principal + Court",
      "Score /100 et aperçu",
      "12+ IA supportées",
      "Expert flouté — déblocable à l’unité",
    ],
    cta: "Commencer gratuitement",
    href: "/signup",
    highlighted: false,
  },
  {
    id: "starter",
    name: "Starter",
    price: "9€",
    period: "/mois",
    description: "Un rythme régulier, sans friction",
    features: [
      `${STARTER_MONTHLY_LIMIT} briefs / mois`,
      "Variantes Principal, Court, Détaillé",
      "Score /100 + preview",
      "Historique des 30 derniers",
      "Pour un usage sérieux mais occasionnel",
    ],
    cta: "Choisir Starter",
    href: "/pricing?plan=starter",
    highlighted: false,
  },
  {
    id: "plus",
    name: "Pro",
    price: "19€",
    period: "/mois",
    description: "Expert inclus + workflows — le plan complet",
    features: [
      `${PLUS_MONTHLY_LIMIT} briefs / mois`,
      "Variante Expert à chaque génération",
      "Templates premium & favoris",
      "Workflows métier (SaaS, LinkedIn, Dev)",
      "Regen offerte si score < 70",
    ],
    cta: "Choisir Pro",
    href: "/pricing?plan=pro",
    highlighted: true,
  },
];

export function getMonthlyQuota(plan: Plan): number | null {
  const p = normalizePlan(plan);
  if (p === "free") return FREE_LIFETIME_LIMIT;
  if (p === "starter") return STARTER_MONTHLY_LIMIT;
  if (p === "plus") return PLUS_MONTHLY_LIMIT;
  return null;
}

export function getPromptQuota(
  plan: Plan
): { limit: number; period: "lifetime" | "monthly" } | null {
  const p = normalizePlan(plan);
  if (p === "free") return { limit: FREE_LIFETIME_LIMIT, period: "lifetime" };
  if (p === "starter") return { limit: STARTER_MONTHLY_LIMIT, period: "monthly" };
  if (p === "plus") return { limit: PLUS_MONTHLY_LIMIT, period: "monthly" };
  return null;
}

export function canAccessPremiumTemplates(plan: Plan): boolean {
  const p = normalizePlan(plan);
  return p === "plus";
}

export function hasUnlimitedPrompts(plan: Plan): boolean {
  // Plus de plan illimité commercialisé — quotas Pro uniquement
  return false;
}

export function hasFullHistory(plan: Plan): boolean {
  return normalizePlan(plan) === "plus";
}

export function canUseFavorites(plan: Plan): boolean {
  return normalizePlan(plan) === "plus";
}

export function hasAdvancedVariants(plan: Plan): boolean {
  return normalizePlan(plan) === "plus";
}

export function canUseDetailedVariant(plan: Plan): boolean {
  return normalizePlan(plan) !== "free";
}

export function canAccessWorkflows(plan: Plan, workflowUnlocked = false): boolean {
  return normalizePlan(plan) === "plus" || workflowUnlocked;
}

export function getPlanBadgeVariant(
  plan: Plan
): "free" | "starter" | "pro" | "creator" {
  const p = normalizePlan(plan);
  if (p === "free") return "free";
  if (p === "starter") return "starter";
  return "pro";
}

export function getPlanFeaturesSummary(plan: Plan): string {
  const p = normalizePlan(plan);
  if (p === "free") return `${FREE_LIFETIME_LIMIT} briefs · Principal + Court`;
  if (p === "starter") {
    return `${PLAN_PRICES.starter.label} · ${STARTER_MONTHLY_LIMIT}/mois`;
  }
  return `${PLAN_PRICES.plus.label} · Expert · workflows`;
}
