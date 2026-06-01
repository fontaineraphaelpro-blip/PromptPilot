"use client";

import type { WorkflowStep } from "@/lib/workflows/packs";
import { ArrowRight } from "lucide-react";

export function WorkflowFlowDiagram({ steps }: { steps: WorkflowStep[] }) {
  return (
    <div className="overflow-x-auto pb-2 -mx-2 px-2">
      <div className="flex items-stretch gap-2 min-w-max py-2">
        {steps.map((step, i) => (
          <div key={step.order} className="flex items-center gap-2">
            <div className="rounded-xl border border-white/15 bg-white/[0.04] p-4 w-[200px] shrink-0">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">
                Étape {step.order}
              </p>
              <p className="font-semibold text-sm leading-tight">{step.title}</p>
              <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{step.objective}</p>
              <p className="text-[10px] text-primary/80 mt-2">{step.targetAI}</p>
            </div>
            {i < steps.length - 1 && (
              <ArrowRight className="h-5 w-5 text-muted-foreground shrink-0" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
