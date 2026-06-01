import type { Plan } from "@/lib/constants";
import { FREE_DAILY_LIMIT, PRO_DAILY_FAIR_USE_LIMIT } from "@/lib/constants";

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

export const ROI_HEADLINE =
  "Un prompt expert structuré = 30 à 60 min de travail manuel économisées. Pro à 9€/mois, c'est rentabilisé dès la 2ᵉ génération.";

type ComparisonCell = boolean | string;

export type PlanComparisonRow = {
  feature: string;
  hint?: string;
  free: ComparisonCell;
  pro: ComparisonCell;
  creator: ComparisonCell;
};

export const PLAN_COMPARISON_ROWS: PlanComparisonRow[] = [
  {
    feature: "Prompts par jour",
    free: `${FREE_DAILY_LIMIT}`,
    pro: `${PRO_DAILY_FAIR_USE_LIMIT}/jour`,
    creator: "Illimité",
  },
  {
    feature: "Adaptation multi-IA (12+ outils)",
    free: true,
    pro: true,
    creator: true,
  },
  {
    feature: "Score qualité /100 + garantie regen",
    free: true,
    pro: true,
    creator: true,
  },
  {
    feature: "Preview « tester avant de coller »",
    free: true,
    pro: true,
    creator: true,
  },
  {
    feature: "Variantes Principal, Court, Détaillé",
    free: true,
    pro: true,
    creator: true,
  },
  {
    feature: "Variante Expert (brief production)",
    hint: "2 000+ mots, edge cases, critères d'acceptation",
    free: false,
    pro: false,
    creator: true,
  },
  {
    feature: "Niveau Expert au générateur",
    free: false,
    pro: false,
    creator: true,
  },
  {
    feature: "Historique complet + favoris",
    free: "30 derniers",
    pro: true,
    creator: true,
  },
  {
    feature: "Templates premium",
    free: false,
    pro: true,
    creator: true,
  },
  {
    feature: "Options avancées (exemples, checklist…)",
    free: false,
    pro: true,
    creator: true,
  },
  {
    feature: "Workflows métier (SaaS, LinkedIn, Dev)",
    free: false,
    pro: false,
    creator: true,
  },
  {
    feature: "Tags & organisation bibliothèque",
    free: false,
    pro: true,
    creator: true,
  },
];

export type UpgradeHighlight = {
  title: string;
  description: string;
  plan: "pro" | "creator";
};

export function getUpgradeHighlights(currentPlan: Plan): UpgradeHighlight[] {
  if (currentPlan === "creator") return [];

  if (currentPlan === "free") {
    return [
      {
        title: "Prompts illimités",
        description: "Plus de quota à 2/jour — génère autant que tu veux pour tes clients ou projets.",
        plan: "pro",
      },
      {
        title: "Templates premium & favoris",
        description: "Bibliothèque pro + retrouve tes meilleurs prompts en 1 clic.",
        plan: "pro",
      },
      {
        title: "Variante Expert débloquée",
        description:
          "Brief production complet (edge cases, critères d'acceptation) — ce que tu as vu flouté.",
        plan: "creator",
      },
      {
        title: "Workflows Creator",
        description: "Enchaîne des prompts métier sans repartir de zéro à chaque fois.",
        plan: "creator",
      },
    ];
  }

  return [
    {
      title: "Variante Expert complète",
      description:
        "La version la plus longue et actionnable de ton prompt — déjà générée, il suffit de débloquer.",
      plan: "creator",
    },
    {
      title: "Workflows métier",
      description: "Packs SaaS, LinkedIn, Dev : gagne des heures sur les projets récurrents.",
      plan: "creator",
    },
    {
      title: "Niveau Expert par défaut",
      description: "Chaque génération part directement en mode brief consultant senior.",
      plan: "creator",
    },
  ];
}
