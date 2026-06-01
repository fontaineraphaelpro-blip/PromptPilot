"use client";

import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";

const STORAGE_KEY = "pp_weekly_prompt_display";
const MIN_WEEKLY = 500;
const MAX_WEEKLY = 1500;

function randomWeeklyCount(): number {
  return MIN_WEEKLY + Math.floor(Math.random() * (MAX_WEEKLY - MIN_WEEKLY + 1));
}

function getStableWeeklyCount(): number {
  if (typeof window === "undefined") return 847;
  const stored = sessionStorage.getItem(STORAGE_KEY);
  if (stored) {
    const n = parseInt(stored, 10);
    if (n >= MIN_WEEKLY && n <= MAX_WEEKLY) return n;
  }
  const n = randomWeeklyCount();
  sessionStorage.setItem(STORAGE_KEY, String(n));
  return n;
}

export function SocialProofCounter() {
  const [weeklyCount, setWeeklyCount] = useState<number | null>(null);

  useEffect(() => {
    setWeeklyCount(getStableWeeklyCount());
  }, []);

  const label =
    weeklyCount != null
      ? `${weeklyCount.toLocaleString("fr-FR")} prompts générés cette semaine`
      : "Des centaines de prompts générés chaque semaine";

  return (
    <p className="inline-flex items-center justify-center gap-2 text-sm text-muted-foreground text-center px-4 max-w-full">
      <Sparkles className="h-4 w-4 text-primary shrink-0" />
      <span>{label}</span>
    </p>
  );
}
