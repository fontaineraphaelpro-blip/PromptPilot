"use client";

import type { WorkflowStep } from "@/lib/workflows/packs";
import { ArrowDown, ArrowRight } from "lucide-react";

function StepNode({ step }: { step: WorkflowStep }) {
  return (
    <div className="rounded-xl border border-white/15 bg-white/[0.04] p-3 sm:p-4 w-full sm:w-[180px] lg:w-[200px] shrink-0">
      <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">
        Étape {step.order}
      </p>
      <p className="font-semibold text-sm leading-tight break-words">{step.title}</p>
      <p className="text-xs text-muted-foreground mt-2 line-clamp-2 break-words">
        {step.objective}
      </p>
      <p className="text-[10px] text-primary/80 mt-2 truncate">{step.targetAI}</p>
    </div>
  );
}

export function WorkflowFlowDiagram({ steps }: { steps: WorkflowStep[] }) {
  return (
    <div className="w-full min-w-0 max-w-full">
      {/* Mobile : flux vertical — pas de scroll horizontal page */}
      <div className="flex flex-col items-stretch gap-1 sm:hidden">
        {steps.map((step, i) => (
          <div key={step.order} className="flex flex-col items-center min-w-0 w-full">
            <div className="w-full min-w-0">
              <StepNode step={step} />
            </div>
            {i < steps.length - 1 && (
              <ArrowDown className="h-4 w-4 my-1 text-muted-foreground shrink-0" aria-hidden />
            )}
          </div>
        ))}
      </div>

      {/* Tablette+ : scroll horizontal contenu dans la carte */}
      <div
        className="hidden sm:block w-full min-w-0 max-w-full overflow-x-auto overscroll-x-contain"
        tabIndex={0}
        aria-label="Étapes du workflow"
      >
        <div className="flex items-stretch gap-2 py-2 w-max">
          {steps.map((step, i) => (
            <div key={step.order} className="flex items-center gap-2 shrink-0">
              <StepNode step={step} />
              {i < steps.length - 1 && (
                <ArrowRight className="h-5 w-5 text-muted-foreground shrink-0" aria-hidden />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
