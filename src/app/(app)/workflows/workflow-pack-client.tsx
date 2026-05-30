"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import type { WorkflowPack } from "@/lib/workflows/packs";
import { saveTemplatePrefill } from "@/lib/conversion/template-prefill";
import { Wand2 } from "lucide-react";

export function WorkflowPackClient({
  pack,
  unlocked,
}: {
  pack: WorkflowPack;
  unlocked: boolean;
}) {
  const router = useRouter();

  function launchStep(step: WorkflowPack["steps"][0]) {
    saveTemplatePrefill({
      userIdea: step.userIdea,
      targetAI: step.targetAI,
      templateTitle: `${pack.title} — ${step.title}`,
    });
    router.push("/generate");
  }

  return (
    <ol className="space-y-3">
      {pack.steps.map((step) => (
        <li
          key={step.order}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 rounded-lg border border-white/10 p-3"
        >
          <div>
            <p className="text-sm font-medium">
              {step.order}. {step.title}
            </p>
            <p className="text-xs text-muted-foreground">{step.objective}</p>
          </div>
          <Button
            size="sm"
            variant={unlocked ? "default" : "outline"}
            disabled={!unlocked}
            onClick={() => launchStep(step)}
          >
            <Wand2 className="h-3 w-3" />
            Utiliser
          </Button>
        </li>
      ))}
    </ol>
  );
}
