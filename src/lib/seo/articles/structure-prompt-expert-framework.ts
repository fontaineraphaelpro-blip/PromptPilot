import type { SeoArticle } from "../types";
import { estimateReadingTime } from "./utils";

const blocks: SeoArticle["blocks"] = [
  {
    type: "p",
    text: "Vous cherchez une structure de prompt expert, un template reproductible, un framework qui tienne la route sur ChatGPT, Claude, Cursor et Midjourney ? Le R-C-T-C — Rôle, Contexte, Tâche, Contraintes — est le standard interne chez PromptExpert depuis 2025. Il transforme une idée brute (« je veux un post LinkedIn ») en instruction exploitable en moins de 30 secondes, sans partir d'une page blanche.",
  },
  {
    type: "p",
    text: "Contrairement aux templates rigides copiés-collés depuis Twitter, R-C-T-C est un cadre mental adaptable : vous remplissez quatre blocs logiques, vous ajustez le niveau de détail, et vous obtenez un prompt cohérent que toute votre équipe peut comprendre et réutiliser. Cet article détaille chaque lettre, avec exemples, anti-patterns et variantes par domaine.",
  },
  { type: "h2", text: "Pourquoi avoir besoin d'un framework de prompt ?" },
  {
    type: "p",
    text: "Sans structure, trois personnes du même service écrivent trois prompts incomparables pour la même tâche — et obtiennent trois qualités de sortie différentes. Un framework réduit la variance, accélère l'onboarding des nouveaux collaborateurs et sert de checklist avant d'envoyer une requête à l'IA. C'est l'équivalent d'un brief créatif ou d'une user story en développement agile.",
  },
  {
    type: "ul",
    items: [
      "Reproductibilité : même structure = résultats comparables",
      "Vitesse : plus de page blanche, vous suivez un canevas",
      "Qualité : rien d'essentiel n'est oublié (format, langue, interdits)",
      "Collaboration : un collègue peut reprendre et améliorer votre prompt",
      "Mesure : vous savez quelle section améliorer quand la sortie rate",
    ],
  },
  {
    type: "blockquote",
    text: "R-C-T-C tient sur un écran — au-delà, découpez en plusieurs prompts chaînés plutôt qu'en un pavé ingérable.",
  },
  { type: "h2", text: "R — Rôle : qui parle, qui répond ?" },
  {
    type: "p",
    text: "Le bloc Rôle définit la persona que l'IA doit incarner. Ce n'est pas décoratif : le modèle ajuste vocabulaire, profondeur, prudence et structure selon l'expertise simulée. « Tu es un développeur junior » et « Tu es un architecte logiciel senior certifié AWS » produiront des réponses radicalement différentes sur la même question technique.",
  },
  {
    type: "h3",
    text: "Comment formuler un rôle efficace",
  },
  {
    type: "ol",
    items: [
      "Intitulé métier précis (copywriter B2B SaaS, pas « expert marketing »)",
      "Domaine ou niche (PME françaises, e-commerce mode, fintech régulée…)",
      "Niveau d'expérience implicite (senior, pragmatique, orienté MVP…)",
      "Optionnel : style de communication (pédagogue, direct, concis)",
    ],
  },
  {
    type: "p",
    text: "Exemple : « Tu es un expert SEO technique avec 10 ans d'expérience sur des sites médias à fort trafic. Tu communiques de façon actionnable, sans jargon inutile. »",
  },
  {
    type: "h3",
    text: "Erreur fréquente sur le Rôle",
  },
  {
    type: "p",
    text: "Empiler cinq rôles contradictoires : « Tu es avocat, designer, dev full-stack et psychologue. » Le modèle dilue. Un rôle principal ; si multi-compétences nécessaires, découpez en prompts séquentiels ou précisez la priorité.",
  },
  { type: "h2", text: "C — Contexte : la situation dans laquelle l'IA opère" },
  {
    type: "p",
    text: "Le Contexte ancre la réponse dans la réalité. Sans lui, l'IA produit du contenu générique applicable à n'importe qui — donc utile à personne. Le contexte inclut : audience finale, objectif business ou technique, données disponibles, contraintes externes (deadline, budget, réglementation), et éventuellement ce qui a déjà été tenté.",
  },
  {
    type: "h3",
    text: "Checklist contexte minimal viable",
  },
  {
    type: "ul",
    items: [
      "Pour qui est le livrable ? (persona, niveau, langue)",
      "Quel est l'objectif mesurable ? (conversion, debug, éducation…)",
      "Quelles données fournissez-vous ? (features produit, extrait code, stats…)",
      "Quel est le cadre ? (startup seed, enterprise, projet perso, examen…)",
      "Y a-t-il des références à respecter ou éviter ?",
    ],
  },
  {
    type: "p",
    text: "Exemple développement : « Projet Next.js 15 App Router, TypeScript strict, Tailwind. Repo existant avec auth Clerk. Feature : dashboard analytics pour admins. Ne pas toucher au middleware auth. »",
  },
  {
    type: "p",
    text: "Exemple marketing : « SaaS B2B prompts IA, freemium 5/jour, cible fondateurs solo et PME marketing. Concurrents : outils US peu localisés. Objectif page : inscription essai gratuit. »",
  },
  { type: "h2", text: "T — Tâche : une action, un livrable" },
  {
    type: "p",
    text: "La Tâche est le cœur du prompt : un verbe d'action + un livrable identifiable. « Aide-moi » n'est pas une tâche. « Rédige », « Analyse », « Propose un plan en 5 étapes », « Refactorise la fonction X », « Génère 3 variantes A/B » — voilà des tâches.",
  },
  {
    type: "h3",
    text: "Règle d'une tâche principale par prompt",
  },
  {
    type: "p",
    text: "Si vous listez « écris la landing, crée la séquence email, fais les ads LinkedIn et le script vidéo », l'IA priorise au hasard ou produit du superficiel partout. Une tâche = un prompt. Enchaînez ensuite.",
  },
  {
    type: "h3",
    text: "Formulations de tâche qui fonctionnent",
  },
  {
    type: "ul",
    items: [
      "« Produis un plan détaillé en 7 étapes pour… »",
      "« Rédige [livrable] en respectant [structure] »",
      "« Identifie les 3 causes probables de [problème], puis propose un fix minimal »",
      "« Compare [A] et [B] selon [critères], format tableau markdown »",
      "« Génère [N] variantes avec angles différents : peur, gain, statut »",
    ],
  },
  { type: "h2", text: "C — Contraintes : les garde-fous et le format" },
  {
    type: "p",
    text: "Les Contraintes transforment une bonne idée en livrable exploitable. C'est souvent le bloc le plus négligé — et le plus impactant. Format, longueur, ton, langue, interdits, niveau de détail, critères de succès : tout ce qui permet de dire « oui, c'est validé » ou « non, refais » sans ambiguïté.",
  },
  {
    type: "h3",
    text: "Types de contraintes à spécifier",
  },
  {
    type: "ul",
    items: [
      "Format de sortie : markdown H1/H2, JSON schema, code only, tableau, bullet points",
      "Longueur : mots, caractères, nombre d'items, durée vidéo",
      "Langue et registre : français, vouvoiement, tutoiement, FR+EN technique",
      "Ton : pro, décontracté, académique, punchy, pédagogique",
      "Interdits : pas d'emoji, pas de lib externe, pas de superlatifs non sourcés",
      "Niveau : MVP rapide vs production-ready avec tests",
      "Process : « liste les hypothèses avant de coder », « pose des questions si info manquante »",
    ],
  },
  {
    type: "p",
    text: "Exemple contraintes copywriting : « 800 mots max, français, ton pro accessible, pas de « révolutionnaire » ou « game-changer », CTA unique essai gratuit, structure hero / bénéfices / preuve / FAQ / CTA. »",
  },
  { type: "h2", text: "Exemple R-C-T-C complet (ChatGPT marketing)" },
  {
    type: "p",
    text: "Rôle : Tu es copywriter B2B SaaS spécialisé conversion landing page. Contexte : PromptExpert, générateur prompts IA freemium, cible fondateurs PME et marketers, différenciation = framework R-C-T-C + multi-IA. Tâche : Rédige la section hero + 3 blocs bénéfices. Contraintes : français, 400 mots total, hook question, chiffres uniquement si placeholder [X], pas de jargon IA creux, CTA « Essayer gratuitement ».",
  },
  {
    type: "tip",
    title: "Variantes R-C-T-C avec PromptExpert",
    text: "Décrivez votre idée en une phrase : PromptExpert génère automatiquement les quatre blocs plus des variantes court (chat rapide), détaillé (projet sérieux) et expert (code, image, vidéo).",
  },
  { type: "h2", text: "R-C-T-C adapté par type d'IA" },
  {
    type: "h3",
    text: "Texte (ChatGPT, Claude, Gemini)",
  },
  {
    type: "p",
    text: "Tous les blocs R-C-T-C s'appliquent intégralement. Insistez sur format de sortie et critères de qualité. Claude apprécie le « pourquoi » métier en contexte ; ChatGPT répond bien aux listes numérotées impératives.",
  },
  {
    type: "h3",
    text: "Code (Cursor, Copilot, Replit)",
  },
  {
    type: "p",
    text: "Contexte = stack + fichiers + conventions. Tâche atomique (une feature ou un fix). Contraintes = tests, types, fichiers interdits, definition of done. Voir le guide prompts Cursor.",
  },
  {
    type: "h3",
    text: "Image (Midjourney, DALL·E)"
  },
  {
    type: "p",
    text: "Rôle implicite (« photographe editorial »). Contexte = usage final (hero site, Instagram, print). Tâche = décrire la scène. Contraintes = ratio, style, palette, pas de texte illisible.",
  },
  {
    type: "h3",
    text: "Vidéo (Sora, Runway, Veo)"
  },
  {
    type: "p",
    text: "Ajoutez mouvement, plan caméra, durée, rythme au bloc Tâche/Contraintes. Le R-C-T-C visuel diffère du texte business.",
  },
  { type: "h2", text: "Extensions du framework : R-C-T-C + E + V" },
  {
    type: "p",
    text: "Pour les cas avancés, ajoutez E (Exemples few-shot) : 1-2 paires entrée/sortie attendues. Et V (Validation) : « avant de livrer, vérifie que [critères] sont respectés et liste ce qui manque ». Utile pour JSON strict, style de marque, code review.",
  },
  { type: "h2", text: "Questions fréquentes (People Also Ask)" },
  { type: "h3", text: "R-C-T-C vs CRISPE, CO-STAR, autres frameworks ?" },
  {
    type: "p",
    text: "La plupart des frameworks populaires convergent vers les mêmes idées : rôle, contexte, tâche, contraintes. R-C-T-C est volontairement minimal (4 blocs) pour rester mémorisable. Choisissez celui que votre équipe appliquera réellement — pas le plus complexe.",
  },
  { type: "h3", text: "Dans quel ordre écrire les blocs ?" },
  {
    type: "p",
    text: "Ordre de rédaction recommandé : Tâche (clarifie l'objectif) → Contexte → Rôle → Contraintes. Ordre dans le prompt final : R → C → T → C (lecture naturelle pour le modèle).",
  },
  { type: "h3", text: "Quelle longueur pour un prompt R-C-T-C ?" },
  {
    type: "p",
    text: "150 à 400 mots selon complexité. Un prompt R-C-T-C bien structuré vaut mieux qu'un pavé de 2 000 mots désorganisé. Si vous dépassez 500 mots, scindez en chaîne de prompts.",
  },
  { type: "h3", text: "Puis-je utiliser R-C-T-C en français avec Midjourney ?" },
  {
    type: "p",
    text: "Oui pour structurer votre pensée ; souvent le descriptif visuel final est plus stable en anglais. Bilinguisme courant : notes R-C-T-C en français, rendu image en anglais technique.",
  },
  { type: "h2", text: "Prochaine étape" },
  {
    type: "p",
    text: "Appliquez R-C-T-C sur un cas réel aujourd'hui — un email, un composant React, une illustration. Comparez la sortie avec votre ancien prompt une ligne. Puis explorez « Comment écrire un prompt ChatGPT » pour les spécificités OpenAI, ou « 10 erreurs de prompt IA » pour éviter les pièges qui annulent un bon framework.",
  },
  { type: "h2", text: "Template R-C-T-C vierge à remplir" },
  {
    type: "p",
    text: "Copiez ce squelette : Rôle — Tu es [expert] spécialisé [domaine]. Contexte — Pour [audience], objectif [mesurable], données [liste]. Tâche — [Verbe] [livrable]. Contraintes — Format, langue, longueur, ton, interdits, process questions si info manquante. Ce template résout la majorité des cas texte.",
  },
  {
    type: "h3",
    text: "Quand passer à une chaîne de prompts ?",
  },
  {
    type: "p",
    text: "Dès que le prompt dépasse une page ou combine recherche + synthèse + rédaction. Chaîne : collecte faits → validation plan → rédaction section → relecture. Chaque maillon reste R-C-T-C compact.",
  },
  { type: "h2", text: "Cas pratiques R-C-T-C par métier" },
  { type: "h3", text: "RH — fiche de poste" },
  {
    type: "p",
    text: "Rôle : recruteur tech senior. Contexte : startup 30 pers, poste dev full-stack remote France. Tâche : fiche poste 500 mots incluant missions, profil, process recrutement. Contraintes : inclusif, salaire fourchette placeholder, pas jargon gatekeeping, format markdown sections.",
  },
  { type: "h3", text: "Juridique — synthèse contrat" },
  {
    type: "p",
    text: "Rôle : assistant juridique (pas avocat). Contexte : contrat SaaS fournisseur [coller extraits]. Tâche : liste clauses risque client PME. Contraintes : pas conseil legal definitif, disclaimer, tableau clause/risque/niveau, français.",
  },
  { type: "h3", text: "E-commerce — fiche produit" },
  {
    type: "p",
    text: "Rôle : rédacteur e-commerce conversion. Contexte : [produit], persona, USP, specs techniques fournies. Tâche : titre SEO + description 200 mots + 5 bullets bénéfices. Contraintes : pas superlatifs, ton [marque], mots-clés [liste] naturels.",
  },
];

export const articleStructureRctc: SeoArticle = {
  slug: "structure-prompt-expert-framework",
  title: "Structure d'un prompt expert : framework R-C-T-C",
  description:
    "Framework R-C-T-C (Rôle, Contexte, Tâche, Contraintes) : template prompt expert, exemples, variantes par IA et FAQ pour des prompts reproductibles.",
  category: "guide",
  publishedAt: "2026-03-15",
  updatedAt: "2026-05-30",
  readingTimeMin: estimateReadingTime(blocks),
  keywords: [
    "framework prompt",
    "structure prompt",
    "template prompt",
    "R-C-T-C",
    "prompt expert",
  ],
  relatedSlugs: [
    "quest-ce-que-le-prompt-engineering",
    "comment-ecrire-prompt-chatgpt",
    "comment-faire-un-bon-prompt-ia",
    "promptexpert-vs-prompts-manuels",
  ],
  blocks,
};
