"use client";

import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";

export function SocialProofCounter() {
  const [label, setLabel] = useState("Des centaines de prompts générés chaque semaine");

  useEffect(() => {
    fetch("/api/stats/public")
      .then((r) => r.json())
      .then((d) => {
        if (d.label) setLabel(d.label);
      })
      .catch(() => {});
  }, []);

  return (
    <p className="inline-flex items-center gap-2 text-sm text-muted-foreground">
      <Sparkles className="h-4 w-4 text-primary shrink-0" />
      {label}
    </p>
  );
}
