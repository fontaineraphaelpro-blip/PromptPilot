"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ScrollLink } from "@/components/navigation/scroll-link";
import { Button } from "@/components/ui/button";
import { ArrowRight, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { FREE_LIFETIME_LIMIT } from "@/lib/constants";
import { PLAN_PRICES } from "@/lib/plans";
import { useLocale } from "@/components/providers/locale-provider";
import { isMarketingProPush } from "@/lib/sales-mode";

type StickyMode = "guest" | "free";

export function StickyCtaBar({ mode = "guest" }: { mode?: StickyMode }) {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const { messages: m } = useLocale();
  const reduce = useReducedMotion();
  const pushPro = isMarketingProPush() || mode === "free";

  useEffect(() => {
    const onScroll = () => {
      if (dismissed) return;
      setVisible(window.scrollY > 400);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [dismissed]);

  return (
    <AnimatePresence>
      {visible && !dismissed && (
        <motion.div
          initial={reduce ? false : { y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={reduce ? undefined : { y: 100, opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed bottom-0 left-0 right-0 z-50 glass-nav-bottom border-t border-white/10 px-3 sm:px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]"
        >
          <div className="mx-auto flex max-w-4xl items-center gap-2 sm:gap-3">
            <div className="min-w-0 flex-1">
              <p className="text-xs sm:text-sm font-medium leading-snug">
                {mode === "free"
                  ? `Pro — Expert inclus · ${PLAN_PRICES.plus.label}`
                  : pushPro
                    ? `${FREE_LIFETIME_LIMIT} briefs offerts · Pro dès ${PLAN_PRICES.plus.label}`
                    : (
                        <>
                          <span className="tabular-nums">{FREE_LIFETIME_LIMIT}</span>{" "}
                          {m.sticky.promptsToday}
                        </>
                      )}
              </p>
              <p className="text-[10px] sm:text-xs text-muted-foreground hidden sm:block">
                {mode === "free"
                  ? "Annulation 1 clic · rentabilisé dès 1–2 briefs"
                  : m.sticky.sub}
              </p>
            </div>
            {mode === "free" ? (
              <Button size="sm" className="shrink-0 text-xs sm:text-sm h-9" asChild>
                <Link href="/pricing?plan=pro">
                  Passer Pro
                  <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </Link>
              </Button>
            ) : pushPro ? (
              <div className="flex shrink-0 gap-2">
                <Button size="sm" className="text-xs sm:text-sm h-9" asChild>
                  <Link href="/pricing?plan=pro">
                    Voir Pro
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </Button>
                <Button size="sm" variant="outline" className="hidden sm:inline-flex h-9" asChild>
                  <ScrollLink section="funnel">{m.sticky.cta}</ScrollLink>
                </Button>
              </div>
            ) : (
              <Button size="sm" className="shrink-0 text-xs sm:text-sm h-9" asChild>
                <ScrollLink section="funnel">
                  {m.sticky.cta}
                  <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </ScrollLink>
              </Button>
            )}
            <button
              type="button"
              onClick={() => setDismissed(true)}
              className="inline-flex min-h-11 min-w-11 shrink-0 items-center justify-center rounded-lg text-muted-foreground hover:bg-white/5"
              aria-label={m.sticky.close}
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
