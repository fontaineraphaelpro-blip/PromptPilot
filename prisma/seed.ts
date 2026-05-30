import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const templates = [
  {
    title: "Landing page SaaS",
    category: "Business",
    targetAi: "ChatGPT",
    description: "Structure pour une page d'accueil SaaS convaincante",
    content:
      "Tu es un copywriter SaaS expert. Crée une landing page pour [produit] avec hero, bénéfices, social proof, pricing et CTA.",
    isPremium: false,
  },
  {
    title: "Post LinkedIn viral",
    category: "Marketing",
    targetAi: "Claude",
    description: "Post LinkedIn engageant avec hook fort",
    content:
      "Tu es un expert LinkedIn. Rédige un post sur [sujet] avec hook, storytelling, valeur et CTA. Ton : professionnel mais accessible.",
    isPremium: false,
  },
  {
    title: "Prompt Midjourney produit",
    category: "Création image",
    targetAi: "Midjourney",
    description: "Photo produit e-commerce premium",
    content:
      "Product photography of [produit], studio lighting, white background, 8k, commercial photography --ar 1:1 --v 6",
    isPremium: false,
  },
  {
    title: "Vidéo pub 15s",
    category: "Création vidéo",
    targetAi: "Runway",
    description: "Publicité courte cinématique",
    content:
      "Cinematic 15s ad: [produit], dynamic camera, golden hour, smooth transitions, premium brand feel",
    isPremium: true,
  },
  {
    title: "App dashboard Next.js",
    category: "Développement",
    targetAi: "Cursor",
    description: "Application dashboard complète",
    content:
      "Crée une app Next.js 14 avec App Router: dashboard, auth mock, sidebar, tables, charts. Stack: TypeScript, Tailwind, shadcn/ui. Procède étape par étape.",
    isPremium: true,
  },
  {
    title: "Store e-commerce",
    category: "E-commerce",
    targetAi: "Lovable",
    description: "Boutique en ligne moderne",
    content:
      "Build a modern e-commerce store with product grid, cart, checkout UI, filters. Design: minimal, premium. Mobile-first.",
    isPremium: true,
  },
  {
    title: "Thread Twitter",
    category: "Réseaux sociaux",
    targetAi: "ChatGPT",
    description: "Thread éducatif 8 tweets",
    content:
      "Crée un thread Twitter de 8 tweets sur [sujet]. Hook puissant, une idée par tweet, CTA final.",
    isPremium: false,
  },
  {
    title: "Analyse SWOT",
    category: "Productivité",
    targetAi: "Gemini",
    description: "Analyse stratégique rapide",
    content:
      "Réalise une analyse SWOT détaillée pour [projet/entreprise]. Format tableau, recommandations actionnables.",
    isPremium: false,
  },
  {
    title: "Prompt Sora cinéma",
    category: "Création vidéo",
    targetAi: "Sora",
    description: "Scène cinématographique IA",
    content:
      "Cinematic scene: [description], 24fps film grain, anamorphic lens, dramatic lighting, slow dolly in, 10 seconds",
    isPremium: true,
  },
  {
    title: "Composant React",
    category: "Développement",
    targetAi: "Replit",
    description: "Composant UI réutilisable",
    content:
      "Crée un composant React TypeScript [nom] avec props typées, Tailwind, accessibilité ARIA, Storybook-ready.",
    isPremium: false,
  },
];

async function main() {
  const count = await prisma.template.count();
  if (count > 0) {
    console.log("Templates déjà présents, seed ignoré.");
    return;
  }
  await prisma.template.createMany({ data: templates });
  console.log(`Seed: ${templates.length} templates créés.`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
