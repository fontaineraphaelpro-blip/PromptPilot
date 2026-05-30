import { NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth";
import { generatePromptSchema } from "@/lib/validations/prompt";
import { generatePromptWithOpenAI } from "@/lib/openai/generate";
import { getOrCreateProfile } from "@/lib/profile";
import { checkUsageLimit, incrementUsage } from "@/lib/usage";
import { prisma } from "@/lib/db";
import type { GeneratePromptInput } from "@/types";

export async function POST(request: Request) {
  try {
    const user = await getAuthUser();

    if (!user) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
    }

    const body = await request.json();
    const parsed = generatePromptSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Données invalides", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const profile = await getOrCreateProfile(user.id, user.email ?? "");
    const usage = await checkUsageLimit(user.id, profile.plan);

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

    const result = await generatePromptWithOpenAI(input);

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

    await incrementUsage(user.id);

    return NextResponse.json({
      ...result,
      id: saved.id,
      usage: {
        used: usage.used + 1,
        limit: usage.limit,
        remaining: usage.limit ? Math.max(0, usage.limit - usage.used - 1) : null,
      },
    });
  } catch (error) {
    console.error("Generate error:", error);
    const message =
      error instanceof Error ? error.message : "Erreur de génération";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
