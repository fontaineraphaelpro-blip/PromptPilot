import type { SeoArticle } from "../types";
import { estimateReadingTime } from "./utils";

const blocks: SeoArticle["blocks"] = [
  {
    type: "p",
    text: "« Comment faire un bon prompt ? » reste l'une des recherches les plus fréquentes autour de ChatGPT et des IA génératives. La réponse courte : donnez un brief clair, pas une phrase vague. La réponse utile — celle ci-dessous — vous donne une méthode reproductible, des exemples par type d'IA, ce qui ne marche pas, et une checklist avant chaque envoi.",
  },
  {
    type: "p",
    text: "Je vois encore trop de gens traiter ChatGPT comme Google avec une phrase de bar. Puis se plaindre que « l'IA c'est nul ». Non : le modèle a fait exactement ce qu'on lui a demandé — combler les trous. Un bon prompt, c'est d'abord du travail de cadrage. Dix minutes de réflexion coûtent moins cher que quarante-cinq minutes d'itérations confuses.",
  },
  { type: "h2", text: "Les 5 questions à se poser avant d'écrire" },
  {
    type: "p",
    text: "Avant même d'ouvrir ChatGPT, Claude ou Midjourney, notez au brouillon (papier ou Notion) les réponses à ces cinq questions. Si vous ne savez pas répondre, votre prompt sera flou — et la sortie aussi.",
  },
  {
    type: "ol",
    items: [
      "Quel résultat concret je veux à la fin ? (email, code, image, plan, script…)",
      "Pour quelle IA ? (ChatGPT ≠ Midjourney ≠ Cursor — le langage change)",
      "Qui est la cible ou l'utilisateur final du livrable ?",
      "Quelles infos l'IA ne peut pas deviner ? (stack, prix, ton de marque, délais…)",
      "Comment je jugerai si la réponse est bonne ? (format, longueur, critères)",
    ],
  },
  {
    type: "p",
    text: "Exemple France : vous voulez un email de relance après devis. Sans le montant, le métier du prospect et l'objection probable (« trop cher » vs « on attend un budget Q4 »), ChatGPT invente un ton commercial américain passablement gênant. Avec ces trois infos, vous avez déjà 70 % du travail.",
  },
  { type: "h2", text: "Méthode en 6 étapes (débutant → avancé)" },
  { type: "h3", text: "1. Choisir le bon outil" },
  {
    type: "p",
    text: "Un prompt parfait pour ChatGPT peut échouer sur Midjourney. Texte long et nuancé → Claude ou ChatGPT. Code dans un projet existant → Cursor. Image produit → Midjourney ou Flux. Site / MVP sans coder → Lovable ou Bolt. Vidéo → Runway ou Kling. Commencez par l'outil, adaptez ensuite le langage — pas l'inverse.",
  },
  { type: "h3", text: "2. Assigner un rôle à l'IA" },
  {
    type: "p",
    text: "« Tu es [expert] avec [expérience/domaine]. » Ça cadre le vocabulaire et le type de solutions. « Tu es copywriter e-commerce spécialisé cosmétiques clean » n'écrit pas comme « tu es assistant polyvalent ». Le rôle n'est pas de la magie : c'est un filtre de priorités.",
  },
  { type: "h3", text: "3. Décrire le contexte en 3–5 lignes" },
  {
    type: "ul",
    items: [
      "Situation actuelle (ce qui existe déjà : site Shopify, landing, codebase…)",
      "Objectif business ou personnel (leads, conversion, livraison feature…)",
      "Contraintes connues (budget, délai, stack, RGPD, langue)",
      "Public du livrable (DRH PME, clients Amazon, développeurs juniors…)",
    ],
  },
  { type: "h3", text: "4. Formuler une tâche unique et mesurable" },
  {
    type: "p",
    text: "Évitez « aide-moi avec mon projet ». Préférez « Produis un plan en 7 étapes pour lancer un MVP SaaS en 4 semaines » ou « Rédige 3 variantes d'objet email pour relance panier abandonné, panier moyen 68 € ». Une tâche = un livrable identifiable. Si vous en voulez cinq, faites cinq prompts.",
  },
  { type: "h3", text: "5. Imposer format et contraintes" },
  {
    type: "ul",
    items: [
      "Format : markdown, JSON, tableau, liste numérotée, script avec didascalies",
      "Langue et registre (français, vouvoiement, sans emoji, sans anglicismes inutiles)",
      "Longueur max (mots, caractères, sections, durée vidéo)",
      "Interdits (pas d'hallucination produit, pas de lib externe, pas de violet par défaut…)",
    ],
  },
  { type: "h3", text: "6. Itérer avec des prompts de suivi" },
  {
    type: "p",
    text: "Premier prompt = plan ou brouillon. Deuxième = approfondir la section B. Troisième = critique et amélioration (« sois dur, liste ce qui sonne creux »). Cette chaîne bat un seul prompt de 3 000 mots. C'est contre-intuitif si vous débutez, mais c'est ce que font les gens qui livrent vraiment.",
  },
  { type: "h2", text: "Modèle de prompt copiable (toutes IA texte)" },
  {
    type: "p",
    text: "Tu es [RÔLE].\n\nContexte : [SITUATION + PUBLIC + OBJECTIF]\n\nTâche : [ACTION + LIVRABLE]\n\nContraintes : [LANGUE, TON, FORMAT, LONGUEUR, INTERDITS]\n\nSi une information manque, pose-moi jusqu'à 3 questions avant d'exécuter.\n\nCritères de qualité : [COMMENT JUGER LE RÉSULTAT]",
  },
  {
    type: "p",
    text: "La ligne « pose 3 questions » change la donne. Elle évite que le modèle invente vos prix, vos délais ou le ton de votre marque. Sur Claude comme sur ChatGPT, ça marche très bien — à condition que vous répondiez ensuite honnêtement.",
  },
  { type: "h2", text: "Bon prompt IA : exemples par usage" },
  { type: "h3", text: "Prompt pour rédiger un email professionnel" },
  {
    type: "p",
    text: "« Tu es assistant communication B2B. Rédige un email de relance (max 120 mots) après démo sans réponse. Prospect : directeur marketing d'un SaaS RH français, 35 salariés. Ton : courtois, pas pushy. CTA : proposer créneau 20 min la semaine prochaine. Objet + préheader inclus. Français, vouvoiement. Interdit : « j'espère que vous allez bien », « je me permets ». »",
  },
  { type: "h3", text: "Prompt pour créer une image produit" },
  {
    type: "p",
    text: "« Product photography of [produit], white background, studio softbox lighting, 85mm lens, commercial catalog, ultra sharp --ar 1:1 --style raw » (Midjourney — descriptif visuel en anglais souvent plus stable). Ajoutez ensuite vos contraintes métier en français dans un second passage si besoin (packaging, logo à éviter, etc.).",
  },
  { type: "h3", text: "Prompt pour coder une feature" },
  {
    type: "p",
    text: "« Next.js App Router, TypeScript strict. Ajoute [feature] dans [fichier ou dossier]. Respecte le pattern des composants existants. Ne modifie pas l'auth. Liste d'abord les fichiers à créer ou toucher, puis code étape par étape. Si une hypothèse manque, demande avant d'inventer. » (Cursor / Copilot).",
  },
  { type: "h2", text: "Avant / après : le même besoin, deux prompts" },
  {
    type: "p",
    text: "Cas : une coach freelance à Bordeaux veut une offre packagée sur son site.",
  },
  {
    type: "p",
    text: "Avant : « Écris mon offre de coaching. » → texte générique, prix inventés, promesses floues.",
  },
  {
    type: "p",
    text: "Après : « Tu es consultant en positionnement pour indépendants. Public : managers en transition professionnelle, 35–50 ans, Île-de-France et grandes villes. Offre : accompagnement 3 mois, 6 séances Visio, livrable plan de carrière. Prix : 1 890 €. Objection n°1 : « trop cher vs un coach entreprise ». Produis : accroche site 40 mots, 3 bénéfices orientés résultat, FAQ 4 questions, CTA sans urgence artificielle. Ton ferme et bienveillant, français. N'invente aucun témoignage. »",
  },
  {
    type: "p",
    text: "La différence n'est pas « magique ». Elle est dans les chiffres, le public et les interdits. Exactement ce qu'un bon humain demandera aussi.",
  },
  { type: "h2", text: "Ce qui ne marche PAS (même avec un « bon » modèle)" },
  {
    type: "ul",
    items: [
      "Une seule ligne sans contexte — le modèle comble avec du moyen de marché",
      "Plusieurs tâches non liées dans le même prompt (page + ads + emails + CGV)",
      "Demander « le meilleur » ou « viral » sans critères mesurables",
      "Coller un prompt viral TikTok sans adapter public, prix, ton, pays",
      "Abandonner après la première réponse médiocre au lieu d'itérer une fois",
      "Laisser l'IA inventer preuves, avis clients ou specs produit",
    ],
  },
  { type: "h2", text: "Quand NE PAS utiliser l'IA (ou seulement en brouillon)" },
  {
    type: "p",
    text: "Conseil juridique opposable, diagnostic santé, décisions RH sensibles, négociation où le relationnel prime, contenu réglementé (claims santé, finance) sans validation experte. Dans ces cas, un prompt peut préparer une check-list de questions — pas signer à votre place. Pour le reste (rédaction, idéation, code assisté, traduction, structuration), allez-y — avec relecture.",
  },
  { type: "h2", text: "Mini checklist 30 secondes" },
  {
    type: "ol",
    items: [
      "Rôle explicitement nommé",
      "Contexte (public + objectif) présent",
      "Une seule tâche principale",
      "Format + longueur + langue",
      "Au moins un interdit utile",
      "Critère de succès ou « pose des questions si info manque »",
    ],
  },
  {
    type: "tip",
    title: "Si vous voulez aller plus vite",
    text: "PromptPilot transforme une idée en prompt structuré avec variantes, adapté à l'IA cible — utile si vous débutez ou si vous voulez standardiser une équipe sans passer trois week-ends sur les frameworks.",
  },
  { type: "h2", text: "Combien de temps pour un bon prompt au quotidien ?" },
  {
    type: "p",
    text: "Un email de relance : 3–5 minutes de brief si vous avez déjà le contexte. Une page de vente : 15–25 minutes, surtout pour coller objections et preuves. Une feature Cursor : 5–10 minutes pour lister stack, fichiers et non-objectifs. Si vous passez une heure sur le prompt avant d'avoir le moindre brouillon, vous over-engineer — mieux vaut un premier jet structuré puis deux itérations ciblées.",
  },
  { type: "h2", text: "FAQ — recherches associées sur Google" },
  { type: "h3", text: "Comment faire un prompt ChatGPT qui marche ?" },
  {
    type: "p",
    text: "Même méthode : rôle + contexte + tâche + format. ChatGPT réagit bien aux listes numérotées et aux consignes « réponds en sections H2 ». Pour un sujet récurrent (votre marque, votre stack), créez un projet / une instruction personnalisée plutôt que de tout retaper.",
  },
  { type: "h3", text: "Existe-t-il un générateur de prompts ?" },
  {
    type: "p",
    text: "Oui. Un générateur dédié structure votre idée en brief expert multi-IA. C'est pertinent dès que vous alternez texte, image et code, ou que vous produisez plusieurs livrables par semaine.",
  },
  { type: "h3", text: "Combien de temps pour apprendre à bien prompter ?" },
  {
    type: "p",
    text: "Les bases (ce guide) se maîtrisent en une après-midi de pratique réelle — pas de lecture passive. La constance vient après 20–30 livrables où vous avez noté ce qui a marché. Ce n'est pas un master, c'est un muscle.",
  },
  { type: "h3", text: "Faut-il un framework type R-C-T-C ou CRAFT ?" },
  {
    type: "p",
    text: "Utile comme béquille mentale, surtout en équipe. Pas obligatoire si vous avez déjà le réflexe des 5 questions + format + critères. Le framework qui n'est jamais appliqué ne sert à rien ; un modèle de 8 lignes utilisé chaque jour, si.",
  },
  { type: "h3", text: "Pourquoi mon prompt marche sur ChatGPT mais pas sur Claude ?" },
  {
    type: "p",
    text: "Les modèles n'attendent pas exactement le même style d'instruction. Claude aime souvent des paragraphes clairs et des nuances ; ChatGPT tolère mieux les listes sèches. Adaptez la forme, gardez le fond (rôle, contexte, tâche, contraintes).",
  },
];

export const articleCommentFaireBonPrompt: SeoArticle = {
  slug: "comment-faire-un-bon-prompt-ia",
  title: "Comment faire un bon prompt IA ? Guide complet + exemples",
  description:
    "Méthode pas à pas pour écrire un bon prompt ChatGPT, Claude, Cursor ou Midjourney. Modèle copiable, exemples et FAQ des recherches Google.",
  category: "guide",
  publishedAt: "2026-05-05",
  updatedAt: "2026-07-15",
  readingTimeMin: estimateReadingTime(blocks),
  keywords: [
    "comment faire un bon prompt",
    "bon prompt IA",
    "écrire un prompt ChatGPT",
    "prompt efficace",
    "exemple prompt IA",
    "méthode prompt IA",
  ],
  relatedSlugs: [
    "quest-ce-quun-prompt-ia",
    "structure-prompt-expert-framework",
    "10-erreurs-prompt-ia",
  ],
  blocks,
};
