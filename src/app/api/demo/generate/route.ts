import { NextResponse } from "next/server";
import { z } from "zod";
import { TARGET_AIS } from "@/lib/constants";
import { getClientIp, checkRateLimit } from "@/lib/rate-limit";
import { reserveDemoSlot } from "@/lib/demo-usage";
import { isOpenAIConfigured } from "@/lib/env";
import { generatePromptWithOpenAI } from "@/lib/openai/generate";
import { computePromptScore } from "@/lib/prompt-score";
import type { GeneratePromptInput } from "@/types";
import { safeErrorMessage } from "@/lib/api-error";
import { localeToPromptLanguage } from "@/lib/i18n/detect";
import { getLocaleFromRequest } from "@/lib/i18n/request-locale";

const schema = z.object({
  userIdea: z.string().min(8).max(2000),
  targetAI: z.enum(TARGET_AIS as unknown as [string, ...string[]]),
});

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const burst = checkRateLimit(`demo-burst:${ip}`, 5, 60 * 1000);
  if (!burst.allowed) {
    return NextResponse.json({ error: "Trop de requêtes. Réessayez dans 1 minute." }, { status: 429 });
  }

  if (!isOpenAIConfigured()) {
    return NextResponse.json({ error: "Démo indisponible" }, { status: 503 });
  }

  try {
    const body = await request.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Données invalides" }, { status: 400 });
    }

    const slot = await reserveDemoSlot(ip);
    if (!slot.allowed) {
      return NextResponse.json(
        {
          error: "Limite démo atteinte",
          message: "1 génération gratuite par jour sans compte. Créez un compte pour continuer.",
          requiresSignup: true,
        },
        { status: 429 }
      );
    }

    const locale = getLocaleFromRequest(request);
    const input: GeneratePromptInput = {
      userIdea: parsed.data.userIdea,
      targetAI: parsed.data.targetAI as GeneratePromptInput["targetAI"],
      taskType: "Autre",
      detailLevel: "Rapide",
      tone: "Professionnel",
      language: localeToPromptLanguage(locale),
      includeConstraints: true,
      includeOutputFormat: true,
      includeExamples: false,
      includeQualityChecklist: false,
      includeErrorsToAvoid: false,
    };

    const result = await generatePromptWithOpenAI(input);
    const score = computePromptScore(result.generated_prompt, input.targetAI, input);

    return NextResponse.json({
      generated_prompt: result.generated_prompt,
      short_variant: result.short_variant,
      prompt_score: score.total,
      score_breakdown: score.breakdown,
      preview_summary: result.preview_summary,
      preview_questions: result.preview_questions?.slice(0, 3) ?? [],
      target_ai: input.targetAI,
      isDemo: true,
    });
  } catch (error) {
    console.error("Demo generate error:", error);
    return NextResponse.json(
      { error: safeErrorMessage(error, "Génération impossible") },
      { status: 500 }
    );
  }
}
