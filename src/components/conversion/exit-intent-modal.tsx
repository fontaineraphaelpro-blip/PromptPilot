"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ScrollLink } from "@/components/navigation/scroll-link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { X, Sparkles, Clock } from "lucide-react";
import { FREE_LIFETIME_LIMIT } from "@/lib/constants";
import { PLAN_PRICES } from "@/lib/plans";
import { isMarketingProPush } from "@/lib/sales-mode";

const DISMISS_KEY = "pp_exit_dismissed";

export function ExitIntentModal() {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const pushPro = isMarketingProPush();

  useEffect(() => {
    if (sessionStorage.getItem(DISMISS_KEY)) return;

    const onMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && window.scrollY > 200) {
        setOpen(true);
      }
    };

    document.addEventListener("mouseleave", onMouseLeave);
    return () => document.removeEventListener("mouseleave", onMouseLeave);
  }, []);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") dismiss();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  function dismiss() {
    sessionStorage.setItem(DISMISS_KEY, "1");
    setOpen(false);
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduce ? undefined : { opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm"
            onClick={dismiss}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="exit-intent-title"
            initial={reduce ? false : { opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 z-[101] w-[calc(100%-1.5rem)] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-white/15 bg-card p-6 sm:p-8 shadow-[0_0_80px_-20px_rgba(255,255,255,0.3)] max-h-[min(90vh,90dvh)] overflow-y-auto overscroll-contain"
          >
            <button
              type="button"
              onClick={dismiss}
              className="absolute right-3 top-3 inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/5"
              aria-label="Fermer"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-black mb-6">
              <Sparkles className="h-6 w-6" />
            </div>
            <h2 id="exit-intent-title" className="text-xl sm:text-2xl font-bold tracking-tight pr-6">
              Ne repars pas sans ton brief expert
            </h2>
            <p className="mt-3 text-muted-foreground text-sm leading-relaxed">
              Compte gratuit en 30 secondes —{" "}
              <strong className="text-foreground">
                {FREE_LIFETIME_LIMIT} briefs scorés /100
              </strong>
              . Sans carte. Ou passe Pro ({PLAN_PRICES.plus.label}) pour Expert à
              chaque génération.
            </p>
            <p className="mt-4 inline-flex items-center gap-2 text-xs text-emerald-200/90">
              <Clock className="h-3.5 w-3.5 shrink-0" />
              30–60 min gagnées par brief · Pro rentabilisé dès la 2ᵉ génération
            </p>
            <div className="mt-6 flex flex-col gap-3">
              <Button size="lg" className="w-full" asChild>
                <Link href="/signup" onClick={dismiss}>
                  Créer mon compte — gratuit
                </Link>
              </Button>
              {pushPro ? (
                <Button variant="outline" size="lg" className="w-full" asChild>
                  <Link href="/pricing?plan=pro" onClick={dismiss}>
                    Voir Pro — {PLAN_PRICES.plus.label}
                  </Link>
                </Button>
              ) : (
                <Button variant="outline" size="lg" className="w-full" asChild>
                  <ScrollLink section="funnel" onClick={dismiss}>
                    Voir un aperçu en 30 s
                  </ScrollLink>
                </Button>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
