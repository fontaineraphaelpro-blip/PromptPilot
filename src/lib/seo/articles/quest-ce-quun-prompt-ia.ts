import type { SeoArticle } from "../types";
import { estimateReadingTime } from "./utils";

const blocks: SeoArticle["blocks"] = [
  {
    type: "p",
    text: "Si vous tapez « c'est quoi un prompt IA » ou « qu'est-ce qu'un prompt ChatGPT » sur Google, vous cherchez probablement la définition simple — et surtout comment l'utiliser concrètement. Un prompt n'est pas une « commande magique » : c'est l'instruction que vous donnez à une intelligence artificielle pour obtenir une réponse, un texte, une image, du code ou une vidéo.",
  },
  { type: "h2", text: "Définition : qu'est-ce qu'un prompt ?" },
  {
    type: "p",
    text: "Un prompt (de l'anglais « to prompt », solliciter) est le texte d'entrée envoyé à un modèle d'IA générative. Exemples : une question posée à ChatGPT, une description d'image pour Midjourney, une consigne de développement dans Cursor. Plus le prompt est précis, plus la sortie est utile.",
  },
  {
    type: "ul",
    items: [
      "Prompt texte → ChatGPT, Claude, Gemini, Copilot",
      "Prompt image → Midjourney, DALL·E, Leonardo, Ideogram",
      "Prompt vidéo → Sora, Runway, Veo, Pika",
      "Prompt code → Cursor, GitHub Copilot, Replit Agent, Bolt",
    ],
  },
  { type: "h2", text: "Prompt vs message : quelle différence ?" },
  {
    type: "p",
    text: "Beaucoup de gens confondent « poser une question » et « écrire un prompt ». Une question courte (« comment créer un site ? ») laisse l'IA combler les blancs avec des généralités. Un prompt structuré précise le rôle, le contexte, la tâche, le format et les limites — vous obtenez un livrable actionnable.",
  },
  {
    type: "blockquote",
    text: "Question = curiosité. Prompt = brief professionnel.",
  },
  { type: "h2", text: "Pourquoi les prompts sont-ils si importants en 2026 ?" },
  {
    type: "p",
    text: "Les modèles sont puissants mais non télépathes. Deux utilisateurs avec la même idée obtiennent des résultats opposés selon la qualité du prompt. En entreprise, un mauvais prompt = perte de temps, hallucinations, code non maintenable. Un bon prompt = productivité mesurable (réduction des allers-retours, cohérence d'équipe).",
  },
  { type: "h2", text: "Anatomie d'un prompt minimal qui fonctionne" },
  {
    type: "ol",
    items: [
      "Qui est l'IA ? (rôle : expert marketing, dev senior…)",
      "Pour qui / dans quel contexte ? (startup B2B, étudiant, agence…)",
      "Que doit-elle produire ? (email, plan, composant React…)",
      "Sous quelles règles ? (langue, longueur, ton, interdits)",
      "Comment savoir si c'est réussi ? (critères, format de sortie)",
    ],
  },
  { type: "h2", text: "Exemple avant / après (recherche Google typique)" },
  { type: "h3", text: "Avant — prompt faible" },
  {
    type: "p",
    text: "« Écris un post LinkedIn sur l'intelligence artificielle. »",
  },
  { type: "h3", text: "Après — prompt utilisable" },
  {
    type: "p",
    text: "« Tu es copywriter B2B. Rédige un post LinkedIn 180 mots pour fondateurs PME sur l'usage de prompts IA en marketing. Hook question, 3 conseils actionnables, CTA essai gratuit, ton pro sans jargon, français. »",
  },
  { type: "h2", text: "Questions fréquentes (People Also Ask)" },
  { type: "h3", text: "Un prompt est-il gratuit ?" },
  {
    type: "p",
    text: "Écrire un prompt est gratuit. L'exécution peut coûter selon l'outil (abonnement ChatGPT, crédits Midjourney, API OpenAI). Des générateurs comme PromptExpert structurent vos prompts gratuitement (quota journalier) avant de les coller dans l'IA de votre choix.",
  },
  { type: "h3", text: "Quelle longueur pour un prompt ?" },
  {
    type: "p",
    text: "Pas de règle universelle : 50 à 400 mots selon la complexité. Mieux vaut un prompt structuré en sections qu'un pavé désorganisé. Pour le code, privilégiez plusieurs prompts courts plutôt qu'un seul monstre.",
  },
  { type: "h3", text: "Faut-il écrire en anglais ?" },
  {
    type: "p",
    text: "Les modèles majeurs comprennent très bien le français en 2026. Pour Midjourney, l'anglais reste souvent plus stable pour les descriptifs visuels — vous pouvez bilinguiser : idée en français, descriptif technique en anglais.",
  },
  {
    type: "tip",
    title: "Gagner du temps",
    text: "Décrivez votre idée en une phrase sur PromptExpert : l'outil génère un prompt expert adapté à ChatGPT, Cursor, Midjourney, etc., avec variantes court / détaillé / expert.",
  },
  { type: "h2", text: "Prochaine étape" },
  {
    type: "p",
    text: "Maintenant que vous savez ce qu'est un prompt, passez au guide « Comment faire un bon prompt IA » ou au framework R-C-T-C pour structurer chaque demande sans repartir de zéro.",
  },
];

export const articleQuestCeQuunPrompt: SeoArticle = {
  slug: "quest-ce-quun-prompt-ia",
  title: "C'est quoi un prompt IA ? Définition simple et exemples",
  description:
    "Qu'est-ce qu'un prompt ChatGPT ou Midjourney ? Définition, différence avec une question, exemples concrets et FAQ pour débutants.",
  category: "guide",
  publishedAt: "2026-05-01",
  updatedAt: "2026-05-30",
  readingTimeMin: estimateReadingTime(blocks),
  keywords: [
    "c'est quoi un prompt",
    "qu'est-ce qu'un prompt IA",
    "prompt ChatGPT définition",
    "prompt intelligence artificielle",
  ],
  relatedSlugs: [
    "comment-faire-un-bon-prompt-ia",
    "quest-ce-que-le-prompt-engineering",
    "comment-ecrire-prompt-chatgpt",
  ],
  blocks,
};
