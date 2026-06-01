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

const EXPERT_PREVIEW_LINES = 16;

function buildExpertTeaser(fullExpert: string): string {
  const lines = fullExpert.split("\n").filter((l) => l.trim() || l === "");
  const preview = lines.slice(0, EXPERT_PREVIEW_LINES).join("\n");
  const fullWords = fullExpert.split(/\s+/).filter(Boolean).length;
  const previewWords = preview.split(/\s+/).filter(Boolean).length;
  const extraWords = Math.max(0, fullWords - previewWords);

  return `${preview}

────────────────────────────
🔒 Encore ~${extraWords} mots dans la variante Expert (brief production)

Inclus dans Creator : edge cases, critères d'acceptation testables, annexes techniques, variantes A/B, workflow pas-à-pas.

→ Débloquer avec Creator (19€/mois) — ton prompt Expert est déjà généré.`;
}

export function filterGenerateResultForPlan(
  plan: Plan,
  result: GeneratePromptResult
): GeneratePromptResult {
  if (canUseExpertDetailLevel(plan)) return result;

  const expert = result.expert_variant?.trim() ?? "";
  const teaser =
    expert.length > 80 && !expert.startsWith("🔒")
      ? buildExpertTeaser(expert)
      : "🔒 Variante Expert réservée au plan Creator (19€/mois).\n\nBrief production complet : contraintes HARD/SOFT, critères d'acceptation, edge cases — généré automatiquement à chaque prompt.";

  return {
    ...result,
    expert_variant: teaser,
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
