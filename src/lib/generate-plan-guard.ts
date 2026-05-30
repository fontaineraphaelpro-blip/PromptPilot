import type { Plan } from "@/lib/constants";
import { DETAIL_LEVELS, type DetailLevel } from "@/lib/constants";
import type { GeneratePromptInput, GeneratePromptResult } from "@/types";
import type { PromptRecord } from "@/types";

export function canUseExpertDetailLevel(plan: Plan): boolean {
  return plan === "creator";
}

export function canUseAdvancedGeneratorOptions(plan: Plan): boolean {
  return plan === "pro" || plan === "creator";
}

export function getAllowedDetailLevels(plan: Plan): readonly DetailLevel[] {
  if (canUseExpertDetailLevel(plan)) return DETAIL_LEVELS;
  return DETAIL_LEVELS.filter((level) => level !== "Expert");
}

const FREE_GENERATOR_DEFAULTS = {
  includeConstraints: true,
  includeExamples: false,
  includeOutputFormat: true,
  includeQualityChecklist: false,
  includeErrorsToAvoid: false,
} as const;

export function clampGenerateInputForPlan(
  plan: Plan,
  input: GeneratePromptInput
): GeneratePromptInput {
  let detailLevel = input.detailLevel;
  if (detailLevel === "Expert" && !canUseExpertDetailLevel(plan)) {
    detailLevel = "Détaillé";
  }

  if (!canUseAdvancedGeneratorOptions(plan)) {
    return {
      ...input,
      detailLevel,
      ...FREE_GENERATOR_DEFAULTS,
    };
  }

  return { ...input, detailLevel };
}

export function filterGenerateResultForPlan(
  plan: Plan,
  result: GeneratePromptResult
): GeneratePromptResult {
  if (canUseExpertDetailLevel(plan)) return result;

  return {
    ...result,
    expert_variant:
      "🔒 Variante Expert réservée au plan Creator (19€/mois).\n\nPasse au Creator pour débloquer la version la plus avancée de ton prompt.",
  };
}

export function filterPromptRecordForPlan(plan: Plan, prompt: PromptRecord): PromptRecord {
  if (canUseExpertDetailLevel(plan)) return prompt;
  return {
    ...prompt,
    expert_variant: filterGenerateResultForPlan(plan, {
      generated_prompt: prompt.generated_prompt,
      short_variant: prompt.short_variant,
      detailed_variant: prompt.detailed_variant,
      expert_variant: prompt.expert_variant,
      ai_tips: prompt.ai_tips,
    }).expert_variant,
  };
}
