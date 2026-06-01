import { NextResponse } from "next/server";
import { z } from "zod";
import { getAuthUser } from "@/lib/auth";
import { generatePromptSchema } from "@/lib/validations/prompt";
import { generatePromptWithOpenAI } from "@/lib/openai/generate";
import { getOrCreateProfile } from "@/lib/profile";
import { reservePromptSlot, releasePromptSlot } from "@/lib/usage";
import {
  clampGenerateInputForPlan,
  filterGenerateResultForPlan,
} from "@/lib/generate-plan-guard";
import { computePromptScore, qualifiesForScoreGuarantee } from "@/lib/prompt-score";
import { prisma } from "@/lib/db";
import { isOpenAIConfigured } from "@/lib/env";
import { GENERATE_RATE_LIMIT_PER_MIN } from "@/lib/constants";
import { checkRateLimit } from "@/lib/rate-limit";
import { safeErrorMessage } from "@/lib/api-error";
import type { GeneratePromptInput, GeneratePromptResult } from "@/types";

const generateRequestSchema = generatePromptSchema.extend({
  guaranteeRegen: z.boolean().optional(),
  parentPromptId: z.string().uuid().optional(),
});

function enrichResult(
  result: GeneratePromptResult,
  input: GeneratePromptInput
): GeneratePromptResult {
  const score = computePromptScore(result.generated_prompt, input.targetAI, input);
  const preview_summary =
    result.preview_summary?.trim() ||
    `${input.targetAI} interprétera ce prompt comme une demande de type « ${input.taskType} » avec un ton ${input.tone.toLowerCase()}, et produira un livrable structuré prêt à utiliser.`;
  const preview_questions =
    result.preview_questions && result.preview_questions.length >= 2
      ? result.preview_questions.slice(0, 3)
      : [
          "Quel est le public ou l'utilisateur final exact ?",
          "As-tu des contraintes de format ou de longueur à préciser ?",
          "Quel résultat concret considères-tu comme un succès ?",
        ];

  return {
    ...result,
    preview_summary,
    preview_questions,
    prompt_score: score.total,
    score_breakdown: score.breakdown,
  };
}

export async function POST(request: Request) {
  let userId: string | null = null;
  let userPlan: "free" | "pro" | "creator" = "free";
  let usageReserved = false;

  try {
    const user = await getAuthUser();

    if (!user) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
    }

    userId = user.id;

    const burst = checkRateLimit(
      `generate:${user.id}`,
      GENERATE_RATE_LIMIT_PER_MIN,
      60 * 1000
    );
    if (!burst.allowed) {
      return NextResponse.json(
        {
          error: "Trop de requêtes",
          message: `Attendez ${burst.retryAfterSec}s avant de regénérer.`,
        },
        { status: 429 }
      );
    }

    if (!isOpenAIConfigured()) {
      return NextResponse.json(
        {
          error: "Service indisponible",
          message: "La génération IA n'est pas configurée. Contactez le support.",
        },
        { status: 503 }
      );
    }

    const body = await request.json();
    const parsed = generateRequestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Données invalides", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const profile = await getOrCreateProfile(user.id, user.email);
    userPlan = profile.plan;

    let skipUsage = false;
    if (parsed.data.guaranteeRegen && parsed.data.parentPromptId) {
      const parent = await prisma.prompt.findFirst({
        where: { id: parsed.data.parentPromptId, userId: user.id },
      });
      if (!parent || !qualifiesForScoreGuarantee(parent.promptScore)) {
        return NextResponse.json(
          {
            error: "Garantie non applicable",
            message: "La regénération gratuite est réservée aux prompts avec un score inférieur à 70.",
          },
          { status: 400 }
        );
      }
      skipUsage = true;
    }

    let usage = {
      allowed: true,
      used: 0,
      limit: null as number | null,
      remaining: null as number | null,
    };

    if (!skipUsage) {
      usage = await reservePromptSlot(user.id, profile.plan);
      usageReserved = true;
      if (!usage.allowed) {
        const upgradeMessage =
          profile.plan === "free"
            ? "Passez au plan Pro (200 prompts/jour) ou Creator (illimité)."
            : profile.plan === "pro"
              ? "Limite d'usage équitable atteinte (200/jour). Passez au Creator pour l'illimité."
              : "Limite quotidienne atteinte.";
        return NextResponse.json(
          {
            error: "Limite quotidienne atteinte",
            message: upgradeMessage,
            used: usage.used,
            limit: usage.limit,
          },
          { status: 429 }
        );
      }
    }

    const input: GeneratePromptInput = clampGenerateInputForPlan(profile.plan, {
      userIdea: parsed.data.userIdea,
      targetAI: parsed.data.targetAI,
      taskType: parsed.data.taskType,
      detailLevel: parsed.data.detailLevel,
      tone: parsed.data.tone,
      language: parsed.data.language,
      includeConstraints: parsed.data.includeConstraints,
      includeExamples: parsed.data.includeExamples,
      includeOutputFormat: parsed.data.includeOutputFormat,
      includeQualityChecklist: parsed.data.includeQualityChecklist,
      includeErrorsToAvoid: parsed.data.includeErrorsToAvoid,
    });

    let result: GeneratePromptResult;
    try {
      result = enrichResult(await generatePromptWithOpenAI(input), input);
    } catch (genError) {
      if (usageReserved) await releasePromptSlot(user.id, profile.plan);
      throw genError;
    }

    const tags =
      result.prompt_score != null && result.prompt_score >= 85
        ? Array.from(new Set(["excellence"]))
        : [];

    const saved = await prisma.prompt.create({
      data: {
        userId: user.id,
        originalIdea: input.userIdea,
        targetAi: input.targetAI,
        taskType: input.taskType,
        detailLevel: input.detailLevel,
        tone: input.tone,
        language: input.language,
        generatedPrompt: result.generated_prompt,
        shortVariant: result.short_variant,
        detailedVariant: result.detailed_variant,
        expertVariant: result.expert_variant,
        aiTips: result.ai_tips,
        promptScore: result.prompt_score,
        scoreBreakdown: result.score_breakdown
          ? JSON.parse(JSON.stringify(result.score_breakdown))
          : undefined,
        previewSummary: result.preview_summary ?? "",
        previewQuestions: result.preview_questions ?? [],
        tags,
      },
    });

    const filtered = filterGenerateResultForPlan(profile.plan, result);

    return NextResponse.json({
      ...filtered,
      prompt_score: result.prompt_score,
      score_breakdown: result.score_breakdown,
      preview_summary: result.preview_summary,
      preview_questions: result.preview_questions,
      id: saved.id,
      guarantee_regen_available: qualifiesForScoreGuarantee(result.prompt_score),
      usage: {
        used: usage.used,
        limit: usage.limit,
        remaining: usage.remaining,
      },
    });
  } catch (error) {
    console.error("Generate error:", error);
    if (userId && usageReserved) {
      try {
        await releasePromptSlot(userId, userPlan);
      } catch {
        // ignore
      }
    }
    return NextResponse.json(
      {
        error: safeErrorMessage(
          error,
          "Impossible de générer le prompt. Réessayez dans quelques instants."
        ),
      },
      { status: 500 }
    );
  }
}
