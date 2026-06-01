"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, X, Sparkles, Gauge, Eye } from "lucide-react";

const STORAGE_KEY = "pp_onboarding_v1_done";

export function OnboardingBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!localStorage.getItem(STORAGE_KEY)) {
      setVisible(true);
    }
  }, []);

  function dismiss() {
    localStorage.setItem(STORAGE_KEY, "1");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <Card className="border-primary/30 bg-primary/5">
      <CardContent className="py-4">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-3 flex-1">
            <p className="font-semibold flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              Bienvenue — 3 étapes pour ton premier prompt expert
            </p>
            <ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside">
              <li>Décris ton idée (même vague) et choisis ton IA cible</li>
              <li>
                <span className="inline-flex items-center gap-1">
                  <Gauge className="h-3.5 w-3.5" /> Consulte le score /100
                </span>{" "}
                et la preview avant de coller
              </li>
              <li>
                <span className="inline-flex items-center gap-1">
                  <Eye className="h-3.5 w-3.5" /> Copie
                </span>{" "}
                la variante Principal, Court ou Détaillé selon ton besoin
              </li>
            </ol>
            <Button size="sm" asChild>
              <Link href="/generate" onClick={dismiss}>
                Générer mon premier prompt
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          <button
            type="button"
            onClick={dismiss}
            className="text-muted-foreground hover:text-foreground p-1"
            aria-label="Fermer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
