import { NextResponse } from "next/server";
import { z } from "zod";
import { TARGET_AIS } from "@/lib/constants";
import { getClientIp, checkRateLimit } from "@/lib/rate-limit";
import { reserveImproveSlot } from "@/lib/demo-usage";
import { isOpenAIConfigured } from "@/lib/env";
import { improveWeakPrompt } from "@/lib/openai/improve-prompt";
import { computePromptScore } from "@/lib/prompt-score";
import type { GeneratePromptInput } from "@/types";
import { safeErrorMessage } from "@/lib/api-error";

const schema = z.object({
  weakPrompt: z.string().min(10).max(8000),
  targetAI: z.enum(TARGET_AIS as unknown as [string, ...string[]]),
});

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const burst = checkRateLimit(`improve-burst:${ip}`, 3, 60 * 1000);
  if (!burst.allowed) {
    return NextResponse.json({ error: "Trop de requêtes." }, { status: 429 });
  }

  if (!isOpenAIConfigured()) {
    return NextResponse.json({ error: "Service indisponible" }, { status: 503 });
  }

  try {
    const body = await request.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Données invalides" }, { status: 400 });
    }

    const slot = await reserveImproveSlot(ip);
    if (!slot.allowed) {
      return NextResponse.json(
        {
          error: "Limite atteinte",
          message: "3 améliorations gratuites par jour. Créez un compte pour illimité.",
          requiresSignup: true,
        },
        { status: 429 }
      );
    }

    const targetAI = parsed.data.targetAI as GeneratePromptInput["targetAI"];
    const { before, result } = await improveWeakPrompt(parsed.data.weakPrompt, targetAI);

    const input: GeneratePromptInput = {
      userIdea: before,
      targetAI,
      taskType: "Autre",
      detailLevel: "Détaillé",
      tone: "Professionnel",
      language: "Français",
      includeConstraints: true,
      includeOutputFormat: true,
      includeExamples: false,
      includeQualityChecklist: false,
      includeErrorsToAvoid: false,
    };

    const beforeScore = computePromptScore(before, targetAI, input);
    const afterScore = computePromptScore(result.generated_prompt, targetAI, input);

    return NextResponse.json({
      before,
      before_score: beforeScore.total,
      generated_prompt: result.generated_prompt,
      after_score: afterScore.total,
      score_gain: afterScore.total - beforeScore.total,
      preview_summary: result.preview_summary,
      target_ai: targetAI,
    });
  } catch (error) {
    console.error("Improve prompt error:", error);
    return NextResponse.json(
      { error: safeErrorMessage(error, "Amélioration impossible") },
      { status: 500 }
    );
  }
}
