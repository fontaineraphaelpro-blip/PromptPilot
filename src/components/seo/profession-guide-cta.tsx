"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import type { ProfessionGuide } from "@/lib/seo/profession-guides";
import { saveTemplatePrefill } from "@/lib/conversion/template-prefill";
import { Wand2 } from "lucide-react";

export function ProfessionGuideCta({ guide }: { guide: ProfessionGuide }) {
  const router = useRouter();

  function handleUse() {
    saveTemplatePrefill({
      userIdea: guide.templateIdea,
      targetAI: guide.targetAI,
      templateTitle: guide.title,
    });
    router.push("/generate");
  }

  return (
    <Button onClick={handleUse}>
      <Wand2 className="h-4 w-4" />
      {guide.ctaLabel}
    </Button>
  );
}
