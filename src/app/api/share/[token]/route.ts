import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { mapPrompt } from "@/lib/mappers";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params;

  const row = await prisma.prompt.findFirst({
    where: { shareToken: token, shareEnabled: true },
  });

  if (!row) {
    return NextResponse.json({ error: "Lien introuvable" }, { status: 404 });
  }

  const prompt = mapPrompt(row);
  return NextResponse.json({
    prompt: {
      original_idea: prompt.original_idea,
      target_ai: prompt.target_ai,
      task_type: prompt.task_type,
      generated_prompt: prompt.generated_prompt,
      short_variant: prompt.short_variant,
      prompt_score: prompt.prompt_score,
      preview_summary: prompt.preview_summary,
      created_at: prompt.created_at,
    },
  });
}
