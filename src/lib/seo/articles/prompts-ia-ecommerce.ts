import type { SeoArticle } from "../types";
import { estimateReadingTime } from "./utils";

const blocks: SeoArticle["blocks"] = [
  {
    type: "p",
    text: "Fiches produits, publicités, emails de panier abandonné, photos produit, SEO de catégorie : une boutique en ligne consomme une quantité de contenu que peu d'équipes peuvent produire à la main. L'IA absorbe cette charge — à condition de prompts qui connaissent votre client, pas des templates génériques. Voici le kit complet du e-commerçant, de la fiche produit à la photo Midjourney, avec les prompts copiables.",
  },
  { type: "h2", text: "Fiches produits : vendre l'usage, pas les specs" },
  {
    type: "p",
    text: "« Tu es copywriter e-commerce spécialisé [niche]. Rédige la fiche produit de [produit, prix] pour [client type : qui, pourquoi il achète, ce qui le fait hésiter]. Structure : titre avec bénéfice principal + mot-clé SEO [mot-clé], accroche 2 lignes sur le problème résolu, 5 bullets orientés usage quotidien (transforme chaque spec en bénéfice concret), paragraphe matières/fabrication si pertinent, section « Ce produit n'est pas fait pour vous si… » (crédibilité), FAQ 3 questions dont livraison et retours. Interdit : superlatifs vides (« incroyable », « révolutionnaire »), specs brutes sans traduction client. »",
  },
  {
    type: "blockquote",
    text: "« Batterie 5000 mAh » est une spec. « Trois jours sans chargeur, même en déplacement » est une raison d'acheter. Le prompt doit forcer cette traduction systématique.",
  },
  { type: "h2", text: "Produire en volume : le prompt de déclinaison" },
  {
    type: "p",
    text: "Pour un catalogue de 50+ références : « Voici ma fiche produit modèle validée : [coller la meilleure]. Voici les données du produit suivant : [nom, specs, prix, différences]. Rédige sa fiche en gardant exactement la même structure, le même ton et la même longueur — seul le contenu produit change. Ne réutilise aucune formulation à l'identique : chaque fiche doit être unique pour le SEO. »",
  },
  { type: "h2", text: "Pages catégories : le SEO que tout le monde néglige" },
  {
    type: "p",
    text: "« Tu es consultant SEO e-commerce. Rédige le texte de la page catégorie « [catégorie] » (300 mots) ciblant le mot-clé « [mot-clé] ». Structure : H1 avec mot-clé, intro qui aide à choisir (critères de choix en 3 points), mini-guide des sous-catégories avec liens internes vers [liste], FAQ 2 questions issues des recherches Google associées. Le texte doit aider un vrai client à choisir — pas être un bloc de mots-clés que personne ne lit. »",
  },
  { type: "h2", text: "Emails : les 3 séquences qui font le chiffre" },
  { type: "h3", text: "Panier abandonné (3 emails)" },
  {
    type: "p",
    text: "« Tu es expert CRM e-commerce. Séquence panier abandonné pour [boutique, panier moyen X €] : Email 1 (H+1) : service — « un problème au paiement ? », photo du produit, zéro pression. Email 2 (H+24) : lever l'objection principale [laquelle : prix/confiance/taille] + preuve sociale. Email 3 (H+72) : incitation finale [livraison offerte / -10 %] avec vraie deadline. Objets max 40 caractères, corps max 120 mots, un CTA par email. Tutoiement/vouvoiement : [choisir]. »",
  },
  { type: "h3", text: "Post-achat et avis clients" },
  {
    type: "p",
    text: "« Séquence post-achat pour [produit] : Email 1 (livraison) : conseils d'utilisation qui réduisent les retours. Email 2 (J+10) : demande d'avis avec lien — facilite la tâche (2 questions guides), propose un geste pour la prochaine commande. Email 3 (J+30) : produit complémentaire [lequel] présenté comme un conseil, pas une promo. »",
  },
  { type: "h2", text: "Publicités Meta/TikTok : 3 angles par produit" },
  {
    type: "p",
    text: "« Tu es media buyer e-commerce. Pour [produit, prix, promesse], crée 3 publicités : angle problème/solution (le quotidien sans le produit vs avec), angle preuve (avis client réel [coller] mis en scène), angle démonstration (le détail produit qui surprend). Par pub : hook max 10 mots, corps 60-90 mots, CTA, et description du visuel/vidéo recommandé (3 premières secondes cruciales). Cible : [audience]. Pas de promesses invérifiables. »",
  },
  { type: "h2", text: "Photos produit avec Midjourney : le prompt visuel" },
  {
    type: "p",
    text: "« Product photography of [produit décrit précisément en anglais], [contexte : white studio background / lifestyle scene with...], soft diffused lighting, 85mm lens, high detail, commercial catalog style --ar 1:1 --style raw ». Pour les mises en situation : décrivez la scène client idéale (« on a wooden kitchen table, morning light, hands reaching for... »). Générez 4 variantes, gardez la meilleure, déclinez-la avec --sref pour la cohérence catalogue. Important : les visuels IA complètent vos vraies photos produit, ils ne remplacent pas la photo exacte de ce que reçoit le client.",
  },
  { type: "h2", text: "Service client : réponses qui fidélisent" },
  {
    type: "p",
    text: "« Tu es responsable service client de [boutique, ton de marque]. Réponds à ce message : [coller]. Règles : empathie réelle en première ligne (reformuler son problème), solution concrète ou prochaine étape datée, geste commercial si [conditions], jamais de langue de bois (« nous mettons tout en œuvre »). Max 100 mots. Si le client est en colère : reconnaître d'abord, résoudre ensuite, ne jamais se justifier longuement. »",
  },
  { type: "h2", text: "Les erreurs e-commerce spécifiques" },
  {
    type: "ol",
    items: [
      "Laisser l'IA inventer des caractéristiques produit — chaque affirmation doit venir de VOS données (risque juridique réel)",
      "Dupliquer la même fiche sur 50 produits en changeant 3 mots — Google déclasse le contenu quasi-dupliqué",
      "Générer des avis clients fictifs — illégal (DGCCRF) et détectable",
      "Promettre des délais ou garanties dans les pubs que votre logistique ne tient pas",
    ],
  },
  {
    type: "tip",
    title: "Standardiser la qualité",
    text: "Le vrai défi e-commerce n'est pas d'écrire une bonne fiche, c'est d'en écrire 200 de qualité constante. Un brief structuré réutilisable par type de contenu (fiche, catégorie, email, pub) est votre levier — PromptPilot les génère avec score qualité, 5 générations offertes pour tester sur votre best-seller.",
  },
  { type: "h2", text: "FAQ" },
  { type: "h3", text: "L'IA peut-elle gérer le SEO complet d'une boutique ?" },
  {
    type: "p",
    text: "Elle produit les contenus (fiches, catégories, blog) à grande échelle. La stratégie — quels mots-clés, quelle architecture, quels liens internes — reste votre travail ou celui d'un consultant. L'IA exécute une stratégie, elle n'en tient pas lieu.",
  },
  { type: "h3", text: "Quel outil IA pour une boutique Shopify ?" },
  {
    type: "p",
    text: "ChatGPT ou Claude pour tous les textes, Midjourney pour les visuels d'ambiance. Shopify Magic dépanne pour les fiches rapides mais reste générique. Le facteur décisif n'est pas l'outil : c'est le brief qui contient votre client, votre ton et vos données produit.",
  },
  { type: "h3", text: "Le contenu IA est-il pénalisé par Google ?" },
  {
    type: "p",
    text: "Google pénalise le contenu inutile, pas le contenu assisté par IA. Une fiche unique, précise et utile au client se positionne — qu'elle soit écrite par IA briefée ou à la main. Le quasi-dupliqué et le bourrage de mots-clés se font déclasser dans les deux cas.",
  },
];

export const articlePromptsEcommerce: SeoArticle = {
  slug: "prompts-ia-ecommerce",
  title: "Prompts IA pour e-commerce : fiches produits, pubs, emails qui vendent",
  description:
    "Le kit de prompts du e-commerçant : fiches produits, pages catégories SEO, panier abandonné, publicités Meta, photos Midjourney et service client. Copiables.",
  category: "guide",
  publishedAt: "2026-07-15",
  updatedAt: "2026-07-15",
  readingTimeMin: estimateReadingTime(blocks),
  keywords: [
    "prompt IA e-commerce",
    "prompt fiche produit",
    "ChatGPT Shopify",
    "prompt panier abandonné",
    "IA boutique en ligne",
  ],
  relatedSlugs: [
    "prompts-chatgpt-vendre-plus",
    "prompts-marketing-copywriting",
    "midjourney-vs-dalle-prompts",
  ],
  blocks,
};
