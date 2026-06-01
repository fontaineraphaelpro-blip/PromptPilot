import type { SeoArticle } from "../types";
import { estimateReadingTime } from "./utils";

const blocks: SeoArticle["blocks"] = [
  {
    type: "p",
    text: "La plupart des « échecs IA » ne viennent pas d'un modèle faible — ils viennent d'instructions incomplètes, contradictoires ou mal calibrées pour l'outil. En support produit et formation PromptExpert, nous voyons les mêmes dix erreurs de prompt revenir chaque semaine, de ChatGPT débutant à équipe dev sur Cursor. Ce article développe chaque piège avec explication, symptôme, correctif et exemple avant/après.",
  },
  {
    type: "p",
    text: "Corrigez ces erreurs et vous multipliez la qualité perçue de n'importe quel LLM sans changer d'abonnement. Combinez avec le framework R-C-T-C pour une base solide.",
  },
  { type: "h2", text: "Erreur 1 : Prompt d'une ligne sans contexte métier" },
  {
    type: "p",
    text: "Symptôme : réponse Wikipedia générique, inutilisable en prod. Cause : l'IA comble les blancs avec la réponse « moyenne » statistique. Exemple raté : « Écris une page pricing SaaS. » Correctif : ajoutez produit, cible, tiers pricing, différenciation, ton, longueur. « SaaS prompts IA freemium 5/jour, Pro 19€, cible fondateurs PME FR, 3 tiers, objection = pourquoi payer si ChatGPT gratuit, ton pro 600 mots markdown. »",
  },
  { type: "h2", text: "Erreur 2 : Demander tout en une fois" },
  {
    type: "p",
    text: "Symptôme : livrable superficiel sur 12 dimensions (landing + emails + ads + script vidéo + SEO). Cause : budget attention modèle dilué. Correctif : une tâche principale par prompt, chaînage séquentiel. Phase 1 stratégie angles, Phase 2 hero, Phase 3 emails — pas tout dans Composer ou ChatGPT monolithique.",
  },
  { type: "h2", text: "Erreur 3 : Ne pas préciser langue et registre" },
  {
    type: "p",
    text: "Symptôme : mélange tu/vous, anglicismes awkward, ton inadapté B2B vs B2C. Cause : modèles multilingues sans ancre locale. Correctif : « Français natif, vouvoiement, ton pro chaleureux, pas de franglais sauf termes tech standard (API, prompt). » Pour audience jeune : tutoiement explicite.",
  },
  { type: "h2", text: "Erreur 4 : Oublier le format de sortie" },
  {
    type: "p",
    text: "Symptôme : prose longue quand vous vouliez JSON ; listes quand vous vouliez tableau comparatif. Cause : format implicite. Correctif : « Sortie : JSON schema {title, bullets[]} » ou « markdown H2/H3 strict, pas d'intro fluff » ou « code only zero commentaire ».",
  },
  { type: "h2", text: "Erreur 5 : Mélanger plusieurs tâches non liées" },
  {
    type: "p",
    text: "Symptôme : IA exécute la tâche la plus facile, ignore le reste silencieusement. Cause : multi-objectif sans priorité. Correctif : scinder conversations OU numéroter « OBLIGATOIRE 1… 2… OPTIONNEL 3… ». Une session Cursor = un fix OU une feature, pas les deux.",
  },
  { type: "h2", text: "Erreur 6 : Supposer que l'IA connaît votre codebase" },
  {
    type: "p",
    text: "Symptôme : code generic Next pages router alors que vous êtes App Router ; imports inventés. Cause : pas de @file, pas de stack, pas de .cursorrules. Correctif Cursor : @fichiers, stack versions, « respecte pattern @existing.tsx ». ChatGPT : coller extraits pertinents ou spec architecture.",
  },
  { type: "h2", text: "Erreur 7 : Pas de critères de succès mesurables" },
  {
    type: "p",
    text: "Symptôme : impossible de dire si réponse OK ; débats subjectifs interminables. Cause : « bon », « qualité », « engageant » sans definition. Correctif : « succès = 150 mots ±10, 3 bullets actionnables, CTA unique, lecture grade 8, zéro superlatif non sourcé ».",
  },
  { type: "h2", text: "Erreur 8 : Ignorer limites outil (tokens, politiques)" },
  {
    type: "p",
    text: "Symptôme : coupure mid-answer, refus contenu, hallucination post-limite contexte. Cause : doc 200 pages sans chunking ; demande hors policy. Correctif : résumer docs par sections ; vérifier content policy ; modèle long contexte pour gros corpus ; scinder tâches.",
  },
  { type: "h2", text: "Erreur 9 : Ne jamais itérer — abandon après v1" },
  {
    type: "p",
    text: "Symptôme : « ChatGPT est nul » après une tentative. Cause : traiter v1 comme finale. Correctif : workflow minimum 2-3 tours affinage ciblé : « raccourcis 20% », « ajoute section FAQ », « change hook question ». v1 = brouillon systématique.",
  },
  { type: "h2", text: "Erreur 10 : Copier un prompt viral sans adaptation" },
  {
    type: "p",
    text: "Symptôme : résultat impressionnant en démo Twitter, plat pour votre niche B2B comptabilité. Cause : prompt calibré autre domaine, autre modèle, autre année. Correctif : garder structure (R-C-T-C), remplacer 100% contexte métier. PromptExpert génère adaptation depuis VOTRE phrase.",
  },
  {
    type: "tip",
    title: "Correctif universel anti-hallucination",
    text: "Ajoutez : « Si une info manque, pose-moi une question avant d'exécuter. N'invente pas pour combler les lacunes. » Réduit remplissage fictif sur erreurs 1, 6, 7.",
  },
  { type: "h2", text: "Checklist anti-erreurs avant envoi" },
  {
    type: "ol",
    items: [
      "Rôle défini ?",
      "Contexte 3+ lignes métier ?",
      "Une tâche principale ?",
      "Format sortie explicite ?",
      "Langue + registre ?",
      "Critères succès mesurables ?",
      "Garde-fou info manquante ?",
      "Périmètre outil respecté (code/image/texte) ?",
    ],
  },
  { type: "h2", text: "Questions fréquentes (People Also Ask)" },
  { type: "h3", text: "Quelle est l'erreur de prompt la plus courante ?" },
  {
    type: "p",
    text: "Prompt une ligne sans contexte (#1). Represente ~40% tickets support débutants.",
  },
  { type: "h3", text: "Les experts font-ils ces erreurs ?" },
  {
    type: "p",
    text: "Oui sous pression deadline — d'où templates R-C-T-C et checklists. La discipline bat le talent sporadique.",
  },
  { type: "h3", text: "Comment corriger sans tout réécrire ?" },
  {
    type: "p",
    text: "Prompt suivi : « Relis mon initial. Liste erreurs structure R-C-T-C. Refais en corrigeant [point précis]. » Voir article ChatGPT mauvaise réponse.",
  },
  { type: "h2", text: "Plan de correction sur 7 jours" },
  {
    type: "ol",
    items: [
      "Jour 1 — Audit 5 derniers prompts ratés, taguer erreur #1-#10",
      "Jour 2 — Template R-C-T-C dans Notion",
      "Jour 3 — Réécrire 3 prompts historiques avec checklist",
      "Jour 4 — Tester PromptExpert ou Custom GPT socle",
      "Jour 5 — Itération obligatoire 3 tours minimum",
      "Jour 6 — Documenter 2 prompts gold par métier",
      "Jour 7 — Partager équipe + feedback peer review prompts",
    ],
  },
  { type: "h2", text: "Prochaine étape" },
  {
    type: "p",
    text: "Framework R-C-T-C, comment écrire prompt ChatGPT, PromptExpert vs manuel pour industrialiser sans perdre contrôle.",
  },
  { type: "h2", text: "Erreurs par profil utilisateur" },
  { type: "h3", text: "Débutant" },
  {
    type: "p",
    text: "Erreurs 1, 3, 9 dominantes — prompt une ligne, pas d'itération, abandon rapide. Fix : template R-C-T-C papier à côté écran.",
  },
  { type: "h3", text: "Marketer" },
  {
    type: "p",
    text: "Erreurs 2, 7, 10 — tout en un, pas critères conversion, copy viral. Fix : un prompt par asset canal.",
  },
  { type: "h3", text: "Développeur" },
  {
    type: "p",
    text: "Erreurs 5, 6, 8 — scope creep, pas @files, ignore limites contexte. Fix : guide Cursor + tâches atomiques.",
  },
  { type: "h2", text: "Audit prompt rapide (score /10)" },
  {
    type: "p",
    text: "Chaque item +1 : rôle clair, contexte métier, tâche unique, format explicite, langue/registre, critères succès, garde-fou hallucination, périmètre outil, itération prévue, pas copier-coller viral aveugle. Score ≤5 : refonte complète avant envoi. Score 8+ : envoi confiant. Utilisez avant chaque prompt important client.",
  },
  { type: "h2", text: "Synthèse : éviter les erreurs prompt" },
  {
    type: "p",
    text: "Les dix erreurs partagent racine commune : sous-spécification. Framework R-C-T-C + checklist audit + plan correction 7 jours transforment résultats sans nouveau modèle. Partagez article équipe pour langage commun. Prochaine lecture : chatgpt mauvaise réponse pour debug live, structure R-C-T-C pour template.",
  },
  { type: "h2", text: "FAQ erreurs prompt IA" },
  { type: "h3", text: "Quelle erreur prompt coûte le plus cher en entreprise ?" },
  {
    type: "p",
    text: "Erreur #6 codebase dev : code mergé non reviewé basé prompt vague → bugs prod. Fix : Cursor @files + tests CI + review humain.",
  },
  { type: "h3", text: "Erreurs prompt IA visibles côté client ?" },
  {
    type: "p",
    text: "Oui : copy générique (#1), ton wrong (#3), chiffres inventés (#7). Checklist pré-envoi client externe obligatoire.",
  },
  { type: "h2", text: "Culture équipe anti-erreurs" },
  {
    type: "p",
    text: "Instaurez « prompt review » pair avant campagnes majeures — comme code review. Template PR : prompt collé, output, score checklist /10. Célébrez partage échecs : « prompt raté du mois » learning. Réduit honte et répétition erreurs. Formation onboarding : 10 erreurs article + R-C-T-C workshop 2h hands-on.",
  },
  { type: "h2", text: "Mesurer amélioration post-correction" },
  {
    type: "p",
    text: "Avant/après metrics : iterations to approved output, time spent, stakeholder satisfaction. Track 30 jours après adoption checklist — teams voient typiquement -40% iterations et -25% time-to-deliver. Partagez wins leadership pour budget outils prompt (PromptExpert, formation). Erreurs prompt sont systémiques fixables — pas talent individuel.",
  },
  {
    type: "p",
    text: "Chaque erreur #1-#10 mappe un fix R-C-T-C concret — imprimez poster checklist près desks équipe remote (Notion pinned).",
  },
  { type: "h2", text: "Template correction par erreur" },
  {
    type: "tip",
    title: "Score /10",
    text: "Audit prompt avant envoi client — eight plus = go, five minus = refonte R-C-T-C.",
  },
  {
    type: "p",
    text: "Les dix erreurs prompt IA ne sont pas une liste shame — c'est checklist pro. Meta-correction après échec accélère courbe apprentissage. Liens : chatgpt mauvaise réponse, R-C-T-C, PromptExpert socle auto.",
  },
  { type: "h2", text: "Atelier équipe : corriger les 10 erreurs" },
  {
    type: "p",
    text: "Workshop 90 min : chaque participant apporte prompt raté réel anonymisé. Groupe classe erreur #1-#10. Réécriture collective R-C-T-C. Exécution ChatGPT live. Compare v1 v2. Livrable : prompt gold archivé Slack. Répéter mensuel — culture amélioration continue prompts bat formation one-shot. Managers trackent baisse tickets « IA inutile » support interne post-atelier — ROI visible.",
  },
  { type: "h2", text: "Conclusion : maîtriser les erreurs prompt" },
  {
    type: "p",
    text: "Les dix erreurs de prompt IA ne condamnent pas l'outil — elles signalent un brief incomplet. Corrigez avec R-C-T-C, checklist audit, ateliers équipe et meta-prompts correction. En 30 jours discipline, équipes PME divisent par deux allers-retours frustrants ChatGPT Claude Cursor. Continuez hub PromptExpert : quest-ce que prompt engineering, comment utiliser chatgpt efficacement, prompts cursor guide développeur, chatgpt mauvaise réponse reformulation live.",
  },
  {
    type: "blockquote",
    text: "Un prompt raté est un brief raté — corrigez le brief, pas le modèle en premier réflexe.",
  },
  {
    type: "ol",
    items: [
      "Relire checklist 10 erreurs avant chaque prompt important",
      "Appliquer R-C-T-C systématiquement",
      "Une tâche par prompt",
      "Format sortie explicite toujours",
      "Garde-fou anti-hallucination en fin",
      "Itérer minimum deux tours",
      "Documenter prompts gold",
      "Atelier équipe mensuel prompt review",
      "Score audit /10 avant envoi prompt client externe",
    ],
  },
];

export const articleDixErreurs: SeoArticle = {
  slug: "10-erreurs-prompt-ia",
  title: "10 erreurs de prompt qui ruinent vos résultats IA",
  description:
    "Les 10 erreurs de prompt les plus fréquentes expliquées : symptômes, causes, correctifs et exemples pour ChatGPT, Claude, Cursor et IA image.",
  category: "article",
  publishedAt: "2026-03-10",
  updatedAt: "2026-05-30",
  readingTimeMin: estimateReadingTime(blocks),
  keywords: [
    "erreurs prompt",
    "prompt IA",
    "bonnes pratiques prompt",
    "éviter erreurs ChatGPT",
    "prompt engineering erreurs",
  ],
  relatedSlugs: [
    "structure-prompt-expert-framework",
    "quest-ce-que-le-prompt-engineering",
    "chatgpt-mauvaise-reponse-comment-formuler",
    "comment-utiliser-chatgpt-efficacement",
  ],
  blocks,
};
