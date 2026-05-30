import { getAICategory, type TargetAI } from "@/lib/constants";
import type { GeneratePromptInput } from "@/types";

function getAISpecificInstructions(ai: TargetAI): string {
  const category = getAICategory(ai);

  switch (category) {
    case "text":
      return `Pour ${ai} (IA textuelle), le prompt DOIT inclure clairement :
- Rôle de l'IA
- Contexte
- Objectif précis
- Contraintes
- Étapes de raisonnement demandées
- Format de sortie attendu
- Critères de qualité
- Questions à poser si informations manquantes`;

    case "image":
      return `Pour ${ai} (génération d'image), le prompt DOIT inclure :
- Sujet principal
- Style visuel
- Composition
- Lumière
- Couleurs
- Ambiance
- Niveau de réalisme
- Détails caméra/objectif
- Ratio recommandé (ex: 16:9, 1:1)
- Negative prompt si pertinent`;

    case "video":
      return `Pour ${ai} (génération vidéo), le prompt DOIT inclure :
- Scène
- Sujet
- Action
- Mouvement caméra
- Style vidéo
- Lumière
- Ambiance
- Durée suggérée
- Transitions
- Détails cinématographiques`;

    case "code":
      return `Pour ${ai} (app builder / IDE IA), le prompt DOIT inclure :
- Objectif produit et description
- Fonctionnalités principales détaillées
- Pages/écrans à créer
- Composants UI réutilisables
- Architecture technique (ex: Next.js App Router)
- Modèle de données simple
- Logique utilisateur et flux
- Contraintes techniques
- Design souhaité (couleurs, style)
- Instructions pour code propre et modulaire
- Étapes de développement séquentielles
- Bugs et edge cases à éviter`;
  }
}

export function buildSystemPrompt(input: GeneratePromptInput): string {
  const options: string[] = [];
  if (input.includeConstraints) options.push("contraintes explicites");
  if (input.includeExamples) options.push("exemples concrets");
  if (input.includeOutputFormat) options.push("format de sortie structuré");
  if (input.includeQualityChecklist) options.push("checklist qualité");
  if (input.includeErrorsToAvoid) options.push("erreurs courantes à éviter");

  const langInstruction =
    input.language === "Français"
      ? "Rédige TOUS les prompts en français."
      : "Write ALL prompts in English.";

  return `Tu es un expert mondial en prompt engineering pour outils IA.

RÈGLES ABSOLUES :
1. Tu ne réponds PAS à la tâche finale de l'utilisateur — tu écris UNIQUEMENT le prompt optimal à copier-coller dans l'outil cible.
2. Tu transformes une idée vague en instructions précises, actionnables et structurées.
3. Tu adaptes le style, la structure et le vocabulaire à l'IA cible : ${input.targetAI}.
4. Le niveau de détail demandé : ${input.detailLevel}.
5. Le ton/style souhaité : ${input.tone}.
6. Type de tâche : ${input.taskType}.
7. ${langInstruction}
8. Inclure si demandé : ${options.join(", ") || "structure standard"}.

${getAISpecificInstructions(input.targetAI)}

FORMAT DE RÉPONSE — JSON STRICT uniquement, sans markdown autour :
{
  "generated_prompt": "le prompt principal complet prêt à coller",
  "short_variant": "version courte et directe",
  "detailed_variant": "version plus détaillée avec sections",
  "expert_variant": "version expert maximale avec tous les détails",
  "ai_tips": "3-5 conseils spécifiques pour optimiser ce prompt sur ${input.targetAI}"
}`;
}

export function buildUserPrompt(input: GeneratePromptInput): string {
  return `Idée utilisateur à transformer en prompt expert :

"${input.userIdea}"

IA cible : ${input.targetAI}
Type : ${input.taskType}
Niveau : ${input.detailLevel}
Ton : ${input.tone}
Langue : ${input.language}`;
}
