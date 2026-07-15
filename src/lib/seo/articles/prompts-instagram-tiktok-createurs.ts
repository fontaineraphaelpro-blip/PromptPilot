import type { SeoArticle } from "../types";
import { estimateReadingTime } from "./utils";

const blocks: SeoArticle["blocks"] = [
  {
    type: "p",
    text: "Publier tous les jours sans y passer ses journées : c'est la promesse de l'IA pour les créateurs de contenu. La réalité est plus nuancée — ChatGPT produit du contenu d'une banalité mortelle quand on le brief mal, et les audiences fuient le générique. Ce guide donne les prompts qui préservent votre voix tout en multipliant votre production : idées, scripts, carrousels, calendrier éditorial.",
  },
  { type: "h2", text: "La règle d'or : nourrir l'IA avec VOTRE voix" },
  {
    type: "p",
    text: "Avant tout prompt de production, créez votre « fiche créateur » et collez-la en tête de chaque conversation : niche et angle unique, audience (qui, quel niveau, quelle douleur), ton en 3 adjectifs avec exemples de phrases typiques, formats qui performent chez vous, sujets interdits. Sans cette fiche, ChatGPT écrit comme tout le monde — avec elle, il écrit comme vous, en plus rapide.",
  },
  { type: "h2", text: "Générer des idées qui ne sont pas déjà partout" },
  {
    type: "p",
    text: "« Tu es stratège contenu pour créateurs. Ma niche : [niche]. Mon audience : [description]. Mes 5 derniers contenus qui ont le mieux marché : [liste avec formats]. Génère 20 idées de posts classées en 4 angles : contre-intuitif (casser une croyance du secteur), expérience personnelle (mes échecs/leçons — pose-moi des questions), pratique actionnable (mini-tutoriels), réaction à l'actualité de [niche]. Pour chaque idée : le hook en une phrase. Élimine tout ce qui a déjà été vu 100 fois. »",
  },
  {
    type: "blockquote",
    text: "Le meilleur filtre anti-banalité : demander à l'IA de poser des questions sur VOS expériences. Vos échecs, vos clients, vos coulisses — c'est le seul contenu que personne ne peut copier.",
  },
  { type: "h2", text: "Scripts Reels / TikTok : la structure en 4 temps" },
  {
    type: "p",
    text: "« Tu es scénariste de vidéos courtes (Reels/TikTok). Écris le script d'une vidéo de 30-45 secondes sur [sujet] pour [audience]. Structure : HOOK (3 premières secondes, max 10 mots, sans « salut les amis ») → PROMESSE (ce qu'ils sauront à la fin) → CONTENU (3 points max, phrases courtes, une idée par phrase) → CTA [commenter/suivre/lien bio]. Ajoute les indications visuelles entre crochets [texte à l'écran, changement de plan]. Ton : [tes 3 adjectifs]. Écris comme on parle, pas comme on rédige. »",
  },
  { type: "h3", text: "Variante : décliner un contenu qui a marché" },
  {
    type: "p",
    text: "« Ce post a très bien performé : [coller]. Analyse pourquoi (hook, sujet, structure, émotion), puis propose 5 déclinaisons qui exploitent le même ressort sans répéter le contenu : angle inverse, cas concret, erreur associée, version avancée, réponse aux commentaires reçus [coller les meilleurs commentaires]. »",
  },
  { type: "h2", text: "Carrousels Instagram / LinkedIn qui se sauvegardent" },
  {
    type: "p",
    text: "« Crée un carrousel de 8 slides sur [sujet] pour [audience]. Slide 1 : hook visuel (max 8 mots) qui promet un bénéfice concret. Slides 2-7 : un point par slide, titre 5 mots + explication 20 mots max — le lecteur doit tout comprendre en scrollant vite. Slide 8 : récap + CTA sauvegarde. Critère : chaque slide doit donner envie de voir la suivante. Fournis aussi la légende (150 mots, storytelling personnel en ouverture) et 5 hashtags de niche (pas #motivation). »",
  },
  { type: "h2", text: "Le calendrier éditorial en un prompt" },
  {
    type: "p",
    text: "« Tu es responsable éditorial. Crée mon calendrier de contenu sur 2 semaines : [X] posts/semaine sur [plateformes]. Répartition : 40 % valeur pratique, 30 % opinion/angle personnel, 20 % coulisses/preuve, 10 % promotion de [offre]. Pour chaque post : jour, plateforme, format (reel/carrousel/texte), sujet, hook, CTA. Varie les formats, jamais deux promos d'affilée. Mon actu à intégrer : [lancements, événements]. Format : tableau. »",
  },
  { type: "h2", text: "Recycler intelligemment : 1 contenu = 5 formats" },
  {
    type: "ol",
    items: [
      "« Transforme cette vidéo YouTube [coller le script/transcription] en : un thread de 8 tweets, un carrousel de 8 slides, 3 hooks de Reels sur les 3 meilleurs moments, une newsletter de 300 mots, un post LinkedIn avec angle pro. Garde mes formulations, adapte le format à chaque plateforme. »",
      "Règle : recycler l'idée et la substance, jamais copier-coller le même texte partout — chaque plateforme a ses codes",
      "Espacez les déclinaisons de quelques jours à quelques semaines : votre audience ne voit pas tout",
    ],
  },
  { type: "h2", text: "Les erreurs qui tuent l'engagement" },
  {
    type: "ul",
    items: [
      "Publier la sortie brute de l'IA — relisez à voix haute, remplacez ce que vous ne diriez jamais",
      "Hooks putaclick sans payoff : l'audience clique une fois, se désabonne ensuite",
      "Générer 30 posts d'avance sans intégrer les retours — vos commentaires sont votre meilleure source d'idées",
      "Oublier la preuve personnelle : un conseil sans histoire vécue est un conseil que Google donne déjà",
    ],
  },
  { type: "h2", text: "Rythme réaliste : ce que tiennent les créateurs FR" },
  {
    type: "p",
    text: "Avec une fiche créateur stable et 2–3 prompts templates (idées, script court, carrousel), un solo créateur francophone tient souvent 4–5 posts/semaine en 4–6 heures totales — hors tournage. Passer à du quotidien (7 Reels) sans équipe devient rare : l'IA réduit l'écriture, pas le tournage, le montage, ni la réponse aux DMs. Si votre objectif est « poster tous les jours », automatisez l'idéation et les scripts ; protégez 30–40 % du temps pour le tourné et la retouche voix. Sinon vous publiez beaucoup… et engagez peu.",
  },
  { type: "h2", text: "Exemple avant / après : hook Reel" },
  {
    type: "p",
    text: "Avant : « Salut les amis, aujourd'hui je vais vous parler de productivité. » → swipe immédiat.",
  },
  {
    type: "p",
    text: "Après (prompt avec niche + interdits) : hook max 10 mots pour coach freelance FR, angle contre-intuitif, pas de « salut », pas de promesse miracle. Sortie typique : « Votre to-do de 18 tâches vous sabote. » Puis promesse + 3 points + CTA commentaire. Vous gardez le fond, vous réécrivez 20 % à l'oral pour coller à votre voix. C'est ce 20 % qui fait la différence entre un Reel qui retient et un Reel « ChatGPT détecté ».",
  },
  { type: "h2", text: "Ce qui ne marche PAS pour les créateurs" },
  {
    type: "ul",
    items: [
      "Générer 30 posts d'un coup et les programmer sans lire les commentaires de la semaine",
      "Hooks putaclick sans payoff dans les 20 secondes suivantes",
      "Recopier le même carrousel LinkedIn sur Instagram sans adapter le format",
      "Demander à l'IA des « stories personnelles » inventées — l'audience sent le faux",
    ],
  },
  { type: "h2", text: "Quand NE PAS utiliser l'IA" },
  {
    type: "p",
    text: "Contenus de crise (shitstorm, polémique, sujet sensible), annonces personnelles importantes, prises de position politiques, et tout ce qui engage juridiquement (santé, finance, allégations produit). Là, écrivez vous-même ou avec un juriste. L'IA reste utile pour brainstormer des angles — pas pour publier le draft brutal.",
  },
  { type: "h2", text: "Mini checklist avant de publier un script IA" },
  {
    type: "ol",
    items: [
      "Fiche créateur collée en tête de conversation",
      "Hook relu à voix haute (moins de 3 secondes d'ennui)",
      "Au moins un élément vécu / preuve personnelle",
      "CTA unique et clair",
      "Hashtags de niche seulement (pas le top 50 générique)",
      "Une retouche manuelle minimale (formulations que vous diriez vraiment)",
    ],
  },
  {
    type: "tip",
    title: "Gagner encore du temps",
    text: "Chaque prompt de ce guide demande votre fiche créateur + le contexte du post. PromptPilot structure automatiquement ces briefs pour ChatGPT, Claude ou Midjourney (visuels de posts) — avec 5 générations offertes pour tester sur votre prochain carrousel.",
  },
  { type: "h2", text: "FAQ" },
  { type: "h3", text: "L'algorithme pénalise-t-il le contenu généré par IA ?" },
  {
    type: "p",
    text: "Les plateformes pénalisent le contenu qui ne retient pas l'attention — générique, répétitif, sans personnalité. Qu'il soit écrit par IA ou par vous n'entre pas en compte : c'est la rétention qui juge. Un script IA nourri de vos histoires performe ; un script IA générique meurt.",
  },
  { type: "h3", text: "Quelle IA pour les visuels de posts ?" },
  {
    type: "p",
    text: "Midjourney pour les visuels d'ambiance et illustrations de marque, DALL·E pour les compositions avec texte simple, Canva AI pour les templates rapides. Le prompt visuel obéit à d'autres règles que le texte : décrivez la scène, le style, la lumière et le format (--ar 4:5 pour le feed Instagram).",
  },
  { type: "h3", text: "Combien de temps gagne-t-on réellement ?" },
  {
    type: "p",
    text: "Les créateurs organisés passent de 2 h à 30-40 min par post (idée → script → visuel → légende). Le gain réel est ailleurs : la régularité. Publier 5 fois par semaine devient tenable, et la régularité bat le talent sur tous les algorithmes.",
  },
  { type: "h3", text: "Faut-il une IA différente pour TikTok et Instagram ?" },
  {
    type: "p",
    text: "Non pour le modèle texte. Oui pour le brief : TikTok tolère plus le ton oral brut et les cuts rapides ; Instagram Reels reste un peu plus « soigné » selon les niches. Demandez deux variantes dans le même prompt (« version TikTok plus cash » / « version IG un cran plus claire ») plutôt que de tout recommencer.",
  },
  { type: "h3", text: "Comment garder ma voix après 50 scripts IA ?" },
  {
    type: "p",
    text: "Mettez à jour votre fiche créateur tous les mois avec 5 phrases que vous avez vraiment dites en vidéo. Interdisez explicitement les tournures que vous détestez. Et publiez régulièrement un contenu 100 % écrit à la main : ça recalibre votre oreille.",
  },
];

export const articlePromptsCreateurs: SeoArticle = {
  slug: "prompts-instagram-tiktok-createurs",
  title: "Prompts IA pour créateurs : Reels, TikTok, carrousels sans y passer la journée",
  description:
    "Scripts Reels/TikTok, carrousels Instagram, calendrier éditorial, recyclage : les prompts ChatGPT des créateurs de contenu qui publient tous les jours.",
  category: "guide",
  publishedAt: "2026-07-15",
  updatedAt: "2026-07-15",
  readingTimeMin: estimateReadingTime(blocks),
  keywords: [
    "prompt Instagram",
    "prompt TikTok",
    "prompt Reels ChatGPT",
    "IA créateur de contenu",
    "calendrier éditorial IA",
  ],
  relatedSlugs: [
    "prompts-marketing-copywriting",
    "prompts-video-sora-runway",
    "prompt-midjourney-debutant-guide",
  ],
  blocks,
};
