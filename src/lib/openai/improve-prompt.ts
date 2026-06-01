import type { TargetAI } from "@/lib/constants";
import type { GeneratePromptInput } from "@/types";
import { generatePromptWithOpenAI } from "./generate";

export async function improveWeakPrompt(
  weakPrompt: string,
  targetAI: TargetAI
): Promise<{
  before: string;
  result: Awaited<ReturnType<typeof generatePromptWithOpenAI>>;
}> {
  const input: GeneratePromptInput = {
    userIdea: `PROMPT FAIBLE À AMÉLIORER (restructurer sans changer l'intention) :

"""
${weakPrompt.trim()}
"""

Consigne : transforme ce texte en prompt expert structuré pour ${targetAI}. Garde l'intention originale. Ajoute rôle, contexte, contraintes, format de sortie et critères de qualité manquants.`,
    targetAI,
    taskType: "Autre",
    detailLevel: "Détaillé",
    tone: "Professionnel",
    language: "Français",
    includeConstraints: true,
    includeOutputFormat: true,
    includeExamples: false,
    includeQualityChecklist: true,
    includeErrorsToAvoid: true,
  };

  const result = await generatePromptWithOpenAI(input);
  return { before: weakPrompt.trim(), result };
}
