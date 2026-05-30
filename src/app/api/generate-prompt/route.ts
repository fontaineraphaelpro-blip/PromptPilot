import { NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth";
import { generatePromptSchema } from "@/lib/validations/prompt";
import { generatePromptWithOpenAI } from "@/lib/openai/generate";
import { getOrCreateProfile } from "@/lib/profile";
import { reservePromptSlot, releasePromptSlot } from "@/lib/usage";
import { prisma } from "@/lib/db";
import { isOpenAIConfigured } from "@/lib/env";
import { safeErrorMessage } from "@/lib/api-error";
import type { GeneratePromptInput } from "@/types";

export async function POST(request: Request) {
  let userId: string | null = null;
  let userPlan: "free" | "pro" | "creator" = "free";

  try {
    const user = await getAuthUser();

    if (!user) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
    }

    userId = user.id;

    if (!isOpenAIConfigured()) {
      return NextResponse.json(
        {
          error: "Service indisponible",
          message:
            "La génération IA n'est pas configurée. Contactez le support.",
        },
        { status: 503 }
      );
    }

    const body = await request.json();
    const parsed = generatePromptSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Données invalides", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const profile = await getOrCreateProfile(user.id, user.email);
    userPlan = profile.plan;
    const usage = await reservePromptSlot(user.id, profile.plan);

    if (!usage.allowed) {
      return NextResponse.json(
        {
          error: "Limite quotidienne atteinte",
          message: "Passez au plan Pro pour des prompts illimités.",
          used: usage.used,
          limit: usage.limit,
        },
        { status: 429 }
      );
    }

    const input: GeneratePromptInput = {
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
    };

    let result;
    try {
      result = await generatePromptWithOpenAI(input);
    } catch (genError) {
      await releasePromptSlot(user.id, profile.plan);
      throw genError;
    }

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
      },
    });

    return NextResponse.json({
      ...result,
      id: saved.id,
      usage: {
        used: usage.used,
        limit: usage.limit,
        remaining: usage.remaining,
      },
    });
  } catch (error) {
    console.error("Generate error:", error);
    if (userId) {
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
