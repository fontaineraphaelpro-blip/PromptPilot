import type { SeoArticle } from "../types";
import { estimateReadingTime } from "./utils";

const blocks: SeoArticle["blocks"] = [
  {
    type: "p",
    text: "Vous cherchez « exemple prompt IA gratuit », « prompt ChatGPT gratuit exemple » ou « template prompt à copier » parce que vous voulez tester avant d'investir temps ou abonnement. Bonne nouvelle : écrire et copier des prompts est gratuit — seule l'exécution dans ChatGPT Plus, Midjourney ou API peut coûter. Ce recueil 2026 regroupe exemples commentés par cas d'usage, prêts à coller et adapter via framework R-C-T-C.",
  },
  {
    type: "p",
    text: "Avertissement : un exemple gratuit n'est pas universel. Remplacez les [PLACEHOLDERS] par votre contexte réel. PromptExpert génère des variantes personnalisées gratuites (quota journalier) si vous préférez partir de votre idée plutôt que d'un template générique.",
  },
  { type: "h2", text: "Comment utiliser ces exemples intelligemment" },
  {
    type: "ol",
    items: [
      "Copiez structure, pas mots exacts si contexte différent",
      "Remplacez [PRODUIT], [PERSONA], [STACK] systématiquement",
      "Ajoutez contraintes légales/marque propres",
      "Itérez 2 tours minimum après v1",
      "Sauvegardez versions qui marchent dans bibliothèque perso",
    ],
  },
  {
    type: "blockquote",
    text: "Prompt gratuit copié sans contexte = réponse gratuite mediocre. Prompt gratuit adapté = levier énorme.",
  },
  { type: "h2", text: "Exemples prompts ChatGPT gratuits — texte" },
  { type: "h3", text: "1. Post LinkedIn B2B" },
  {
    type: "p",
    text: "Tu es copywriter B2B. Rédige post LinkedIn 160 mots. Sujet : [SUJET]. Public : [PERSONA]. Hook question ligne 1. 3 bullets actionnables. CTA soft commentaire. Ton pro accessible. Français. Pas buzzwords.",
  },
  { type: "h3", text: "2. Email cold outreach" },
  {
    type: "p",
    text: "Tu es SDR B2B. Email 100 mots max. Prospect : [ROLE] chez [SECTEUR]. Pain : [PROBLEME]. Offre : [PRODUIT one-liner]. Preuve : [CHIFFRE ou CASE]. CTA : call 15 min. Objet séparé 40 car. Vouvoiement FR.",
  },
  { type: "h3", text: "3. Résumé réunion" },
  {
    type: "p",
    text: "Synthétise notes réunion ci-dessous. Format : Décisions / Actions (owner+deadline) / Questions ouvertes. Max 250 mots. N'invente rien hors notes. [COLLER NOTES]",
  },
  { type: "h3", text: "4. FAQ produit" },
  {
    type: "p",
    text: "Rédige FAQ 6 Q/R pour [PRODUIT SaaS]. Persona [X]. Objections : prix, sécurité data, courbe apprentissage. Réponses 70 mots max chacune. Markdown H3 questions.",
  },
  { type: "h3", text: "5. Plan article SEO" },
  {
    type: "p",
    text: "Mot-clé : [KEYWORD]. Intent informationnelle. Plan H2/H3 1800 mots, People Also Ask intégrées, intro hook, conclusion CTA [OFFRE]. Pas rédiger article — plan seulement.",
  },
  { type: "h2", text: "Exemples prompts code / Cursor" },
  { type: "h3", text: "6. Feature Next.js" },
  {
    type: "p",
    text: "Stack Next.js 15 App Router TS Tailwind. Ajoute [FEATURE] dans @src/app/[route]. Pattern @similar-component.tsx. Liste fichiers avant code. Tests optionnels. Ne touche pas auth.",
  },
  { type: "h3", text: "7. Debug express" },
  {
    type: "p",
    text: "Erreur : [MSG]. Fichier @path. 2 hypothèses causes. Fix minimal. Explique 3 lignes. Pas refactor hors scope.",
  },
  { type: "h2", text: "Exemples prompts image Midjourney" },
  { type: "h3", text: "8. Portrait corporate" },
  {
    type: "p",
    text: "professional headshot, [DESCRIPTION PERSONNE], neutral studio background, soft lighting, 85mm, editorial --ar 4:5 --style raw",
  },
  { type: "h3", text: "9. Hero SaaS" },
  {
    type: "p",
    text: "minimal desk laptop dashboard glow, modern office, morning light, tech editorial, negative space right --ar 16:9 --style raw",
  },
  { type: "h2", text: "Exemples prompts marketing avancés" },
  { type: "h3", text: "10. Variantes ads" },
  {
    type: "p",
    text: "5 variantes Meta ad. Produit [X]. Persona [Y]. Angles FOMO/gain/preuve. Primary 125 car headline 40 car. Tableau markdown.",
  },
  { type: "h3", text: "11. Landing hero PAS" },
  {
    type: "p",
    text: "Copywriter B2B. Hero landing PAS framework. Problème [P]. Agitation conséquences. Solution [PRODUIT]. 120 mots. CTA [ACTION]. FR pro.",
  },
  { type: "h2", text: "Exemples prompts vidéo courte" },
  { type: "h3", text: "12. B-roll produit" },
  {
    type: "p",
    text: "Slow dolly toward [PRODUCT] on table, soft window light, cinematic 8 sec, shallow DOF, no text, smooth single shot.",
  },
  { type: "h2", text: "Prompt anti-hallucination (à ajouter partout)" },
  {
    type: "p",
    text: "Bloc réutilisable : « Si info manque, pose une question avant exécuter. N'invente pas faits/chiffres/noms. Marque [À VÉRIFIER] si incertain. »",
  },
  {
    type: "tip",
    title: "PromptExpert gratuit",
    text: "Décrivez idée en 1 phrase → prompt structuré R-C-T-C + variantes court/détaillé/expert pour ChatGPT, Cursor, Midjourney. Quota free daily.",
  },
  { type: "h2", text: "Organiser sa bibliothèque gratuite" },
  {
    type: "ul",
    items: [
      "Notion ou doc : catégorie / prompt / output validé / date",
      "Tags : marketing, code, image, vidéo",
      "Versionner quand modèle IA change (GPT-4o → 4.1)",
      "Partager équipe : prompts gold only, pas brouillons",
    ],
  },
  { type: "h2", text: "Questions fréquentes (People Also Ask)" },
  { type: "h3", text: "Où trouver prompts IA gratuits fiables ?" },
  {
    type: "p",
    text: "Guides éditoriaux (ce hub PromptExpert), docs officielles OpenAI/Anthropic, communautés avec exemples commentés — méfiance prompts viraux sans contexte.",
  },
  { type: "h3", text: "Prompt ChatGPT gratuit vs Plus : même exemples ?" },
  {
    type: "p",
    text: "Oui structure identique. Modèles payants meilleure adhérence contraintes complexes — investissez adaptation prompt d'abord.",
  },
  { type: "h3", text: "Puis-je vendre des prompts ?" },
  {
    type: "p",
    text: "Oui marché templates/Gumroad. Valeur = niche spécifique + tests + support, pas ligne générique.",
  },
  { type: "h2", text: "Exemples prompts Claude et Gemini" },
  { type: "h3", text: "13. Synthèse PDF Claude" },
  {
    type: "p",
    text: "Analyse document joint uniquement. Output : résumé exécutif 200 mots, 5 insights actionnables, citations [section/page], lacunes données listées. Pas d'extrapolation hors doc.",
  },
  { type: "h3", text: "14. Brainstorm Gemini" },
  {
    type: "p",
    text: "20 idées campagne [produit] canal [X]. Contraintes : budget low, délai 2 semaines, persona [Y]. Tableau idée / effort / impact estimé.",
  },
  { type: "h2", text: "Personnaliser avec PromptExpert" },
  {
    type: "p",
    text: "Collez un exemple ci-dessus dans PromptExpert comme inspiration, ou décrivez votre cas en français — l'outil regénère R-C-T-C complet avec placeholders remplis selon votre phrase. Gain : structure expert sans partir de zero.",
  },
  { type: "h2", text: "Aller plus loin" },
  {
    type: "p",
    text: "Comment écrire prompt ChatGPT (méthode), structure R-C-T-C, 10 erreurs à éviter, PromptExpert vs manuel pour scale.",
  },
  { type: "h2", text: "Pack téléchargeable mental : 5 prompts essentiels" },
  {
    type: "ol",
    items: [
      "Rédaction — post social + email + landing section (3 prompts)",
      "Analyse — résumé doc + SWOT (2 prompts)",
      "Code — feature + debug Cursor (2 prompts)",
      "Image — portrait MJ + hero MJ (2 prompts)",
      "Meta — anti-hallucination bloc à coller en fin de tout prompt",
    ],
  },
  {
    type: "p",
    text: "Cinq familles couvrent 80% besoins PME. Personnalisez placeholders une fois, réutilisez des mois.",
  },
  { type: "h2", text: "Grille d'adaptation par secteur" },
  { type: "h3", text: "Immobilier" },
  {
    type: "p",
    text: "Prompt annonce : rédacteur immo luxe/residentiel. Bien [type surface quartier]. Accroche 160 car. Description 400 mots loi Alur compliant. Pas promesse rendement. Mention DPE placeholder.",
  },
  { type: "h3", text: "Restauration" },
  {
    type: "p",
    text: "Post Instagram menu saison : chef bistronomique. Plat [X] ingrédients locaux. Caption 100 mots sensoriel. Hashtags séparés 12 max niche food [ville].",
  },
  { type: "h3", text: "Santé (non diagnostic)" },
  {
    type: "p",
    text: "Article éducatif grand public : ton prudent, pas diagnostic personnalisé, disclaimer consulter pro, sources HAS/OMS si citées, niveau lecture accessible, structure FAQ PAA.",
  },
  { type: "h2", text: "Synthèse exemples prompts gratuits" },
  {
    type: "p",
    text: "Exemple prompt IA gratuit = point départ structure, pas livrable final. Adaptez placeholders, ajoutez anti-hallucination, itérez, archivez versions gold. PromptExpert personnalise depuis votre phrase. Explorez hub : comment écrire prompt ChatGPT, R-C-T-C, 10 erreurs, PromptExpert vs manuel.",
  },
  { type: "h2", text: "FAQ exemples prompts" },
  { type: "h3", text: "Où copier prompt ChatGPT gratuit sans risque ?" },
  {
    type: "p",
    text: "Sources éditoriales vérifiées (ce blog), docs officielles, templates avec explication structure — pas listes anonymous sans contexte.",
  },
  { type: "h3", text: "Exemple prompt IA gratuit suffit pro ?" },
  {
    type: "p",
    text: "Socle oui, livrable client non sans adaptation persona/data relecture. Hybride template + contexte réel = standard agence.",
  },
  { type: "h2", text: "Construire votre pack prompts maison" },
  {
    type: "p",
    text: "Partez exemples gratuits ci-dessus, remplacez placeholders par données réelles une fois, validez output, taggez GOLD. Dupliquez par vertical si agence multi-secteurs. Revoyez trimestriellement quand modèles changent. PromptExpert accélère création nouveaux packs depuis idées phrases — export vers Notion bibliothèque.",
  },
  { type: "h2", text: "Licence et réutilisation prompts" },
  {
    type: "p",
    text: "Exemples éditoriaux PromptExpert : réutilisation libre adaptation commerciale. Prompts communauté tiers : vérifiez licence. Vos prompts gold internes = IP process — protégez comme tout playbook métier. Ne publiez pas prompts contenant data client sans anonymisation.",
  },
  {
    type: "p",
    text: "Starter pack recommandé : exemples 1-5 texte ChatGPT, 6-7 code Cursor, 8-9 image MJ, 12 vidéo — couvre 80% demandes PME first 90 days IA adoption.",
  },
  { type: "h2", text: "Du gratuit à la bibliothèque pro" },
  {
    type: "tip",
    title: "Pack starter",
    text: "Exemples 1-12 couvrent 80% besoins PME — personnalisez puis taggez GOLD.",
  },
  {
    type: "p",
    text: "Exemple prompt IA gratuit + prompt ChatGPT gratuit exemple = porte entrée hub PromptExpert. Process cinq phases gratuit→pro bibliothèque. Liens : R-C-T-C, comment écrire prompt ChatGPT, PromptExpert vs manuel.",
  },
  { type: "h2", text: "Tableau exemples par niveau" },
  {
    type: "p",
    text: "Débutant : exemples 1-5 texte ChatGPT copier-coller adapter. Intermédiaire : 6-9 code image avec @files ou --ar. Avancé : chaîner exemples 10-12 campagne multi-prompts. Expert : exemples comme base R-C-T-C PromptExpert regénération multi-IA. Progression 30 jours : un niveau par semaine + archive GOLD. Exemple prompt ia gratuit n'est pas finish line — c'est first step bibliothèque pro.",
  },
  { type: "h2", text: "Conclusion exemples prompts gratuits" },
  {
    type: "p",
    text: "Exemple prompt IA gratuit = structure reproductible — adaptez placeholders, itérez, archivez GOLD, scalez avec PromptExpert. Pack 12 exemples couvre texte code image vidéo PME. Hub complet : quest-ce-quun-prompt-ia bases, structure R-C-T-C, comment-ecrire-prompt-chatgpt, comment-utiliser-chatgpt-efficacement, promptexpert-vs-prompts-manuels workflow hybride recommandé équipes 2026.",
  },
  {
    type: "blockquote",
    text: "Un exemple prompt gratuit bien adapté vaut mieux qu'un prompt expert copié mot pour mot sans votre contexte.",
  },
  {
    type: "ol",
    items: [
      "Copier structure pas mots exacts",
      "Remplacer tous placeholders",
      "Ajouter anti-hallucination",
      "Itérer deux tours minimum",
      "Tagger GOLD si validé",
      "Organiser bibliothèque Notion",
      "PromptExpert personnaliser depuis phrase",
      "Revoir trimestriel modèles IA",
      "Hub R-C-T-C comment écrire prompt ChatGPT PromptExpert vs manuel",
    ],
  },
];

export const articleExemplesGratuits: SeoArticle = {
  slug: "exemples-prompts-ia-gratuits",
  title: "Exemples prompts IA gratuits : ChatGPT, Cursor, Midjourney",
  description:
    "12+ exemples prompts IA gratuits commentés : ChatGPT, Cursor, Midjourney, marketing, code, vidéo. Copier-coller et adapter.",
  category: "guide",
  publishedAt: "2026-04-20",
  updatedAt: "2026-05-30",
  readingTimeMin: estimateReadingTime(blocks),
  keywords: [
    "exemple prompt ia gratuit",
    "prompt chatgpt gratuit exemple",
    "template prompt IA",
    "prompts gratuits",
    "exemples ChatGPT",
  ],
  relatedSlugs: [
    "comment-ecrire-prompt-chatgpt",
    "comment-faire-un-bon-prompt-ia",
    "prompt-midjourney-debutant-guide",
    "promptexpert-vs-prompts-manuels",
    "quest-ce-quun-prompt-ia",
  ],
  blocks,
};
