"use client";

import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";
import { useLocale } from "@/components/providers/locale-provider";

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
  const { locale, messages: m } = useLocale();
  const [weeklyCount, setWeeklyCount] = useState<number | null>(null);

  useEffect(() => {
    setWeeklyCount(getStableWeeklyCount());
  }, []);

  const label =
    weeklyCount != null
      ? m.social.weekly(weeklyCount.toLocaleString(locale === "en" ? "en-US" : "fr-FR"))
      : m.social.weeklyFallback;

  return (
    <p className="inline-flex items-center justify-center gap-2 text-sm text-muted-foreground text-center px-4 max-w-full">
      <Sparkles className="h-4 w-4 text-primary shrink-0" />
      <span>{label}</span>
    </p>
  );
}
