import type { Plan } from "@/lib/constants";
import {
  FREE_LIFETIME_LIMIT,
  STARTER_MONTHLY_LIMIT,
  PLUS_MONTHLY_LIMIT,
} from "@/lib/constants";
import { PLAN_PRICES, normalizePlan, type PaidPlan } from "@/lib/plans";

/** Différenciateurs visibles — ce que ChatGPT seul ne fait pas pour le client */
export const PRODUCT_DIFFERENTIATORS = [
  {
    title: "Adapté à ton IA, pas générique",
    description:
      "Chaque prompt est structuré pour ChatGPT, Claude, Midjourney, Cursor, etc. — avec le vocabulaire et les sections que l'outil attend.",
    badge: "12+ IA",
  },
  {
    title: "Score qualité /100",
    description:
      "Tu vois si ton prompt est prêt avant de le coller. Regénération gratuite si le score est insuffisant.",
    badge: "Exclusif",
  },
  {
    title: "Tester avant de coller",
    description:
      "Aperçu de ce que l'IA va comprendre + les questions qu'elle te poserait encore — tu évites les allers-retours.",
    badge: "Preview",
  },
  {
    title: "4 variantes par génération",
    description:
      "Principal, Court, Détaillé et Expert : du tweet rapide au brief production complet, sans réécrire à la main.",
    badge: "4× output",
  },
  {
    title: "Brief type consultant",
    description:
      "Rôle, contexte, contraintes mesurables, format de sortie, critères d'acceptation — pas un paragraphe vague.",
    badge: "Méthode R-C-T-C",
  },
  {
    title: "Workflows métier",
    description:
      "Packs prêts (SaaS, LinkedIn, Dev) : enchaîne les prompts comme un pro sans repartir de zéro.",
    badge: "Pro",
  },
] as const;

export const ROI_HEADLINE = `Un brief expert = 30 à 60 min de travail manuel économisées. Pro à ${PLAN_PRICES.plus.label} : rentabilisé dès les premiers usages sérieux.`;

export const VALUE_ONE_LINER =
  "ChatGPT répond. PromptPilot te donne le brief à coller — scoré, multi-IA, 4 variantes.";

type ComparisonCell = boolean | string;

export type PlanComparisonRow = {
  feature: string;
  hint?: string;
  free: ComparisonCell;
  starter: ComparisonCell;
  plus: ComparisonCell;
};

export const PLAN_COMPARISON_ROWS: PlanComparisonRow[] = [
  {
    feature: "Prompts inclus",
    free: `${FREE_LIFETIME_LIMIT} offerts`,
    starter: `${STARTER_MONTHLY_LIMIT}/mois`,
    plus: `${PLUS_MONTHLY_LIMIT}/mois`,
  },
  {
    feature: "Adaptation multi-IA (12+ outils)",
    free: true,
    starter: true,
    plus: true,
  },
  {
    feature: "Score qualité /100 + garantie regen",
    free: true,
    starter: true,
    plus: true,
  },
  {
    feature: "Preview « tester avant de coller »",
    free: true,
    starter: true,
    plus: true,
  },
  {
    feature: "Variantes Principal + Court",
    free: true,
    starter: true,
    plus: true,
  },
  {
    feature: "Variante Détaillée",
    free: false,
    starter: true,
    plus: true,
  },
  {
    feature: "Variante Expert (brief production)",
    hint: "2 000+ mots, edge cases, critères d'acceptation",
    free: "À l’unité",
    starter: "À l’unité",
    plus: true,
  },
  {
    feature: "Niveau Expert au générateur",
    free: false,
    starter: false,
    plus: true,
  },
  {
    feature: "Historique + favoris",
    free: "30 derniers",
    starter: "30 derniers",
    plus: true,
  },
  {
    feature: "Templates premium",
    free: false,
    starter: false,
    plus: true,
  },
  {
    feature: "Options avancées (exemples, checklist…)",
    free: false,
    starter: false,
    plus: true,
  },
  {
    feature: "Workflows métier (SaaS, LinkedIn, Dev)",
    free: false,
    starter: false,
    plus: true,
  },
];

export type UpgradeHighlight = {
  title: string;
  description: string;
  plan: PaidPlan;
};

export function getUpgradeHighlights(currentPlan: Plan): UpgradeHighlight[] {
  const plan = normalizePlan(currentPlan);
  if (plan === "plus") return [];

  if (plan === "free") {
    return [
      {
        title: "Pro — Expert + workflows",
        description: `Variante Expert, templates, favoris et workflows métier — ${PLAN_PRICES.plus.label}.`,
        plan: "plus",
      },
      {
        title: "Starter — rythme régulier",
        description: `${STARTER_MONTHLY_LIMIT} briefs / mois + variante Détaillée — ${PLAN_PRICES.starter.label}.`,
        plan: "starter",
      },
    ];
  }

  // starter → plus
  return [
    {
      title: "Passer Pro",
      description:
        "Expert inclus, templates premium, favoris et workflows — quand le brief fait partie du métier.",
      plan: "plus",
    },
  ];
}
