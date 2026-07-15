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
  creator: "Creator",
};

export const PLAN_PRICES = {
  starter: { amount: 9, label: "9€/mois" },
  plus: { amount: 19, label: "19€/mois" },
  creator: { amount: 39, label: "39€/mois" },
};

/** @deprecated alias — préférer PLAN_PRICES.plus */
export const PRO_PRICE_ALIAS = PLAN_PRICES.plus;

export type PaidPlan = "starter" | "plus" | "creator";

export function isPaidPlan(plan: string): plan is PaidPlan {
  return plan === "starter" || plan === "plus" || plan === "creator";
}

/**
 * Normalise les anciens IDs DB / URL.
 * - ancien « pro » (9€ volume) → starter
 * - « pro » dans les URLs marketing → plus (affiché Pro)
 */
export function normalizePlan(raw: string | null | undefined): Plan {
  if (!raw) return "free";
  if (raw === "free" || raw === "starter" || raw === "plus" || raw === "creator") {
    return raw;
  }
  if (raw === "pro") return "starter";
  return "free";
}

/** Pour ?plan=pro dans l’URL → plus */
export function planFromCheckoutQuery(raw: string | null | undefined): PaidPlan | null {
  if (!raw) return null;
  if (raw === "starter" || raw === "plus" || raw === "creator") return raw;
  if (raw === "pro") return "plus";
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
    description: "Quand le brief Expert fait partie du métier",
    features: [
      `${PLUS_MONTHLY_LIMIT} briefs / mois`,
      "Variante Expert à chaque génération",
      "Templates premium & favoris",
      "Regen offerte si score < 70",
      "Options avancées (exemples, checklist…)",
    ],
    cta: "Choisir Pro",
    href: "/pricing?plan=pro",
    highlighted: true,
  },
  {
    id: "creator",
    name: "Creator",
    price: "39€",
    period: "/mois",
    description: "Workflows et volume — produire en série",
    features: [
      "Briefs illimités (usage raisonnable)",
      "Tout Pro inclus",
      "Workflows métier (SaaS, LinkedIn, Dev)",
      "Niveau Expert par défaut",
      "Support prioritaire",
    ],
    cta: "Choisir Creator",
    href: "/pricing?plan=creator",
    highlighted: false,
  },
];

export function getMonthlyQuota(plan: Plan): number | null {
  if (plan === "free") return FREE_LIFETIME_LIMIT;
  if (plan === "starter") return STARTER_MONTHLY_LIMIT;
  if (plan === "plus") return PLUS_MONTHLY_LIMIT;
  return null;
}

export function getPromptQuota(
  plan: Plan
): { limit: number; period: "lifetime" | "monthly" } | null {
  if (plan === "free") return { limit: FREE_LIFETIME_LIMIT, period: "lifetime" };
  if (plan === "starter") return { limit: STARTER_MONTHLY_LIMIT, period: "monthly" };
  if (plan === "plus") return { limit: PLUS_MONTHLY_LIMIT, period: "monthly" };
  return null;
}

export function canAccessPremiumTemplates(plan: Plan): boolean {
  return plan === "plus" || plan === "creator";
}

export function hasUnlimitedPrompts(plan: Plan): boolean {
  return plan === "creator";
}

export function hasFullHistory(plan: Plan): boolean {
  return plan === "plus" || plan === "creator";
}

export function canUseFavorites(plan: Plan): boolean {
  return plan === "plus" || plan === "creator";
}

export function hasAdvancedVariants(plan: Plan): boolean {
  return plan === "plus" || plan === "creator";
}

export function canUseDetailedVariant(plan: Plan): boolean {
  return plan !== "free";
}

export function canAccessWorkflows(plan: Plan, workflowUnlocked = false): boolean {
  return plan === "creator" || workflowUnlocked;
}

export function getPlanBadgeVariant(
  plan: Plan
): "free" | "starter" | "pro" | "creator" {
  if (plan === "free") return "free";
  if (plan === "starter") return "starter";
  if (plan === "creator") return "creator";
  return "pro"; // plus displayed as Pro
}

export function getPlanFeaturesSummary(plan: Plan): string {
  if (plan === "free") return `${FREE_LIFETIME_LIMIT} briefs · Principal + Court`;
  if (plan === "starter") {
    return `${PLAN_PRICES.starter.label} · ${STARTER_MONTHLY_LIMIT}/mois`;
  }
  if (plan === "plus") {
    return `${PLAN_PRICES.plus.label} · Expert · templates`;
  }
  return `${PLAN_PRICES.creator.label} · workflows · illimité`;
}
