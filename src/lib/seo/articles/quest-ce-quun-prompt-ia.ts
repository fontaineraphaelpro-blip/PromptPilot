import type { SeoArticle } from "../types";
import { estimateReadingTime } from "./utils";

const blocks: SeoArticle["blocks"] = [
  {
    type: "p",
    text: "Si vous tapez « c'est quoi un prompt IA » ou « qu'est-ce qu'un prompt ChatGPT » sur Google, vous cherchez probablement la définition simple — et surtout comment l'utiliser concrètement. Un prompt n'est pas une commande magique ni un sortilège TikTok : c'est l'instruction que vous donnez à une intelligence artificielle pour obtenir une réponse, un texte, une image, du code ou une vidéo. Rien de plus, rien de moins.",
  },
  {
    type: "p",
    text: "En France, depuis 2023, le mot a quitté les cercles tech pour atterrir dans les PME, les freelances et les écoles. Pourtant beaucoup de gens confondent encore « poser une question à ChatGPT » et « écrire un prompt ». Les deux se ressemblent sur la surface. Sous le capot, le résultat n'a rien à voir : d'un côté une réponse Wikipedia réchauffée, de l'autre un livrable utilisable lundi matin.",
  },
  { type: "h2", text: "Définition : qu'est-ce qu'un prompt ?" },
  {
    type: "p",
    text: "Un prompt (de l'anglais « to prompt », solliciter) est le texte d'entrée envoyé à un modèle d'IA générative. Exemples concrets : la question que vous tapez dans ChatGPT, la description d'image pour Midjourney, le brief de feature dans Cursor, le scénario pour Runway. Le modèle ne « lit » pas votre esprit — il continue statistiquement le texte le plus probable à partir de ce que vous avez fourni. Plus votre entrée est précise, plus l'espace des réponses possibles se resserre vers quelque chose d'utile.",
  },
  {
    type: "p",
    text: "Il n'existe pas de longueur officielle. Un prompt peut faire 12 mots (« traduit ce paragraphe en français soutenu ») ou 800 (brief de page de vente avec persona, objections et preuves). Ce qui compte, c'est la densité d'information pertinente — pas le volume. Un pavé désorganisé donne souvent un résultat pire qu'un brief de 120 mots bien structuré.",
  },
  {
    type: "ul",
    items: [
      "Prompt texte → ChatGPT, Claude, Gemini, Mistral, Copilot",
      "Prompt image → Midjourney, DALL·E, Leonardo, Ideogram, Flux",
      "Prompt vidéo → Sora, Runway, Veo, Kling, Pika",
      "Prompt code → Cursor, GitHub Copilot, Replit Agent, Bolt, Lovable",
    ],
  },
  { type: "h2", text: "Prompt vs message : quelle différence ?" },
  {
    type: "p",
    text: "Beaucoup de gens confondent « poser une question » et « écrire un prompt ». Une question courte (« comment créer un site ? ») laisse l'IA combler les blancs avec des généralités. Un prompt structuré précise le rôle, le contexte, la tâche, le format et les limites — vous obtenez un livrable actionnable plutôt qu'un tutoriel de blog 2019.",
  },
  {
    type: "p",
    text: "La métaphore qui marche le mieux : imaginez que vous briefez un stagiaire brillant mais arrivé ce matin. S'il n'a que « aide-moi avec mon marketing », il inventera. S'il a le nom du produit, le client type, le canal, le ton de marque et ce qu'il ne faut surtout pas écrire, il livrera quelque chose de crédible. L'IA, c'est exactement ça — sauf qu'elle répond en 8 secondes.",
  },
  {
    type: "blockquote",
    text: "Question = curiosité. Prompt = brief professionnel. La différence se voit moins dans la formulation que dans le résultat.",
  },
  { type: "h2", text: "Pourquoi les prompts comptent vraiment en 2026" },
  {
    type: "p",
    text: "Les modèles GPT-4o, Claude Opus, Gemini et Mistral Large sont puissants, mais non télépathes. Deux freelances français avec la même idée — « une offre de site vitrine pour artisans » — obtiennent des devis et des pages d'accueil opposés selon la qualité du prompt. En agence, j'ai vu des équipes perdre une demi-journée sur des allers-retours ChatGPT alors qu'un brief de 5 minutes aurait réglé 80 % du problème.",
  },
  {
    type: "p",
    text: "Côté entreprise, le coût d'un mauvais prompt n'est pas abstrait. Une PME de 40 salariés qui génère des emails clients avec des formulations vagues finit avec du ton incongru, des promesses inventées et parfois des infos erronées (délais de livraison, garanties). Un bon prompt, lui, force l'IA à rester dans le cadre : prix réels, interlocuteur précis, interdits explicites.",
  },
  {
    type: "ul",
    items: [
      "Moins d'itérations « refais autrement » (souvent 3 à 5 allers-retours évités par livrable)",
      "Cohérence entre collaborateurs : même structure de brief = même niveau de qualité",
      "Moins d'hallucinations produits quand vous imposez « n'invente aucune donnée »",
      "Transfert de compétences : un junior briefé comme un senior produit 70 % du niveau attendu",
    ],
  },
  { type: "h2", text: "Anatomie d'un prompt minimal qui fonctionne" },
  {
    type: "p",
    text: "Vous n'avez pas besoin d'un framework à 12 lettres pour débuter. Cinq blocs suffisent dans 90 % des cas métier en France (email, LinkedIn, fiche produit, plan de contenu, petit script) :",
  },
  {
    type: "ol",
    items: [
      "Qui est l'IA ? (rôle : expert marketing B2B, copywriter e-commerce, dev Next.js…)",
      "Pour qui / dans quel contexte ? (startup SaaS Lyon, artisan plombier, agence 8 personnes…)",
      "Que doit-elle produire ? (email 120 mots, plan en 7 étapes, composant React…)",
      "Sous quelles règles ? (langue, longueur, ton, tutoiement/vouvoiement, interdits)",
      "Comment savoir si c'est réussi ? (critères, format de sortie, « pose 3 questions si info manque »)",
    ],
  },
  {
    type: "p",
    text: "Le cinquième point est sous-estimé. Sans critère de réussite, vous jugez la réponse à l'instinct (« j'aime / j'aime pas ») et vous bouclez indéfiniment. Avec un critère (« 180 mots, CTA unique, pas d'emoji »), vous savez en 10 secondes si c'est bon.",
  },
  { type: "h2", text: "Exemple avant / après (cas réel type PME)" },
  { type: "h3", text: "Avant — prompt faible" },
  {
    type: "p",
    text: "« Écris un post LinkedIn sur l'intelligence artificielle. »",
  },
  {
    type: "p",
    text: "Résultat typique : accroche creuse, trois platitudes sur « la transformation digitale », CTA soft. Personne ne le sauvegarde. Votre réseau scroll.",
  },
  { type: "h3", text: "Après — prompt utilisable" },
  {
    type: "p",
    text: "« Tu es copywriter B2B. Rédige un post LinkedIn 180 mots pour fondateurs de PME industrielles (10–80 salariés) en France sur l'usage de prompts IA en marketing interne — sans jargon Silicon Valley. Hook en forme de question sur le temps perdu à briefer des prestataires. Puis 3 conseils actionnables testés en équipe de 2–5 personnes. CTA : essai d'un générateur de prompts gratuit. Ton pro, un peu direct, zéro emoji. »",
  },
  {
    type: "p",
    text: "Même modèle, même compte ChatGPT Plus : la deuxième version sonne comme écrite par quelqu'un qui a déjà géré une équipe. Parce que le brief contenait le public, le contexte France, les contraintes et le ton.",
  },
  { type: "h2", text: "Ce que les gens croient (et ce qui est faux)" },
  {
    type: "ul",
    items: [
      "Faux : « Il faut écrire en anglais pour que ça marche. » Vrai : le français est excellent sur ChatGPT et Claude en 2026. Exception relative : Midjourney reste plus stable en anglais pour les descriptifs visuels fins.",
      "Faux : « Plus le prompt est long, mieux c'est. » Vrai : au-delà d'un certain point, le bruit noie le signal. Structurez plutôt que de remplir.",
      "Faux : « L'IA comprend mon intention. » Vrai : elle comprend le texte. Si le prix et l'objection client ne sont pas écrits, ils n'existent pas pour elle.",
      "Faux : « Un bon prompt marchera pour toujours. » Vrai : les modèles évoluent. Un prompt validé en janvier peut dériver en juillet — il faut parfois recalibrer.",
    ],
  },
  { type: "h2", text: "Quand un prompt ne suffit pas" },
  {
    type: "p",
    text: "Soyons honnêtes : pour certaines tâches, même le meilleur prompt ne sauve rien. Décision stratégique avec ambiguïté politique interne, négociation salariale, diagnostic médical, conseil juridique engageant — là, l'IA peut donner un cadre de réflexion, pas une vérité opérationnelle. Idem pour le contenu ultra-spécialisé (normes AFNOR, fiscalité d'une SARL holding) : sans sources vérifiées collées dans le prompt, vous prenez un risque.",
  },
  {
    type: "p",
    text: "Utilisez aussi l'IA avec prudence sur tout ce qui part chez un client sans relecture humaine : devis, CGV, emails de litige, claims marketing chiffrés. Le prompt structure ; vous assumez.",
  },
  { type: "h2", text: "Mini checklist avant d'envoyer" },
  {
    type: "ol",
    items: [
      "Ai-je nommé le livrable exact (pas « aide-moi ») ?",
      "Ai-je donné le public ou le contexte métier ?",
      "Ai-je fixé langue, longueur et ton ?",
      "Ai-je interdit ce qui doit rester hors jeu (données inventées, ton vendeur, emoji…) ?",
      "Ai-je un critère pour juger la réponse en moins d'une minute ?",
    ],
  },
  {
    type: "tip",
    title: "Gagner du temps sans tout réapprendre",
    text: "Si vous débutez, décrivez votre idée en une phrase sur PromptPilot : l'outil génère un prompt expert adapté à ChatGPT, Cursor, Midjourney, etc., avec variantes court / détaillé / expert. Vous voyez la structure avant de coller dans l'IA.",
  },
  { type: "h2", text: "FAQ — questions fréquentes sur les prompts" },
  { type: "h3", text: "Un prompt est-il gratuit ?" },
  {
    type: "p",
    text: "Écrire un prompt est gratuit. L'exécution peut coûter selon l'outil (abonnement ChatGPT ~20 €/mois, crédits Midjourney, API OpenAI facturée au token). Des générateurs structurent vos prompts avant de les coller dans l'IA de votre choix ; le freemium est souvent assez pour tester 4–5 cas réels.",
  },
  { type: "h3", text: "Quelle longueur pour un prompt ?" },
  {
    type: "p",
    text: "Pas de règle universelle : environ 50 à 400 mots selon la complexité. Pour le code, privilégiez plusieurs prompts courts plutôt qu'un monstre de 3 000 mots. Pour une page de vente, un brief long et ordonné bat trois phrases vagues.",
  },
  { type: "h3", text: "Faut-il écrire en anglais ?" },
  {
    type: "p",
    text: "Pour le texte et le code : non, le français suffit largement. Pour Midjourney et certains outils vidéo : l'anglais reste souvent plus prévisible — vous pouvez penser en français, puis formaliser le descriptif technique en anglais.",
  },
  { type: "h3", text: "Prompt engineering et prompt, c'est la même chose ?" },
  {
    type: "p",
    text: "Le prompt est le message. Le prompt engineering est la méthode pour le concevoir, le tester et le documenter. Vous utilisez des prompts dès le premier jour ; vous faites du prompt engineering quand vous itérez sérieusement et standardisez ce qui marche.",
  },
  { type: "h3", text: "Pourquoi ChatGPT ignore parfois une partie de mon prompt ?" },
  {
    type: "p",
    text: "Trop d'instructions contradictoires, trop de tâches dans un seul message, ou des consignes noyées au milieu d'un pavé. Mettez les contraintes critiques en tête ou en liste numérotée, une tâche principale par prompt, et rappelez le format attendu à la fin.",
  },
  { type: "h2", text: "Prochaine étape" },
  {
    type: "p",
    text: "Maintenant que vous savez ce qu'est un prompt, passez au guide « Comment faire un bon prompt IA » pour la méthode pas à pas, ou au framework R-C-T-C pour structurer chaque demande sans repartir de zéro. L'objectif n'est pas d'écrire des livres : c'est d'arrêter de jouer à la loterie à chaque génération.",
  },
];

export const articleQuestCeQuunPrompt: SeoArticle = {
  slug: "quest-ce-quun-prompt-ia",
  title: "C'est quoi un prompt IA ? Définition simple et exemples",
  description:
    "Qu'est-ce qu'un prompt ChatGPT ou Midjourney ? Définition, différence avec une question, exemples concrets et FAQ pour débutants.",
  category: "guide",
  publishedAt: "2026-05-01",
  updatedAt: "2026-07-15",
  readingTimeMin: estimateReadingTime(blocks),
  keywords: [
    "c'est quoi un prompt",
    "qu'est-ce qu'un prompt IA",
    "prompt ChatGPT définition",
    "prompt intelligence artificielle",
    "définition prompt",
  ],
  relatedSlugs: [
    "comment-faire-un-bon-prompt-ia",
    "quest-ce-que-le-prompt-engineering",
    "comment-ecrire-prompt-chatgpt",
  ],
  blocks,
};
