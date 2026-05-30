import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { generatePromptSchema } from "@/lib/validations/prompt";
import { generatePromptWithOpenAI } from "@/lib/openai/generate";
import { getOrCreateProfile } from "@/lib/profile";
import { checkUsageLimit, incrementUsage } from "@/lib/usage";
import type { GeneratePromptInput } from "@/types";

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

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

    const { data: saved, error: saveError } = await supabase
      .from("prompts")
      .insert({
        user_id: user.id,
        original_idea: input.userIdea,
        target_ai: input.targetAI,
        task_type: input.taskType,
        detail_level: input.detailLevel,
        tone: input.tone,
        language: input.language,
        generated_prompt: result.generated_prompt,
        short_variant: result.short_variant,
        detailed_variant: result.detailed_variant,
        expert_variant: result.expert_variant,
        ai_tips: result.ai_tips,
      })
      .select("id")
      .single();

    if (saveError) {
      console.error("Save prompt error:", saveError);
    }

    await incrementUsage(user.id);

    return NextResponse.json({
      ...result,
      id: saved?.id,
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
