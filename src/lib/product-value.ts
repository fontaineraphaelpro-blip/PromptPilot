import type { Plan } from "@/lib/constants";
import {
  FREE_LIFETIME_LIMIT,
  STARTER_MONTHLY_LIMIT,
  PLUS_MONTHLY_LIMIT,
} from "@/lib/constants";
import { PLAN_PRICES } from "@/lib/plans";
import type { PaidPlan } from "@/lib/plans";

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
    title: "Workflows Creator",
    description:
      "Packs prêts (SaaS, LinkedIn, Dev) : enchaîne les prompts comme un pro sans repartir de zéro.",
    badge: "Creator",
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
  creator: ComparisonCell;
};

export const PLAN_COMPARISON_ROWS: PlanComparisonRow[] = [
  {
    feature: "Prompts inclus",
    free: `${FREE_LIFETIME_LIMIT} offerts`,
    starter: `${STARTER_MONTHLY_LIMIT}/mois`,
    plus: `${PLUS_MONTHLY_LIMIT}/mois`,
    creator: "Illimité",
  },
  {
    feature: "Adaptation multi-IA (12+ outils)",
    free: true,
    starter: true,
    plus: true,
    creator: true,
  },
  {
    feature: "Score qualité /100 + garantie regen",
    free: true,
    starter: true,
    plus: true,
    creator: true,
  },
  {
    feature: "Preview « tester avant de coller »",
    free: true,
    starter: true,
    plus: true,
    creator: true,
  },
  {
    feature: "Variantes Principal + Court",
    free: true,
    starter: true,
    plus: true,
    creator: true,
  },
  {
    feature: "Variante Détaillée",
    free: false,
    starter: true,
    plus: true,
    creator: true,
  },
  {
    feature: "Variante Expert (brief production)",
    hint: "2 000+ mots, edge cases, critères d'acceptation",
    free: "À l’unité",
    starter: "À l’unité",
    plus: true,
    creator: true,
  },
  {
    feature: "Niveau Expert au générateur",
    free: false,
    starter: false,
    plus: true,
    creator: true,
  },
  {
    feature: "Historique + favoris",
    free: "30 derniers",
    starter: "30 derniers",
    plus: true,
    creator: true,
  },
  {
    feature: "Templates premium",
    free: false,
    starter: false,
    plus: true,
    creator: true,
  },
  {
    feature: "Options avancées (exemples, checklist…)",
    free: false,
    starter: false,
    plus: true,
    creator: true,
  },
  {
    feature: "Workflows métier (SaaS, LinkedIn, Dev)",
    free: false,
    starter: false,
    plus: false,
    creator: true,
  },
];

export type UpgradeHighlight = {
  title: string;
  description: string;
  plan: PaidPlan;
};

export function getUpgradeHighlights(currentPlan: Plan): UpgradeHighlight[] {
  if (currentPlan === "creator") return [];

  if (currentPlan === "free") {
    return [
      {
        title: "Pro — Expert à chaque génération",
        description: `Variante Expert, templates premium, favoris et regen score < 70 — ${PLAN_PRICES.plus.label}. Rentabilisé dès 1–2 briefs.`,
        plan: "plus",
      },
      {
        title: "Starter — rythme régulier",
        description: `${STARTER_MONTHLY_LIMIT} briefs / mois + variante Détaillée — ${PLAN_PRICES.starter.label}.`,
        plan: "starter",
      },
      {
        title: "Creator — workflows & volume",
        description: "Illimité, packs métier SaaS / LinkedIn / Dev, Expert par défaut.",
        plan: "creator",
      },
    ];
  }

  if (currentPlan === "starter") {
    return [
      {
        title: "Passer Pro",
        description: "Expert inclus, templates premium, favoris — pour quand le brief fait partie du métier.",
        plan: "plus",
      },
      {
        title: "Creator",
        description: "Workflows et volume illimité quand tu produis en série.",
        plan: "creator",
      },
    ];
  }

  // plus → creator
  return [
    {
      title: "Workflows métier",
      description: "Packs SaaS, LinkedIn, Dev : gagne des heures sur les projets récurrents.",
      plan: "creator",
    },
    {
      title: "Volume illimité",
      description: "Plus de plafond mensuel — usage raisonnable, pour les équipes et les freelances intensifs.",
      plan: "creator",
    },
    {
      title: "Niveau Expert par défaut",
      description: "Chaque génération part directement en mode brief consultant senior.",
      plan: "creator",
    },
  ];
}
