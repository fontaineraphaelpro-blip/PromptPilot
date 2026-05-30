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

/** Source unique pour landing + page /pricing */
export const PRICING_PLANS: PricingPlanCard[] = [
  {
    id: "free",
    name: "Free",
    price: "0€",
    description: "Pour découvrir PromptPilot",
    features: [
      "3 prompts gratuits/jour",
      "30 derniers prompts en historique",
      "Niveaux Rapide et Détaillé",
      "Variantes Principal, Court et Détaillé",
      "Templates gratuits",
    ],
    cta: "Commencer gratuitement",
    href: "/signup",
    highlighted: false,
  },
  {
    id: "pro",
    name: "Pro",
    price: "9€",
    period: "/mois",
    description: "Pour les créateurs réguliers",
    features: [
      "Prompts illimités",
      "Historique complet",
      "Favoris",
      "Templates premium",
      "Options avancées du générateur",
      "Variantes Principal, Court et Détaillé",
    ],
    cta: "Passer au Pro",
    href: "/pricing?plan=pro",
    highlighted: true,
  },
  {
    id: "creator",
    name: "Creator",
    price: "19€",
    period: "/mois",
    description: "Pour les power users et équipes",
    features: [
      "Tout Pro inclus",
      "Variante Expert débloquée",
      "Workflows métier (SaaS, LinkedIn, Dev)",
      "Niveau Expert par défaut au générateur",
      "Support prioritaire",
    ],
    cta: "Passer au Creator",
    href: "/pricing?plan=creator",
    highlighted: false,
  },
];

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

export function hasFullHistory(plan: Plan): boolean {
  return plan === "pro" || plan === "creator";
}

export function canUseFavorites(plan: Plan): boolean {
  return plan === "pro" || plan === "creator";
}

export function hasAdvancedVariants(plan: Plan): boolean {
  return plan === "creator";
}

export function getPlanBadgeVariant(
  plan: Plan
): "free" | "pro" | "creator" {
  if (plan === "free") return "free";
  if (plan === "creator") return "creator";
  return "pro";
}

export function getPlanFeaturesSummary(plan: Plan): string {
  if (plan === "free") {
    return "3 prompts/jour · historique limité · templates gratuits";
  }
  if (plan === "pro") {
    return `${PLAN_PRICES.pro.label} · illimité · favoris · templates premium`;
  }
  return `${PLAN_PRICES.creator.label} · variante Expert · support prioritaire`;
}
