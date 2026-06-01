import type { SeoArticle } from "../types";
import { estimateReadingTime } from "./utils";

const blocks: SeoArticle["blocks"] = [
  {
    type: "p",
    text: "« Comment écrire un prompt ChatGPT » est l'une des recherches les plus fréquentes en France en 2026 — devant vous, des millions d'utilisateurs qui obtiennent des réponses moyennes avec des instructions d'une ligne. ChatGPT (GPT-4o, o3, GPT-4.1 selon abonnement) excelle quand le prompt définit le rôle, le contexte métier, le format de sortie et les limites. Sans cela, le modèle tend à produire des réponses équilibrées, polies, et peu actionnables.",
  },
  {
    type: "p",
    text: "Ce guide pas à pas s'appuie sur le framework R-C-T-C et des centaines de retours utilisateurs PromptExpert. Vous y trouverez une méthode en 5 étapes, des modèles copiables, des erreurs à éviter, et une FAQ style People Also Ask pour aller plus loin.",
  },
  { type: "h2", text: "Pourquoi vos prompts ChatGPT échouent (souvent)" },
  {
    type: "p",
    text: "ChatGPT n'est pas « mauvais » — il est under-specified. Vous lui demandez d'écrire « un article sur l'IA » sans préciser public, longueur, angle, sources, ton, structure SEO. Le modèle remplit les blancs avec des généralités. C'est sa fonction statistique : prédire la suite la plus probable, pas lire dans vos pensées.",
  },
  {
    type: "ul",
    items: [
      "Prompt trop court sans contexte métier",
      "Plusieurs tâches mélangées dans une seule requête",
      "Format de sortie implicite au lieu d'explicite",
      "Langue ou registre (tu/vous) non défini",
      "Aucun critère pour dire si la réponse est réussie",
      "Attente d'expertise domaine sans fournir de données",
    ],
  },
  {
    type: "blockquote",
    text: "ChatGPT récompense la clarté, pas la créativité de formulation. Un brief ennuyeux bat une question poétique vague.",
  },
  { type: "h2", text: "Méthode en 5 étapes pour écrire un prompt ChatGPT" },
  { type: "h3", text: "Étape 1 — Ancrer le rôle (R du R-C-T-C)" },
  {
    type: "p",
    text: "Commencez par : « Tu es [expert X] avec [expérience / domaine]. Ta mission : [résultat concret]. » Le rôle calibre vocabulaire, prudence et profondeur. Exemple : « Tu es un copywriter B2B SaaS spécialisé pages de conversion. Ta mission : rédiger une page d'accueil pour un outil de prompts IA. »",
  },
  {
    type: "p",
    text: "Évitez les rôles génériques (« expert ») ou multiples (« tu es tout à la fois »). Un rôle, une expertise dominante.",
  },
  { type: "h3", text: "Étape 2 — Donner le contexte minimal viable (C)" },
  {
    type: "ul",
    items: [
      "Public cible : débutant, CTO, créatif, étudiant…",
      "Objectif business : conversion, éducation, support, documentation interne",
      "Données fournies : features produit, pricing, différenciation, contraintes légales",
      "Ce qu'il faut éviter : jargon, promesses irréalistes, données inventées",
      "Contexte temporel si pertinent : campagne Q2 2026, réglementation en vigueur",
    ],
  },
  {
    type: "p",
    text: "Plus le contexte est concret, moins ChatGPT hallucine pour combler les trous. Collez les infos brutes en fin de prompt si nécessaire.",
  },
  { type: "h3", text: "Étape 3 — Définir la tâche avec un livrable (T)" },
  {
    type: "p",
    text: "Verbe d'action + output identifiable : « Rédige », « Produit un plan en 5 étapes », « Génère 3 variantes », « Analyse et recommande ». Une tâche principale par message. Pour un projet complexe, découpez en conversation multi-tours.",
  },
  { type: "h3", text: "Étape 4 — Exiger un format explicite (C contraintes)" },
  {
    type: "p",
    text: "ChatGPT suit mieux les contraintes de forme que les contraintes floues de style. Demandez explicitement : titres H1/H2/H3, tableaux markdown, listes numérotées, JSON avec schema, « réponds en 3 paragraphes max », « code only sans explication ».",
  },
  {
    type: "ul",
    items: [
      "Longueur : mots, caractères, nombre de sections",
      "Langue : français, anglais technique, bilingue",
      "Ton : pro, accessible, punchy, académique",
      "Structure imposée : PAS, AIDA, pyramide inversée",
    ],
  },
  { type: "h3", text: "Étape 5 — Itérer avec des prompts de suivi" },
  {
    type: "p",
    text: "La première réponse est un brouillon, pas un verdict. Prompts de suivi efficaces : « Raccourcis de 20 % en gardant les 3 arguments clés », « Ajoute une section FAQ objections », « Réécris le hook en question directe », « Convertis en JSON selon ce schema ».",
  },
  { type: "h2", text: "Modèles de prompts ChatGPT par cas d'usage" },
  { type: "h3", text: "Rédaction web et SEO" },
  {
    type: "p",
    text: "Tu es rédacteur SEO senior francophone. Contexte : mot-clé principal, public persona, intention recherche info ou commercial. Tâche : article 1500 mots, structure H2/H3, intro hook, conclusion CTA. Contraintes : français, pas de keyword stuffing, E-E-A-T, meta title 60 car. et meta description 155 car. en fin de réponse.",
  },
  { type: "h3", text: "Email marketing" },
  {
    type: "p",
    text: "Tu es email marketer B2B. Contexte : produit, séquence onboarding J+1. Tâche : email 120 mots max. Contraintes : objet 45 car. max, préheader, 1 CTA, ton pro chaleureux, pas de cher client, français vouvoiement.",
  },
  { type: "h3", text: "Code et scripts" },
  {
    type: "p",
    text: "Tu es dev senior. Contexte : stack, contraintes. Tâche : fonction qui remplit un besoin précis. Contraintes : code commenté minimal, gestion erreurs, pas de lib non standard, explique complexité si pertinent.",
  },
  { type: "h3", text: "Analyse et synthèse" },
  {
    type: "p",
    text: "Tu es analyste stratégie. Contexte : colle texte ou résumé. Tâche : SWOT en tableau markdown plus 3 recommandations priorisées. Contraintes : cite uniquement le texte fourni, signale les lacunes d'information.",
  },
  { type: "h2", text: "Chaînage multi-tours : projets complexes" },
  {
    type: "p",
    text: "Un seul prompt monolithique de 2000 mots fatigue le modèle. Pour une landing complète, enchaînez : plan de sections, rédaction hero, FAQ objections, relecture cohérence ton et CTA.",
  },
  {
    type: "tip",
    title: "Exemple avant / après",
    text: "Avant : Écris un post LinkedIn sur l'IA. Après : Rédige un post LinkedIn 150 mots, ton pro accessible, hook question, 3 bullet points actionnables, CTA essai gratuit, public fondateurs PME, sans buzzwords, français.",
  },
  { type: "h2", text: "Custom GPTs et instructions persistantes" },
  {
    type: "p",
    text: "Si vous répétez le même type de tâche, créez un Custom GPT avec instructions system. Vos prompts utilisateur deviennent plus courts car le socle est préchargé.",
  },
  { type: "h2", text: "Erreurs fréquentes spécifiques à ChatGPT" },
  {
    type: "ol",
    items: [
      "Demander le meilleur sans critères mesurables",
      "Oublier de dire ne pas inventer de statistiques",
      "Ne pas préciser si sources ou URLs sont requises",
      "Utiliser le chat sans mémoire projet pour du travail long",
      "Copier un prompt viral anglais sans traduire le contexte métier",
      "Abandonner après v1 au lieu d'itérer 2-3 tours",
    ],
  },
  { type: "h2", text: "Questions fréquentes (People Also Ask)" },
  { type: "h3", text: "Comment écrire un prompt ChatGPT en français ?" },
  {
    type: "p",
    text: "Rédigez intégralement en français si le livrable est francophone. Précisez réponds en français même si le modèle détecte souvent la langue.",
  },
  { type: "h3", text: "Quelle longueur idéale pour un prompt ChatGPT ?" },
  {
    type: "p",
    text: "100 à 400 mots pour la plupart des tâches. Au-delà, structurez en sections ou scindez.",
  },
  { type: "h3", text: "Faut-il dire réfléchis étape par étape ?" },
  {
    type: "p",
    text: "Oui pour logique, code, stratégie. Prends ton temps seul a peu d'effet technique.",
  },
  { type: "h3", text: "ChatGPT invente des faits : comment limiter ?" },
  {
    type: "p",
    text: "Utilise uniquement les informations fournies. Si une donnée manque, indique À COMPLÉTER plutôt que d'inventer.",
  },
  { type: "h2", text: "Modèles avancés ChatGPT : o3 et raisonnement" },
  {
    type: "p",
    text: "Les modèles à raisonnement (o3, o4-mini selon disponibilité) excellent sur logique, code et maths. Prompts parfois plus courts : énoncé clair + contraintes + « montre ton raisonnement » suffit. Évitez surcharges R-C-T-C inutiles qui diluent la tâche logique pure.",
  },
  { type: "h2", text: "Prompts ChatGPT pour la recherche web" },
  {
    type: "p",
    text: "Activez Search quand les faits doivent être récents (prix, lois, actualité produit). Structure : « Recherche [sujet], synthétise en tableau date/fait/source URL, distingue faits et interprétation, signale si sources contradictoires. » Réduit hallucinations temporelles.",
  },
  { type: "h2", text: "Bibliothèque de prompts ChatGPT à construire" },
  {
    type: "ul",
    items: [
      "Catégorie rédaction : post social, email, landing section",
      "Catégorie analyse : SWOT, résumé doc, comparaison concurrents",
      "Catégorie ops : CR réunion, procédure interne, checklist",
      "Catégorie code léger : regex, SQL, script Python one-shot",
      "Versionner chaque prompt avec date et modèle testé (GPT-4o vs o3)",
    ],
  },
  { type: "h2", text: "Aller plus loin" },
  {
    type: "p",
    text: "Maîtrisez le framework R-C-T-C, puis lisez Comment utiliser ChatGPT efficacement et ChatGPT ne comprend pas : comment formuler. PromptExpert génère des prompts ChatGPT structurés à partir d'une phrase.",
  },
  { type: "h2", text: "Cas métier : prompts ChatGPT détaillés" },
  { type: "h3", text: "Customer Success — playbook churn" },
  {
    type: "p",
    text: "Tu es CSM SaaS B2B. Contexte : client usage -40% sur 30 jours, segment SMB, produit analytics. Tâche : email win-back 180 mots + script call 5 bullet points. Contraintes : empathie sans culpabiliser, CTA call 15 min, pas discount non autorisé, vouvoiement.",
  },
  { type: "h3", text: "Product — user story sprint" },
  {
    type: "p",
    text: "Tu es PO agile. Contexte : epic notifications push app mobile fitness. Tâche : 5 user stories format En tant que / Je veux / Afin que + critères acceptance Given-When-Then. Contraintes : INVEST, pas solution technique, markdown tableau.",
  },
  { type: "h3", text: "Formation — quiz évaluation" },
  {
    type: "p",
    text: "Tu es formateur [sujet]. Contexte : module [X] niveau intermédiaire. Tâche : 10 QCM + 2 questions ouvertes + corrigé. Contraintes : 1 bonne réponse par QCM, distracteurs plausibles, pas ambiguïté, français.",
  },
  { type: "h2", text: "Annexe : prompts ChatGPT par intention recherche" },
  {
    type: "p",
    text: "Les requêtes Google implicites guident structure prompt. Intent informationnelle (« qu'est-ce que ») : réponse pédagogique structurée FAQ, pas pitch produit. Intent transactionnelle (« acheter », « comparatif ») : tableaux critères, CTA, objections prix. Intent navigationnelle (marque) : ton aligné charte, facts produit fournis. Intent locale (« près de moi », « France ») : ancrage géo, réglementation locale, exemples FR.",
  },
  {
    type: "p",
    text: "Intent commerciale investigation (« meilleur outil X 2026 ») : comparatif honnête critères pondérés, pas liste affiliate générique. Caler prompt sur intent = alignement SEO + satisfaction lecteur + moins edits post-gen.",
  },
  { type: "h2", text: "Synthèse : maîtriser l'écriture de prompts ChatGPT" },
  {
    type: "p",
    text: "Écrire un bon prompt ChatGPT en 2026 repose sur une discipline repeatable : rôle explicite, contexte métier dense, tâche unique mesurable, contraintes format et langue, itération systématique. Les modèles évoluent ; cette structure reste stable. Investissez une heure par semaine à documenter vos prompts gagnants — capital composé sur des mois. Combinez ce guide avec comment utiliser ChatGPT efficacement pour l'organisation, et exemples prompts gratuits comme base bibliothèque. PromptExpert accélère les étapes 1-4 si vous partez d'une idée brute. Partagez vos templates équipe pour aligner qualité.",
  },
];

export const articleCommentEcrireChatgpt: SeoArticle = {
  slug: "comment-ecrire-prompt-chatgpt",
  title: "Comment écrire un prompt ChatGPT : méthode pas à pas 2026",
  description:
    "Comment écrire un prompt ChatGPT efficace ? Méthode 5 étapes, modèles copiables, exemples business/code/SEO et FAQ pour de meilleures réponses.",
  category: "guide",
  publishedAt: "2026-02-01",
  updatedAt: "2026-05-30",
  readingTimeMin: estimateReadingTime(blocks),
  keywords: [
    "comment écrire un prompt chatgpt",
    "prompt ChatGPT",
    "ChatGPT français",
    "GPT-4 prompt",
    "instructions ChatGPT",
  ],
  relatedSlugs: [
    "comment-utiliser-chatgpt-efficacement",
    "chatgpt-mauvaise-reponse-comment-formuler",
    "chatgpt-vs-claude-prompts",
    "structure-prompt-expert-framework",
    "exemples-prompts-ia-gratuits",
  ],
  blocks,
};
