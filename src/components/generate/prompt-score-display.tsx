"use client";

import type { PromptScoreBreakdown } from "@/types";
import { cn } from "@/lib/utils";

const CRITERIA: { key: keyof PromptScoreBreakdown; label: string; max: number }[] = [
  { key: "clarity", label: "Clarté de l'objectif", max: 25 },
  { key: "constraints", label: "Contraintes explicites", max: 25 },
  { key: "outputFormat", label: "Format de sortie", max: 25 },
  { key: "aiAdaptation", label: "Adaptation à l'IA", max: 25 },
];

interface PromptScoreDisplayProps {
  score: number;
  breakdown?: PromptScoreBreakdown | null;
  label?: string;
  compact?: boolean;
}

export function PromptScoreDisplay({
  score,
  breakdown,
  label,
  compact = false,
}: PromptScoreDisplayProps) {
  const color =
    score >= 85 ? "text-green-400" : score >= 70 ? "text-white" : score >= 50 ? "text-yellow-400" : "text-orange-400";

  return (
    <div className={cn("rounded-xl border border-white/10 bg-white/[0.03] p-4", compact && "p-3")}>
      <div className="flex items-center justify-between gap-4 mb-3">
        <div>
          <p className="text-xs uppercase tracking-wider text-muted-foreground">Prompt Score</p>
          <p className={cn("text-3xl font-bold tabular-nums", color, compact && "text-2xl")}>
            {score}
            <span className="text-base font-normal text-muted-foreground">/100</span>
          </p>
        </div>
        {label && (
          <span className="rounded-full border border-white/15 px-3 py-1 text-xs font-medium">
            {label}
          </span>
        )}
      </div>
      {breakdown && !compact && (
        <ul className="space-y-2">
          {CRITERIA.map(({ key, label: critLabel, max }) => (
            <li key={key}>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-muted-foreground">{critLabel}</span>
                <span>{breakdown[key]}/{max}</span>
              </div>
              <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full bg-white rounded-full transition-all"
                  style={{ width: `${(breakdown[key] / max) * 100}%` }}
                />
              </div>
            </li>
          ))}
        </ul>
      )}
      {score < 70 && !compact && (
        <p className="mt-3 text-xs text-muted-foreground border-t border-white/10 pt-3">
          Score &lt; 70 : regénération gratuite disponible (garantie qualité PromptExpert).
        </p>
      )}
    </div>
  );
}
