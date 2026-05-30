"use client";

import { useState } from "react";
import { PromptResultCard } from "@/components/generate/prompt-result-card";
import type { PromptRecord } from "@/types";

interface PromptDetailClientProps {
  prompt: PromptRecord;
}

export function PromptDetailClient({ prompt }: PromptDetailClientProps) {
  const [isFavorite, setIsFavorite] = useState(prompt.is_favorite);

  async function toggleFavorite() {
    const res = await fetch(`/api/prompts/${prompt.id}/favorite`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ is_favorite: !isFavorite }),
    });
    if (res.ok) setIsFavorite(!isFavorite);
  }

  return (
    <PromptResultCard
      result={{
        id: prompt.id,
        generated_prompt: prompt.generated_prompt,
        short_variant: prompt.short_variant,
        detailed_variant: prompt.detailed_variant,
        expert_variant: prompt.expert_variant,
        ai_tips: prompt.ai_tips,
      }}
      isFavorite={isFavorite}
      onToggleFavorite={toggleFavorite}
      onReset={() => window.history.back()}
    />
  );
}
