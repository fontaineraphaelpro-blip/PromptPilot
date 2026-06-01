"use client";

import { useEffect, useState } from "react";
import { Flame, Users, Zap } from "lucide-react";
import Link from "next/link";
import { FREE_DAILY_LIMIT } from "@/lib/constants";
import { isSalesMode } from "@/lib/sales-mode";
import { PLAN_PRICES } from "@/lib/plans";

export function FomoStrip() {
  const sales = isSalesMode();
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
    <div className="border-b border-amber-500/20 bg-gradient-to-r from-amber-500/10 via-transparent to-amber-500/10">
      <div className="mx-auto flex w-full max-w-[90rem] flex-wrap items-center justify-center gap-x-6 gap-y-2 px-4 sm:px-6 lg:px-10 py-2 text-xs sm:text-sm">
        {hourlyLabel ? (
          <span className="inline-flex items-center gap-1.5 text-amber-200/90">
            <Flame className="h-3.5 w-3.5 shrink-0" />
            {hourlyLabel}
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 text-amber-200/90">
            <Flame className="h-3.5 w-3.5 shrink-0" />
            Prompts experts en moins de 30 secondes
          </span>
        )}
        <span className="hidden sm:inline text-border">|</span>
        <span className="inline-flex items-center gap-1.5 text-muted-foreground">
          <Users className="h-3.5 w-3.5 shrink-0" />
          Quota gratuit : <strong className="text-foreground">{FREE_DAILY_LIMIT} prompts/jour</strong>
        </span>
        <span className="hidden md:inline text-border">|</span>
        {sales ? (
          <Link
            href="/pricing?plan=pro"
            className="inline-flex items-center gap-1.5 font-medium text-foreground hover:underline"
          >
            <Zap className="h-3.5 w-3.5 shrink-0" />
            Pro {PLAN_PRICES.pro.label} — checkout immédiat
          </Link>
        ) : (
          <span className="inline-flex items-center gap-1.5 text-muted-foreground">
            <Zap className="h-3.5 w-3.5 shrink-0 text-foreground" />
            Inscription en <strong className="text-foreground">30 sec</strong> — sans carte
          </span>
        )}
      </div>
    </div>
  );
}
