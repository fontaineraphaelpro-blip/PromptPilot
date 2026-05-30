"use client";

import { useEffect, useState } from "react";
import { Flame, Users, Zap } from "lucide-react";
import { FREE_DAILY_LIMIT } from "@/lib/constants";

function getLiveCount(): number {
  const hour = new Date().getHours();
  const day = new Date().getDate();
  return Math.floor(42 + hour * 5 + (day % 7) * 3);
}

export function FomoStrip() {
  const [live, setLive] = useState(0);

  useEffect(() => {
    setLive(getLiveCount());
    const id = setInterval(() => setLive(getLiveCount()), 45000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="border-b border-amber-500/20 bg-gradient-to-r from-amber-500/10 via-transparent to-amber-500/10">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-6 gap-y-2 px-4 py-2 text-xs sm:text-sm">
        <span className="inline-flex items-center gap-1.5 text-amber-200/90">
          <Flame className="h-3.5 w-3.5 shrink-0" />
          <strong className="text-amber-100">{live}</strong> prompts générés dans la dernière heure
        </span>
        <span className="hidden sm:inline text-border">|</span>
        <span className="inline-flex items-center gap-1.5 text-muted-foreground">
          <Users className="h-3.5 w-3.5 shrink-0" />
          Quota gratuit : <strong className="text-foreground">{FREE_DAILY_LIMIT} prompts/jour</strong>
        </span>
        <span className="hidden md:inline text-border">|</span>
        <span className="inline-flex items-center gap-1.5 text-muted-foreground">
          <Zap className="h-3.5 w-3.5 shrink-0 text-foreground" />
          Inscription en <strong className="text-foreground">30 sec</strong> — sans carte
        </span>
      </div>
    </div>
  );
}
