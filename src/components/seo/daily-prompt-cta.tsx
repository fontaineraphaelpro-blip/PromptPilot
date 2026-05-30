"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import type { DailyPrompt } from "@/lib/seo/daily-prompt";
import { saveTemplatePrefill } from "@/lib/conversion/template-prefill";
import { Wand2 } from "lucide-react";

export function DailyPromptCta({
  prompt,
  compact = false,
}: {
  prompt: DailyPrompt;
  compact?: boolean;
}) {
  const router = useRouter();

  function handleUse() {
    saveTemplatePrefill({
      userIdea: prompt.idea,
      targetAI: prompt.targetAI,
      templateTitle: prompt.title,
    });
    router.push("/generate");
  }

  return (
    <Button size={compact ? "sm" : "default"} variant={compact ? "outline" : "default"} onClick={handleUse}>
      <Wand2 className="h-3 w-3" />
      Générer
    </Button>
  );
}
