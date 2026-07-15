import type { SeoArticle } from "../types";
import { estimateReadingTime } from "./utils";

const blocks: SeoArticle["blocks"] = [
  {
    type: "p",
    text: "Lovable, Bolt, v0, Cursor : les outils qui transforment un prompt en site web fonctionnel ont explosé. Mais 90 % des utilisateurs tapent « crée-moi un site pour mon restaurant » et obtiennent un template générique violet avec du Lorem Ipsum. La différence entre un jouet et un site livrable tient au prompt initial et à la façon d'itérer. Guide complet, avec briefs copiables.",
  },
  { type: "h2", text: "Choisir l'outil selon votre objectif" },
  {
    type: "ul",
    items: [
      "Lovable / Bolt : app web complète (auth, base de données, paiement) sans coder — le plus adapté aux non-développeurs",
      "v0 (Vercel) : composants et pages React/Tailwind soignés, à intégrer dans un projet existant",
      "Cursor : contrôle total sur un vrai projet de code — pour développeurs ou projets qui vivront longtemps",
      "Framer / Webflow AI : sites vitrines marketing avec animations, sans logique métier complexe",
    ],
  },
  { type: "h2", text: "Le brief initial : 80 % du résultat final" },
  {
    type: "p",
    text: "Le premier prompt fixe l'architecture, la stack et le design system. Un premier prompt pauvre condamne aux corrections infinies. Voici la structure d'un brief qui fonctionne, quelle que soit la plateforme :",
  },
  {
    type: "ol",
    items: [
      "Quoi : type de site + objectif business (« site de réservation pour mon studio de yoga, objectif : réduire les no-shows »)",
      "Pour qui : utilisateur type et son parcours principal en une phrase",
      "Pages : liste exhaustive (accueil, services, réservation, contact, mentions légales)",
      "Fonctionnalités : formulaires, paiement, compte utilisateur, admin — soyez limitatif, tout ajout coûte des itérations",
      "Design : 2-3 adjectifs + un site de référence + couleurs de marque (codes hex si vous les avez)",
      "Contenu : vos vrais textes, ou demandez des placeholders réalistes dans votre langue",
    ],
  },
  { type: "h3", text: "Exemple de brief complet (copiable et adaptable)" },
  {
    type: "p",
    text: "« Crée un site pour [activité] destiné à [cible]. Pages : accueil (hero avec [promesse], 3 services, témoignages, CTA réservation), page services détaillée, page à-propos, contact avec formulaire (nom, email, message) et carte. Design : épuré et chaleureux, inspiration [référence], couleurs #2D5A4A (principal) et #F4F1EA (fond), typographie sans-serif moderne. Mobile-first : 70 % de mon trafic est mobile. Textes : utilise ceux-ci [coller] — n'invente aucun prix ni témoignage. Langue : français. Pas d'animations lourdes. »",
  },
  { type: "h2", text: "Itérer sans tout casser : la règle du un-changement-par-prompt" },
  {
    type: "p",
    text: "Deuxième erreur fatale : demander cinq modifications dans le même message. L'IA en applique trois, en casse une, et vous ne savez plus ce qui a changé. Itérez comme un développeur :",
  },
  {
    type: "ul",
    items: [
      "Un prompt = un changement ciblé : « Sur la page d'accueil uniquement, remplace la section témoignages par un carrousel de 3 avis »",
      "Nommez les éléments comme l'outil les nomme (section hero, navbar, footer) — faites un tour du site généré avant d'itérer",
      "Précisez ce qui ne doit PAS bouger : « sans toucher au header ni aux couleurs »",
      "En cas de casse : « la dernière modification a cassé [X], reviens à la version précédente de ce composant » fonctionne sur la plupart des outils",
    ],
  },
  { type: "h2", text: "Les prompts d'étape (checklist de production)" },
  { type: "h3", text: "SEO et métadonnées" },
  {
    type: "p",
    text: "« Ajoute les métadonnées SEO de chaque page : title unique (max 60 caractères) incluant [mot-clé principal], meta description engageante (max 155 caractères), balises Open Graph. Structure Hn propre : un seul H1 par page. Ajoute un sitemap et un fichier robots.txt. »",
  },
  { type: "h3", text: "Responsive et performance" },
  {
    type: "p",
    text: "« Vérifie le rendu mobile de toutes les pages : aucun débordement horizontal, boutons d'au moins 44px de hauteur, textes lisibles sans zoom. Lazy-load les images sous la ligne de flottaison et convertis-les en WebP. »",
  },
  { type: "h3", text: "Formulaires et conversion" },
  {
    type: "p",
    text: "« Le formulaire de contact doit : valider les champs côté client avec messages d'erreur en français, afficher un état de chargement, confirmer l'envoi, et m'envoyer les soumissions à [email]. Ajoute une protection anti-spam simple (honeypot). »",
  },
  { type: "h2", text: "Ce que le prompt ne fera pas à votre place" },
  {
    type: "ul",
    items: [
      "Le contenu réel : vos textes, photos, prix, témoignages — l'IA génère des placeholders, pas votre crédibilité",
      "Le nom de domaine, l'hébergement et les emails professionnels",
      "Le juridique : mentions légales, politique de confidentialité, conformité RGPD de vos formulaires",
      "La maintenance : un site vit — prévoyez qui fera les mises à jour",
    ],
  },
  { type: "h2", text: "Outils vs prompts : où mettez-vous l'effort ?" },
  {
    type: "p",
    text: "Beaucoup comparent Lovable et Bolt pendant des jours alors que leur brief tient en une phrase. Inversez la priorité : un brief solide obtenu en 20 minutes sur n'importe lequel des deux outils bat un brief flou sur « le meilleur » outil du moment. Les écarts de qualité entre plateformes existent (design par défaut, export code, intégrations), mais ils pèsent moins que pages listées, couleurs fixées et contenus réels. Testez le même brief sur deux outils gratuits si vous hésitez — en 30 minutes vous avez votre verdict pour VOTRE cas, pas celui d'un YouTubeur.",
  },
  { type: "h2", text: "Exemple avant / après : salon de coiffure" },
  {
    type: "p",
    text: "Avant : « Crée un site pour mon salon de coiffure. » → hero violet, boutons « Book Now », horaires inventés, photos de stock douteuses.",
  },
  {
    type: "p",
    text: "Après : brief avec pages listées, couleurs #1A1A1A / #F7E7CE, référence visuelle, vrais horaires, interdiction d'inventer les prix, mobile-first, CTA « Prendre rendez-vous » vers un formulaire (pas Calendly inventé). Premier jet déjà à 60–70 % ; il reste typo, photos réelles et mentions légales. Comptez 2–4 heures d'itération disciplinée pour un vitrine correct, pas « 5 minutes magiques » comme sur les pubs LinkedIn.",
  },
  { type: "h2", text: "Ce qui ne marche PAS sur Lovable / Bolt / v0" },
  {
    type: "ul",
    items: [
      "Cinq changements dans le même message (« change le hero, ajoute un blog, refais le footer, branche Stripe »)",
      "Demander un « design unique » sans référence ni palette — l'IA retombe sur ses défauts",
      "Laisser l'outil inventer témoignages et tarifs que vous collerez en prod",
      "Vouloir une app e-commerce complexe + admin + multi-langue dès le prompt 1",
    ],
  },
  { type: "h2", text: "Quand NE PAS passer par un site « un prompt »" },
  {
    type: "p",
    text: "Catalogue Shopify à milliers de SKU, marketplace multi-vendeurs, app avec logique métier critique (santé, finance, données RH), ou projet où un design system d'agence est déjà contracté. Dans ces cas, un prototype IA reste utile… comme brief pour un développeur, pas comme produit final. Pour un site vitrine local (resto, coach, artisan), le ratio temps/qualité est souvent imbattable.",
  },
  { type: "h2", text: "Mini checklist avant le premier prompt" },
  {
    type: "ol",
    items: [
      "Liste des pages écrite",
      "Parcours principal de l'utilisateur résumé en une phrase",
      "Palette (hex) + 1 référence visuelle",
      "Textes réels ou placeholders explicitement marqués",
      "Fonctionnalités hors scope listées (ce qu'on ne fait PAS au V1)",
      "Interdits design (pas de violet par défaut, pas d'animation lourde…)",
    ],
  },
  {
    type: "tip",
    title: "Avant de lancer votre premier prompt",
    text: "Écrivez votre brief au brouillon avec les 6 sections ci-dessus. Un brief PromptPilot pour Lovable ou Bolt structure automatiquement quoi/pour qui/pages/design/contraintes — avec un score qui vous dit si des informations critiques manquent.",
  },
  { type: "h2", text: "FAQ" },
  { type: "h3", text: "Peut-on vraiment créer un site professionnel avec un prompt ?" },
  {
    type: "p",
    text: "Un site vitrine ou un MVP d'app, oui — en quelques heures avec un bon brief et des itérations disciplinées. Un e-commerce à fort trafic ou une app complexe demanderont un développeur, mais le prototype généré par IA sert alors d'excellent cahier des charges.",
  },
  { type: "h3", text: "Lovable ou Bolt : lequel choisir ?" },
  {
    type: "p",
    text: "Les deux couvrent le même besoin (app full-stack par prompt). Lovable est souvent plus soigné en design par défaut, Bolt plus flexible sur les stacks. Testez le même brief sur les deux avec leurs crédits gratuits : votre cas d'usage tranchera mieux que n'importe quel comparatif.",
  },
  { type: "h3", text: "Combien coûte un site créé par IA ?" },
  {
    type: "p",
    text: "Comptez 20-50 €/mois pour l'outil (Lovable, Bolt) + 10-15 €/an de domaine + hébergement souvent inclus. Contre 1 500-5 000 € pour un site vitrine en agence. La contrepartie : votre temps d'itération et un design moins unique.",
  },
  { type: "h3", text: "Mon prompt donne un résultat moche, que faire ?" },
  {
    type: "p",
    text: "Le design générique vient d'un brief sans direction artistique. Ajoutez systématiquement : une référence visuelle précise (« comme linear.app », « comme le site de [marque] »), vos codes couleurs, et l'interdiction explicite des dégradés violets par défaut. Puis itérez section par section.",
  },
  { type: "h3", text: "Faut-il savoir coder pour corriger ensuite ?" },
  {
    type: "p",
    text: "Non pour un vitrine simple hébergé sur Lovable/Bolt. Oui dès que vous exportez vers un repo et que vous voulez du sur-mesure durable — là, Cursor + un développeur (même à temps partiel) devient le bon duo. Gardez l'outil no-code tant que les besoins évoluent lentement.",
  },
  { type: "h3", text: "Comment gérer le RGPD des formulaires ?" },
  {
    type: "p",
    text: "L'IA peut générer une page mentions légales et une case de consentement, mais la conformité réelle dépend de votre hébergeur, de votre outil d'email et de votre finalité de traitement. Faites relire par quelqu'un qui connaît le sujet — ou utilisez un générateur juridique sérieux + votre politique réelle. Ne publiez jamais une politique inventée.",
  },
];

export const articleCreerSiteWeb: SeoArticle = {
  slug: "prompt-ia-creer-site-web",
  title: "Créer un site web avec l'IA : le guide des prompts (Lovable, Bolt, v0)",
  description:
    "Comment écrire le prompt qui génère un vrai site pro sur Lovable, Bolt, v0 ou Cursor : brief initial copiable, méthode d'itération, SEO et pièges à éviter.",
  category: "guide",
  publishedAt: "2026-07-15",
  updatedAt: "2026-07-15",
  readingTimeMin: estimateReadingTime(blocks),
  keywords: [
    "prompt créer site web",
    "Lovable prompt",
    "Bolt new prompt",
    "créer site avec IA",
    "prompt v0 Vercel",
  ],
  relatedSlugs: [
    "prompts-cursor-guide-developpeur",
    "comment-faire-un-bon-prompt-ia",
    "10-erreurs-prompt-ia",
  ],
  blocks,
};
