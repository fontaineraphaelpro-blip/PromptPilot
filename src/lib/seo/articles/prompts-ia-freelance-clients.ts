import type { SeoArticle } from "../types";
import { estimateReadingTime } from "./utils";

const blocks: SeoArticle["blocks"] = [
  {
    type: "p",
    text: "Trouver des clients est le travail invisible du freelance : prospection, proposition commerciale, portfolio, relances, appels d'offres. L'IA peut absorber 60 à 70 % de ce travail — si vous la briefez avec la précision d'un directeur commercial. Voici les prompts que les freelances rentables utilisent réellement, du premier contact à la signature, avec les pièges propres à chaque étape.",
  },
  { type: "h2", text: "Étape 1 — Positionnement : le prompt fondation" },
  {
    type: "p",
    text: "Avant de prospecter, clarifiez l'offre. Prompt : « Tu es consultant en positionnement pour indépendants. Voici mon profil : [métier, années d'expérience, 3 missions réussies avec résultats, ce que j'aime faire]. Marché visé : [secteur, taille d'entreprise]. Produis : 1) un positionnement en une phrase (pour qui + problème résolu + différenciateur), 2) 3 offres packagées avec livrables et fourchette de prix, 3) les 5 objections que ce positionnement va générer et comment y répondre. Sois critique : si mon positionnement est trop large, dis-le. »",
  },
  {
    type: "blockquote",
    text: "« Développeur web freelance » ne se vend pas. « Je réduis le temps de chargement des boutiques Shopify qui perdent des ventes mobiles » se vend. L'IA vous aide à formuler — les résultats clients viennent de vous.",
  },
  { type: "h2", text: "Étape 2 — Prospection sortante qui obtient des réponses" },
  { type: "h3", text: "Email de prospection à froid" },
  {
    type: "p",
    text: "« Tu es expert en cold email B2B (taux de réponse, pas taux d'ouverture). Écris un email de prospection pour [mon offre] destiné à [poste précis] chez [type d'entreprise]. Structure : observation spécifique sur leur entreprise [variable à personnaliser], problème probable lié, une phrase de crédibilité avec résultat chiffré, question ouverte. Max 90 mots. Interdits : « je me permets », « rapide question », flatterie générique, lien Calendly dans le premier email. Fournis aussi 3 objets sobres de max 4 mots. »",
  },
  { type: "h3", text: "Commentaires LinkedIn qui créent des conversations" },
  {
    type: "p",
    text: "« Tu es ghostwriter LinkedIn pour freelances. Voici un post de mon prospect idéal : [coller]. Rédige un commentaire de 30-50 mots qui apporte un angle complémentaire ou une expérience concrète — pas de flatterie, pas de pitch, pas de « très intéressant ». Objectif : qu'il clique sur mon profil. »",
  },
  { type: "h2", text: "Étape 3 — Proposition commerciale et devis" },
  {
    type: "p",
    text: "« Tu es directeur commercial d'une agence. Transforme ces notes d'appel découverte [coller les notes brutes] en proposition commerciale structurée : rappel du contexte et des enjeux avec les mots du client, objectifs mesurables, méthodologie en phases avec livrables et délais, ce qui n'est PAS inclus (périmètre), investissement [montant] présenté en regard du coût du problème, prochaine étape avec date. Ton : confiant, précis, sans superlatifs. Format : document structuré prêt à mettre en page. »",
  },
  {
    type: "ul",
    items: [
      "Toujours coller les notes réelles de l'appel — la proposition doit parler la langue du client",
      "La section « non inclus » évite 80 % des dérives de périmètre",
      "Présenter le prix face au coût du problème, jamais seul",
    ],
  },
  { type: "h2", text: "Étape 4 — Répondre aux appels d'offres et briefs plateformes" },
  {
    type: "p",
    text: "« Tu es freelance senior qui gagne des appels d'offres sur Malt/Upwork. Voici le brief du client : [coller]. Rédige une réponse en 150 mots max : reformulation du besoin qui prouve que j'ai LU le brief (pas de copier-coller), une question pertinente qui révèle mon expertise, approche proposée en 3 lignes, un résultat similaire obtenu [le fournir]. Pas de liste de compétences, pas de « je suis motivé ». Mon profil : [2 lignes]. »",
  },
  { type: "h2", text: "Étape 5 — Relances et closing" },
  {
    type: "p",
    text: "« Le prospect a reçu ma proposition de [montant] il y a [X jours] pour [projet] et ne répond plus. Notre dernier échange : [contexte]. Écris 2 relances : une à J+5 qui ajoute de la valeur (idée, ressource, précision utile au projet) sans demander de décision, une à J+12 qui pose une deadline honnête et propose une alternative allégée. Ton : détendu, jamais suppliant. Max 80 mots chacune. »",
  },
  { type: "h2", text: "Étape 6 — Fidéliser : le client suivant est déjà signé" },
  {
    type: "ul",
    items: [
      "Bilan de mission : « Transforme ces résultats [données] en bilan une page pour mon client : objectifs vs réalisé, valeur créée, 3 recommandations pour la suite — dont une qui justifie une nouvelle mission. »",
      "Demande de recommandation : « Écris le message demandant un témoignage à ce client satisfait [contexte]. Propose-lui 3 questions guides pour faciliter sa réponse. Max 70 mots. »",
      "Étude de cas portfolio : « Transforme cette mission [contexte, résultats] en étude de cas : situation → intervention → résultats chiffrés → citation client. 250 mots, scannable. »",
    ],
  },
  { type: "h2", text: "Les erreurs de prompts qui coûtent des clients" },
  {
    type: "ol",
    items: [
      "Prospecter avec un texte visiblement généré — sans variable personnalisée par prospect, votre email finit en spam mental",
      "Laisser l'IA inventer vos résultats — donnez vos vrais chiffres ou n'en mettez pas",
      "Utiliser le même prompt pour tous les canaux — un DM LinkedIn n'est pas un cold email",
      "Négliger le suivi — 80 % des signatures se jouent dans les relances, automatisez-en la rédaction, jamais l'envoi aveugle",
    ],
  },
  {
    type: "tip",
    title: "Industrialiser sans robotiser",
    text: "Le bon système : un prompt expert par étape du funnel, avec vos variables (offre, cible, preuves) déjà intégrées. PromptPilot génère ces briefs structurés avec score qualité — 5 générations offertes pour tester sur votre prochaine prospection.",
  },
  { type: "h2", text: "FAQ" },
  { type: "h3", text: "Quelle IA choisir pour la prospection freelance ?" },
  {
    type: "p",
    text: "ChatGPT ou Claude font parfaitement l'affaire pour les textes. Le facteur limitant n'est pas le modèle, c'est le brief : cible floue = message flou. Travaillez le prompt avant de changer d'outil.",
  },
  { type: "h3", text: "Les clients détectent-ils les messages écrits par IA ?" },
  {
    type: "p",
    text: "Ils détectent les messages génériques — IA ou pas. Un message personnalisé sur leur situation réelle, avec vos chiffres et votre ton, passe parfaitement même s'il est structuré par IA. La règle : l'IA rédige, vous personnalisez la première ligne et validez chaque envoi.",
  },
  { type: "h3", text: "Combien de temps ces prompts font-ils gagner ?" },
  {
    type: "p",
    text: "Une proposition commerciale passe de 3 h à 45 min (rédaction + personnalisation). Une séquence de prospection de 2 h à 30 min. Sur un mois de prospection active, comptez 10 à 15 h récupérées — à réinvestir dans les appels, que l'IA ne fera pas à votre place.",
  },
];

export const articlePromptsFreelance: SeoArticle = {
  slug: "prompts-ia-freelance-clients",
  title: "Prompts IA pour freelances : trouver et signer plus de clients",
  description:
    "Prospection, propositions commerciales, relances, appels d'offres : les prompts ChatGPT que les freelances utilisent pour signer des clients, étape par étape.",
  category: "guide",
  publishedAt: "2026-07-15",
  updatedAt: "2026-07-15",
  readingTimeMin: estimateReadingTime(blocks),
  keywords: [
    "prompt IA freelance",
    "ChatGPT trouver clients",
    "prompt prospection freelance",
    "IA proposition commerciale",
    "ChatGPT freelance",
  ],
  relatedSlugs: [
    "prompts-chatgpt-vendre-plus",
    "prompts-marketing-copywriting",
    "comment-utiliser-chatgpt-efficacement",
  ],
  blocks,
};
