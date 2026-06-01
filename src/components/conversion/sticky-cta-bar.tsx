"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { FREE_DAILY_LIMIT } from "@/lib/constants";
import { isSalesMode } from "@/lib/sales-mode";
import { PLAN_PRICES } from "@/lib/plans";

export function StickyCtaBar() {
  const sales = isSalesMode();
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (dismissed) return;
      setVisible(window.scrollY > 400);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [dismissed]);

  return (
    <AnimatePresence>
      {visible && !dismissed && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 right-0 z-50 glass-nav border-t border-white/10 px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]"
        >
          <div className="mx-auto flex max-w-4xl items-center gap-3">
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium truncate">
                {sales
                  ? `Pro ${PLAN_PRICES.pro.label} — 200 prompts/jour + garantie score`
                  : `Ton prompt expert t'attend — ${FREE_DAILY_LIMIT} gratuits aujourd'hui`}
              </p>
              <p className="text-xs text-muted-foreground hidden sm:block">
                {sales
                  ? "Ou essai gratuit sans carte — 2 prompts/jour"
                  : "Étape 1 sur 3 : décris ton idée en 10 secondes ↓"}
              </p>
            </div>
            {sales ? (
              <>
                <Button size="sm" className="shrink-0" asChild>
                  <Link href="/pricing?plan=pro">
                    Pro
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button size="sm" variant="outline" className="shrink-0 hidden sm:inline-flex" asChild>
                  <Link href="/#funnel">Gratuit</Link>
                </Button>
              </>
            ) : (
              <Button size="sm" className="shrink-0" asChild>
                <Link href="/#funnel">
                  Continuer
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            )}
            <button
              type="button"
              onClick={() => setDismissed(true)}
              className="shrink-0 rounded-lg p-2 text-muted-foreground hover:bg-white/5"
              aria-label="Fermer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
