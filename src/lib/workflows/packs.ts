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
  plan: "plus";
  steps: WorkflowStep[];
}

export const WORKFLOW_PACKS: WorkflowPack[] = [
  {
    id: "saas-7j",
    slug: "lancer-saas-7-jours",
    title: "Lancer un SaaS en 7 jours",
    description: "De l'idÃ©e au MVP : positionnement, landing, onboarding et lancement.",
    profession: "Fondateur / Product",
    duration: "7 jours Â· 8 prompts",
    plan: "plus",
    steps: [
      {
        order: 1,
        title: "Positionnement & ICP",
        objective: "DÃ©finir la cible et la promesse",
        userIdea: "Aide-moi Ã  dÃ©finir mon ICP, ma promesse unique et mes 3 pain points pour un SaaS B2B [DÃ‰CRIRE IDÃ‰E]",
        targetAI: "ChatGPT",
        taskType: "Business",
      },
      {
        order: 2,
        title: "Naming & tagline",
        objective: "Trouver un nom mÃ©morable",
        userIdea: "GÃ©nÃ¨re 10 noms de marque + taglines pour un SaaS qui [DÃ‰CRIRE VALEUR]",
        targetAI: "ChatGPT",
        taskType: "Marketing",
      },
      {
        order: 3,
        title: "Structure landing",
        objective: "Wireframe copy de la landing",
        userIdea: "RÃ©dige la structure complÃ¨te d'une landing SaaS : hero, problÃ¨me, solution, preuves, pricing, FAQ, CTA",
        targetAI: "ChatGPT",
        taskType: "Marketing",
      },
      {
        order: 4,
        title: "MVP technique",
        objective: "Spec produit pour dev",
        userIdea: "SpÃ©cifie un MVP SaaS avec auth, dashboard, facturation Stripe et [FEATURE CLÃ‰] â€” stack Next.js",
        targetAI: "Cursor",
        taskType: "DÃ©veloppement",
      },
      {
        order: 5,
        title: "Emails onboarding",
        objective: "SÃ©quence J+0 Ã  J+7",
        userIdea: "Ã‰cris 5 emails d'onboarding pour activer les nouveaux users d'un SaaS [CONTEXTE]",
        targetAI: "ChatGPT",
        taskType: "Marketing",
      },
      {
        order: 6,
        title: "Posts lancement",
        objective: "Contenu LinkedIn/X",
        userIdea: "5 posts LinkedIn pour le lancement d'un SaaS â€” storytelling fondateur + bÃ©nÃ©fices concrets",
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
        userIdea: "Script vidÃ©o demo 60s pour prÃ©senter [PRODUIT] â€” hook, problÃ¨me, dÃ©mo, CTA",
        targetAI: "ChatGPT",
        taskType: "VidÃ©o",
      },
    ],
  },
  {
    id: "linkedin-30j",
    slug: "campagne-linkedin-30-jours",
    title: "Campagne LinkedIn 30 jours",
    description: "Calendrier Ã©ditorial, posts, carrousels et messages de prospection.",
    profession: "Marketing / Personal brand",
    duration: "30 jours Â· 6 prompts",
    plan: "plus",
    steps: [
      {
        order: 1,
        title: "StratÃ©gie Ã©ditoriale",
        objective: "Piliers de contenu",
        userIdea: "DÃ©finis 4 piliers de contenu LinkedIn pour un expert en [DOMAINE] avec objectif leads",
        targetAI: "ChatGPT",
        taskType: "Marketing",
      },
      {
        order: 2,
        title: "Calendrier 30 jours",
        objective: "Planning posts",
        userIdea: "Calendrier Ã©ditorial LinkedIn 30 jours â€” 4 posts/semaine, mix valeur/story/CTA",
        targetAI: "ChatGPT",
        taskType: "Marketing",
      },
      {
        order: 3,
        title: "Pack 10 posts",
        objective: "Posts prÃªts Ã  publier",
        userIdea: "RÃ©dige 10 posts LinkedIn prÃªts Ã  publier sur [THÃˆME] â€” hooks percutants, 150-200 mots",
        targetAI: "ChatGPT",
        taskType: "Marketing",
      },
      {
        order: 4,
        title: "Carrousel viral",
        objective: "Structure slide-by-slide",
        userIdea: "Structure un carrousel LinkedIn 8 slides sur [SUJET] â€” titre, slides, CTA final",
        targetAI: "ChatGPT",
        taskType: "Marketing",
      },
      {
        order: 5,
        title: "DM prospection",
        objective: "Messages personnalisÃ©s",
        userIdea: "5 templates de messages LinkedIn de prospection B2B â€” courte, personnalisÃ©e, non spam",
        targetAI: "ChatGPT",
        taskType: "Business",
      },
      {
        order: 6,
        title: "Visuels posts",
        objective: "Images cohÃ©rentes",
        userIdea: "Minimal LinkedIn post graphic, bold typography, black white, professional --ar 1:1",
        targetAI: "Midjourney",
        taskType: "Image",
      },
    ],
  },
  {
    id: "dev-cursor",
    slug: "dev-feature-cursor",
    title: "Dev feature Cursor de A Ã  Z",
    description: "Spec, architecture, implÃ©mentation et tests pour une feature complÃ¨te.",
    profession: "DÃ©veloppeur",
    duration: "5 Ã©tapes Â· 5 prompts",
    plan: "plus",
    steps: [
      {
        order: 1,
        title: "Spec fonctionnelle",
        objective: "User stories + critÃ¨res",
        userIdea: "RÃ©dige la spec complÃ¨te pour une feature [NOM] : user stories, critÃ¨res d'acceptation, edge cases",
        targetAI: "ChatGPT",
        taskType: "DÃ©veloppement",
      },
      {
        order: 2,
        title: "Architecture",
        objective: "Structure technique",
        userIdea: "Propose l'architecture Next.js App Router pour [FEATURE] : routes, composants, API, Prisma schema",
        targetAI: "Cursor",
        taskType: "DÃ©veloppement",
      },
      {
        order: 3,
        title: "ImplÃ©mentation",
        objective: "Prompt dev Cursor",
        userIdea: "ImplÃ©mente [FEATURE] en TypeScript strict, React Server Components, Tailwind, tests basiques",
        targetAI: "Cursor",
        taskType: "DÃ©veloppement",
      },
      {
        order: 4,
        title: "Review qualitÃ©",
        objective: "Audit code",
        userIdea: "Review ce code comme un senior : sÃ©curitÃ©, perf, accessibilitÃ©, naming â€” liste actionable",
        targetAI: "Claude",
        taskType: "DÃ©veloppement",
      },
      {
        order: 5,
        title: "Documentation",
        objective: "README + changelog",
        userIdea: "RÃ©dige README dev et note de release pour la feature [NOM] â€” setup, API, exemples",
        targetAI: "ChatGPT",
        taskType: "Ã‰criture",
      },
    ],
  },
];

export function getWorkflowBySlug(slug: string) {
  return WORKFLOW_PACKS.find((p) => p.slug === slug);
}
