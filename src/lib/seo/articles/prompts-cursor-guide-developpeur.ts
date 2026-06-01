import type { SeoArticle } from "../types";
import { estimateReadingTime } from "./utils";

const blocks: SeoArticle["blocks"] = [
  {
    type: "p",
    text: "Cursor n'est pas « ChatGPT dans un éditeur ». C'est un IDE qui combine votre codebase, des fichiers ouverts, des règles projet (.cursorrules), et un modèle de langage (Claude, GPT-4o, Gemini selon config). Un prompt Cursor efficace mentionne la stack, les fichiers concernés, les conventions du repo, le périmètre exact du changement — sinon l'IA propose du code hors standards, trop large, ou qui casse ce qui fonctionnait.",
  },
  {
    type: "p",
    text: "Ce guide développeur couvre l'anatomie d'un prompt Cursor, les modes (Chat, Composer, Agent), des templates debug/feature/refactor, l'intégration R-C-T-C, et les erreurs qui coûtent des heures de revert Git.",
  },
  { type: "h2", text: "Pourquoi les prompts Cursor diffèrent de ChatGPT web" },
  {
    type: "p",
    text: "Sur chat.openai.com, le modèle n'a pas votre repo. Dans Cursor, @file, @folder, @codebase injectent du contexte — mais seulement si vous le demandez explicitement et si le périmètre est clair. Un prompt « fix le bug » sans fichier ni message d'erreur force l'IA à deviner. Un prompt « fix dans auth.ts ligne 42, erreur JWT expired, respecte pattern refresh existant dans lib/auth » converge vite.",
  },
  {
    type: "ul",
    items: [
      "Contexte code > contexte prose",
      "Périmètre fichiers explicite (touch / don't touch)",
      "Definition of done technique (types, tests, lint)",
      "Tâches atomiques : une feature ou un fix par session Composer",
      "Référence patterns existants du repo plutôt que patterns génériques Stack Overflow",
    ],
  },
  { type: "h2", text: "Anatomie d'un prompt Cursor efficace (R-C-T-C dev)" },
  {
    type: "ol",
    items: [
      "Rôle : « Tu es dev [stack] senior, tu respectes les conventions de CE repo »",
      "Contexte : framework, versions, @fichiers pertinents, état actuel",
      "Tâche : verbe précis + livrable (composant, migration, fix, test)",
      "Contraintes : fichiers interdits, pas de lib new, tests requis, étapes avant exécution",
    ],
  },
  {
    type: "blockquote",
    text: "Dans Cursor, le meilleur prompt est celui qu'un reviewer humain pourrait exécuter sans poser de questions.",
  },
  { type: "h2", text: "Modes Cursor : quand utiliser quoi" },
  { type: "h3", text: "Chat (Cmd+L)" },
  {
    type: "p",
    text: "Questions, explications, petits snippets, review lecture. Prompt court avec @file ciblé. Pas pour refactor multi-fichiers.",
  },
  { type: "h3", text: "Composer (Cmd+I)" },
  {
    type: "p",
    text: "Features multi-fichiers, refactors, génération structure. Prompt long structuré, liste fichiers attendus, ordre exécution. Demandez « liste plan + fichiers avant d'écrire » pour gros changements.",
  },
  { type: "h3", text: "Agent / Yolo mode" },
  {
    type: "p",
    text: "Enchaînement autonome commandes + edits. Garde-fous stricts : périmètre, tests finaux, pas de rm -rf. Réservé tâches bien cadrées.",
  },
  { type: "h2", text: "Templates prompts qui fonctionnent" },
  { type: "h3", text: "Nouvelle feature" },
  {
    type: "p",
    text: "Ajoute [feature] dans @src/app/dashboard. Stack Next.js 15 App Router, TS strict, Tailwind, shadcn. Pattern similaire à @src/components/existing-widget.tsx. Ne modifie pas auth ni middleware. Étapes : 1) liste fichiers create/edit 2) implémente 3) vérifie types. Tests optionnels si [spec].",
  },
  { type: "h3", text: "Debug" },
  {
    type: "p",
    text: "Erreur : [message complet]. Fichier @path/to/file.ts. Repro : [steps]. Hypothèse : [Y]. Propose 2 causes probables avec preuve dans le code, puis fix minimal. Explique en 3 lignes. Ne refactorise pas hors scope.",
  },
  { type: "h3", text: "Refactor" },
  {
    type: "p",
    text: "Refactor @folder/utils en modules séparés par domaine. Conserve API publique exports. Pas de changement comportement — tests @tests/utils doivent passer. Plan migration fichiers d'abord, exécute après validation.",
  },
  { type: "h3", text: "Code review IA" },
  {
    type: "p",
    text: "Review @PR diff comme senior [stack]. Checklist : sécurité, perf, types, naming repo, edge cases. Format : Critical / Suggestion / Nice. Pas de rewrite complet, commentaires actionnables.",
  },
  { type: "h3", text: "Documentation" },
  {
    type: "p",
    text: "Documente @src/lib/api.ts pour dev junior. JSDoc fonctions publiques, exemple usage, erreurs possibles. Style concis, anglais technique OK.",
  },
  { type: "h2", text: ".cursorrules et contexte persistant" },
  {
    type: "p",
    text: "Fichier .cursorrules à la racine : stack, conventions naming, patterns interdits, structure dossiers. Réduit répétition dans chaque prompt. Exemple : « Toujours App Router, jamais pages/. Composants client marqués use client. Préférer server actions. »",
  },
  { type: "h2", text: "Erreurs fréquentes prompts Cursor" },
  {
    type: "ol",
    items: [
      "« Refais toute l'app » — scope explosion",
      "Pas de @file → IA invente structure",
      "Mélanger feature + debug + style dans un Composer",
      "Accepter diff sans lire — régressions silencieuses",
      "Ignorer types/lint errors post-génération",
      "Copier prompt ChatGPT web sans contexte repo",
      "Ne pas demander plan avant gros multi-file edit",
    ],
  },
  {
    type: "tip",
    title: "PromptPilot + Cursor",
    text: "Indiquez Cursor, type Développement, niveau Expert : prompt avec stack, étapes, garde-fous et @file placeholders prêts à coller dans Composer.",
  },
  { type: "h2", text: "Workflow recommandé feature complète" },
  {
    type: "ol",
    items: [
      "Spec en Chat : comportement attendu, edge cases",
      "Composer plan : fichiers, data flow, composants",
      "Validation plan humaine",
      "Implémentation par sous-étapes si >5 fichiers",
      "Run tests + lint + manual QA",
      "Commit message généré depuis diff réel",
    ],
  },
  { type: "h2", text: "Questions fréquentes (People Also Ask)" },
  { type: "h3", text: "Quel modèle choisir dans Cursor ?" },
  {
    type: "p",
    text: "Claude Sonnet/Opus : code nuancé, gros contexte. GPT-4o : rapide, polyvalent. Testez sur VOTRE repo — différences varient selon stack.",
  },
  { type: "h3", text: "Prompt Cursor en français ou anglais ?" },
  {
    type: "p",
    text: "Français OK pour instructions. Code et identifiants restent anglais. Commentaires code selon convention équipe.",
  },
  { type: "h3", text: "Comment éviter que Cursor modifie trop de fichiers ?" },
  {
    type: "p",
    text: "Liste blanche : « Modifie UNIQUEMENT [fichiers]. Si autre fichier requis, demande permission. » Review diff file par file.",
  },
  { type: "h3", text: "Cursor vs GitHub Copilot prompts ?" },
  {
    type: "p",
    text: "Copilot = complétion inline, prompts courts. Cursor Composer = tâches multi-fichiers, prompts structurés longs. Même discipline R-C-T-C, granularité différente.",
  },
  { type: "h2", text: "Intégration CI et prompts Cursor" },
  {
    type: "p",
    text: "Pour équipes matures : documentez prompts types dans CONTRIBUTING.md — review PR, feature template, hotfix template. Les reviewers référencent le template au lieu de réécrire consignes ad hoc. Réduit variance qualité code généré entre devs.",
  },
  { type: "h2", text: "Sécurité et prompts Cursor" },
  {
    type: "p",
    text: "Ne collez jamais secrets (.env, clés API, tokens prod) dans prompts même si Cursor promet privacy. Utilisez placeholders [API_KEY]. Pour code auth/payment : prompts explicites « security review OWASP top 10 sur ce diff » en plus du fix fonctionnel.",
  },
  { type: "h2", text: "Prochaine étape" },
  {
    type: "p",
    text: "Framework R-C-T-C pour structure, 10 erreurs prompt IA pour pièges généraux, comment écrire prompt ChatGPT pour spec en amont de Cursor.",
  },
  { type: "h2", text: "Guide approfondi : Composer pas à pas" },
  {
    type: "p",
    text: "Scénario réel : ajouter authentification OAuth Google à une app Next.js existante. Mauvais prompt : « Add Google login ». Bon prompt Composer en cinq lignes : contexte stack Next 15 + NextAuth v5 déjà partiellement configuré ; @fichiers auth.ts, middleware.ts, .env.example ; tâche — flow sign-in Google uniquement, pas Facebook ; contraintes — ne pas casser email/password existant, types stricts, redirect /dashboard ; process — liste fichiers et env vars requis AVANT edit. Résultat typique : plan 4 fichiers, implémentation incrémentale, moins de surprises.",
  },
  { type: "h3", text: "Tests automatisés via prompts Cursor" },
  {
    type: "p",
    text: "Prompt type : « Génère tests Vitest pour @utils/format.ts couvrant happy path + 3 edge cases listés. Mock Date si nécessaire. Ne modifie pas implementation sauf bug avéré. » Séparez génération tests et fix code — deux prompts distincts réduisent scope creep.",
  },
  { type: "h3", text: "Refactor legacy sans catastrophe" },
  {
    type: "p",
    text: "Legacy jQuery ou class components React : prompt « Strangler fig pattern — extrais [module] vers @new/path sans changer API exportée. Commit logique intermédiaire. Tests snapshot avant/après. » Cursor excelle quand migration est découpée, pas big bang.",
  },
  {
    type: "ul",
    items: [
      "Toujours commit avant session Composer risquée",
      "Utiliser branches feature/cursor-* pour rollback facile",
      "Demander diff summary en fin de session",
      "Pair review humain obligatoire sur auth, payment, PII",
      "Mettre à jour .cursorrules après chaque pattern validé équipe",
    ],
  },
  { type: "h2", text: "Stack typiques et prompts associés" },
  {
    type: "p",
    text: "React/Next : @components pattern, server vs client explicite. Python/FastAPI : pydantic models, pytest. Mobile React Native : platform-specific files. Précisez stack dans les 3 premières lignes de CHAQUE prompt Composer — Cursor ne devine pas votre monorepo. Monorepo Turborepo : indiquez package name @acme/ui vs @acme/web pour éviter edits wrong workspace.",
  },
  { type: "h2", text: "Synthèse développeur Cursor" },
  {
    type: "p",
    text: "Prompts Cursor efficaces = contexte repo + tâche atomique + definition of done + review humaine. L'IA accélère frappe et exploration ; vous restez architecte et reviewer. Documentez templates équipe, commit avant Composer risqué, mesurez régression tests. Couplé R-C-T-C et 10 erreurs prompt, vous évitez 90% diffs revert.",
  },
  { type: "h2", text: "FAQ développeurs Cursor" },
  { type: "h3", text: "Quelle longueur prompt Cursor idéale ?" },
  {
    type: "p",
    text: "150-400 mots selon complexité. Référencez @files plutôt que coller code entier. Plan + exécution en 2 prompts pour features >3 fichiers.",
  },
  { type: "h3", text: "Cursor génère code deprecated : comment éviter ?" },
  {
    type: "p",
    text: "Versions explicites dans .cursorrules et prompt. « Next.js 15 App Router only, pas pages router deprecated APIs. » Reject diff si imports obsolètes.",
  },
  { type: "h3", text: "Prompt Cursor pour tests e2e Playwright ?" },
  {
    type: "p",
    text: "« Génère spec Playwright user flow login→dashboard. Page objects pattern. @e2e/existing.spec.ts style. Data-testid selectors. Pas hardcode wait arbitraires. »",
  },
  { type: "h2", text: "Cas avancés Cursor" },
  {
    type: "p",
    text: "Migration database : prompt plan rollback + migration up/down + seed test. API design : OpenAPI spec first puis implémentation @routes. Performance : « profile bottleneck @hot-path, propose 2 optimisations mesurables sans premature optimization ailleurs. » Accessibility : « audit a11y @component, WCAG 2.1 AA, fixes priorités keyboard focus. » Chaque cas exige périmètre fichiers strict — jamais « improve entire app ».",
  },
  {
    type: "p",
    text: "Pair programming IA : vous driver, Cursor executor. Prompts courts fréquents beats monologue rare. Commit après chaque étape validée. Cette discipline transforme Cursor de roulette russe en outil fiable sprint après sprint.",
  },
  { type: "h2", text: "Onboarding junior dev sur prompts Cursor" },
  {
    type: "p",
    text: "Formation 3 sessions : (1) lire .cursorrules + R-C-T-C (2) exercice debug guidé @file (3) feature micro-scope review senior. Interdire Composer wide scope première semaine. Checklist merge : lint, tests, diff size <200 lignes sauf validation lead. Documentez 5 prompts gold repo-specific Notion. Juniors productifs Cursor en 2 semaines vs 2 mois trial-error.",
  },
  {
    type: "p",
    text: "Lead dev : revue hebdomadaire prompts Composer équipe — patterns gagnants → .cursorrules update. Investissement 30 min/semaine compounding qualité codebase sur trimestres.",
  },
  {
    type: "p",
    text: "Ressources liées : structure R-C-T-C, 10 erreurs prompt IA, comment écrire prompt ChatGPT pour specs amont, PromptPilot variantes expert Cursor. Maîtrise prompts Cursor = productivité dev mesurable dès première semaine pratique disciplinée et review systématique.",
  },
];

export const articlePromptsCursor: SeoArticle = {
  slug: "prompts-cursor-guide-developpeur",
  title: "Prompts Cursor pour développeurs : guide et exemples 2026",
  description:
    "Comment structurer des prompts Cursor : Composer, debug, refactors, .cursorrules, templates et erreurs à éviter pour du code maintenable.",
  category: "guide",
  publishedAt: "2026-02-10",
  updatedAt: "2026-05-30",
  readingTimeMin: estimateReadingTime(blocks),
  keywords: [
    "prompt Cursor",
    "Cursor IDE",
    "prompt développement",
    "IA code",
    "Composer Cursor",
  ],
  relatedSlugs: [
    "comment-ecrire-prompt-chatgpt",
    "structure-prompt-expert-framework",
    "10-erreurs-prompt-ia",
    "quest-ce-que-le-prompt-engineering",
    "promptpilot-vs-prompts-manuels",
  ],
  blocks,
};
