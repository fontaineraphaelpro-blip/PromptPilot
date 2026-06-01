import type { SeoArticle } from "../types";
import { estimateReadingTime } from "./utils";

const blocks: SeoArticle["blocks"] = [
  {
    type: "p",
    text: "ChatGPT (OpenAI) et Claude (Anthropic) dominent le marché des LLM en 2026 — et pourtant, copier-coller le même prompt des deux côtés produit souvent des résultats très différents. Comprendre ces écarts de prompt engineering évite la frustration, optimise vos abonnements, et vous permet de choisir le bon outil pour chaque tâche : rédaction, code, analyse document, brainstorming.",
  },
  {
    type: "p",
    text: "Ce comparatif honnête couvre style de réponse, gestion contexte, forces/faiblesses, adaptation concrète du même brief, cas d'usage recommandés, et FAQ. Objectif : calibrer vos prompts, pas déclarer un gagnant absolu.",
  },
  { type: "h2", text: "Vue d'ensemble : deux philosophies de modèle" },
  {
    type: "p",
    text: "ChatGPT/GPT-4o excelle en polyvalence, formats variés, créativité rapide, intégrations (DALL·E, Browse, Custom GPTs). Claude excelle en nuance, long contexte, analyse documents, rédaction structurée prudente, code soigné. Ni l'un ni l'autre n'est « meilleur » — ils optimisent des objectifs d'entraînement différents.",
  },
  {
    type: "blockquote",
    text: "Le meilleur prompt n'est pas universel — il est calibré pour le modèle et l'interface (web, API, Cursor).",
  },
  { type: "h2", text: "Tableau comparatif prompts ChatGPT vs Claude" },
  {
    type: "ul",
    items: [
      "ChatGPT — répond bien aux instructions impératives courtes et listes numérotées",
      "Claude — apprécie contexte métier, pourquoi, trade-offs acceptés",
      "ChatGPT — brainstorming rapide, variantes créatives, ton punchy",
      "Claude — analyse longue, synthèse PDF, rédaction légale/technique prudente",
      "ChatGPT — écosystème plugins, GPTs, images intégrées",
      "Claude — fenêtre contexte très longue (docs entiers), moins d'hallucination sur citation si bien cadré",
      "ChatGPT — parfois plus « confiant » sur faits incertains",
      "Claude — plus volontiers « je ne sais pas » ou demande clarification si bien prompté",
    ],
  },
  { type: "h2", text: "Adapter le même brief : exemple concret" },
  { type: "h3", text: "Brief métier" },
  {
    type: "p",
    text: "Rédiger une FAQ produit SaaS B2B prompts IA, 8 questions, ton pro, objections pricing et sécurité data.",
  },
  { type: "h3", text: "Version optimisée ChatGPT" },
  {
    type: "p",
    text: "Tu es copywriter B2B SaaS. Rédige FAQ 8 Q/R. Structure : question client directe + réponse 80 mots max. Sections : pricing (2), sécurité (2), usage (2), support (2). Ton pro accessible français. Format markdown H3 questions. Pas de superlatifs. CTA support en dernière réponse.",
  },
  { type: "h3", text: "Version optimisée Claude" },
  {
    type: "p",
    text: "Tu es copywriter B2B SaaS. Contexte : produit freemium prompts IA, cible PME, objections récurrentes = prix vs manuel, peur fuite prompts sensibles. Objectif FAQ : réduire friction essai gratuit. Rédige 8 Q/R. Pour chaque réponse : adresse objection sous-jacente, ton rassurant factuel. Signale si une info produit manque plutôt que d'inventer. Format markdown.",
  },
  {
    type: "p",
    text: "Notez : Claude bénéficie du « pourquoi » objection ; ChatGPT du format strict sections/comptes.",
  },
  { type: "h2", text: "Prompts code : différences pratiques" },
  {
    type: "p",
    text: "Les deux performent en code via Cursor. Claude tend à explications plus mesurées, refactors conservateurs. GPT-4o parfois plus audacieux — utile prototypage, risqué prod sans review. Dans les deux cas : périmètre fichiers, tests, stack explicites (voir guide Cursor).",
  },
  { type: "h2", text: "Long contexte et documents" },
  {
    type: "p",
    text: "Claude historiquement avantagé analyse PDF/specs 100+ pages en une passe. ChatGPT rattrape avec Projects et uploads. Prompt type Claude long doc : « Analyse doc joint. Plan en 10 sections. Citations page/section. Lacunes info listées séparément. » ChatGPT : scinder doc en chunks avec index si limite.",
  },
  { type: "h2", text: "Quand utiliser ChatGPT vs Claude" },
  {
    type: "ul",
    items: [
      "Prototypage marketing, idées ads, scripts courts → ChatGPT souvent plus direct",
      "Analyse contrat, spec produit, due diligence doc → Claude",
      "Custom GPT workflow équipe marketing → ChatGPT",
      "Rédaction technique prudente, moins de bluff → Claude",
      "Multimodal image+texte même interface → ChatGPT",
      "Développement Cursor → tester les deux modèles sur votre codebase",
    ],
  },
  { type: "h2", text: "Erreurs de prompt cross-plateforme" },
  {
    type: "ol",
    items: [
      "Copier prompt viral « ChatGPT only » vers Claude sans adapter",
      "Ignorer différences ton par défaut (Claude plus formel)",
      "Attendre même format JSON strict sans tester schema adherence",
      "Ne pas itérer séparément — chaque modèle a son sweet spot",
      "Comparer v1 ChatGPT vs v5 Claude (itérations inégales)",
    ],
  },
  {
    type: "tip",
    title: "PromptExpert multi-IA",
    text: "Sélectionnez ChatGPT ou Claude à la génération : PromptExpert adapte structure et contraintes au modèle cible automatiquement.",
  },
  { type: "h2", text: "Questions fréquentes (People Also Ask)" },
  { type: "h3", text: "ChatGPT ou Claude pour rédaction française ?" },
  {
    type: "p",
    text: "Les deux excellents en 2026. ChatGPT parfois plus « marketing punchy », Claude plus « corporate nuancé ». Testez hook + CTA sur votre audience.",
  },
  { type: "h3", text: "Même prompt, même température : résultats identiques ?" },
  {
    type: "p",
    text: "Non. Modèles, tokenizers, RLHF différents. Normaliser attentes : même qualité moyenne possible, chemins différents.",
  },
  { type: "h3", text: "Lequel hallucine le moins ?" },
  {
    type: "p",
    text: "Dépend tâche et prompt. Bonne pratique universelle : fournir sources, interdire invention, demander score confiance. Voir article mauvaise réponse ChatGPT (principes identiques Claude).",
  },
  { type: "h3", text: "Faut-il payer les deux ?" },
  {
    type: "p",
    text: "Power users oui souvent. PME : commencez par celui aligné usage dominant (marketing → ChatGPT, analyse doc → Claude), ajoutez l'autre si goulot.",
  },
  { type: "h2", text: "Benchmark pratique : même tâche sur les deux modèles" },
  {
    type: "p",
    text: "Exercice recommandé : choisissez une tâche réelle (FAQ produit, analyse 20 pages PDF, refactor util). Exécutez prompt ChatGPT optimisé puis prompt Claude optimisé (pas même texte). Comparez : temps édition humaine post-gen, hallucinations, adhérence format. Documentez winner par type — votre playbook devient data-driven.",
  },
  { type: "h2", text: "Migration prompts entre modèles" },
  {
    type: "p",
    text: "Checklist migration : (1) ajouter pourquoi métier pour Claude (2) ajouter format strict numéroté pour ChatGPT (3) retester few-shot examples (4) ajuster longueur — Claude accepte souvent prompts plus narratifs (5) revalider ton registre FR.",
  },
  { type: "h2", text: "Prochaine étape" },
  {
    type: "p",
    text: "Approfondir comment écrire prompt ChatGPT, quest-ce que prompt engineering, exemples prompts gratuits pour templates de départ.",
  },
  { type: "h2", text: "API vs interface : prompts identiques ?" },
  {
    type: "p",
    text: "API OpenAI et Claude API permettent system + user messages — équivalent Custom GPT. Prompts interface web parfois plus lents à itérer mais Browse intégré. Pour prod app : versionnez prompts API dans git ; pour marketing ad hoc : interface + Projects.",
  },
  { type: "h3", text: "Coût token et longueur prompt" },
  {
    type: "p",
    text: "Claude long contexte : prompt R-C-T-C + doc 100 pages possible mais coûteux. Optimisez : résumé doc en amont (prompt cheap) puis analyse résumé (prompt ciblé). ChatGPT même logique pour gros PDF.",
  },
  { type: "h2", text: "Feuille de route choix modèle entreprise" },
  {
    type: "ol",
    items: [
      "Inventorier cas usage 30 jours (support, marketing, dev, legal)",
      "Tester 5 prompts gold par cas sur ChatGPT ET Claude",
      "Scorer edit time humain post-gen",
      "Assigner modèle primaire par département",
      "Documenter dans wiki interne + revue trimestrielle",
    ],
  },
  { type: "h2", text: "Synthèse comparatif ChatGPT Claude" },
  {
    type: "p",
    text: "ChatGPT et Claude récompensent des styles prompt différents — calibrez plutôt que copier. Testez sur vos cas réels, documentez winner par workflow, révisez trimestriellement car modèles évoluent. Prompt engineering transversal : clarté intention reste constante ; ajustements tactiques varient. Hub PromptExpert : comment écrire prompt ChatGPT + exemples gratuits pour démarrer.",
  },
  { type: "h2", text: "FAQ ChatGPT vs Claude prompts" },
  { type: "h3", text: "Même prompt system message : compatible ?" },
  {
    type: "p",
    text: "Structure similaire mais calibrage ton et longueur contexte diffère. Testez adherence JSON schema séparément. Claude parfois plus verbeux disclaimers.",
  },
  { type: "h3", text: "Claude ou ChatGPT pour analyse CSV ?" },
  {
    type: "p",
    text: "Les deux via Code Interpreter / upload. Prompt : « Analyse CSV joint, outliers, 3 insights actionnables tableau, pas extrapoler hors data. » Vérifiez calculs sample manuel.",
  },
  { type: "h3", text: "Prompts français longs : lequel tient mieux ?" },
  {
    type: "p",
    text: "Les deux excellents 2026. Claude parfois meilleur cohérence long doc ; ChatGPT formats créatifs variés. Testez votre niche.",
  },
  { type: "h2", text: "Cas d'usage détaillés par modèle" },
  {
    type: "p",
    text: "Support client L1 : ChatGPT prompts impératifs courts, macros réponses, ton uniforme. Due diligence M&A doc 200 pages : Claude contexte long, citations sections, table risques. Création présentation slides : ChatGPT outline + speaker notes par slide. Rédaction CGU : Claude prudence juridique + disclaimer humain avocat. Code review security-sensitive : les deux via Cursor ; comparez faux positifs sur VOTRE stack.",
  },
  {
    type: "p",
    text: "Budget outils : duo ChatGPT Plus + Claude Pro ~40€/mois — rentabilisé si >5h/semaine usage pro. Sinon priorisez modèle aligné tâche dominante et gardez free tier autre pour cas edge.",
  },
  { type: "h2", text: "Prompts hybrides multi-modèle" },
  {
    type: "p",
    text: "Workflow research : Claude synthèse doc long → ChatGPT reformulation marketing punchy. Workflow code : ChatGPT spec rapide → Cursor Claude implémentation. Workflow legal : Claude draft prudent → humain → ChatGPT simplification client-facing interdit sans review avocat. Chaque étape prompt calibré modèle optimal — pipeline > modèle unique.",
  },
  {
    type: "p",
    text: "Hub PromptExpert relie guides ChatGPT, Claude, Cursor avec R-C-T-C commun — votre stack multi-modèle reste cohérente sans réécrire playbooks from scratch chaque trimestre.",
  },
  { type: "h2", text: "Checklist migration prompt inter-modèles" },
  {
    type: "ol",
    items: [
      "Exporter prompt original + output + notes qualité",
      "Identifier éléments spécifiques modèle source (format, ton)",
      "Réécrire rôle/contexte selon guide comparatif ci-dessus",
      "Tester v1 nouveau modèle, scorer edit time",
      "Itérer 2 tours max puis documenter winner",
      "Archiver dans bible équipe avec tags chatgpt/claude/both",
    ],
  },
  {
    type: "tip",
    title: "Comparatif vivant",
    text: "Retestez vos 5 prompts gold sur ChatGPT et Claude chaque trimestre — les modèles évoluent et votre playbook doit suivre.",
  },
  {
    type: "p",
    text: "Ce comparatif ChatGPT vs Claude prompts reste vivant : retestez quarterly car RLHF updates shift behaviors. Documentez deltas observés. Vos playbooks internes finiront par surpasser articles génériques — capitalisez learnings équipe et partagez internement via wiki.",
  },
  { type: "h2", text: "Scénarios détaillés ChatGPT vs Claude" },
  {
    type: "p",
    text: "Rédaction newsletter 2000 abonnés : ChatGPT souvent plus rapide sur hooks multiples et objets email A/B ; Claude parfois meilleur cohérence longue sur éditorial nuancé. Analyse contrat fournisseur 40 pages : Claude long contexte + citations sections ; ChatGPT via résumé préalable chunké. Support client macro : ChatGPT instructions impératives courtes ; Claude si macros intègrent contexte policy long. Code review OWASP : tester les deux dans Cursor sur même PR — différences faux positifs varient stack. Brainstorm naming produit : ChatGPT volume idées ; Claude filtres prudentes connotations négatives locales FR.",
  },
  {
    type: "p",
    text: "Aucun scénario universel — votre matrice interne bat ce comparatif générique en trois mois usage disciplined. Exportez matrice onboarding nouveaux collaborateurs. PromptExpert génère variantes calibrées modèle sélectionné depuis même idée française — accélère tests A/B prompts sans réécrire R-C-T-C twice.",
  },
];

export const articleChatgptVsClaude: SeoArticle = {
  slug: "chatgpt-vs-claude-prompts",
  title: "ChatGPT vs Claude : quelles différences pour vos prompts ?",
  description:
    "Comparatif prompt engineering ChatGPT vs Claude 2026 : styles, contexte, code, exemples adaptés et FAQ pour choisir le bon modèle.",
  category: "comparatif",
  publishedAt: "2026-02-20",
  updatedAt: "2026-05-30",
  readingTimeMin: estimateReadingTime(blocks),
  keywords: [
    "ChatGPT vs Claude",
    "comparatif IA",
    "Claude prompt",
    "OpenAI Anthropic",
    "prompt engineering comparatif",
  ],
  relatedSlugs: [
    "comment-ecrire-prompt-chatgpt",
    "quest-ce-que-le-prompt-engineering",
    "prompts-cursor-guide-developpeur",
    "chatgpt-mauvaise-reponse-comment-formuler",
  ],
  blocks,
};
