import type { SeoArticle } from "../types";
import { estimateReadingTime } from "./utils";

const blocks: SeoArticle["blocks"] = [
  {
    type: "p",
    text: "Vous cherchez « prompt Midjourney exemple », « comment utiliser Midjourney » ou « Midjourney débutant » parce que le résultat visuel promis sur Instagram ne ressemble pas à vos premiers essais Discord. Normal : Midjourney a sa propre grammaire de prompt, ses paramètres (--ar, --style, --v), et une logique d'itération (variations, upscale) que DALL·E ou ChatGPT ne partagent pas. Ce guide zero-to-first-masterpiece couvre setup, anatomy prompt, 10 exemples commentés, workflow, et FAQ.",
  },
  {
    type: "p",
    text: "Aucun prérequis artistique — juste willingness d'itérer. Midjourney récompense des descriptifs visuels précis plus que des concepts abstraits marketing.",
  },
  { type: "h2", text: "Comment utiliser Midjourney en 2026 : premiers pas" },
  {
    type: "ol",
    items: [
      "Créer compte midjourney.com (essai ou abonnement selon offre)",
      "Rejoindre le serveur Discord Midjourney OU utiliser interface web midjourney.com/imagine",
      "Dans channel #newbies ou barre prompt web : taper /imagine ou coller prompt",
      "Attendre grille 4 variations (~60 sec)",
      "Actions U1-U4 upscale, V1-V4 variations, 🔄 re-roll",
      "Sauvegarder favorites + noter prompt exact qui a fonctionné",
    ],
  },
  {
    type: "tip",
    title: "Budget débutant",
    text: "Commencez plan Basic, apprenez itération avant d'investir Pro. 200 générations/mois suffisent pour maîtriser bases si vous notez vos prompts.",
  },
  { type: "h2", text: "Anatomie d'un prompt Midjourney débutant" },
  {
    type: "p",
    text: "Structure recommandée : [Sujet] + [Environnement] + [Lumière] + [Caméra/style photo] + [Ambiance] + [Paramètres]. L'anglais domine pour stabilité ; vous pouvez penser en français puis traduire les descriptifs visuels.",
  },
  {
    type: "ul",
    items: [
      "Sujet : who/what — une idée principale par prompt",
      "Environnement : intérieur, ville, nature, studio",
      "Lumière : golden hour, overcast, neon rim light, softbox",
      "Caméra : 35mm, 85mm portrait, aerial drone, macro",
      "Style : editorial, cinematic, illustration, flat vector",
      "Params fin : --ar 16:9 --style raw --v 6 (ajuster selon version active)",
    ],
  },
  { type: "h2", text: "10 exemples de prompts Midjourney commentés" },
  { type: "h3", text: "1. Portrait pro LinkedIn" },
  {
    type: "p",
    text: "Prompt : confident businesswoman, navy blazer, neutral gray studio background, soft Rembrandt lighting, 85mm f/1.8, shallow depth of field, editorial corporate headshot --ar 4:5 --style raw. Pourquoi ça marche : sujet unique, lumière nommée, objectif photo crédible, ratio portrait.",
  },
  { type: "h3", text: "2. Hero site SaaS" },
  {
    type: "p",
    text: "Prompt : minimalist SaaS dashboard on laptop, clean white desk, plant accent, morning window light, tech editorial photography, muted blue accents, negative space right side --ar 16:9 --style raw. Usage : bannière site avec titre overlay à droite.",
  },
  { type: "h3", text: "3. Illustration blog" },
  {
    type: "p",
    text: "Prompt : flat vector illustration, person organizing digital sticky notes, pastel palette mint and coral, white background, modern 2026 design blog style --ar 3:2 --v 6. Style illustration vs photo pour articles how-to.",
  },
  { type: "h3", text: "4. Produit e-commerce" },
  {
    type: "p",
    text: "Prompt : ceramic coffee mug on marble surface, steam rising, soft side light, product photography, centered composition, high detail --ar 1:1 --style raw. Centré + lumière latérale = classic packshot.",
  },
  { type: "h3", text: "5. Paysage ambiance" },
  {
    type: "p",
    text: "Prompt : Norwegian fjord at golden hour, mirror calm water, dramatic clouds, wide angle landscape, cinematic color grading --ar 21:9 --style raw. Bon pour bannières widescreen.",
  },
  { type: "h3", text: "6. Food photography" },
  {
    type: "p",
    text: "Prompt : fresh croissant on wooden board, crumbs detail, morning backlight, rustic French bakery atmosphere, macro food photography --ar 4:5 --style raw.",
  },
  { type: "h3", text: "7. Logo concept (base)" },
  {
    type: "p",
    text: "Prompt : simple geometric logo icon for AI writing tool, pen and spark motif, flat design, single color navy on white, vector style, centered --ar 1:1 --v 6. Note : vectoriser en post-prod ; MJ = concept pas SVG final.",
  },
  { type: "h3", text: "8. Fashion editorial" },
  {
    type: "p",
    text: "Prompt : streetwear outfit full body, Paris cobblestone street, overcast soft light, 35mm fashion editorial, motion walk --ar 2:3 --style raw.",
  },
  { type: "h3", text: "9. Intérieur architecture" },
  {
    type: "p",
    text: "Prompt : Scandinavian living room, floor to ceiling windows, neutral tones, indoor plants, architectural photography, natural daylight --ar 16:9 --style raw.",
  },
  { type: "h3", text: "10. Abstract background" },
  {
    type: "p",
    text: "Prompt : abstract fluid gradients, deep purple and gold, soft blur, wallpaper 4k, minimal --ar 16:9 --v 6. Utile slides présentation.",
  },
  { type: "h2", text: "Paramètres essentiels à connaître" },
  {
    type: "ul",
    items: [
      "--ar WIDTH:HEIGHT — ratio (16:9 web, 4:5 Instagram, 1:1 carré)",
      "--style raw — rendu plus photographique, moins « MJ aesthetic »",
      "--v 6 — version modèle (vérifier doc officielle version courante)",
      "--s VALUE — stylization (bas = plus literal prompt)",
      "--no element — exclusion basique (moins fiable que description positive)",
    ],
  },
  { type: "h2", text: "Workflow itération débutant" },
  {
    type: "ol",
    items: [
      "Prompt simple 15-25 mots + --ar correct",
      "Choisir meilleure vignette grille",
      "Vary (subtle ou strong) pour affiner",
      "Upscale winner seulement",
      "Noter prompt + params dans Notion",
      "Une variable changée par itération (lumière OU angle, pas tout)",
    ],
  },
  { type: "h2", text: "Erreurs débutant Midjourney" },
  {
    type: "ul",
    items: [
      "Prompt concept marketing sans visuel concret",
      "Trop de sujets : « cat and dog and city and sunset and logo »",
      "Oublier --ar → recadrage painful",
      "Abandon après première grille médiocre",
      "Copier prompt viral sans adapter usage",
      "Attendre texte parfait dans image",
    ],
  },
  { type: "h2", text: "Questions fréquentes (People Also Ask)" },
  { type: "h3", text: "Midjourney est-il gratuit ?" },
  {
    type: "p",
    text: "Essai limité puis abonnement. Vérifiez midjourney.com/account pour offre courante 2026. Alternative gratuite image : DALL·E limites ChatGPT free.",
  },
  { type: "h3", text: "Prompt Midjourney en français ?" },
  {
    type: "p",
    text: "Possible mais anglais recommandé descriptifs techniques. PromptExpert peut générer variantes EN optimisées depuis idée FR.",
  },
  { type: "h3", text: "Comment utiliser Midjourney sans Discord ?" },
  {
    type: "p",
    text: "Interface web midjourney.com pour imagine, gallery, organize. Discord reste option historique.",
  },
  { type: "h3", text: "Midjourney vs DALL·E pour débuter ?" },
  {
    type: "p",
    text: "DALL·E plus simple si déjà ChatGPT. Midjourney plus puissant esthétique photo/artistique avec courbe apprentissage. Voir comparatif Midjourney vs DALL·E.",
  },
  { type: "h2", text: "Glossaire Midjourney pour débutants" },
  {
    type: "ul",
    items: [
      "Upscale — agrandir une vignette choisie en haute résolution",
      "Variation — regénérer proche ou loin du parent",
      "Remix — modifier prompt depuis image existante",
      "Stylize — degré « interprétation artistique » du modèle",
      "Raw style — rendu plus literal au prompt photo",
    ],
  },
  { type: "h2", text: "Premier brief client avec Midjourney" },
  {
    type: "p",
    text: "Structure brief : usage final (LinkedIn, print A4, site hero), mood 3 adjectifs, sujets obligatoires/interdits, ratios livrables, nombre itérations budgetées. Prompt MJ = exécution ; brief = contrat créatif. Montrez 4 variations upscale, pas 40 grilles brutes.",
  },
  { type: "h2", text: "Prochaine étape" },
  {
    type: "p",
    text: "Comparez Midjourney vs DALL·E, explorez exemples prompts IA gratuits, appliquez R-C-T-C en pensant usage final image.",
  },
  { type: "h2", text: "Exercice 7 jours débutant Midjourney" },
  {
    type: "ol",
    items: [
      "J1 — 5 portraits --ar 4:5 varier lumière seulement",
      "J2 — 5 paysages --ar 16:9 varier heure jour",
      "J3 — 5 produits packshot fond neutre",
      "J4 — 3 illustrations flat vs 3 photo same brief",
      "J5 — remix meilleure image J1-J4",
      "J6 — série cohérente 4 images même palette",
      "J7 — export upscale + note prompts gagnants",
    ],
  },
  { type: "h2", text: "Ressources communauté francophone" },
  {
    type: "p",
    text: "Rejoignez salons Discord design FR, suivez hashtags #promptfr #midjourneyfr, analysez prompts commentés (pas seulement image finale). Partagez vos prompts échoués — plus instructif que wins. Comparez avec guide Midjourney vs DALL·E quand vous hésitez outil.",
  },
  { type: "h2", text: "Synthèse débutant Midjourney" },
  {
    type: "p",
    text: "Comment utiliser Midjourney : brief visuel clair, anglais descriptif, --ar correct, itérer variations, upscale sélectif, documenter prompts. Exercice 7 jours bat tutorial passif. Prompt Midjourney exemple commentés ci-dessus = point départ — personnalisez sujet lumière style. PromptExpert génère descriptifs EN optimisés depuis idée FR.",
  },
  { type: "h2", text: "FAQ Midjourney débutant" },
  { type: "h3", text: "Combien de crédits pour apprendre Midjourney ?" },
  {
    type: "p",
    text: "Plan Basic suffit exercice 7 jours si ~5-10 generations/jour disciplinées. Notez chaque prompt pour éviter regénérations waste.",
  },
  { type: "h3", text: "Premier prompt Midjourney réussi : lequel ?" },
  {
    type: "p",
    text: "Portrait studio simple : sujet, soft light, 85mm, --ar 4:5 --style raw. Variables limitées = apprentissage cause-effet.",
  },
  { type: "h3", text: "Midjourney web vs Discord 2026 ?" },
  {
    type: "p",
    text: "Web UI recommandée débutants : gallery organize, moins bruit channels. Discord utile inspiration communauté.",
  },
  { type: "h2", text: "Après les premiers succès Midjourney" },
  {
    type: "p",
    text: "Passez de grids aléatoires à briefs clients structurés : moodboard mots + 3 refs visuelles + contraintes ratio livrables. Créez library styles maison (3-5 prompts base lumière/caméra). Enseignez clients itération V1-V4 pas magie one-shot. Facturez process créatif + retouches Photoshop — IA accélère, ne remplace pas direction artistique.",
  },
  { type: "h2", text: "Ressources apprentissage continu" },
  {
    type: "p",
    text: "Suivez changelog Midjourney officiel, testez nouveaux params sur prompts gold. Comparez résultats avec guide Midjourney vs DALL·E quand clients demandent « même style partout ». Rejoignez communautés FR partage prompts commentés pas seulement renders. Documentez échecs — prompts ratés enseignent plus que wins. PromptExpert génère base EN depuis brief FR pour accélérer phase test.",
  },
  {
    type: "p",
    text: "Objectif 30 jours : 20 prompts documentés personal library, 3 styles maîtrisés (portrait, produit, paysage), workflow upscale livrable client. Mesurable, atteignable, vendable freelance.",
  },
  { type: "h2", text: "Passer du débutant au prompt Midjourney intermédiaire" },
  {
    type: "tip",
    title: "Exercice 7 jours",
    text: "Un style par jour, notes prompts obligatoires — discipline bat talent début Midjourney.",
  },
  {
    type: "p",
    text: "Critères niveau intermédiaire : reproduire style demandé client 2 essais, maîtriser --ar --style raw --cref, library 15+ prompts taggés, workflow remix/upscale sans hésitation, expliquer choix lumière/caméra au client. Prompt Midjourney exemple de ce guide = curriculum J1. Hub : midjourney vs DALL·E, exemples gratuits, prompts vidéo.",
  },
  { type: "h2", text: "FAQ prompt Midjourney exemple avancé" },
  {
    type: "p",
    text: "Comment utiliser Midjourney pour série cohérente Instagram : fixez palette hex en mots (teal cream muted), même objectif 35mm, --cref image hero si personnage récurrent, variez seulement décor/action. Prompt exemple série : « same character teal blazer, different european cities, editorial travel, golden hour, 4:5 --style raw --cref [url] ». Itérez V2-V3 pas regen from scratch. Export upscale batch dimanche, schedule posts semaine.",
  },
  {
    type: "p",
    text: "Recherche Google « prompt midjourney exemple » ou « comment utiliser midjourney » : ce guide couvre setup, 10 exemples, params, FAQ — appliquez exercice 7 jours pour ancrer compétence pratique au-delà lecture passive. PromptExpert accélère descriptifs EN depuis brief FR. Comparez midjourney-vs-dalle-prompts quand clients exigent « même rendu partout » — adaptez workflow pas prompt unique. Objectif 30 jours : autonomie intermédiaire. Lancez /imagine avec l'exemple 1 portrait studio — premier succès en quinze minutes avec --ar 4:5 --style raw. Bonne génération.",
  },
];

export const articleMidjourneyDebutant: SeoArticle = {
  slug: "prompt-midjourney-debutant-guide",
  title: "Prompt Midjourney débutant : exemples et guide 2026",
  description:
    "Comment utiliser Midjourney : setup, 10 exemples prompts commentés, paramètres --ar --style, workflow et FAQ débutant.",
  category: "guide",
  publishedAt: "2026-03-05",
  updatedAt: "2026-05-30",
  readingTimeMin: estimateReadingTime(blocks),
  keywords: [
    "prompt midjourney exemple",
    "comment utiliser midjourney",
    "midjourney débutant",
    "midjourney prompt français",
    "tutorial midjourney",
  ],
  relatedSlugs: [
    "midjourney-vs-dalle-prompts",
    "exemples-prompts-ia-gratuits",
    "quest-ce-que-le-prompt-engineering",
    "prompts-video-sora-runway",
  ],
  blocks,
};
