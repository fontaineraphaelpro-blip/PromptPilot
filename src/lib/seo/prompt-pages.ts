import type { PromptIaPage } from "./types";

export const PROMPT_IA_PAGES: PromptIaPage[] = [
  {
    slug: "chatgpt",
    aiName: "ChatGPT",
    title: "Générateur de prompts ChatGPT optimisés",
    description:
      "Créez des prompts ChatGPT structurés pour le business, le code et la rédaction. Framework expert, variantes prêtes à copier.",
    keywords: ["prompt ChatGPT", "générateur ChatGPT", "GPT-4 prompt français"],
    useCases: ["Pages de vente et emails", "Brainstorming produit", "Scripts et formations", "Analyse de données textuelles"],
    tips: [
      "Précisez le format de sortie (liste, tableau, JSON)",
      "Indiquez le public et le niveau technique",
      "Découpez les projets complexes en étapes",
    ],
    exampleBefore: "« Aide-moi pour mon marketing »",
    exampleAfter:
      "Rôle copywriter B2B. Contexte : SaaS prompts IA, public fondateurs PME. Tâche : séquence 3 emails onboarding. Contraintes : français, 120 mots/email, CTA essai gratuit, ton pro sans jargon.",
    relatedArticleSlugs: ["comment-ecrire-prompt-chatgpt", "chatgpt-vs-claude-prompts"],
  },
  {
    slug: "claude",
    aiName: "Claude",
    title: "Prompts Claude (Anthropic) : générateur expert",
    description:
      "Prompts adaptés à Claude pour l'analyse longue, la rédaction nuancée et les specs produit détaillées.",
    keywords: ["prompt Claude", "Claude 3 prompt", "Anthropic prompt"],
    useCases: ["Synthèse de documents longs", "Specs techniques", "Rédaction sensible et structurée", "Revue de code commentée"],
    tips: [
      "Donnez le pourquoi métier, pas seulement la tâche",
      "Listez les trade-offs acceptables",
      "Demandez explicitement les incertitudes à signaler",
    ],
    exampleBefore: "« Résume ce document »",
    exampleAfter:
      "Tu es analyste produit senior. Synthétise ce document en : (1) décisions clés, (2) risques, (3) questions ouvertes. Format markdown, 400 mots max, français, signale toute ambiguïté.",
    relatedArticleSlugs: ["chatgpt-vs-claude-prompts", "quest-ce-que-le-prompt-engineering"],
  },
  {
    slug: "cursor",
    aiName: "Cursor",
    title: "Prompts Cursor pour le développement assisté par IA",
    description:
      "Générez des prompts Cursor avec stack, périmètre fichiers et definition of done pour coder plus vite sans dette technique.",
    keywords: ["prompt Cursor", "Cursor AI", "prompt code Next.js"],
    useCases: ["Nouvelles features Next.js / React", "Refactors ciblés", "Debug avec contexte fichier", "Setup projet et conventions"],
    tips: [
      "Une tâche atomique par prompt",
      "Mentionnez les fichiers à ne pas modifier",
      "Exigez TypeScript strict et tests si applicable",
    ],
    exampleBefore: "« Fais une app fitness »",
    exampleAfter:
      "Next.js 14 App Router, TypeScript, shadcn/ui. Feature : onboarding + dashboard entraînements. Ne touche pas à l'auth existante. Étapes : schéma données → pages → composants. Livrable : code typé, commentaires minimaux.",
    relatedArticleSlugs: ["prompts-cursor-guide-developpeur", "structure-prompt-expert-framework"],
  },
  {
    slug: "midjourney",
    aiName: "Midjourney",
    title: "Prompts Midjourney : descriptions visuelles pro",
    description:
      "Prompts image Midjourney avec composition, lumière, style et paramètres pour des visuels cohérents.",
    keywords: ["prompt Midjourney", "Midjourney français", "IA image prompt"],
    useCases: ["Branding et moodboards", "Illustrations éditoriales", "Concept art", "Visuels réseaux sociaux"],
    tips: [
      "Décrivez lumière et objectif caméra",
      "Référencez un style visuel précis",
      "Évitez les négations ; préférez le descriptif positif",
    ],
    exampleBefore: "« Un logo moderne »",
    exampleAfter:
      "Flat vector logo, minimal tech startup, monochrome black white, geometric PP monogram, centered, white background, editorial quality, no text clutter --ar 1:1 --style raw",
    relatedArticleSlugs: ["midjourney-vs-dalle-prompts", "prompts-video-sora-runway"],
  },
  {
    slug: "gemini",
    aiName: "Gemini",
    title: "Prompts Google Gemini : guide et générateur",
    description:
      "Prompts optimisés pour Gemini : recherche, multimodal et productivité Google Workspace.",
    keywords: ["prompt Gemini", "Google Gemini prompt", "IA Google"],
    useCases: ["Recherche et synthèse", "Plans de contenu", "Support multilingue", "Analyse comparative"],
    tips: [
      "Structurez en sections numérotées",
      "Précisez si des sources sont requises",
      "Indiquez le format de sortie attendu",
    ],
    exampleBefore: "« Compare deux outils »",
    exampleAfter:
      "Compare [outil A] vs [outil B] pour [persona]. Tableau : prix, forces, limites, cas d'usage. Conclusion 3 phrases. Français, factuel, signale les hypothèses si données manquantes.",
    relatedArticleSlugs: ["chatgpt-vs-claude-prompts", "comment-ecrire-prompt-chatgpt"],
  },
  {
    slug: "sora",
    aiName: "Sora",
    title: "Prompts Sora : génération vidéo OpenAI",
    description:
      "Créez des prompts vidéo pour Sora avec mouvement, caméra et ambiance cinématographique.",
    keywords: ["prompt Sora", "OpenAI Sora", "vidéo IA prompt"],
    useCases: ["Clips publicitaires", "B-roll cinématique", "Concepts créatifs", "Storyboards animés"],
    tips: [
      "Décrivez l'action et le mouvement caméra",
      "Précisez durée et rythme souhaités",
      "Une scène claire par prompt",
    ],
    exampleBefore: "« Une vidéo de plage »",
    exampleAfter:
      "Cinematic 4s, slow aerial tracking shot over empty beach at golden hour, gentle waves, film grain, calm mood, no people, documentary style.",
    relatedArticleSlugs: ["prompts-video-sora-runway", "midjourney-vs-dalle-prompts"],
  },
];
