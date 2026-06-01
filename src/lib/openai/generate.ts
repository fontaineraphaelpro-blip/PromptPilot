import OpenAI from "openai";
import type { DetailLevel } from "@/lib/constants";
import type { GeneratePromptInput, GeneratePromptResult } from "@/types";
import { buildSystemPrompt, buildUserPrompt } from "./system-prompt";

const RETRY_USER_SUFFIX = `

IMPORTANT — réponds avec un JSON COMPLET, toutes clés non vides :
generated_prompt, short_variant, detailed_variant, expert_variant, ai_tips, preview_summary, preview_questions (tableau de 3 strings).
Respecte les minimums de longueur du niveau ${"{detailLevel}"}. Pas de placeholders.`;

function getOpenAIClient() {
  return new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
}

function getModelForDetailLevel(level: DetailLevel): string {
  if (level === "Expert" || level === "Détaillé") {
    return process.env.OPENAI_MODEL_QUALITY?.trim() || "gpt-4o";
  }
  return process.env.OPENAI_MODEL?.trim() || "gpt-4o-mini";
}

function getMaxTokensForDetailLevel(level: DetailLevel): number {
  switch (level) {
    case "Expert":
      return 8192;
    case "Détaillé":
      return 6144;
    default:
      return 4096;
  }
}

function extractJsonContent(content: string): string {
  const trimmed = content.trim();
  const fenced = trimmed.match(/^```(?:json)?\s*([\s\S]*?)```$/i);
  if (fenced) return fenced[1].trim();

  const start = trimmed.indexOf("{");
  const end = trimmed.lastIndexOf("}");
  if (start >= 0 && end > start) return trimmed.slice(start, end + 1);

  return trimmed;
}

function pickString(raw: Record<string, unknown>, ...keys: string[]): string {
  for (const key of keys) {
    const value = raw[key];
    if (typeof value === "string" && value.trim()) {
      return value.trim();
    }
  }
  return "";
}

function buildShortFallback(text: string): string {
  const lines = text.split("\n").filter(Boolean);
  if (lines.length <= 8) return text.slice(0, 900);
  return lines.slice(0, 12).join("\n").slice(0, 900);
}

const MIN_MAIN_LENGTH: Record<DetailLevel, number> = {
  Rapide: 180,
  Détaillé: 400,
  Expert: 650,
};

function isPromptTooShallow(main: string, level: DetailLevel): boolean {
  return main.length < MIN_MAIN_LENGTH[level];
}

function normalizeOpenAIResult(raw: Record<string, unknown>): GeneratePromptResult {
  const generated_prompt = pickString(
    raw,
    "generated_prompt",
    "generatedPrompt",
    "main_prompt",
    "prompt",
    "prompt_principal"
  );
  const short_variant = pickString(raw, "short_variant", "shortVariant", "short", "version_courte");
  const detailed_variant = pickString(
    raw,
    "detailed_variant",
    "detailedVariant",
    "detailed",
    "version_detaillee"
  );
  const expert_variant = pickString(
    raw,
    "expert_variant",
    "expertVariant",
    "expert",
    "version_expert"
  );
  const ai_tips = pickString(raw, "ai_tips", "aiTips", "tips", "conseils", "conseils_ia");
  const preview_summary = pickString(
    raw,
    "preview_summary",
    "previewSummary",
    "preview_interpretation",
    "interpretation"
  );

  let preview_questions: string[] = [];
  const rawQuestions = raw.preview_questions ?? raw.previewQuestions ?? raw.questions;
  if (Array.isArray(rawQuestions)) {
    preview_questions = rawQuestions.filter((q): q is string => typeof q === "string").slice(0, 3);
  }

  const main = generated_prompt || detailed_variant || expert_variant || short_variant;
  if (!main) {
    throw new Error("Réponse OpenAI sans prompt principal");
  }

  const detailed = detailed_variant || main;
  const expert = expert_variant || detailed;

  return {
    generated_prompt: main,
    short_variant: short_variant || buildShortFallback(main),
    detailed_variant: detailed,
    expert_variant: expert,
    ai_tips:
      ai_tips ||
      "Affine le prompt selon les retours de l'IA, teste la variante courte pour itérer vite, et ajoute des contraintes explicites si la sortie manque de précision.",
    preview_summary,
    preview_questions,
  };
}

async function requestCompletion(
  openai: OpenAI,
  input: GeneratePromptInput,
  retry = false
): Promise<string> {
  const model = getModelForDetailLevel(input.detailLevel);
  const completion = await openai.chat.completions.create({
    model,
    temperature: retry ? 0.35 : 0.55,
    max_tokens: getMaxTokensForDetailLevel(input.detailLevel),
    response_format: { type: "json_object" },
    messages: [
      { role: "system", content: buildSystemPrompt(input) },
      {
        role: "user",
        content: retry
          ? buildUserPrompt(input) +
            RETRY_USER_SUFFIX.replace("{detailLevel}", input.detailLevel)
          : buildUserPrompt(input),
      },
    ],
  });

  const content = completion.choices[0]?.message?.content;
  if (!content) {
    throw new Error("Réponse OpenAI vide");
  }
  return content;
}

export async function generatePromptWithOpenAI(
  input: GeneratePromptInput
): Promise<GeneratePromptResult> {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY non configurée");
  }

  const openai = getOpenAIClient();
  let lastError: Error | null = null;

  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const content = await requestCompletion(openai, input, attempt > 0);
      const jsonText = extractJsonContent(content);
      const parsed = JSON.parse(jsonText) as Record<string, unknown>;
      const result = normalizeOpenAIResult(parsed);

      if (attempt === 0 && isPromptTooShallow(result.generated_prompt, input.detailLevel)) {
        console.warn(
          `OpenAI prompt trop court (${result.generated_prompt.length} chars, niveau ${input.detailLevel}), retry…`
        );
        continue;
      }

      return result;
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      if (attempt === 0) {
        console.warn("OpenAI parse attempt 1 failed, retrying:", lastError.message);
      }
    }
  }

  throw lastError ?? new Error("Impossible de générer le prompt");
}
