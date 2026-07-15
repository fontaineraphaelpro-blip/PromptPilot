"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { FadeIn } from "@/components/motion/fade-in";
import { cn } from "@/lib/utils";
import { useLocale } from "@/components/providers/locale-provider";

export function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);
  const { messages: m } = useLocale();

  return (
    <section className="px-4 py-28 sm:px-6 border-t border-border/40">
      <div className="w-full max-w-3xl mx-auto px-4 sm:px-6">
        <FadeIn className="text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-4">FAQ</p>
          <h2 className="text-3xl font-bold sm:text-5xl tracking-tight">{m.faq.title}</h2>
        </FadeIn>
        <dl className="mt-12 space-y-3">
          {m.faq.items.map(({ q, a }, i) => {
            const isOpen = open === i;
            return (
              <FadeIn key={q} delay={i * 0.08}>
                <div className="glass-card rounded-2xl overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full min-h-11 items-center justify-between gap-4 p-6 text-left transition-colors hover:bg-white/[0.02]"
                    aria-expanded={isOpen}
                  >
                    <dt className="font-semibold pr-4">{q}</dt>
                    <ChevronDown
                      className={cn(
                        "h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-300",
                        isOpen && "rotate-180"
                      )}
                    />
                  </button>
                  <dd
                    className={cn(
                      "grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.21,0.47,0.32,0.98)]",
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    )}
                  >
                    <div className="overflow-hidden">
                      <p className="px-6 pb-6 text-sm text-muted-foreground leading-relaxed border-t border-border/40 pt-4">
                        {a}
                      </p>
                    </div>
                  </dd>
                </div>
              </FadeIn>
            );
          })}
        </dl>
      </div>
    </section>
  );
}
