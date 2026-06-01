import type { TargetAI } from "@/lib/constants";
import type { GeneratePromptResult } from "@/types";

export function formatPromptForAI(targetAI: TargetAI, prompt: string): string {
  const ai = targetAI.toLowerCase();
  if (ai.includes("midjourney") || ai.includes("dall")) {
    return prompt.replace(/\n{3,}/g, "\n\n").trim();
  }
  if (ai.includes("cursor") || ai.includes("replit") || ai.includes("bolt") || ai.includes("lovable")) {
    return `# Contexte dev\n\n${prompt}\n\n# Instructions\n- Code modulaire\n- Explique les choix\n- Liste les fichiers touchés`;
  }
  if (ai.includes("claude")) {
    return `<instructions>\n${prompt}\n</instructions>`;
  }
  return prompt;
}

export function toMarkdownExport(
  result: GeneratePromptResult & { original_idea?: string; target_ai?: string; prompt_score?: number },
  variant: "main" | "short" | "detailed" | "expert" = "main"
): string {
  const variants = {
    main: result.generated_prompt,
    short: result.short_variant,
    detailed: result.detailed_variant,
    expert: result.expert_variant,
  };
  const lines = [
    "# Prompt PromptPilot",
    "",
    result.original_idea ? `**Idée:** ${result.original_idea}` : "",
    result.target_ai ? `**IA:** ${result.target_ai}` : "",
    result.prompt_score ? `**Score:** ${result.prompt_score}/100` : "",
    "",
    "## Prompt",
    "",
    variants[variant],
    "",
  ];
  if (result.ai_tips) {
    lines.push("## Conseils", "", result.ai_tips, "");
  }
  return lines.filter(Boolean).join("\n");
}

export function toNotionBlocks(markdown: string): string {
  return markdown
    .split("\n")
    .map((line) => {
      if (line.startsWith("# ")) return `▶ ${line.slice(2)}`;
      if (line.startsWith("## ")) return `\n${line.slice(3).toUpperCase()}\n`;
      if (line.startsWith("**")) return line;
      return line;
    })
    .join("\n");
}

export function downloadTextFile(content: string, filename: string, mime = "text/plain") {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
