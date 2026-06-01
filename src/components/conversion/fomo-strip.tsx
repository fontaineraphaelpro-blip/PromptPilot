"use client";

import { useEffect, useState } from "react";
import { Flame, Users, Zap } from "lucide-react";
import { FREE_DAILY_LIMIT } from "@/lib/constants";

export function FomoStrip() {
  const [hourlyLabel, setHourlyLabel] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/stats/public")
      .then((r) => r.json())
      .then((d) => {
        if (d.hourly_label) setHourlyLabel(d.hourly_label);
      })
      .catch(() => {});
  }, []);

  return (
    <div className="hidden md:block border-b border-amber-500/20 bg-gradient-to-r from-amber-500/10 via-transparent to-amber-500/10">
      <div className="mx-auto flex w-full max-w-[90rem] flex-col sm:flex-row flex-wrap items-center justify-center gap-x-4 gap-y-1.5 px-4 sm:px-6 lg:px-10 py-2 text-xs sm:text-sm text-center sm:text-left">
        {hourlyLabel ? (
          <span className="inline-flex items-center justify-center gap-1.5 text-amber-200/90">
            <Flame className="h-3.5 w-3.5 shrink-0" />
            {hourlyLabel}
          </span>
        ) : (
          <span className="inline-flex items-center justify-center gap-1.5 text-amber-200/90">
            <Flame className="h-3.5 w-3.5 shrink-0" />
            Prompts experts en moins de 30 secondes
          </span>
        )}
        <span className="hidden sm:inline text-border text-muted-foreground">|</span>
        <span className="inline-flex items-center justify-center gap-1.5 text-muted-foreground">
          <Users className="h-3.5 w-3.5 shrink-0" />
          <strong className="text-foreground">{FREE_DAILY_LIMIT} prompts/jour</strong> en free
        </span>
        <span className="hidden md:inline text-border text-muted-foreground">|</span>
        <span className="inline-flex items-center justify-center gap-1.5 text-muted-foreground">
          <Zap className="h-3.5 w-3.5 shrink-0 text-foreground" />
          Inscription <strong className="text-foreground">30 sec</strong> — sans carte
        </span>
      </div>
    </div>
  );
}
