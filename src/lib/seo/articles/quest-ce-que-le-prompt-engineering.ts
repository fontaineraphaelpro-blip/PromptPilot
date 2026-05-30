import type { SeoArticle } from "../types";
import { estimateReadingTime } from "./utils";

const blocks: SeoArticle["blocks"] = [
  {
    type: "p",
    text: "Vous tapez « prompt engineering c'est quoi » ou « ingénierie de prompt » sur Google parce que tout le monde en parle — LinkedIn, formations, offres d'emploi — mais la définition reste floue. Est-ce un métier ? Une compétence ? De la rédaction ? En 2026, le prompt engineering est devenu une discipline à part entière : l'art et la méthode de formuler des instructions précises pour guider une intelligence artificielle vers un résultat utile, reproductible et de qualité professionnelle.",
  },
  {
    type: "p",
    text: "Contrairement à une idée reçue, il ne s'agit pas de trouver des « mots magiques » cachés sur Reddit. C'est de la communication structurée avec un modèle statistique qui ne devine pas toujours votre intention. Un prompt engineer pense en termes de rôle, contexte, tâche, contraintes, format de sortie et critères de validation — exactement comme un chef de projet rédige un brief pour une équipe.",
  },
  { type: "h2", text: "Définition : qu'est-ce que le prompt engineering ?" },
  {
    type: "p",
    text: "Le prompt engineering (ingénierie de prompt en français) consiste à concevoir, tester et optimiser les instructions envoyées à un modèle d'IA générative — texte, image, code, vidéo, audio — pour obtenir la meilleure sortie possible avec le minimum d'itérations. Le terme vient de l'anglais « prompt » (instruction, sollicitation) et « engineering » (conception systématique, pas improvisation).",
  },
  {
    type: "p",
    text: "En pratique, cela inclut : choisir la structure du prompt, calibrer le niveau de détail, définir des exemples (few-shot), chaîner plusieurs étapes (prompt chaining), gérer le contexte long, et documenter ce qui fonctionne pour une équipe. C'est une compétence transversale : marketing, développement, design, support client, recherche, juridique.",
  },
  {
    type: "blockquote",
    text: "Le prompt engineering ne demande pas d'être développeur — il demande d'être clair sur ce que vous voulez obtenir et pourquoi.",
  },
  { type: "h2", text: "Pourquoi l'ingénierie de prompt est-elle devenue indispensable ?" },
  {
    type: "p",
    text: "Les modèles comme GPT-4o, Claude Opus, Gemini ou Llama répondent différemment selon le contexte, le ton, les contraintes et le format attendu. Un prompt vague (« aide-moi avec mon marketing ») produit une réponse générique utilisable à 20 %. Un prompt expert réduit les allers-retours, améliore la cohérence entre collaborateurs et fait gagner des heures sur le développement, la rédaction ou la création visuelle.",
  },
  {
    type: "ul",
    items: [
      "Réduire les itérations frustrantes (« non, refais autrement »)",
      "Obtenir des sorties structurées : JSON, tableaux, étapes numérotées, code typé",
      "Adapter le style à chaque outil : Cursor ≠ Midjourney ≠ ChatGPT web",
      "Documenter un process reproductible pour scaler en équipe",
      "Limiter les hallucinations en forçant l'IA à demander des clarifications",
      "Mesurer la qualité : temps gagné, taux de réutilisation, satisfaction métier",
    ],
  },
  { type: "h2", text: "Prompt engineering vs simple question : quelle différence ?" },
  {
    type: "p",
    text: "Poser une question (« Comment créer une application mobile ? ») laisse l'IA combler les trous avec des généralités. Le prompt engineering explicite les hypothèses : stack technique, public cible, fonctionnalités MVP, budget implicite, contraintes légales, ordre des étapes. C'est la différence entre un tutoriel Wikipedia et un plan d'exécution exploitable lundi matin.",
  },
  {
    type: "h3",
    text: "Exemple concret : même besoin, deux approches",
  },
  {
    type: "p",
    text: "Question simple : « Écris une page d'accueil pour mon SaaS. » Résultat typique : texte creux, superlatifs, aucune différenciation. Prompt engineering : « Tu es copywriter B2B SaaS. Public : fondateurs PME 10-50 salariés. Produit : générateur de prompts IA freemium. Objectif : conversion essai gratuit. Structure : hero problème/solution, 3 bénéfices chiffrés si possible, preuve sociale placeholder, FAQ 4 objections, CTA. Ton pro accessible, français, 800 mots max, pas de buzzwords vides. »",
  },
  { type: "h2", text: "Les 4 piliers d'un bon prompt (base de l'ingénierie)" },
  {
    type: "ol",
    items: [
      "Rôle et persona — Qui est l'IA ? Quelle expertise simule-t-elle ? (architecte Next.js, juriste, coach SEO…)",
      "Contexte — Pour qui travaille-t-elle ? Quelles données a-t-elle ? Quel est l'objectif business ou technique ?",
      "Tâche précise — Une action mesurable avec un livrable identifiable, pas « aide-moi »",
      "Contraintes et critères — Format, longueur, langue, interdits, niveau de détail, definition of done",
    ],
  },
  {
    type: "p",
    text: "Ces quatre piliers forment le framework R-C-T-C détaillé dans notre guide dédié. PromptPilot les applique automatiquement quand vous décrivez votre idée en une phrase — vous obtenez un socle expert à affiner.",
  },
  { type: "h2", text: "Compétences d'un prompt engineer en 2026" },
  {
    type: "h3",
    text: "Pensée systémique",
  },
  {
    type: "p",
    text: "Savoir découper un projet complexe en séquence de prompts : plan → validation → exécution → revue. Un seul prompt monolithique de 3 000 mots fatigue le modèle ; cinq prompts ciblés produisent souvent un meilleur résultat global.",
  },
  {
    type: "h3",
    text: "Connaissance des modèles",
  },
  {
    type: "p",
    text: "ChatGPT, Claude, Gemini, Mistral, Midjourney, DALL·E, Sora, Runway, Cursor — chacun a des forces, des limites et une « personnalité » de réponse. Copier-coller le même prompt partout sans adaptation est une erreur classique.",
  },
  {
    type: "h3",
    text: "Itération et mesure",
  },
  {
    type: "p",
    text: "Le prompt engineering est empirique : on teste, on compare, on documente. Gardez une bibliothèque de prompts validés par cas d'usage (email cold outreach, refactor React, illustration produit…) et notez ce qui a changé entre la version 1 et la version 5.",
  },
  {
    type: "h3",
    text: "Éthique et garde-fous",
  },
  {
    type: "p",
    text: "Prévoir les cas limites : données sensibles, biais, contenu interdit, vérification des faits. Un bon prompteur inclut « si une information manque, pose une question avant d'inventer » et « signale ton niveau de confiance sur les affirmations factuelles ».",
  },
  { type: "h2", text: "Techniques avancées de prompt engineering" },
  {
    type: "h3",
    text: "Zero-shot vs few-shot",
  },
  {
    type: "p",
    text: "Zero-shot : le modèle exécute sans exemple. Few-shot : vous fournissez 1 à 3 exemples entrée/sortie pour calibrer le format et le ton. Few-shot est indispensable pour des sorties très spécifiques (JSON custom, style éditorial de marque, templates internes).",
  },
  {
    type: "h3",
    text: "Chain-of-thought (raisonnement étape par étape)",
  },
  {
    type: "p",
    text: "Demandez « réfléchis étape par étape avant de conclure » pour les problèmes logiques, mathématiques ou d'analyse. Utile en debug code, stratégie pricing, diagnostic support client.",
  },
  {
    type: "h3",
    text: "Prompt chaining et agents",
  },
  {
    type: "p",
    text: "Enchaîner plusieurs prompts où la sortie de l'un alimente l'autre : recherche → synthèse → rédaction → relecture SEO. Les workflows agentiques (Cursor Composer, Custom GPTs, APIs) industrialisent cette chaîne.",
  },
  {
    type: "h3",
    text: "System prompt vs user prompt",
  },
  {
    type: "p",
    text: "En API ou outils pro, le system prompt fixe le comportement permanent (rôle, règles, ton). Le user prompt porte la tâche du moment. Séparer les deux améliore la maintenabilité en équipe.",
  },
  { type: "h2", text: "Prompt engineering par domaine" },
  {
    type: "h3",
    text: "Développement et code (Cursor, Copilot)",
  },
  {
    type: "p",
    text: "Mentionnez stack, fichiers concernés, conventions du repo, périmètre du changement, tests attendus. Voir notre guide prompts Cursor pour développeurs.",
  },
  {
    type: "h3",
    text: "Marketing et copywriting",
  },
  {
    type: "p",
    text: "Incluez persona, objection principale, preuve sociale, canal, contraintes caractères. Le guide prompts marketing détaille landing pages, emails et ads.",
  },
  {
    type: "h3",
    text: "Image et vidéo (Midjourney, DALL·E, Sora, Runway)",
  },
  {
    type: "p",
    text: "Pensez visuel : sujet, lumière, caméra, style, mouvement. Les prompts image ne se traitent pas comme du texte business.",
  },
  { type: "h2", text: "Erreurs fréquentes en ingénierie de prompt" },
  {
    type: "ul",
    items: [
      "Croire qu'un prompt viral fonctionne pour tous les cas",
      "Négliger la langue et le registre (tu/vous, français/anglais)",
      "Demander tout en une fois sans priorisation",
      "Oublier le format de sortie explicite",
      "Abandonner après la première réponse au lieu d'itérer",
      "Supposer que l'IA connaît votre contexte interne sans le fournir",
    ],
  },
  {
    type: "p",
    text: "Notre article sur les 10 erreurs de prompt IA développe chaque piège avec correctifs concrets.",
  },
  {
    type: "tip",
    title: "Astuce PromptPilot",
    text: "Décrivez votre idée en une phrase ; l'outil assemble automatiquement rôle, contexte, contraintes et variantes court / détaillé / expert adaptées à l'IA cible (ChatGPT, Cursor, Midjourney…).",
  },
  { type: "h2", text: "Questions fréquentes (People Also Ask)" },
  { type: "h3", text: "Le prompt engineering est-il un métier ?" },
  {
    type: "p",
    text: "Oui, de plus en plus. Des postes « AI Prompt Engineer », « LLM Specialist » ou « AI Workflow Designer » apparaissent en entreprise. Souvent c'est aussi une compétence transversale ajoutée aux rôles marketing, produit, dev ou design.",
  },
  { type: "h3", text: "Faut-il savoir coder pour faire du prompt engineering ?" },
  {
    type: "p",
    text: "Non pour le texte, le marketing ou la création visuelle. Oui partiellement pour le code, les APIs et l'automatisation — mais Cursor et les no-code tools abaissent la barrière. La clé reste la clarté d'intention.",
  },
  { type: "h3", text: "Prompt engineering vs fine-tuning : quelle différence ?" },
  {
    type: "p",
    text: "Le prompt engineering modifie l'entrée (instruction) sans toucher au modèle. Le fine-tuning réentraîne le modèle sur vos données. En 2026, 90 % des cas métier se résolvent par de bons prompts + RAG (documents injectés), pas par du fine-tuning coûteux.",
  },
  { type: "h3", text: "Combien de temps pour apprendre le prompt engineering ?" },
  {
    type: "p",
    text: "Les bases (R-C-T-C, format, itération) : quelques heures de pratique ciblée. La maîtrise par domaine (code, image, vidéo) : semaines à mois selon volume. Commencez par un cas réel de votre travail, pas par des tutoriels abstraits.",
  },
  { type: "h3", text: "L'ingénierie de prompt va-t-elle disparaître avec des IA plus intelligentes ?" },
  {
    type: "p",
    text: "Les modèles s'améliorent mais le besoin de précision métier reste. La forme évolue (agents, interfaces vocales, prompts implicites) ; la compétence de cadrer une intention claire reste centrale.",
  },
  { type: "h2", text: "Par où commencer ?" },
  {
    type: "p",
    text: "Si vous débutez : lisez « C'est quoi un prompt IA », puis appliquez le framework R-C-T-C sur un cas concret. Si vous utilisez ChatGPT au quotidien : suivez le guide « Comment écrire un prompt ChatGPT » et « Comment utiliser ChatGPT efficacement ». Pour comparer les modèles : ChatGPT vs Claude.",
  },
  {
    type: "p",
    text: "Le prompt engineering n'est pas une mode — c'est la couche de communication entre l'intention humaine et la capacité machine. Maîtrisez-la en 2026, et vous multipliez l'impact de chaque outil IA que vous touchez.",
  },
  { type: "h2", text: "Ressources pour approfondir l'ingénierie de prompt" },
  {
    type: "p",
    text: "Construisez une progression sur trois semaines : semaine 1, maîtrisez R-C-T-C sur tâches texte simples (emails, résumés). Semaine 2, spécialisez par outil (Cursor pour code, Midjourney pour visuels). Semaine 3, documentez dix prompts gold standard pour votre métier et partagez-les en équipe. Cette cadence bat un marathon de tutoriels sans pratique.",
  },
  {
    type: "ul",
    items: [
      "Guide R-C-T-C pour le template reproductible",
      "Article 10 erreurs pour éviter les pièges courants",
      "Exemples prompts gratuits comme base de bibliothèque",
      "PromptPilot pour accélérer le socle pendant l'apprentissage",
    ],
  },
];

export const articleQuestCeQuePromptEngineering: SeoArticle = {
  slug: "quest-ce-que-le-prompt-engineering",
  title: "Qu'est-ce que le prompt engineering ? Guide complet 2026",
  description:
    "Prompt engineering c'est quoi ? Définition de l'ingénierie de prompt, techniques, compétences, FAQ et bonnes pratiques pour ChatGPT, Claude, Cursor et les IA génératives.",
  category: "guide",
  publishedAt: "2026-01-15",
  updatedAt: "2026-05-30",
  readingTimeMin: estimateReadingTime(blocks),
  keywords: [
    "prompt engineering c'est quoi",
    "ingénierie de prompt",
    "prompt engineering",
    "IA générative",
    "bonnes pratiques prompt",
  ],
  relatedSlugs: [
    "structure-prompt-expert-framework",
    "comment-ecrire-prompt-chatgpt",
    "quest-ce-quun-prompt-ia",
    "10-erreurs-prompt-ia",
  ],
  blocks,
};
