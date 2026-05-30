import OpenAI from "openai";
import type { GeneratePromptInput, GeneratePromptResult } from "@/types";
import { buildSystemPrompt, buildUserPrompt } from "./system-prompt";

function getOpenAIClient() {
  return new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
}

export async function generatePromptWithOpenAI(
  input: GeneratePromptInput
): Promise<GeneratePromptResult> {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY non configurée");
  }

  const openai = getOpenAIClient();
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    temperature: 0.7,
    response_format: { type: "json_object" },
    messages: [
      { role: "system", content: buildSystemPrompt(input) },
      { role: "user", content: buildUserPrompt(input) },
    ],
  });

  const content = completion.choices[0]?.message?.content;
  if (!content) {
    throw new Error("Réponse OpenAI vide");
  }

  let parsed: GeneratePromptResult;
  try {
    parsed = JSON.parse(content) as GeneratePromptResult;
  } catch {
    throw new Error("Réponse OpenAI invalide (JSON)");
  }

  const required = [
    "generated_prompt",
    "short_variant",
    "detailed_variant",
    "expert_variant",
    "ai_tips",
  ] as const;

  for (const key of required) {
    if (!parsed[key] || typeof parsed[key] !== "string") {
      throw new Error(`Champ manquant dans la réponse : ${key}`);
    }
  }

  return parsed;
}
