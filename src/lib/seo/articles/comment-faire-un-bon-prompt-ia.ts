import type { SeoArticle } from "../types";
import { estimateReadingTime } from "./utils";

const blocks: SeoArticle["blocks"] = [
  {
    type: "p",
    text: "« Comment faire un bon prompt ? » est l'une des recherches les plus fréquentes autour de ChatGPT et des IA génératives. La réponse courte : donnez un brief clair, pas une phrase vague. La réponse complète — ci-dessous — vous donne une méthode reproductible, des exemples par type d'IA et une checklist avant chaque envoi.",
  },
  { type: "h2", text: "Les 5 questions à se poser avant d'écrire" },
  {
    type: "ol",
    items: [
      "Quel résultat concret je veux à la fin ? (email, code, image, plan…)",
      "Pour quelle IA ? (ChatGPT ≠ Midjourney ≠ Cursor)",
      "Qui est la cible ou l'utilisateur final du livrable ?",
      "Quelles infos l'IA ne peut pas deviner ? (stack, prix, ton de marque…)",
      "Comment je jugerai si la réponse est bonne ? (format, longueur, critères)",
    ],
  },
  { type: "h2", text: "Méthode en 6 étapes (débutant → avancé)" },
  { type: "h3", text: "1. Choisir le bon outil" },
  {
    type: "p",
    text: "Un prompt parfait pour ChatGPT peut échouer sur Midjourney. Texte → ChatGPT/Claude. Code → Cursor. Image → Midjourney/DALL·E. Vidéo → Runway/Sora. Commencez par l'outil, adaptez le langage.",
  },
  { type: "h3", text: "2. Assigner un rôle à l'IA" },
  {
    type: "p",
    text: "« Tu es [expert] avec [expérience/domaine]. » Cela cadre le niveau de détail, le vocabulaire et le type de solutions proposées.",
  },
  { type: "h3", text: "3. Décrire le contexte en 3–5 lignes" },
  {
    type: "ul",
    items: [
      "Situation actuelle (ce qui existe déjà)",
      "Objectif business ou personnel",
      "Contraintes connues (budget, délai, stack)",
      "Public du livrable",
    ],
  },
  { type: "h3", text: "4. Formuler une tâche unique et mesurable" },
  {
    type: "p",
    text: "Évitez « aide-moi avec mon projet ». Préférez « Produis un plan en 7 étapes pour lancer un MVP SaaS en 4 semaines » ou « Rédige 3 variantes d'objet email pour relance panier abandonné ».",
  },
  { type: "h3", text: "5. Imposer format et contraintes" },
  {
    type: "ul",
    items: [
      "Format : markdown, JSON, tableau, liste numérotée",
      "Langue et registre (français, tutoiement, sans emoji)",
      "Longueur max (mots, caractères, sections)",
      "Interdits (pas de hallucination produit, pas de lib externe…)",
    ],
  },
  { type: "h3", text: "6. Itérer avec des prompts de suivi" },
  {
    type: "p",
    text: "Premier prompt = plan ou brouillon. Deuxième = approfondir la section B. Troisième = critique et amélioration. Cette chaîne bat un seul prompt de 3 000 mots.",
  },
  { type: "h2", text: "Modèle de prompt copiable (toutes IA texte)" },
  {
    type: "p",
    text: "Tu es [RÔLE].\n\nContexte : [SITUATION + PUBLIC + OBJECTIF]\n\nTâche : [ACTION + LIVRABLE]\n\nContraintes : [LANGUE, TON, FORMAT, LONGUEUR, INTERDITS]\n\nSi une information manque, pose-moi jusqu'à 3 questions avant d'exécuter.\n\nCritères de qualité : [COMMENT JUGER LE RÉSULTAT]",
  },
  { type: "h2", text: "Bon prompt IA : exemples par cas Google" },
  { type: "h3", text: "Prompt pour rédiger un email professionnel" },
  {
    type: "p",
    text: "« Tu es assistant communication B2B. Rédige un email de relance (max 120 mots) après démo sans réponse. Prospect : directeur marketing SaaS. Ton : courtois, pas pushy. CTA : proposer créneau 20 min. Objet + préheader inclus. Français. »",
  },
  { type: "h3", text: "Prompt pour créer une image produit" },
  {
    type: "p",
    text: "« Product photography of [produit], white background, studio softbox lighting, 85mm lens, commercial catalog, ultra sharp --ar 1:1 --style raw » (Midjourney — descriptif visuel en anglais souvent plus stable).",
  },
  { type: "h3", text: "Prompt pour coder une feature" },
  {
    type: "p",
    text: "« Next.js 14 App Router, TypeScript strict. Ajoute [feature] dans [fichier]. Respecte le pattern des composants existants. Ne modifie pas l'auth. Liste les fichiers à créer, puis code étape par étape. » (Cursor / Copilot).",
  },
  { type: "h2", text: "Erreurs qui empêchent un « bon prompt »" },
  {
    type: "ul",
    items: [
      "Une seule ligne sans contexte",
      "Plusieurs tâches non liées dans le même prompt",
      "Demander « le meilleur » sans critères",
      "Copier un prompt viral sans l'adapter",
      "Abandonner après la première réponse médiocre",
    ],
  },
  { type: "h2", text: "FAQ — recherches associées sur Google" },
  { type: "h3", text: "Comment faire un prompt ChatGPT qui marche ?" },
  {
    type: "p",
    text: "Même méthode : rôle + contexte + tâche + format. ChatGPT réagit bien aux listes numérotées et aux consignes « réponds en sections H2 ». Activez la mémoire / projets si vous travaillez sur un sujet récurrent.",
  },
  { type: "h3", text: "Existe-t-il un générateur de prompts ?" },
  {
    type: "p",
    text: "Oui. PromptExpert transforme une idée en prompt structuré avec variantes, adapté à l'IA cible — utile si vous débutez ou si vous voulez standardiser une équipe.",
  },
  {
    type: "tip",
    title: "Checklist 30 secondes",
    text: "Avant d'envoyer : Rôle ✓ Contexte ✓ Tâche unique ✓ Format ✓ Langue ✓ Critère de succès ✓",
  },
];

export const articleCommentFaireBonPrompt: SeoArticle = {
  slug: "comment-faire-un-bon-prompt-ia",
  title: "Comment faire un bon prompt IA ? Guide complet + exemples",
  description:
    "Méthode pas à pas pour écrire un bon prompt ChatGPT, Claude, Cursor ou Midjourney. Modèle copiable, exemples et FAQ des recherches Google.",
  category: "guide",
  publishedAt: "2026-05-05",
  updatedAt: "2026-05-30",
  readingTimeMin: estimateReadingTime(blocks),
  keywords: [
    "comment faire un bon prompt",
    "bon prompt IA",
    "écrire un prompt ChatGPT",
    "prompt efficace",
    "exemple prompt IA",
  ],
  relatedSlugs: [
    "quest-ce-quun-prompt-ia",
    "structure-prompt-expert-framework",
    "10-erreurs-prompt-ia",
  ],
  blocks,
};
