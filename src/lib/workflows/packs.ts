import type { TargetAI } from "@/lib/constants";

export interface WorkflowStep {
  order: number;
  title: string;
  objective: string;
  userIdea: string;
  targetAI: TargetAI;
  taskType: string;
}

export interface WorkflowPack {
  id: string;
  slug: string;
  title: string;
  description: string;
  profession: string;
  duration: string;
  plan: "creator";
  steps: WorkflowStep[];
}

export const WORKFLOW_PACKS: WorkflowPack[] = [
  {
    id: "saas-7j",
    slug: "lancer-saas-7-jours",
    title: "Lancer un SaaS en 7 jours",
    description: "De l'idée au MVP : positionnement, landing, onboarding et lancement.",
    profession: "Fondateur / Product",
    duration: "7 jours · 8 prompts",
    plan: "creator",
    steps: [
      {
        order: 1,
        title: "Positionnement & ICP",
        objective: "Définir la cible et la promesse",
        userIdea: "Aide-moi à définir mon ICP, ma promesse unique et mes 3 pain points pour un SaaS B2B [DÉCRIRE IDÉE]",
        targetAI: "ChatGPT",
        taskType: "Business",
      },
      {
        order: 2,
        title: "Naming & tagline",
        objective: "Trouver un nom mémorable",
        userIdea: "Génère 10 noms de marque + taglines pour un SaaS qui [DÉCRIRE VALEUR]",
        targetAI: "ChatGPT",
        taskType: "Marketing",
      },
      {
        order: 3,
        title: "Structure landing",
        objective: "Wireframe copy de la landing",
        userIdea: "Rédige la structure complète d'une landing SaaS : hero, problème, solution, preuves, pricing, FAQ, CTA",
        targetAI: "ChatGPT",
        taskType: "Marketing",
      },
      {
        order: 4,
        title: "MVP technique",
        objective: "Spec produit pour dev",
        userIdea: "Spécifie un MVP SaaS avec auth, dashboard, facturation Stripe et [FEATURE CLÉ] — stack Next.js",
        targetAI: "Cursor",
        taskType: "Développement",
      },
      {
        order: 5,
        title: "Emails onboarding",
        objective: "Séquence J+0 à J+7",
        userIdea: "Écris 5 emails d'onboarding pour activer les nouveaux users d'un SaaS [CONTEXTE]",
        targetAI: "ChatGPT",
        taskType: "Marketing",
      },
      {
        order: 6,
        title: "Posts lancement",
        objective: "Contenu LinkedIn/X",
        userIdea: "5 posts LinkedIn pour le lancement d'un SaaS — storytelling fondateur + bénéfices concrets",
        targetAI: "ChatGPT",
        taskType: "Marketing",
      },
      {
        order: 7,
        title: "Visuel hero",
        objective: "Image produit landing",
        userIdea: "Product mockup SaaS dashboard, dark mode, minimal, premium startup aesthetic --ar 16:9",
        targetAI: "Midjourney",
        taskType: "Image",
      },
      {
        order: 8,
        title: "Pitch 60 secondes",
        objective: "Script demo",
        userIdea: "Script vidéo demo 60s pour présenter [PRODUIT] — hook, problème, démo, CTA",
        targetAI: "ChatGPT",
        taskType: "Vidéo",
      },
    ],
  },
  {
    id: "linkedin-30j",
    slug: "campagne-linkedin-30-jours",
    title: "Campagne LinkedIn 30 jours",
    description: "Calendrier éditorial, posts, carrousels et messages de prospection.",
    profession: "Marketing / Personal brand",
    duration: "30 jours · 6 prompts",
    plan: "creator",
    steps: [
      {
        order: 1,
        title: "Stratégie éditoriale",
        objective: "Piliers de contenu",
        userIdea: "Définis 4 piliers de contenu LinkedIn pour un expert en [DOMAINE] avec objectif leads",
        targetAI: "ChatGPT",
        taskType: "Marketing",
      },
      {
        order: 2,
        title: "Calendrier 30 jours",
        objective: "Planning posts",
        userIdea: "Calendrier éditorial LinkedIn 30 jours — 4 posts/semaine, mix valeur/story/CTA",
        targetAI: "ChatGPT",
        taskType: "Marketing",
      },
      {
        order: 3,
        title: "Pack 10 posts",
        objective: "Posts prêts à publier",
        userIdea: "Rédige 10 posts LinkedIn prêts à publier sur [THÈME] — hooks percutants, 150-200 mots",
        targetAI: "ChatGPT",
        taskType: "Marketing",
      },
      {
        order: 4,
        title: "Carrousel viral",
        objective: "Structure slide-by-slide",
        userIdea: "Structure un carrousel LinkedIn 8 slides sur [SUJET] — titre, slides, CTA final",
        targetAI: "ChatGPT",
        taskType: "Marketing",
      },
      {
        order: 5,
        title: "DM prospection",
        objective: "Messages personnalisés",
        userIdea: "5 templates de messages LinkedIn de prospection B2B — courte, personnalisée, non spam",
        targetAI: "ChatGPT",
        taskType: "Business",
      },
      {
        order: 6,
        title: "Visuels posts",
        objective: "Images cohérentes",
        userIdea: "Minimal LinkedIn post graphic, bold typography, black white, professional --ar 1:1",
        targetAI: "Midjourney",
        taskType: "Image",
      },
    ],
  },
  {
    id: "dev-cursor",
    slug: "dev-feature-cursor",
    title: "Dev feature Cursor de A à Z",
    description: "Spec, architecture, implémentation et tests pour une feature complète.",
    profession: "Développeur",
    duration: "5 étapes · 5 prompts",
    plan: "creator",
    steps: [
      {
        order: 1,
        title: "Spec fonctionnelle",
        objective: "User stories + critères",
        userIdea: "Rédige la spec complète pour une feature [NOM] : user stories, critères d'acceptation, edge cases",
        targetAI: "ChatGPT",
        taskType: "Développement",
      },
      {
        order: 2,
        title: "Architecture",
        objective: "Structure technique",
        userIdea: "Propose l'architecture Next.js App Router pour [FEATURE] : routes, composants, API, Prisma schema",
        targetAI: "Cursor",
        taskType: "Développement",
      },
      {
        order: 3,
        title: "Implémentation",
        objective: "Prompt dev Cursor",
        userIdea: "Implémente [FEATURE] en TypeScript strict, React Server Components, Tailwind, tests basiques",
        targetAI: "Cursor",
        taskType: "Développement",
      },
      {
        order: 4,
        title: "Review qualité",
        objective: "Audit code",
        userIdea: "Review ce code comme un senior : sécurité, perf, accessibilité, naming — liste actionable",
        targetAI: "Claude",
        taskType: "Développement",
      },
      {
        order: 5,
        title: "Documentation",
        objective: "README + changelog",
        userIdea: "Rédige README dev et note de release pour la feature [NOM] — setup, API, exemples",
        targetAI: "ChatGPT",
        taskType: "Écriture",
      },
    ],
  },
];

export function getWorkflowBySlug(slug: string) {
  return WORKFLOW_PACKS.find((p) => p.slug === slug);
}
