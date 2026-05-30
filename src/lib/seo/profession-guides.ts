export interface ProfessionGuide {
  slug: string;
  title: string;
  description: string;
  metaDescription: string;
  pains: string[];
  useCases: string[];
  templateIdea: string;
  targetAI: string;
  ctaLabel: string;
}

export const PROFESSION_GUIDES: ProfessionGuide[] = [
  {
    slug: "developpeur",
    title: "Prompts IA pour développeurs",
    description: "Cursor, Replit, Claude — specs, features, debug et architecture en prompts structurés.",
    metaDescription: "Guide prompts IA développeur : Cursor, Claude, specs techniques, code review et architecture.",
    pains: ["Prompts vagues → code hors spec", "Refactors sans contexte", "Debug sans étapes"],
    useCases: ["Feature Next.js complète", "Review sécurité", "Migration base de données", "Tests E2E"],
    templateIdea: "Implémente [FEATURE] en Next.js App Router avec TypeScript strict, Prisma et tests",
    targetAI: "Cursor",
    ctaLabel: "Générer un prompt dev",
  },
  {
    slug: "marketing",
    title: "Prompts IA pour marketers",
    description: "Copy, campagnes, emails, LinkedIn — prompts orientés conversion et brand voice.",
    metaDescription: "Prompts marketing IA : emails, landing, LinkedIn, ads et calendrier éditorial optimisés.",
    pains: ["Copy générique sans CTA", "Posts LinkedIn sans structure", "Emails sans personnalisation"],
    useCases: ["Séquence email onboarding", "Landing hero + FAQ", "Calendrier LinkedIn 30j", "Ads Meta"],
    templateIdea: "Rédige 5 variantes d'email de relance panier abandonné pour une marque e-commerce premium",
    targetAI: "ChatGPT",
    ctaLabel: "Générer un prompt marketing",
  },
  {
    slug: "ecommerce",
    title: "Prompts IA pour e-commerce",
    description: "Fiches produits, visuels, emails transactionnels et UGC pour vendre plus.",
    metaDescription: "Prompts e-commerce IA : fiches produit, visuels Midjourney, emails panier et descriptions SEO.",
    pains: ["Fiches produit identiques", "Visuels amateurs", "Emails panier faibles"],
    useCases: ["Fiche produit SEO", "Photo produit studio", "Email panier abandonné", "Script UGC"],
    templateIdea: "Rédige une fiche produit SEO pour [PRODUIT] avec titre, bullets bénéfices, FAQ et meta description",
    targetAI: "ChatGPT",
    ctaLabel: "Générer un prompt e-commerce",
  },
  {
    slug: "creatif",
    title: "Prompts IA pour créatifs",
    description: "Midjourney, Sora, Runway — direction artistique, moodboards et briefs visuels.",
    metaDescription: "Prompts créatifs IA : Midjourney, Sora, direction artistique, moodboard et storyboard.",
    pains: ["Prompts image trop courts", "Style incohérent", "Vidéos sans direction caméra"],
    useCases: ["Moodboard marque", "Product shot premium", "Storyboard pub 15s", "Illustration editorial"],
    templateIdea: "Editorial illustration, [SUJET], flat vector, palette [COULEURS], negative space --ar 16:9",
    targetAI: "Midjourney",
    ctaLabel: "Générer un prompt créatif",
  },
  {
    slug: "avocat",
    title: "Prompts IA pour juristes",
    description: "Synthèses, emails clients, structure d'arguments — sans remplacer le conseil legal.",
    metaDescription: "Prompts IA avocat : synthèse contrats, emails clients, structure d'argumentaire professionnel.",
    pains: ["Synthèses trop longues", "Emails clients trop techniques", "Manque de structure"],
    useCases: ["Synthèse contrat", "Email client vulgarisé", "Plan argumentaire", "Checklist due diligence"],
    templateIdea: "Synthétise ce contrat en : parties, objet, durée, obligations clés, risques, questions ouvertes — sans conseil juridique",
    targetAI: "Claude",
    ctaLabel: "Générer un prompt juridique",
  },
];

export function getProfessionGuide(slug: string) {
  return PROFESSION_GUIDES.find((g) => g.slug === slug);
}
