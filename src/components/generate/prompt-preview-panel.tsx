"use client";

import { MessageCircleQuestion, Eye } from "lucide-react";

interface PromptPreviewPanelProps {
  summary?: string;
  questions?: string[];
  targetAI?: string;
}

export function PromptPreviewPanel({ summary, questions, targetAI }: PromptPreviewPanelProps) {
  if (!summary && (!questions || questions.length === 0)) return null;

  return (
    <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 space-y-4">
      <p className="flex items-center gap-2 text-sm font-semibold">
        <Eye className="h-4 w-4 text-primary" />
        Tester avant de coller
        {targetAI && (
          <span className="text-xs font-normal text-muted-foreground">— {targetAI}</span>
        )}
      </p>
      {summary && (
        <p className="text-sm text-muted-foreground leading-relaxed">{summary}</p>
      )}
      {questions && questions.length > 0 && (
        <div>
          <p className="flex items-center gap-2 text-xs font-medium text-muted-foreground mb-2">
            <MessageCircleQuestion className="h-3.5 w-3.5" />
            Questions que l&apos;IA pourrait te poser
          </p>
          <ul className="space-y-1.5">
            {questions.map((q, i) => (
              <li key={i} className="text-sm pl-3 border-l-2 border-white/20">
                {q}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
