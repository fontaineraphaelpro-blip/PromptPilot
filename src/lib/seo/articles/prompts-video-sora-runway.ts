import type { SeoArticle } from "../types";
import { estimateReadingTime } from "./utils";

const blocks: SeoArticle["blocks"] = [
  {
    type: "p",
    text: "La génération vidéo IA — Sora (OpenAI), Runway Gen-3/4, Google Veo, Pika, Kling — a franchi en 2026 un seuil de utilisabilité marketing : clips 5-20 secondes pour ads, réseaux, hero site, storyboards. Mais le prompting vidéo diffère radicalement du texte ou de l'image fixe : vous devez décrire le mouvement, le rythme, la caméra, la durée, pas seulement la scene figée. Ce guide couvre checklist prompt vidéo, différences moteurs, exemples, workflow, erreurs.",
  },
  {
    type: "p",
    text: "Pensez réalisateur mini : shot list compressée en un paragraphe structuré.",
  },
  { type: "h2", text: "Vidéo vs image : ce qui change dans le prompt" },
  {
    type: "ul",
    items: [
      "Action temporelle : marche, tourne tête, zoom lent, pluie commence",
      "Caméra : tracking shot, dolly in, handheld, drone ascend",
      "Durée et rythme : 5 sec punchy vs 15 sec contemplatif",
      "Cohérence sujet entre frames — plus difficile que still",
      "Audio souvent séparé — suggérer ambiance même si non générée",
    ],
  },
  {
    type: "blockquote",
    text: "Prompt image = photographie. Prompt vidéo = storyboard + direction caméra + mouvement.",
  },
  { type: "h2", text: "Checklist prompt vidéo universelle" },
  {
    type: "ol",
    items: [
      "Sujet principal + action verbe (walks, pours, reveals)",
      "Environnement + heure + météo",
      "Lumière (golden hour, neon, studio high-key)",
      "Plan caméra + mouvement caméra",
      "Style (documentaire, pub luxe, UGC TikTok, cinematic)",
      "Durée cible (4s, 10s, 20s selon outil)",
      "Rythme (slow motion, dynamic cut energy, single take)",
      "Interdits : morphing faces, text overlay, brand logos complex",
    ],
  },
  { type: "h2", text: "Exemples prompts par usage" },
  { type: "h3", text: "Pub produit SaaS (Runway / Veo)" },
  {
    type: "p",
    text: "Slow dolly in toward laptop screen showing analytics dashboard, modern office morning light, professional woman smiles subtly, cinematic corporate, 10 seconds, smooth single shot, shallow depth of field, no readable UI text, 24fps film look.",
  },
  { type: "h3", text: "UGC style TikTok" },
  {
    type: "p",
    text: "Handheld selfie angle, creator walking city street talking energy, natural daylight, authentic UGC ad style, 6 seconds, slight camera shake, warm color grade, no subtitles.",
  },
  { type: "h3", text: "B-roll nature brand wellness" },
  {
    type: "p",
    text: "Aerial drone over misty forest at sunrise, slow forward movement, golden rays through trees, cinematic nature documentary, 8 seconds, peaceful pacing.",
  },
  { type: "h3", text: "Logo reveal motion (Sora)" },
  {
    type: "p",
    text: "Abstract particles converge center forming simple geometric icon, dark navy background, subtle glow, motion graphics style, 5 seconds, smooth ease-out, no literal text.",
  },
  { type: "h2", text: "Sora : forces et prompting" },
  {
    type: "p",
    text: "Sora (OpenAI) excelle réalisme scene complexe, cohérence physique relative, clips longs selon accès. Prompts : descriptifs cinématographiques complets mais paragraphe cohérent, pas liste Discord MJ. Itération via ChatGPT pour affiner storyboard language avant génération.",
  },
  { type: "h2", text: "Runway : forces et prompting" },
  {
    type: "p",
    text: "Runway Gen-3/4 : contrôle motion brush, image-to-video, caméra presets UI. Prompt texte + référence image souvent optimal. Prompt court action-focused + image hero Midjourney = workflow courant agences.",
  },
  { type: "h2", text: "Google Veo : forces et prompting" },
  {
    type: "p",
    text: "Veo : intégration écosystème Google, qualité cinematic, accès variable selon région/compte. Prompts naturels descriptifs, emphasis physical realism et lighting continuity.",
  },
  { type: "h2", text: "Workflow production vidéo IA 2026" },
  {
    type: "ol",
    items: [
      "Brief marketing : message, durée, canal (9:16 vs 16:9)",
      "Still keyframe Midjourney/DALL·E si besoin cohérence visuelle",
      "Prompt vidéo motion + caméra",
      "Generate 3-4 takes, select best",
      "Post : montage CapCut/DaVinci, VO humaine, music, subtitles",
      "Ne pas publier raw gen sans review artifacts",
    ],
  },
  { type: "h2", text: "Erreurs prompts vidéo" },
  {
    type: "ul",
    items: [
      "Recopier prompt Midjourney sans mouvement",
      "Trop d'actions : « danse puis vole puis explosion »",
      "Texte / logo lisible demandé — échec fréquent",
      "Ignorer ratio plateforme (crop fatal)",
      "Clip unique sans variantes — toujours batch 3+",
      "Attendre audio parfait synchronisé — séparer workflow",
    ],
  },
  {
    type: "tip",
    title: "Image-to-video",
    text: "Générez still parfait d'abord (guide Midjourney), puis Runway image-to-video avec prompt motion minimal : « subtle parallax, hair moves in wind, 5 sec ».",
  },
  { type: "h2", text: "Questions fréquentes (People Also Ask)" },
  { type: "h3", text: "Quel outil vidéo IA choisir en 2026 ?" },
  {
    type: "p",
    text: "Runway le plus accessible pro workflow. Sora qualité top si accès. Veo écosystème Google. Tester sur VOTRE type scène.",
  },
  { type: "h3", text: "Prompt vidéo en français ?" },
  {
    type: "p",
    text: "Runway/Sora comprennent FR de plus en plus ; EN reste safe descriptifs technique caméra. Bilingue OK.",
  },
  { type: "h3", text: "Durée idéale prompt ?" },
  {
    type: "p",
    text: "4-10 sec génération fiable. Longer = plus artifacts. Enchaîner clips post-prod pour 30 sec ad.",
  },
  { type: "h2", text: "Storyboard écrit avant prompt vidéo" },
  {
    type: "p",
    text: "Avant tout prompt Sora/Runway, rédigez storyboard texte : Shot 1 (0-3s) — wide establishing ; Shot 2 (3-7s) — medium subject action ; Shot 3 (7-10s) — close product. Un prompt par shot bat un prompt 10s fourre-tout.",
  },
  { type: "h2", text: "Audio, sous-titres et post-production" },
  {
    type: "p",
    text: "Génération vidéo IA ≠ audio final. Workflow : clip muet IA → VO ElevenLabs/Humain → musique royalty-free → sous-titres CapCut. Prompt vidéo peut suggérer « ambiance sonore urbaine calme » pour direction monteur, pas attente audio sync.",
  },
  { type: "h2", text: "Prochaine étape" },
  {
    type: "p",
    text: "Midjourney vs DALL·E pour keyframes, prompt Midjourney débutant, exemples prompts gratuits section vidéo.",
  },
  { type: "h2", text: "Specs techniques par plateforme" },
  {
    type: "ul",
    items: [
      "TikTok/Reels — 9:16, 6-15s, hook visuel 1s, mouvement constant",
      "YouTube pre-roll — 16:9, 6s skippable, message brand 3s",
      "LinkedIn — 1:1 ou 4:5, sous-titres obligatoires post-prod",
      "Site hero — 16:9 loop 8s seamless, pas cut brutal",
    ],
  },
  {
    type: "p",
    text: "Intégrez ces specs dans contraintes prompt vidéo — le modèle ne devine pas votre canal de diffusion.",
  },
  { type: "h2", text: "Direction créative vidéo IA en équipe" },
  {
    type: "p",
    text: "Brief vidéo IA = brief réalisateur classique : message unique, audience, contraintes brand, références mood film (pas copier). Prompt exécuteur vient APRÈS validation concept humaine. Roles : stratège message → directeur artistique stills → prompt engineer motion → monteur post. Ne compressez pas toute la chaîne en une personne-un-prompt si qualité pub requise.",
  },
  { type: "h2", text: "Synthèse prompts vidéo 2026" },
  {
    type: "p",
    text: "Sora Runway Veo convergent : décrire mouvement caméra durée style, storyboard shot par shot, specs plateforme en contraintes, post-prod audio/subs séparée. Image-to-video depuis Midjourney still = workflow pro dominant. Hub : midjourney vs dalle + exemples gratuits vidéo.",
  },
  { type: "h2", text: "FAQ prompts vidéo IA" },
  { type: "h3", text: "Runway ou Sora pour pub 15 secondes ?" },
  {
    type: "p",
    text: "Runway accessible workflow image-to-video + montage clips 4s. Sora si accès qualité réalisme scènes complexes — enchaîner plans post-prod.",
  },
  { type: "h3", text: "Prompt vidéo sans artifacts visages ?" },
  {
    type: "p",
    text: "Évitez gros plan face frontal long. Plans 3/4, distance medium, lumière stable. Re-générer take plutôt qu'upscale artifact.",
  },
  { type: "h2", text: "Pipeline agence vidéo IA complète" },
  {
    type: "p",
    text: "Brief client → storyboard stills Midjourney → prompts Runway image-to-video par shot → assembly DaVinci → VO + subs + grade → export specs Meta/YouTube/TikTok. Prompts vidéo = étape 3 seulement — ne skip pas 1-2. QA frame-by-frame artifacts mains visages texte avant livraison.",
  },
  { type: "h2", text: "Coûts et quotas vidéo IA" },
  {
    type: "p",
    text: "Budget clips : Runway credits, Sora access tiers, temps monteur humain souvent > coût gen. Prompts efficaces réduisent regens waste — storyboard d'abord. 10 clips 5s campaign : prévoir 30-50 gens + 4h post-prod réaliste agence. Prompts Sora Runway optimisés = moins iterations payantes.",
  },
  {
    type: "p",
    text: "Loop image Midjourney → Runway motion → CapCut final = stack 2026 accessible freelance vidéo social sans studio physique.",
  },
  { type: "h2", text: "Bibliothèque prompts vidéo réutilisables" },
  {
    type: "tip",
    title: "Storyboard d'abord",
    text: "Shot list texte avant prompt Runway — divisez artifacts et regens payantes.",
  },
  {
    type: "p",
    text: "Prompts Sora Runway Veo 2026 = compétence montée en puissance agences. Pipeline MJ still → Runway motion → CapCut = stack freelance accessible. Specs plateforme 9:16 vs 16:9 en contraintes obligatoires.",
  },
  { type: "h2", text: "Exemple prompt vidéo pub 15s complète" },
  {
    type: "p",
    text: "Shot1 0-3s Runway : handheld coffee pour slow steam morning light product hero. Shot2 3-8s : dolly laptop screen analytics glow office. Shot3 8-12s : smiling professional close 3/4 not direct eye. Shot4 12-15s : logo motion abstract particles brand colors. Prompts séparés par shot — un prompt 15s fourre-tout = artifacts. Post : VO FR 12 sec, subs burned, music royalty-free uptempo soft. Export 9:16 Reels + 16:9 site loop.",
  },
  { type: "h2", text: "Conclusion prompts vidéo IA 2026" },
  {
    type: "p",
    text: "Sora Runway Veo exigent prompts motion-first, storyboard shot-by-shot, post-prod audio subs obligatoire. Pipeline MJ still → Runway → CapCut = standard agence accessible. Documentez bibliothèque prompts vidéo taggée outil/sujet/mouvement. Hub : prompt-midjourney-debutant keyframes, midjourney-vs-dalle choix still, exemples-prompts-ia-gratuits section vidéo, quest-ce-que-le-prompt-engineering bases texte applicables brief motion.",
  },
  {
    type: "blockquote",
    text: "En vidéo IA, le prompt décrit le mouvement — l'image seule est seulement la première frame d'une intention temporelle.",
  },
  {
    type: "ol",
    items: [
      "Storyboard texte avant gen payante",
      "Un prompt par shot pas clip entier",
      "Specs ratio plateforme en contraintes",
      "Keyframe MJ avant Runway motion",
      "QA artifacts frame by frame",
      "VO subs post-prod séparée",
      "Bibliothèque prompts taggée outil",
      "Budget regens réaliste client",
      "Hub midjourney keyframes exemples gratuits vidéo",
    ],
  },
];

export const articleVideo: SeoArticle = {
  slug: "prompts-video-sora-runway",
  title: "Prompts vidéo IA : Sora, Runway et Veo — guide 2026",
  description:
    "Comment rédiger prompts Sora, Runway, Veo : mouvement, caméra, durée, exemples, workflow image-to-video et erreurs.",
  category: "guide",
  publishedAt: "2026-04-15",
  updatedAt: "2026-05-30",
  readingTimeMin: estimateReadingTime(blocks),
  keywords: [
    "prompt Sora",
    "Runway prompt",
    "IA vidéo",
    "prompt Veo",
    "génération vidéo IA",
  ],
  relatedSlugs: [
    "midjourney-vs-dalle-prompts",
    "prompt-midjourney-debutant-guide",
    "quest-ce-que-le-prompt-engineering",
    "exemples-prompts-ia-gratuits",
  ],
  blocks,
};
