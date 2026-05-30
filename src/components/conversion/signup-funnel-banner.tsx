"use client";

import { useEffect, useState } from "react";
import { Lock, Sparkles } from "lucide-react";
import { getFunnelDraft } from "@/lib/conversion/funnel-storage";

export function SignupFunnelBanner() {
  const [draft, setDraft] = useState<ReturnType<typeof getFunnelDraft>>(null);

  useEffect(() => {
    setDraft(getFunnelDraft());
  }, []);

  if (!draft) return null;

  return (
    <div className="w-full max-w-md mx-auto mb-6 rounded-2xl border border-white/20 bg-white/5 p-5">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-black">
          <Sparkles className="h-5 w-5" />
        </div>
        <div className="min-w-0">
          <p className="font-semibold text-sm flex items-center gap-2">
            <Lock className="h-3.5 w-3.5" />
            Ton prompt {draft.targetAi} est en attente
          </p>
          <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
            &quot;{draft.idea}&quot;
          </p>
          <p className="mt-2 text-xs text-amber-200/90">
            Crée ton compte — 30 sec — pour débloquer le prompt complet + variantes
          </p>
        </div>
      </div>
    </div>
  );
}
