"use client";

import { useEffect, useState } from "react";
import { ScrollLink } from "@/components/navigation/scroll-link";
import { Button } from "@/components/ui/button";
import { ArrowRight, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { FREE_DAILY_LIMIT } from "@/lib/constants";

export function StickyCtaBar() {
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
          className="fixed bottom-0 left-0 right-0 z-50 glass-nav border-t border-white/10 px-3 sm:px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]"
        >
          <div className="mx-auto flex max-w-4xl items-center gap-2 sm:gap-3">
            <div className="min-w-0 flex-1">
              <p className="text-xs sm:text-sm font-medium leading-snug">
                {FREE_DAILY_LIMIT} prompts gratuits aujourd&apos;hui
              </p>
              <p className="text-[10px] sm:text-xs text-muted-foreground hidden sm:block">
                Parcours guidé en 3 étapes — sans carte
              </p>
            </div>
            <Button size="sm" className="shrink-0 text-xs sm:text-sm h-9" asChild>
              <ScrollLink section="funnel">
                Tester
                <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </ScrollLink>
            </Button>
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
