import type { Plan } from "@/lib/constants";
import { DETAIL_LEVELS, type DetailLevel } from "@/lib/constants";
import type { GeneratePromptInput, GeneratePromptResult } from "@/types";
import type { PromptRecord } from "@/types";
import { PLAN_PRICES, hasAdvancedVariants, canUseDetailedVariant } from "@/lib/plans";
import { EXPERT_UNLOCK } from "@/lib/commerce-products";

export function canUseExpertDetailLevel(plan: Plan): boolean {
  return hasAdvancedVariants(plan);
}

export function canUseAdvancedGeneratorOptions(plan: Plan): boolean {
  return plan === "plus" || plan === "creator";
}

export function getAllowedDetailLevels(plan: Plan): readonly DetailLevel[] {
  if (canUseExpertDetailLevel(plan)) return DETAIL_LEVELS;
  if (canUseDetailedVariant(plan)) {
    return DETAIL_LEVELS.filter((level) => level !== "Expert");
  }
  return DETAIL_LEVELS.filter(
    (level) => level !== "Expert" && level !== "Détaillé"
  );
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
  const allowed = getAllowedDetailLevels(plan);
  if (!allowed.includes(detailLevel)) {
    detailLevel = allowed[allowed.length - 1] ?? "Rapide";
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
🔒 Encore ~${extraWords} mots dans la variante Expert

Brief production : edge cases, critères d’acceptation, annexes.

→ Débloquer ce brief (${EXPERT_UNLOCK.label}) ou inclus avec Pro (${PLAN_PRICES.plus.label}).`;
}

function buildDetailedTeaser(full: string): string {
  const preview = full.slice(0, 280).trim();
  return `${preview}…

🔒 Variante Détaillée disponible dès Starter (${PLAN_PRICES.starter.label}/mois).`;
}

export function filterGenerateResultForPlan(
  plan: Plan,
  result: GeneratePromptResult,
  opts?: { expertUnlocked?: boolean }
): GeneratePromptResult {
  let next = { ...result };

  if (!canUseDetailedVariant(plan)) {
    const detailed = result.detailed_variant?.trim() ?? "";
    if (detailed.length > 40 && !detailed.startsWith("🔒")) {
      next.detailed_variant = buildDetailedTeaser(detailed);
    }
  }

  if (opts?.expertUnlocked || canUseExpertDetailLevel(plan)) {
    return next;
  }

  const expert = result.expert_variant?.trim() ?? "";
  next.expert_variant =
    expert.length > 80 && !expert.startsWith("🔒")
      ? buildExpertTeaser(expert)
      : `🔒 Variante Expert — brief production complet.

Débloque ce prompt pour ${EXPERT_UNLOCK.label}, ou Pro (${PLAN_PRICES.plus.label}) pour l’avoir à chaque génération.`;

  return next;
}

export function filterPromptRecordForPlan(
  plan: Plan,
  prompt: PromptRecord,
  opts?: { expertUnlocked?: boolean }
): PromptRecord {
  if (opts?.expertUnlocked || canUseExpertDetailLevel(plan)) {
    if (canUseDetailedVariant(plan) || opts?.expertUnlocked) return prompt;
  }
  const filtered = filterGenerateResultForPlan(
    plan,
    {
      generated_prompt: prompt.generated_prompt,
      short_variant: prompt.short_variant,
      detailed_variant: prompt.detailed_variant,
      expert_variant: prompt.expert_variant,
      ai_tips: prompt.ai_tips,
    },
    opts
  );
  return {
    ...prompt,
    detailed_variant: filtered.detailed_variant,
    expert_variant: filtered.expert_variant,
  };
}
