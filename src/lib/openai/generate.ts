import OpenAI from "openai";
import type { GeneratePromptInput, GeneratePromptResult } from "@/types";
import { buildSystemPrompt, buildUserPrompt } from "./system-prompt";

function getOpenAIClient() {
  return new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
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
  if (lines.length <= 3) return text.slice(0, 600);
  return lines.slice(0, 4).join("\n").slice(0, 600);
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
  };
}

async function requestCompletion(
  openai: OpenAI,
  input: GeneratePromptInput,
  retry = false
): Promise<string> {
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    temperature: retry ? 0.4 : 0.7,
    max_tokens: 4096,
    response_format: { type: "json_object" },
    messages: [
      { role: "system", content: buildSystemPrompt(input) },
      {
        role: "user",
        content: retry
          ? `${buildUserPrompt(input)}

IMPORTANT : réponds avec un JSON complet contenant exactement ces 5 clés string non vides :
generated_prompt, short_variant, detailed_variant, expert_variant, ai_tips`
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
      return normalizeOpenAIResult(parsed);
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      if (attempt === 0) {
        console.warn("OpenAI parse attempt 1 failed, retrying:", lastError.message);
      }
    }
  }

  throw lastError ?? new Error("Impossible de générer le prompt");
}
