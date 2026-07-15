import type { SeoArticle } from "../types";
import { estimateReadingTime } from "./utils";

const blocks: SeoArticle["blocks"] = [
  {
    type: "p",
    text: "Page de vente, séquence email, fiche produit, script de closing : ChatGPT peut produire tout le funnel — à condition de le briefer comme un copywriter senior, pas comme un moteur de recherche. Ce guide donne 10 prompts de vente copiables, la logique derrière chacun, et les erreurs qui transforment un texte de vente en brochure générique que personne ne lit.",
  },
  { type: "h2", text: "Pourquoi vos textes de vente ChatGPT sonnent creux" },
  {
    type: "p",
    text: "« Écris une page de vente pour mon produit » produit systématiquement le même squelette : promesse vague, trois bénéfices interchangeables, appel à l'action mou. La cause : ChatGPT ne connaît ni votre client, ni son objection principale, ni votre preuve. Un prompt de vente efficace transporte ces trois informations — le reste n'est que de la mise en forme.",
  },
  {
    type: "ul",
    items: [
      "Qui achète : persona précis, situation, niveau de conscience du problème",
      "Ce qui bloque : l'objection n°1 (prix, confiance, timing, « je peux le faire moi-même »)",
      "Ce qui prouve : chiffres, témoignages, garantie, démonstration",
    ],
  },
  { type: "h2", text: "10 prompts ChatGPT pour vendre plus (copiables)" },
  { type: "h3", text: "1. Page de vente complète (framework PAS)" },
  {
    type: "p",
    text: "« Tu es copywriter direct response senior. Rédige une page de vente pour [produit, prix] destinée à [persona + situation]. Structure Problème-Agitation-Solution : accroche sur [douleur principale], agitation avec 3 conséquences concrètes, présentation de l'offre, 3 bénéfices orientés résultat (pas des features), preuve sociale [témoignages/chiffres], traitement de l'objection « [objection n°1] », garantie, CTA unique répété 2 fois. Ton : [direct/premium/complice]. Français, 800 mots max. »",
  },
  { type: "h3", text: "2. Séquence email de lancement (5 emails)" },
  {
    type: "p",
    text: "« Tu es expert email marketing. Crée une séquence de 5 emails pour lancer [offre] auprès de [liste : taille, relation, historique]. Email 1 : histoire + problème. Email 2 : mécanisme de la solution. Email 3 : preuve + cas client. Email 4 : objections + FAQ. Email 5 : urgence [deadline réelle] + récap offre. Pour chaque email : objet (max 45 caractères), préheader, corps 150-250 mots, un seul CTA. Tutoiement, pas de jargon. »",
  },
  { type: "h3", text: "3. Fiche produit e-commerce qui convertit" },
  {
    type: "p",
    text: "« Tu es copywriter e-commerce. Réécris cette fiche produit [coller la fiche actuelle] pour [persona]. Titre avec bénéfice principal, 5 bullet points orientés usage réel (pas specs), paragraphe storytelling 60 mots, section « Pour qui ce n'est PAS fait », FAQ 3 questions dont la livraison et le retour. Mots-clés SEO à intégrer naturellement : [liste]. »",
  },
  { type: "h3", text: "4. Messages de prospection LinkedIn (sans spam)" },
  {
    type: "p",
    text: "« Tu es expert social selling B2B. Écris 3 variantes de premier message LinkedIn pour [cible : poste, secteur] à propos de [offre]. Contraintes : max 60 mots, zéro pitch dans le premier message, une observation personnalisable sur [point commun/actualité du prospect], une question ouverte qui qualifie le besoin. Interdit : « j'espère que vous allez bien », « je me permets de », lien dans le premier message. »",
  },
  { type: "h3", text: "5. Script de vente / appel découverte" },
  {
    type: "p",
    text: "« Tu es coach en vente consultative. Prépare ma trame d'appel découverte de 30 min pour [offre, prix] avec [persona]. Sections : ouverture (2 min, cadrage), 7 questions de qualification ordonnées (situation → douleur → impact chiffré → urgence), reformulation type, transition vers la présentation, réponses aux 3 objections probables [les lister], next step concret. Format : trame à puces + phrases exactes pour les moments critiques. »",
  },
  { type: "h3", text: "6. Publicité Facebook/Instagram (3 angles)" },
  {
    type: "p",
    text: "« Tu es media buyer senior. Crée 3 publicités pour [offre] ciblant [audience] : angle douleur, angle désir/statut, angle preuve/curiosité. Pour chaque : hook (première ligne, max 12 mots), corps 80-120 mots, CTA. Le hook doit arrêter le scroll sans clickbait mensonger. Précise pour chaque angle le visuel recommandé. »",
  },
  { type: "h3", text: "7. Relance de devis sans réponse" },
  {
    type: "p",
    text: "« Tu es assistant commercial B2B. Écris 3 emails de relance espacés (J+3, J+8, J+15) pour un devis de [montant] envoyé à [contexte]. J+3 : ajout de valeur (ressource utile), pas de pression. J+8 : lever l'objection probable [laquelle]. J+15 : break-up email courtois qui provoque une réponse. Max 100 mots chacun, objet inclus. »",
  },
  { type: "h3", text: "8. Upsell / email post-achat" },
  {
    type: "p",
    text: "« Tu es expert CRM e-commerce. Rédige l'email envoyé 7 jours après l'achat de [produit A] proposant [produit B complémentaire]. Structure : félicitation + conseil d'usage de A (valeur d'abord), pont logique vers B, offre limitée [détail], CTA. 130 mots max. Le client doit sentir qu'on l'aide, pas qu'on le traite comme un portefeuille. »",
  },
  { type: "h3", text: "9. Témoignage client transformé en preuve" },
  {
    type: "p",
    text: "« Voici un retour client brut : [coller]. Transforme-le en 3 formats : citation courte percutante (max 25 mots) pour la page de vente, mini-étude de cas 120 mots (situation → action → résultat chiffré), post LinkedIn à la première personne. Garde les mots authentiques du client, ne surjoue pas. »",
  },
  { type: "h3", text: "10. Analyse critique de votre page actuelle" },
  {
    type: "p",
    text: "« Tu es CRO (conversion rate optimizer) senior. Analyse cette page de vente : [coller le texte]. Identifie les 5 plus gros freins à la conversion classés par impact, avec pour chacun : le problème, pourquoi ça bloque psychologiquement, la réécriture proposée. Termine par le test A/B prioritaire à lancer. Sois direct, pas complaisant. »",
  },
  { type: "h2", text: "Les 4 erreurs qui sabotent un prompt de vente" },
  {
    type: "ol",
    items: [
      "Ne pas donner le prix ni l'objection principale — ChatGPT écrit alors pour « tout le monde », donc pour personne",
      "Demander « persuasif » sans définir le ton — vous obtenez du sur-vendeur américain traduit",
      "Tout demander en un prompt (page + emails + ads) — chaque livrable mérite son brief",
      "Copier la sortie sans y injecter vos preuves réelles — le texte sonne bien mais ne convainc pas",
    ],
  },
  { type: "h2", text: "Exemple avant / après : accroche de page de vente" },
  {
    type: "p",
    text: "Avant (prompt vague) : « Écris une accroche pour ma formation Canva. » → « Libérez votre créativité dès aujourd'hui ! »",
  },
  {
    type: "p",
    text: "Après (prompt avec persona + douleur) : « Accroche H1 max 12 mots pour freelances graphistes français qui perdent 4–6 h/semaine sur des fichiers clients mal organisés. Formation Canva Pro 6 modules, 197 €. Interdit : « créativité », « révélez le potentiel ». » → quelque chose du genre « Arrêtez de refaire vos fichiers clients jusqu'à 23 h » — pas parfait d'emblée, mais déjà vendable après une retouche.",
  },
  { type: "h2", text: "Ce qui ne marche PAS en copywriting IA" },
  {
    type: "ul",
    items: [
      "Demander « un texte persuasif américain » pour une offre B2B française à 890 € — le ton casse la confiance",
      "Coller des faux témoignages « générés » : illégal et visible à 10 mètres",
      "Optimiser le CTA avant d'avoir clarifié l'offre et le prix",
      "Générer 10 pages de vente avant d'avoir une seule preuve client réelle",
    ],
  },
  { type: "h2", text: "Quand NE PAS laisser ChatGPT écrire pour vendre" },
  {
    type: "p",
    text: "Claims santé ou finance non validés, garanties inventées, comparaisons concurrentes agressives sans preuve, emails de litige ou de résiliation. Utilisez l'IA pour la structure et le premier jet ; validez chaque chiffre, chaque promesse et chaque condition légale avant publication. Si votre panier moyen dépasse 1 000 € ou si vous vendez du B2B à des comités, prévoyez toujours une relecture humaine du funnnel complet.",
  },
  { type: "h2", text: "Mini checklist avant d'envoyer un prompt de vente" },
  {
    type: "ol",
    items: [
      "Persona + situation réelle notés",
      "Objection n°1 écrite en une phrase",
      "Prix / offre / limites précisés",
      "Au moins une preuve réelle collée (ou explicitement absente)",
      "Ton et tutoiement/vouvoiement choisis",
      "Un seul livrable demandé (pas page + ads + emails)",
    ],
  },
  {
    type: "tip",
    title: "Le raccourci",
    text: "Chacun de ces prompts demande 10-15 informations sur votre offre. PromptPilot vous les demande une fois et génère le brief structuré complet avec score qualité — utile si vous produisez des textes de vente chaque semaine.",
  },
  { type: "h2", text: "FAQ" },
  { type: "h3", text: "ChatGPT peut-il vraiment écrire une page de vente qui convertit ?" },
  {
    type: "p",
    text: "Oui pour la structure et le premier jet — à condition d'un brief complet. Non pour les preuves, les chiffres et la connaissance client : c'est votre partie. Le duo brief solide + relecture avec vos données réelles bat la page écrite à la main en une fraction du temps.",
  },
  { type: "h3", text: "Quel framework de copywriting demander à ChatGPT ?" },
  {
    type: "p",
    text: "PAS (Problème-Agitation-Solution) pour les pages courtes et les ads, AIDA pour les emails, et le storytelling avant-après pour les études de cas. Nommer le framework dans le prompt améliore nettement la structure de sortie.",
  },
  { type: "h3", text: "Ces prompts marchent-ils sur Claude ou Gemini ?" },
  {
    type: "p",
    text: "La logique (persona + objection + preuve) est universelle. Claude excelle sur les tons nuancés et les textes longs, Gemini sur l'intégration de données récentes. Adaptez le format : Claude préfère les instructions en paragraphes, ChatGPT les listes.",
  },
  { type: "h3", text: "Faut-il mentionner le prix dans le prompt ?" },
  {
    type: "p",
    text: "Oui, presque toujours. Sans prix, ChatGPT écrit comme pour une offre « entre 29 € et 9 900 € » — donc pour personne. Si le prix est sensible, donnez au moins une fourchette et le positionnement (entrée / milieu / premium).",
  },
  { type: "h3", text: "Combien de variantes tester sur une publicité ?" },
  {
    type: "p",
    text: "Trois angles (douleur, désir, preuve) suffisent pour démarrer sur Meta. Au-delà de 6–8 créas sans données, vous diluez le budget. Laissez tourner 3–5 jours avec un budget minimal avant de juger — et ne reconstruisez pas le prompt à chaque micro-variation : changez d'abord le hook.",
  },
];

export const articlePromptsVente: SeoArticle = {
  slug: "prompts-chatgpt-vendre-plus",
  title: "10 prompts ChatGPT pour vendre plus : pages, emails, prospection",
  description:
    "10 prompts de vente copiables pour ChatGPT : page de vente, séquence email, prospection LinkedIn, fiches produit, relances. Avec la méthode pour les adapter.",
  category: "guide",
  publishedAt: "2026-07-15",
  updatedAt: "2026-07-15",
  readingTimeMin: estimateReadingTime(blocks),
  keywords: [
    "prompt ChatGPT vente",
    "prompt page de vente",
    "prompt email marketing",
    "prompt prospection LinkedIn",
    "ChatGPT copywriting",
    "prompt fiche produit",
  ],
  relatedSlugs: [
    "prompts-marketing-copywriting",
    "comment-ecrire-prompt-chatgpt",
    "structure-prompt-expert-framework",
  ],
  blocks,
};
