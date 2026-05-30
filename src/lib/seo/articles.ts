import type { SeoArticle } from "./types";

export const SEO_ARTICLES: SeoArticle[] = [
  {
    slug: "quest-ce-que-le-prompt-engineering",
    title: "Qu'est-ce que le prompt engineering ? Guide complet 2026",
    description:
      "Définition, méthodes et bonnes pratiques du prompt engineering pour tirer le meilleur de ChatGPT, Claude, Cursor et les IA génératives.",
    category: "guide",
    publishedAt: "2026-01-15",
    updatedAt: "2026-05-30",
    readingTimeMin: 8,
    keywords: ["prompt engineering", "ingénierie de prompt", "IA générative", "bonnes pratiques"],
    relatedSlugs: ["structure-prompt-expert-framework", "comment-ecrire-prompt-chatgpt"],
    blocks: [
      {
        type: "p",
        text: "Le prompt engineering — ou ingénierie de prompt en français — consiste à formuler des instructions précises pour guider une intelligence artificielle vers un résultat utile, reproductible et de qualité professionnelle. Ce n'est pas de la « magie » : c'est de la communication structurée avec un modèle qui ne devine pas toujours votre intention.",
      },
      { type: "h2", text: "Pourquoi c'est devenu indispensable" },
      {
        type: "p",
        text: "Les modèles comme GPT-4o, Claude ou Gemini répondent différemment selon le contexte, le ton, les contraintes et le format attendu. Un prompt vague produit une réponse générique. Un prompt expert réduit les allers-retours, améliore la cohérence et fait gagner des heures sur le développement, le marketing ou la création visuelle.",
      },
      {
        type: "ul",
        items: [
          "Réduire les itérations (« non, refais autrement »)",
          "Obtenir des sorties structurées (JSON, listes, étapes)",
          "Adapter le style à chaque outil (Cursor ≠ Midjourney)",
          "Documenter un process reproductible pour une équipe",
        ],
      },
      { type: "h2", text: "Les 4 piliers d'un bon prompt" },
      {
        type: "ol",
        items: [
          "Rôle et contexte — qui est l'IA, pour qui travaille-t-elle, dans quel cadre ?",
          "Tâche précise — une action mesurable, pas « aide-moi »",
          "Contraintes — format, longueur, langue, interdits, stack technique",
          "Critères de qualité — ton, niveau de détail, exemples de sortie attendue",
        ],
      },
      {
        type: "tip",
        title: "Astuce PromptPilot",
        text: "Décris ton idée en une phrase ; l'outil assemble automatiquement rôle, contraintes et variantes adaptées à l'IA cible (ChatGPT, Cursor, Midjourney…).",
      },
      { type: "h2", text: "Prompt engineering vs simple question" },
      {
        type: "p",
        text: "Poser une question (« Comment créer une app ? ») laisse l'IA combler les trous. Le prompt engineering explicite les hypothèses : stack, public, fonctionnalités MVP, ordre des étapes. C'est la différence entre un tutoriel générique et un plan d'exécution exploitable.",
      },
      {
        type: "blockquote",
        text: "Un bon prompt ne demande pas d'être intelligent — il rend l'intelligence du modèle prévisible.",
      },
    ],
  },
  {
    slug: "comment-ecrire-prompt-chatgpt",
    title: "Comment écrire un bon prompt ChatGPT : méthode pas à pas",
    description:
      "Structure, exemples et modèles de prompts ChatGPT pour le business, le code et la rédaction. Techniques testées en production.",
    category: "guide",
    publishedAt: "2026-02-01",
    updatedAt: "2026-05-30",
    readingTimeMin: 10,
    keywords: ["prompt ChatGPT", "ChatGPT français", "GPT-4 prompt", "instructions ChatGPT"],
    relatedSlugs: ["chatgpt-vs-claude-prompts", "structure-prompt-expert-framework"],
    blocks: [
      {
        type: "p",
        text: "ChatGPT excelle quand le prompt définit le rôle, le format de sortie et les limites. Sans cela, le modèle tend à produire des réponses équilibrées mais peu actionnables. Voici une méthode en 5 étapes utilisée par les équipes produit et marketing.",
      },
      { type: "h2", text: "Étape 1 — Ancrer le rôle" },
      {
        type: "p",
        text: "Commencez par : « Tu es [expert X] avec [Y années / domaine]. Ta mission : [résultat concret]. » Exemple : « Tu es un copywriter B2B SaaS. Ta mission : rédiger une page d'accueil pour un outil de prompts IA. »",
      },
      { type: "h2", text: "Étape 2 — Donner le contexte minimal viable" },
      {
        type: "ul",
        items: [
          "Public cible (débutant, CTO, créatif…)",
          "Objectif business (conversion, éducation, support)",
          "Données fournies (features, prix, différenciation)",
          "Ce qu'il faut éviter (jargon, promesses irréalistes)",
        ],
      },
      { type: "h2", text: "Étape 3 — Exiger un format" },
      {
        type: "p",
        text: "Demandez explicitement : titres H1/H2, tableaux, listes numérotées, JSON, ou « réponds en 3 paragraphes max ». ChatGPT suit mieux les contraintes de forme que les contraintes floues de style.",
      },
      { type: "h2", text: "Étape 4 — Chaînage (multi-tours)" },
      {
        type: "p",
        text: "Pour les projets complexes, découpez : (1) plan, (2) validation, (3) exécution détaillée. Un seul prompt monolithique de 2 000 mots fatigue le modèle ; trois prompts ciblés donnent souvent un meilleur résultat.",
      },
      {
        type: "tip",
        title: "Exemple avant / après",
        text: "Avant : « Écris un post LinkedIn sur l'IA. » — Après : « Rédige un post LinkedIn 150 mots, ton pro mais accessible, hook question, 3 bullet points, CTA essai gratuit, public fondateurs PME, sans buzzwords. »",
      },
      { type: "h2", text: "Erreurs fréquentes sur ChatGPT" },
      {
        type: "ul",
        items: [
          "Prompt trop court sans contexte métier",
          "Demander « le meilleur » sans critères mesurables",
          "Oublier la langue et le registre (tu/vous)",
          "Ne pas préciser si des sources ou hypothèses sont autorisées",
        ],
      },
    ],
  },
  {
    slug: "prompts-cursor-guide-developpeur",
    title: "Prompts Cursor pour développeurs : guide et exemples",
    description:
      "Comment structurer des prompts pour Cursor (Claude/GPT) : architecture, refactors, debug et conventions de code.",
    category: "guide",
    publishedAt: "2026-02-10",
    updatedAt: "2026-05-30",
    readingTimeMin: 12,
    keywords: ["prompt Cursor", "Cursor IDE", "prompt développement", "IA code"],
    relatedSlugs: ["comment-ecrire-prompt-chatgpt", "structure-prompt-expert-framework"],
    blocks: [
      {
        type: "p",
        text: "Cursor combine votre codebase et un modèle de langage. Un prompt efficace mentionne la stack, les fichiers concernés, les conventions du projet et le périmètre du changement — sinon l'IA propose du code hors standards ou trop large.",
      },
      { type: "h2", text: "Anatomie d'un prompt Cursor efficace" },
      {
        type: "ol",
        items: [
          "Contexte projet : framework, versions, style (TypeScript strict, App Router…)",
          "Périmètre : fichiers à toucher / à ne pas toucher",
          "Tâche atomique : une feature ou un fix, pas « refais tout »",
          "Definition of done : tests, types, pas de régression",
          "Ordre d'exécution : setup → implémentation → vérification",
        ],
      },
      { type: "h2", text: "Prompts types qui fonctionnent" },
      { type: "h3", text: "Nouvelle feature" },
      {
        type: "p",
        text: "« Ajoute [feature] dans [fichier]. Respecte [pattern existant]. Ne modifie pas [X]. Liste les fichiers à créer avant de coder. Procède étape par étape. »",
      },
      { type: "h3", text: "Debug" },
      {
        type: "p",
        text: "« Erreur : [message]. Fichier : [path]. Hypothèse : [Y]. Propose 2 causes probables, puis un fix minimal avec explication. »",
      },
      {
        type: "tip",
        title: "PromptPilot + Cursor",
        text: "Indiquez « Cursor », type « Développement », niveau « Expert » : vous obtenez un prompt avec stack, étapes et garde-fous prêts à coller dans le chat Composer.",
      },
    ],
  },
  {
    slug: "chatgpt-vs-claude-prompts",
    title: "ChatGPT vs Claude : quelles différences pour vos prompts ?",
    description:
      "Comparatif prompt engineering entre ChatGPT (OpenAI) et Claude (Anthropic) : style, contexte, forces et modèles de prompts.",
    category: "comparatif",
    publishedAt: "2026-02-20",
    updatedAt: "2026-05-30",
    readingTimeMin: 9,
    keywords: ["ChatGPT vs Claude", "comparatif IA", "Claude prompt", "OpenAI Anthropic"],
    relatedSlugs: ["comment-ecrire-prompt-chatgpt", "quest-ce-que-le-prompt-engineering"],
    blocks: [
      {
        type: "p",
        text: "ChatGPT et Claude ne réagissent pas identiquement aux mêmes instructions. Comprendre ces écarts évite de copier-coller un prompt d'une plateforme à l'autre sans adaptation.",
      },
      { type: "h2", text: "Tableau comparatif rapide" },
      {
        type: "ul",
        items: [
          "ChatGPT — polyvalent, excellent pour formats variés et brainstorming rapide",
          "Claude — nuance, long contexte, analyse de documents et rédaction structurée",
          "ChatGPT — répond bien aux instructions impératives courtes",
          "Claude — apprécie le contexte métier et les critères de qualité explicites",
        ],
      },
      { type: "h2", text: "Adapter le même brief" },
      {
        type: "p",
        text: "Pour ChatGPT : privilégiez listes, étapes numérotées, format de sortie strict. Pour Claude : ajoutez le « pourquoi » métier, les trade-offs acceptés et les zones d'incertitude à signaler.",
      },
      {
        type: "blockquote",
        text: "Le meilleur prompt n'est pas universel — il est calibré pour le modèle et l'outil (interface web, API, Cursor, etc.).",
      },
      { type: "h2", text: "Quand utiliser lequel ?" },
      {
        type: "ul",
        items: [
          "Prototypage marketing, idées, scripts courts → ChatGPT souvent plus direct",
          "Analyse long PDF, specs produit, rédaction légale ou technique → Claude",
          "Développement dans Cursor → les deux selon le modèle choisi ; le prompt reste orienté code",
        ],
      },
    ],
  },
  {
    slug: "midjourney-vs-dalle-prompts",
    title: "Midjourney vs DALL·E : comment adapter vos prompts image",
    description:
      "Comparatif des syntaxes et stratégies de prompts pour Midjourney et DALL·E : style, composition, paramètres et erreurs à éviter.",
    category: "comparatif",
    publishedAt: "2026-03-01",
    updatedAt: "2026-05-30",
    readingTimeMin: 8,
    keywords: ["Midjourney prompt", "DALL·E prompt", "IA image", "comparatif"],
    relatedSlugs: ["prompts-video-sora-runway", "quest-ce-que-le-prompt-engineering"],
    blocks: [
      {
        type: "p",
        text: "Les prompts image ne se traitent pas comme du texte business. Midjourney favorise des descriptifs visuels denses et des paramètres (--ar, --style). DALL·E (via ChatGPT) comprend mieux le langage naturel conversationnel et les instructions de composition explicites.",
      },
      { type: "h2", text: "Midjourney : penser en termes visuels" },
      {
        type: "ul",
        items: [
          "Sujet + environnement + lumière + objectif caméra",
          "Styles référencés (éditorial, cinematic, flat vector)",
          "Éviter les négations complexes ; préférer le positif",
          "Itérer avec variations plutôt qu'un prompt unique parfait",
        ],
      },
      { type: "h2", text: "DALL·E : clarté et intention" },
      {
        type: "p",
        text: "Formulez l'usage (logo, illustration article, mockup UI) et les contraintes (fond transparent, palette, pas de texte illisible). DALL·E gère bien les scènes explicites et les corrections en langage naturel.",
      },
      { type: "h2", text: "Erreur commune" },
      {
        type: "p",
        text: "Réutiliser un prompt Midjourney word-for-word dans DALL·E (ou l'inverse). Adaptez la densité descriptiva et les paramètres à chaque moteur.",
      },
    ],
  },
  {
    slug: "10-erreurs-prompt-ia",
    title: "10 erreurs de prompt qui ruinent vos résultats IA",
    description:
      "Les pièges les plus fréquents en prompt engineering et comment les corriger pour ChatGPT, Claude, Cursor et les IA image/vidéo.",
    category: "article",
    publishedAt: "2026-03-10",
    updatedAt: "2026-05-30",
    readingTimeMin: 7,
    keywords: ["erreurs prompt", "prompt IA", "bonnes pratiques"],
    relatedSlugs: ["structure-prompt-expert-framework", "quest-ce-que-le-prompt-engineering"],
    blocks: [
      { type: "p", text: "La plupart des « échecs » d'IA viennent d'instructions incomplètes, pas d'un modèle faible. Voici dix erreurs observées quotidiennement en support produit et formation." },
      {
        type: "ol",
        items: [
          "Prompt d'une ligne sans contexte métier",
          "Demander tout en une fois (app complète, campagne complète…)",
          "Ne pas préciser la langue ni le registre",
          "Oublier le format de sortie (JSON, tableau, markdown)",
          "Mélanger plusieurs tâches non liées",
          "Supposer que l'IA connaît votre codebase sans indication",
          "Pas de critères de succès mesurables",
          "Ignorer les limites de l'outil (tokens, politiques contenu)",
          "Ne jamais itérer : abandonner après la première réponse",
          "Copier un prompt viral sans l'adapter à votre cas",
        ],
      },
      {
        type: "tip",
        title: "Correctif rapide",
        text: "Ajoutez une ligne « Si une info manque, pose-moi une question avant d'exécuter » — cela réduit les hallucinations de remplissage.",
      },
    ],
  },
  {
    slug: "structure-prompt-expert-framework",
    title: "Structure d'un prompt expert : framework R-C-T-C",
    description:
      "Le framework Rôle-Contexte-Tâche-Contraintes pour construire des prompts reproductibles sur toutes les IA.",
    category: "guide",
    publishedAt: "2026-03-15",
    updatedAt: "2026-05-30",
    readingTimeMin: 6,
    keywords: ["framework prompt", "structure prompt", "template prompt"],
    relatedSlugs: ["quest-ce-que-le-prompt-engineering", "comment-ecrire-prompt-chatgpt"],
    blocks: [
      {
        type: "p",
        text: "Le framework R-C-T-C (Rôle, Contexte, Tâche, Contraintes) est un standard interne chez PromptPilot pour transformer une idée brute en instruction exploitable en moins de 30 secondes.",
      },
      { type: "h2", text: "R — Rôle" },
      { type: "p", text: "Qui parle ? Qui répond ? Ex. « Tu es un architecte Next.js senior. »" },
      { type: "h2", text: "C — Contexte" },
      { type: "p", text: "Situation, audience, données disponibles, objectif business ou technique." },
      { type: "h2", text: "T — Tâche" },
      { type: "p", text: "Verbe d'action unique + livrable. Ex. « Produis un plan en 5 étapes pour… »" },
      { type: "h2", text: "C — Contraintes" },
      {
        type: "ul",
        items: [
          "Format (markdown, JSON, code only)",
          "Longueur, ton, langue",
          "Interdits (pas de lib externe, pas de emoji…)",
          "Niveau de détail (MVP vs production)",
        ],
      },
      {
        type: "blockquote",
        text: "R-C-T-C tient sur un écran — au-delà, découpez en plusieurs prompts chaînés.",
      },
    ],
  },
  {
    slug: "prompts-marketing-copywriting",
    title: "Prompts IA pour marketing et copywriting : guide pratique",
    description:
      "Emails, landing pages, ads et réseaux sociaux : comment structurer vos prompts pour le contenu marketing avec ChatGPT et Claude.",
    category: "guide",
    publishedAt: "2026-04-01",
    updatedAt: "2026-05-30",
    readingTimeMin: 9,
    keywords: ["prompt marketing", "copywriting IA", "prompt réseaux sociaux"],
    relatedSlugs: ["comment-ecrire-prompt-chatgpt", "10-erreurs-prompt-ia"],
    blocks: [
      {
        type: "p",
        text: "Le marketing exige cohérence de marque, preuves et appels à l'action clairs. Les prompts doivent inclure persona, objection principale, preuve sociale disponible et canal de diffusion — sinon l'IA produit du remplissage creux.",
      },
      { type: "h2", text: "Landing page" },
      {
        type: "p",
        text: "Structure recommandée dans le prompt : hero (problème + promesse), bénéfices (3), preuve, FAQ objections, CTA. Précisez la longueur par section et interdisez les superlatifs non sourcés.",
      },
      { type: "h2", text: "Email sequence" },
      {
        type: "ul",
        items: [
          "Email 1 : problème + empathie",
          "Email 2 : solution + étude de cas",
          "Email 3 : urgence douce + CTA",
          "Indiquer objet, préheader, PS pour chaque mail",
        ],
      },
      { type: "h2", text: "Ads (Meta, Google, LinkedIn)" },
      {
        type: "p",
        text: "Demandez plusieurs variantes A/B avec angle différent (peur de rater, gain, statut). Limitez les caractères par format dans le prompt.",
      },
    ],
  },
  {
    slug: "prompts-video-sora-runway",
    title: "Prompts vidéo IA : Sora, Runway et Veo — guide 2026",
    description:
      "Comment rédiger des prompts pour la génération vidéo : mouvement, caméra, durée et cohérence visuelle.",
    category: "guide",
    publishedAt: "2026-04-15",
    updatedAt: "2026-05-30",
    readingTimeMin: 8,
    keywords: ["prompt Sora", "Runway prompt", "IA vidéo", "prompt Veo"],
    relatedSlugs: ["midjourney-vs-dalle-prompts", "quest-ce-que-le-prompt-engineering"],
    blocks: [
      {
        type: "p",
        text: "La vidéo générative impose de décrire le mouvement, pas seulement l'image figée. Pensez scène + action + caméra + ambiance sonore suggérée (même si non générée).",
      },
      { type: "h2", text: "Checklist prompt vidéo" },
      {
        type: "ul",
        items: [
          "Sujet et action principale (marche, tourne, zoom…)",
          "Plan caméra (travelling, drone, fixe, handheld)",
          "Lumière et heure (golden hour, néon, studio)",
          "Style (documentaire, pub luxe, UGC)",
          "Durée cible et rythme (lent, dynamique)",
        ],
      },
      { type: "h2", text: "Différences Sora / Runway / Veo" },
      {
        type: "p",
        text: "Chaque moteur a ses forces (réalisme, contrôle caméra, text-to-video). Testez le même brief adapté : certains exigent des prompts plus courts, d'autres des descriptifs cinématographiques longs.",
      },
    ],
  },
  {
    slug: "promptpilot-vs-prompts-manuels",
    title: "PromptPilot vs prompts manuels : quand utiliser un générateur ?",
    description:
      "Comparatif honnête entre écrire ses prompts à la main et utiliser un outil structuré comme PromptPilot pour gagner du temps sans perdre en qualité.",
    category: "comparatif",
    publishedAt: "2026-05-01",
    updatedAt: "2026-05-30",
    readingTimeMin: 6,
    keywords: ["PromptPilot", "générateur de prompt", "outil prompt IA"],
    relatedSlugs: ["structure-prompt-expert-framework", "comment-ecrire-prompt-chatgpt"],
    blocks: [
      {
        type: "p",
        text: "Écrire ses prompts manuellement reste pertinent pour des cas ultra-spécifiques ou de la R&D. Un générateur structuré comme PromptPilot brille quand la vitesse, la cohérence d'équipe et l'adaptation multi-IA comptent.",
      },
      { type: "h2", text: "Prompts manuels — avantages" },
      {
        type: "ul",
        items: [
          "Contrôle total sur chaque mot",
          "Pas de dépendance à un outil",
          "Adapté aux workflows très personnalisés",
        ],
      },
      { type: "h2", text: "PromptPilot — avantages" },
      {
        type: "ul",
        items: [
          "Framework R-C-T-C appliqué automatiquement",
          "Variantes court / détaillé / expert",
          "Adaptation par IA (Cursor ≠ Midjourney)",
          "Historique et templates pour équipes",
        ],
      },
      { type: "h2", text: "Verdict" },
      {
        type: "p",
        text: "Combinez les deux : utilisez PromptPilot pour le socle expert, puis affinez à la main les 10 % spécifiques à votre marque ou codebase. C'est le flux le plus efficace observé chez nos utilisateurs Pro.",
      },
    ],
  },
];
