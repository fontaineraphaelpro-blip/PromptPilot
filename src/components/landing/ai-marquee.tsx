"use client";

import { TARGET_AIS } from "@/lib/constants";

export function AIMarquee() {
  const items = [...TARGET_AIS, ...TARGET_AIS];

  return (
    <section className="border-y border-border/60 py-10 overflow-hidden">
      <p className="text-center text-xs uppercase tracking-[0.2em] text-muted-foreground mb-8">
        Compatible avec les meilleures IA
      </p>
      <div className="relative flex overflow-hidden">
        <div className="marquee-track flex gap-4 px-4">
          {items.map((ai, i) => (
            <span
              key={`${ai}-${i}`}
              className="shrink-0 rounded-full border border-border bg-card/80 px-5 py-2.5 text-sm font-medium text-foreground/90 backdrop-blur-sm transition-colors hover:border-white/30 hover:bg-white/5"
            >
              {ai}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
