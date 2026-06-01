"use client";

import { useState } from "react";
import { PromptResultCard } from "@/components/generate/prompt-result-card";
import { PromptTagsEditor } from "@/components/history/prompt-tags-editor";
import type { PromptRecord } from "@/types";
import type { Plan } from "@/lib/constants";
import { qualifiesForScoreGuarantee } from "@/lib/prompt-score";

interface PromptDetailClientProps {
  prompt: PromptRecord;
  plan: Plan;
}

export function PromptDetailClient({ prompt, plan }: PromptDetailClientProps) {
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
    <div className="space-y-4">
      <PromptTagsEditor promptId={prompt.id} initialTags={prompt.tags} plan={plan} />
      <PromptResultCard
        plan={plan}
        result={{
          id: prompt.id,
          original_idea: prompt.original_idea,
          target_ai: prompt.target_ai,
          generated_prompt: prompt.generated_prompt,
          short_variant: prompt.short_variant,
          detailed_variant: prompt.detailed_variant,
          expert_variant: prompt.expert_variant,
          ai_tips: prompt.ai_tips,
          prompt_score: prompt.prompt_score ?? undefined,
          score_breakdown: prompt.score_breakdown ?? undefined,
          preview_summary: prompt.preview_summary,
          preview_questions: prompt.preview_questions,
          guarantee_regen_available: qualifiesForScoreGuarantee(prompt.prompt_score),
          copy_feedback: prompt.copy_feedback,
        }}
        isFavorite={isFavorite}
        onToggleFavorite={toggleFavorite}
        onReset={() => window.history.back()}
      />
    </div>
  );
}
