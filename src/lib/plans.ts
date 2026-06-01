import type { Plan } from "@/lib/constants";
import { FREE_DAILY_LIMIT, PRO_DAILY_FAIR_USE_LIMIT } from "@/lib/constants";

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
    description: "Goûte la qualité — quota limité",
    features: [
      `${FREE_DAILY_LIMIT} prompts/jour · score /100 + preview`,
      "Variantes Principal, Court, Détaillé",
      "Adaptation 12+ IA (ChatGPT, Claude, Cursor…)",
      "30 derniers prompts en historique",
      "Aperçu Expert (suite floutée)",
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
    description: "Le sweet spot — illimité & bibliothèque pro",
    features: [
      "200 prompts/jour (usage généreux)",
      "Score /100 + regen garantie si < 70",
      "Preview + export + tags bibliothèque",
      "Templates premium & favoris",
      "Options avancées (exemples, checklist…)",
      "Historique complet sans limite",
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
    description: "Brief production & workflows — pour les pros",
    features: [
      "Tout Pro inclus",
      "Variante Expert complète (2000+ mots)",
      "Niveau Expert par défaut au générateur",
      "Workflows métier (SaaS, LinkedIn, Dev)",
      "Brief consultant : edge cases + critères d'acceptation",
      "Support prioritaire",
    ],
    cta: "Passer au Creator",
    href: "/pricing?plan=creator",
    highlighted: false,
  },
];

export function getDailyLimit(plan: Plan): number | null {
  if (plan === "free") return FREE_DAILY_LIMIT;
  if (plan === "pro") return PRO_DAILY_FAIR_USE_LIMIT;
  return null;
}

export function canAccessPremiumTemplates(plan: Plan): boolean {
  return plan === "pro" || plan === "creator";
}

/** Creator uniquement — Pro a un plafond d'usage équitable (200/jour) */
export function hasUnlimitedPrompts(plan: Plan): boolean {
  return plan === "creator";
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
    return `${FREE_DAILY_LIMIT} prompts/jour · historique limité · templates gratuits`;
  }
  if (plan === "pro") {
    return `${PLAN_PRICES.pro.label} · ${PRO_DAILY_FAIR_USE_LIMIT} prompts/jour · favoris · templates premium`;
  }
  return `${PLAN_PRICES.creator.label} · variante Expert · support prioritaire`;
}
