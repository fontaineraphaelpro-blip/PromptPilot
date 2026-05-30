import type { SeoArticle } from "../types";
import { estimateReadingTime } from "./utils";

const blocks: SeoArticle["blocks"] = [
  {
    type: "p",
    text: "« ChatGPT ne comprend pas », « mauvaise réponse ChatGPT », « il invente tout » — ces recherches Google explosent parce que l'écart entre attente et résultat frustre des millions d'utilisateurs. Pourtant, dans la majorité des cas observés en support et formation, le problème n'est pas un modèle défaillant : c'est un prompt qui laisse trop de place à l'interprétation, un contexte absent, ou une formulation qui oriente l'IA vers la réponse moyenne la plus probable.",
  },
  {
    type: "p",
    text: "Ce guide diagnostique les causes de mauvaises réponses ChatGPT et donne des reformulations concrètes pour retrouver le contrôle — sans jargon technique, avec des exemples avant/après et une FAQ People Also Ask.",
  },
  { type: "h2", text: "Pourquoi ChatGPT semble ne pas comprendre" },
  {
    type: "p",
    text: "ChatGPT ne « comprend » pas au sens humain. Il prédit la suite de tokens la plus cohérente avec votre instruction et son entraînement. Si votre prompt est ambigu, il choisit l'interprétation statistiquement dominante — souvent générique, polie, et déconnectée de votre cas précis.",
  },
  {
    type: "ul",
    items: [
      "Ambiguïté : plusieurs interprétations possibles, le modèle en pick une au hasard",
      "Contexte manquant : il comble avec des clichés sectoriels",
      "Tâche surchargée : il exécute partiellement chaque sous-tâche",
      "Format implicite : il choisit prose longue alors que vous vouliez un tableau",
      "Contradiction interne dans votre prompt",
      "Référence implicite (« comme la dernière fois ») sans historique chargé",
    ],
  },
  {
    type: "blockquote",
    text: "ChatGPT ne lit pas dans vos pensées — il lit vos mots. La précision des mots détermine la précision de la réponse.",
  },
  { type: "h2", text: "Diagnostic en 5 questions avant de reformuler" },
  {
    type: "ol",
    items: [
      "Ai-je défini UN livrable clair (pas « aide-moi avec X ») ?",
      "Ai-je fourni le contexte métier minimal (qui, pour qui, pourquoi) ?",
      "Ai-je imposé un format de sortie explicite ?",
      "Ma demande contient-elle une seule tâche principale ?",
      "Ai-je dit quoi faire si une info manque (demander vs inventer) ?",
    ],
  },
  {
    type: "p",
    text: "Une seule réponse « non » explique souvent 80 % des mauvaises sorties. Corrigez le prompt avant de changer de modèle ou d'abandonner.",
  },
  { type: "h2", text: "7 situations fréquentes et comment reformuler" },
  { type: "h3", text: "1. Réponse trop générique / Wikipedia" },
  {
    type: "p",
    text: "Cause : prompt sans audience ni angle. Avant : « Explique le marketing digital. » Après : « Explique le marketing digital à un boulanger indépendant qui débute Instagram. 5 conseils actionnables cette semaine, 300 mots, ton direct, pas de théorie académique, français. »",
  },
  { type: "h3", text: "2. ChatGPT invente des faits ou des chiffres" },
  {
    type: "p",
    text: "Cause : demande de données sans source fournie. Reformulation : « N'invente aucune statistique. Utilise uniquement [coller données] ou marque [CHIFFRE À VÉRIFIER]. Si incertain, dis-le explicitement. » Activez Search pour sujets actuels.",
  },
  { type: "h3", text: "3. Mauvaise réponse car mauvaise langue ou ton" },
  {
    type: "p",
    text: "Cause : langue/registre non spécifiés. Ajoutez : « Réponds en français, vouvoiement, ton professionnel chaleureux, pas de tutoiement, pas d'emoji. »",
  },
  { type: "h3", text: "4. Trop long ou trop court" },
  {
    type: "p",
    text: "Cause : contrainte longueur absente. « Exactement 150 mots ±10 », « maximum 5 bullets d'une ligne », « article 1200 mots avec 6 H2 ».",
  },
  { type: "h3", text: "5. N'a pas suivi la structure demandée" },
  {
    type: "p",
    text: "Cause : structure floue. Listez le plan obligatoire : « Structure EXACTE : 1) Hook question 2) Problème 3) Solution en 3 H3 4) CTA. Ne pas ajouter d'autres sections. »",
  },
  { type: "h3", text: "6. Code incorrect ou hors stack" },
  {
    type: "p",
    text: "Cause : stack non précisée. « Next.js 15 App Router, TypeScript strict, pas de pages router, pas de lib externe. Si ambigu, pose une question avant de coder. »",
  },
  { type: "h3", text: "7. Ignore une partie de la consigne" },
  {
    type: "p",
    text: "Cause : prompt surchargé. Scindez en 2 messages ou numérotez priorités : « Contraintes OBLIGATOIRES (ne pas ignorer) : 1… 2… 3… » Dernière ligne répétez la contrainte la plus critique.",
  },
  { type: "h2", text: "Prompts de secours quand la réponse part en vrille" },
  {
    type: "ul",
    items: [
      "« Stop. Relis mon prompt initial. Liste ce que tu as ignoré ou mal interprété, puis refais en corrigeant. »",
      "« Ta réponse est trop générique pour [cas]. Voici 3 détails supplémentaires : […]. Réécris en les intégrant. »",
      "« Format incorrect. Je voulais [format]. Convertis sans changer le fond. »",
      "« Avant de répondre, reformule ma demande en une phrase pour confirmer ta compréhension. Attends ma validation. »",
      "« Score ta confiance 1-10 sur chaque affirmation factuelle. En dessous de 7, marquer [INCERTAIN]. »",
    ],
  },
  {
    type: "tip",
    title: "Anti-hallucination rapide",
    text: "Ajoutez en fin de prompt : « Si une information manque pour exécuter correctement, pose-moi UNE question précise avant de répondre. N'invente pas pour combler. »",
  },
  { type: "h2", text: "Quand le problème n'est PAS le prompt" },
  {
    type: "p",
    text: "Parfois le modèle ou l'outil limite réellement : sujet hors politique contenu, connaissance post-cutoff sans Search, tâche nécessitant exécution réelle (envoyer email, accéder DB). Dans ces cas : changez d'outil (Cursor pour repo, Search pour actu), ou découpez la tâche en sous-parties faisables en texte.",
  },
  {
    type: "ul",
    items: [
      "Limite connaissance → Search ou fournir documents",
      "Limite technique code → Cursor avec contexte fichiers",
      "Limite créatif image → Midjourney/DALL·E avec prompt visuel",
      "Conversation trop longue → nouvelle conversation avec brief recap",
    ],
  },
  { type: "h2", text: "Checklist reformulation express" },
  {
    type: "ol",
    items: [
      "Rôle expert ajouté ou renforcé",
      "Contexte : 3 lignes minimum métier",
      "Tâche : verbe + livrable mesurable",
      "Format : markdown / JSON / longueur / sections imposées",
      "Interdits : ce qu'il ne faut PAS faire",
      "Process : question si info manquante",
      "Relire prompt pour contradictions",
    ],
  },
  { type: "h2", text: "Questions fréquentes (People Also Ask)" },
  { type: "h3", text: "Pourquoi ChatGPT donne une mauvaise réponse en français ?" },
  {
    type: "p",
    text: "Souvent prompt en français vague + modèle qui mélange registres. Forcez « français natif naturel, pas traduit de l'anglais, vouvoiement/tutoiement : [choix] ».",
  },
  { type: "h3", text: "ChatGPT répète la même mauvaise réponse : que faire ?" },
  {
    type: "p",
    text: "Nouvelle conversation (contexte pollué). Reformulez radicalement le prompt, pas micro-ajustement. Changez angle : « approche différente de ta réponse précédente, voici pourquoi elle ne convient pas : […] ».",
  },
  { type: "h3", text: "Est-ce que ChatGPT Plus comprend mieux ?" },
  {
    type: "p",
    text: "Modèles plus capables tolèrent prompts imparfaits — mais un bon prompt gratuit bat un mauvais prompt Plus. Investissez d'abord formulation.",
  },
  { type: "h3", text: "Comment savoir si c'est moi ou ChatGPT le problème ?" },
  {
    type: "p",
    text: "Testez votre prompt avec checklist R-C-T-C. Demandez au modèle : « Quelles infos te manquent pour une réponse excellente ? » Si la liste est pertinente, c'était le prompt.",
  },
  { type: "h2", text: "Exemples avant/après reformulation complète" },
  { type: "h3", text: "Cas support client" },
  {
    type: "p",
    text: "Avant : « Réponds au client mécontent. » Après : « Tu es support SaaS B2B empathique. Client signale lenteur export CSV depuis mardi. Ton : rassurant factuel, pas excuses vides. Format : 1) reconnaissance 2) étapes diagnostic 3) délai réaliste 4) escalade si besoin. 150 mots, vouvoiement. »",
  },
  { type: "h3", text: "Cas étudiant dissertation" },
  {
    type: "p",
    text: "Avant : « Aide moi dissertation philo. » Après : « Tu es tuteur méthodologie. Sujet : liberté vs déterminisme. Pas rédiger à ma place — propose plan dialectique 3 parties, 2 auteurs par partie, objections à anticiper. Format outline markdown. Signale si tu manques mon corpus imposé. »",
  },
  { type: "h2", text: "Prochaine étape" },
  {
    type: "p",
    text: "Repartez sur bases solides : comment écrire un prompt ChatGPT et framework R-C-T-C. Pour éviter rechute : 10 erreurs de prompt IA. PromptPilot structure vos prompts pour réduire dès le départ les mauvaises interprétations.",
  },
  { type: "h2", text: "Matrice symptôme → reformulation" },
  {
    type: "ul",
    items: [
      "Trop vague → ajouter persona + format + longueur",
      "Trop long/wrong topic → scinder tâches + numéroter priorités",
      "Hallucination → interdire invention + sources ou placeholders",
      "Mauvais ton → registre FR explicite + exemple ton cible",
      "Ignore format → structure EXACTE en liste numérotée",
      "Code hors stack → versions + fichiers @ + interdits",
      "Répète erreur → nouvelle conv + diagnostic « qu'as-tu mal lu »",
    ],
  },
  {
    type: "p",
    text: "Imprimez cette matrice ou gardez-la en favori. En 30 secondes vous classifiez l'échec et appliquez le bon levier au lieu de reformuler au hasard. Couplé au journal de bord reformulation, vous réduisez de moitié les sessions frustrantes en deux semaines de pratique consciente.",
  },
  { type: "h2", text: "Synthèse : reprendre le contrôle sur ChatGPT" },
  {
    type: "p",
    text: "Quand ChatGPT ne comprend pas, la sortie est un signal diagnostic — pas une fatalité. Reformulez avec R-C-T-C, utilisez prompts de secours, scindez tâches, nouvelle conversation si contexte pollué. La compétence « debug prompt » vaut autant que « debug code » en 2026. Partagez ce guide équipe support et marketing pour vocabulaire commun reformulation.",
  },
  { type: "h2", text: "FAQ complémentaire mauvaise réponse" },
  { type: "h3", text: "ChatGPT donne une mauvaise réponse en code : que faire ?" },
  {
    type: "p",
    text: "Précisez stack versions, collez erreur complète, demandez fix minimal pas rewrite. « Explique cause avant code. » Si échec répété → Cursor avec @file. Ne validez jamais code non testé prod.",
  },
  { type: "h3", text: "Pourquoi ChatGPT ignore mes instructions en fin de prompt ?" },
  {
    type: "p",
    text: "Effet « lost in the middle » sur prompts longs. Remettez contraintes critiques en toute fin ET début. Ou scindez prompt. Répétez format en majuscules OBLIGATOIRE si nécessaire.",
  },
  { type: "h3", text: "Mauvaise réponse sur données chiffrées : solution ?" },
  {
    type: "p",
    text: "Fournissez tableau source. Interdisez extrapolation. Demandez « marque N/A si absent ». Activez Search pour données marché récentes. Relecture humaine chiffres obligatoire livrables clients.",
  },
  { type: "h2", text: "Scénarios reformulation pas à pas" },
  {
    type: "p",
    text: "Scénario rédaction : mauvaise réponse générique → ajoutez persona 3 lignes, format 150 mots, interdit buzzwords, exemple ton cible collé en référence. Scénario traduction : mauvaise réponse too literal → précisez registre, idiomes FR natifs, public locale. Scénario résumé : trop long → contrainte mots + structure bullets + « exclude general intro ». Chaque scénario mappe une cause R-C-T-C manquante — identifiez laquelle avant retrial.",
  },
  {
    type: "p",
    text: "Documentez vos reformulations gagnantes dans un doc « fixes ChatGPT » partagé équipe : symptôme client, prompt raté anonymisé, prompt corrigé, modèle utilisé. En un mois vous avez playbook interne supérieur à articles génériques. Couplez avec PromptPilot pour générer socle R-C-T-C puis appliquez fixes métier manuellement.",
  },
];

export const articleChatgptMauvaiseReponse: SeoArticle = {
  slug: "chatgpt-mauvaise-reponse-comment-formuler",
  title: "ChatGPT ne comprend pas ? Comment formuler pour de bonnes réponses",
  description:
    "ChatGPT mauvaise réponse : diagnostic, reformulations concrètes, anti-hallucination et FAQ quand ChatGPT ne comprend pas votre demande.",
  category: "guide",
  publishedAt: "2026-02-20",
  updatedAt: "2026-05-30",
  readingTimeMin: estimateReadingTime(blocks),
  keywords: [
    "chatgpt ne comprend pas",
    "mauvaise réponse chatgpt",
    "chatgpt invente",
    "reformuler prompt chatgpt",
    "chatgpt mauvaise réponse",
  ],
  relatedSlugs: [
    "comment-ecrire-prompt-chatgpt",
    "comment-utiliser-chatgpt-efficacement",
    "10-erreurs-prompt-ia",
    "structure-prompt-expert-framework",
    "exemples-prompts-ia-gratuits",
  ],
  blocks,
};
