import type { SeoArticle } from "../types";
import { estimateReadingTime } from "./utils";

const blocks: SeoArticle["blocks"] = [
  {
    type: "p",
    text: "Midjourney et DALL·E (OpenAI, via ChatGPT ou API) sont les deux noms que les créatifs français tapent le plus quand ils cherchent « prompt image IA ». Pourtant leurs moteurs, interfaces et syntaxes diffèrent radicalement : copier un prompt Midjourney word-for-word dans DALL·E — ou l'inverse — produit souvent déception. Ce comparatif 2026 explique comment adapter vos prompts image à chaque outil.",
  },
  {
    type: "p",
    text: "Vous y trouverez philosophies de prompting, tableaux comparatifs, exemples même brief adapté, paramètres Midjourney (--ar, --style), bonnes pratiques DALL·E conversationnel, erreurs communes, et liens vers le guide Midjourney débutant.",
  },
  { type: "h2", text: "Deux logiques de génération image" },
  {
    type: "p",
    text: "Midjourney : communauté Discord/API, esthétique artistique forte, paramètres techniques en suffixe, itération variations/upscale. DALL·E 3 : langage naturel, intégration ChatGPT pour affiner conversationnellement, meilleure adhérence consignes texte dans image (avec limites). Penser « descriptif visuel dense + params » vs « intention + conversation ».",
  },
  {
    type: "blockquote",
    text: "Un prompt image n'est pas un prompt marketing — c'est une direction artistique et technique compressée.",
  },
  { type: "h2", text: "Midjourney : penser en termes visuels" },
  {
    type: "h3",
    text: "Structure prompt Midjourney efficace",
  },
  {
    type: "ol",
    items: [
      "Sujet principal + action/pose",
      "Environnement / décor",
      "Lumière (golden hour, studio softbox, néon)",
      "Objectif caméra (35mm, macro, wide angle, bokeh)",
      "Style (editorial, cinematic, flat vector, watercolor)",
      "Palette couleurs optionnelle",
      "Paramètres : --ar 16:9 --style raw --v 6",
    ],
  },
  {
    type: "p",
    text: "Exemple : « female entrepreneur presenting SaaS dashboard on laptop, modern Paris coworking, soft window light, 85mm portrait, editorial photography, muted teal and cream palette --ar 4:5 --style raw »",
  },
  {
    type: "h3",
    text: "Spécificités Midjourney"
  },
  {
    type: "ul",
    items: [
      "Anglais souvent plus stable que français pour descriptifs",
      "Éviter négations complexes ; décrire ce que vous VOULEZ",
      "Itérer V1-V4 + upscale plutôt qu'un prompt parfait unique",
      "Références artistes/styles : efficace mais risque homogénéisation",
      "Texte dans image : historiquement faible — prévoir post-traitement",
    ],
  },
  { type: "h2", text: "DALL·E : clarté et intention conversationnelle" },
  {
    type: "h3",
    text: "Structure prompt DALL·E efficace"
  },
  {
    type: "p",
    text: "Formulez usage final + scène explicite + contraintes composition. Exemple ChatGPT : « Illustration flat vector pour hero site SaaS : personnage simplifié devant écran prompts, fond dégradé bleu-violet clair, pas de texte dans l'image, espace négatif à droite pour titre, style moderne 2026, format paysage 16:9. »",
  },
  {
    type: "h3",
    text: "Spécificités DALL·E"
  },
  {
    type: "ul",
    items: [
      "Français très utilisable via ChatGPT",
      "Corrections en langage naturel : « rends le fond plus clair », « enlève le logo »",
      "Meilleure consigne « no text » mais pas garantie 100 %",
      "Moins de paramètres techniques ; plus de dialogue itératif",
      "Idéal mockups UI, icônes, scènes explicites product",
    ],
  },
  { type: "h2", text: "Même brief, deux prompts adaptés" },
  { type: "h3", text: "Brief" },
  {
    type: "p",
    text: "Hero image blog article « prompt engineering », ambiance pro futuriste accessible, pas cliché robot.",
  },
  { type: "h3", text: "Midjourney" },
  {
    type: "p",
    text: "professional writer at minimalist desk, holographic text fragments floating subtly, warm morning light, Scandinavian office, editorial photo, shallow depth of field, confident mood, no robots --ar 16:9 --style raw --v 6",
  },
  { type: "h3", text: "DALL·E via ChatGPT" },
  {
    type: "p",
    text: "Photo réaliste style editorial : rédacteur professionnel travaille sur laptop, ambiance bureau lumineux minimaliste, touches subtiles bleu tech sans robots ni cerveaux IA clichés. Cadrage paysage avec espace pour titre en haut. Pas de texte généré dans l'image.",
  },
  { type: "h2", text: "Tableau comparatif rapide" },
  {
    type: "ul",
    items: [
      "Esthétique default — MJ plus « artistique », DALL·E plus « illustratif propre »",
      "Workflow — MJ grille variations ; DALL·E edit conversationnel",
      "Courbe apprentissage params — MJ plus steep (--ar, --s, --cref)",
      "Intégration — DALL·E natif ChatGPT ; MJ Discord ou API tierce",
      "Texte lisible — tous deux limités ; typo = post-prod",
      "Cohérence personnage — MJ --cref ; DALL·E variable",
    ],
  },
  { type: "h2", text: "Erreurs communes cross-outil" },
  {
    type: "ol",
    items: [
      "Réutiliser prompt MJ avec --params dans DALL·E",
      "Prompt marketing long sans descriptif visuel concret",
      "Trop de sujets dans une image (focus dilué)",
      "Négation « no blur no dark no people » — reformuler positif",
      "Attendre typo parfaite dans image générée",
      "Ignorer ratio : recadrage destructif post-gen",
    ],
  },
  { type: "h2", text: "Questions fréquentes (People Also Ask)" },
  { type: "h3", text: "Midjourney ou DALL·E pour un site web ?" },
  {
    type: "p",
    text: "DALL·E plus rapide mockups UI et illustrations clean. Midjourney meilleur impact visuel hero photos artistiques. Souvent mix : MJ hero, DALL·E icônes/illustrations.",
  },
  { type: "h3", text: "Prompts en français ou anglais ?" },
  {
    type: "p",
    text: "DALL·E : français OK. Midjourney : anglais recommandé descriptif principal. Bilingue : notes FR, rendu EN.",
  },
  { type: "h3", text: "Peut-on combiner avec prompts vidéo ?" },
  {
    type: "p",
    text: "Image gen = frame 0. Voir guide prompts vidéo Sora Runway pour mouvement depuis still ou brief commun.",
  },
  { type: "h2", text: "Workflow agence : Midjourney + DALL·E combinés" },
  {
    type: "p",
    text: "Pattern courant 2026 : Midjourney pour hero photo et moodboards client ; DALL·E pour icônes, infographies simples, edits rapides via ChatGPT conversation. Brief créatif unique en amont, deux pipelines prompt dérivés. Évite guerre religieuse outil unique.",
  },
  { type: "h2", text: "Accessibilité et prompts image" },
  {
    type: "p",
    text: "Demandez contrastes suffisants, évitez soleil bas uniquement pour info critique, prévoyez alt text en prompt meta : « composition lisible petit écran mobile ». Alt text final reste rédaction humaine pour SEO et a11y.",
  },
  { type: "h2", text: "Prochaine étape" },
  {
    type: "p",
    text: "Guide Midjourney débutant pour premiers pas, prompts vidéo pour motion, quest-ce que prompt engineering pour bases texte.",
  },
  { type: "h2", text: "Charte prompts image équipe" },
  {
    type: "p",
    text: "Documentez pour votre marque : ratios par canal, styles photo autorisés/interdits, palettes hex, exemples prompts validés, process validation legal (droits image, likeness). Midjourney et DALL·E deviennent reproductibles à l'échelle agence.",
  },
  { type: "h2", text: "Pipeline print vs digital" },
  {
    type: "p",
    text: "Print 300 DPI : upscale MJ final, vérifier artifacts compression. Digital web : --ar match layout Figma, poids file post-export. DALL·E mockups UI écrans : préciser device frame ou flat sans frame. Prompts diffèrent selon livrable final même pour même concept créatif.",
  },
  { type: "h2", text: "Synthèse prompts image" },
  {
    type: "p",
    text: "Midjourney et DALL·E exigent grammars distinctes : descriptif visuel dense + params vs intention conversationnelle + edits. Choisissez outil selon livrable (hero photo vs mockup UI), adaptez prompt, itérez. Charte équipe + exemples commentés battent prompts viraux copiés. Poursuivre : guide Midjourney débutant, prompts vidéo pour motion depuis stills.",
  },
  { type: "h2", text: "FAQ Midjourney DALL·E prompts" },
  { type: "h3", text: "Quel prompt image pour logo startup ?" },
  {
    type: "p",
    text: "DALL·E mockup flat simple + vectorisation manuelle Illustrator/Figma. Midjourney concept mood — pas SVG final. Prompt : geometric minimal icon, single color, white background, no text.",
  },
  { type: "h3", text: "Cohérence personnage série images ?" },
  {
    type: "p",
    text: "Midjourney --cref URL référence. DALL·E variable. Workflow pro : même seed MJ + prompt base identique sujet/lumière.",
  },
  { type: "h3", text: "Prompts image SEO blog : lequel ?" },
  {
    type: "p",
    text: "DALL·E illustration flat rapide alt text friendly. MJ photo hero impact. Optimisez poids WebP post-export.",
  },
  { type: "h2", text: "Workflows créatifs comparés" },
  {
    type: "p",
    text: "Campagne social 30 visuels/mois : DALL·E batch ChatGPT conversation rapid iteration. Lookbook mode premium : Midjourney session styled shoot cohérent. Pitch deck : DALL·E icônes + MJ photo cover. Packaging mockup : DALL·E scene explicit + Photoshop retouche. Chaque workflow a prompt template documenté — pas réinvention monthly.",
  },
  {
    type: "p",
    text: "Legal : droits usage Midjourney/DALL·E selon CGU abonnement — vérifiez commercial use tier. Prompts ne remplacent pas clearance model release si visage reconnaissable.",
  },
  { type: "h2", text: "Évolution 2026 prompts image" },
  {
    type: "p",
    text: "Tendances : prompts plus courts avec modèles plus smart, image-to-video pipeline dominant, brand consistency tools (--cref, custom models). Restez fondamentaux : sujet lumière composition usage final. Testez nouvelles versions Midjourney sur 5 prompts gold avant migration production. DALL·E intégré ChatGPT simplifie iteration non-tech — marketing teams self-serve avec guardrails charte.",
  },
  {
    type: "p",
    text: "Pour hero site : test A/B Midjourney photo vs DALL·E illustration — data trafic décide, pas préférence designer seule. Prompts documentés rendent tests reproductibles mois suivants.",
  },
  { type: "h2", text: "Checklist prompt image avant génération" },
  {
    type: "ol",
    items: [
      "Usage final défini (web, print, social, ratio)",
      "Sujet unique + environnement + lumière",
      "Style nommé (editorial, flat, cinematic)",
      "Outil choisi MJ vs DALL·E justifié",
      "Params / contraintes ratio corrects",
      "Plan itération (4 variations minimum)",
      "Post-traitement prévu (retouche, vectorisation)",
    ],
  },
  {
    type: "tip",
    title: "Checklist image",
    text: "Avant chaque génération : usage, ratio, sujet, lumière, style, outil MJ ou DALL·E — sept cases cochées.",
  },
  {
    type: "p",
    text: "Maîtriser Midjourney vs DALL·E prompts image = choisir le bon outil par livrable, pas l'inverse. Investissez charte prompts équipe — asset durable. Guides liés : Midjourney débutant, vidéo motion, exemples gratuits image, R-C-T-C pensée usage final. Tests A/B trafic valident choix créatif mieux que débats opinion.",
  },
  { type: "h2", text: "Cas client agence : même brief image" },
  {
    type: "p",
    text: "Brief : campagne automne marque mode accessible, hero e-commerce + social 4:5. Midjourney prompt : editorial street fashion, overcast paris, 35mm film grain, model walking --ar 4:5 --style raw. DALL·E prompt ChatGPT : flat illustration autumn leaves frame product shoes center, warm palette, no model photo, ecommerce banner 4:5. Livrables différents même saison — client choisit esthétique. Documentez deux prompts liés même brief ID Notion. Facturation : retouches Photoshop séparée gens IA.",
  },
  { type: "h2", text: "Conclusion comparatif image IA" },
  {
    type: "p",
    text: "Midjourney vs DALL·E : deux grammars, un objectif livrable client. Charte prompts, tests A/B trafic, formation équipe atelier — différenciation agence. Guides liés prompt-midjourney-debutant-guide, prompts-video-sora-runway motion, exemples-prompts-ia-gratuits image, quest-ce-que-le-prompt-engineering bases. Prompt image performant = descriptif visuel dense + outil adapté + itération documentée — pas copier-coller viral Pinterest sans contexte usage final ratio canal.",
  },
  {
    type: "blockquote",
    text: "Le bon prompt image ne décrit pas une idée — il décrit une photographie ou illustration qui existe déjà dans la tête du directeur artistique.",
  },
  {
    type: "ol",
    items: [
      "Choisir MJ ou DALL·E selon livrable final pas préférence outil",
      "Documenter prompts liés même brief ID client",
      "Tester --ar avant génération masse",
      "Itérer variations pas abandon grid 1",
      "Upscale seulement winners",
      "Post-traitement retouche systématique livrables pro",
      "Charte prompts équipe versionnée trimestriel",
      "Formation atelier 2h alternance outils même brief",
      "Hub PromptExpert guides image vidéo exemples R-C-T-C",
    ],
  },
];

export const articleMidjourneyVsDalle: SeoArticle = {
  slug: "midjourney-vs-dalle-prompts",
  title: "Midjourney vs DALL·E : adapter vos prompts image",
  description:
    "Comparatif Midjourney vs DALL·E 2026 : syntaxe, exemples, paramètres, erreurs et stratégies de prompts image IA.",
  category: "comparatif",
  publishedAt: "2026-03-01",
  updatedAt: "2026-05-30",
  readingTimeMin: estimateReadingTime(blocks),
  keywords: [
    "Midjourney prompt",
    "DALL·E prompt",
    "IA image",
    "comparatif Midjourney DALL·E",
    "prompt image IA",
  ],
  relatedSlugs: [
    "prompt-midjourney-debutant-guide",
    "prompts-video-sora-runway",
    "quest-ce-que-le-prompt-engineering",
    "exemples-prompts-ia-gratuits",
  ],
  blocks,
};
