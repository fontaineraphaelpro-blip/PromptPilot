"use client";

import Link from "next/link";
import { FadeIn } from "@/components/motion/fade-in";
import { Button } from "@/components/ui/button";
const VIDEO_URL = process.env.NEXT_PUBLIC_DEMO_VIDEO_URL;

export function DemoVideoSection() {
  if (!VIDEO_URL) {
    return (
      <section className="px-4 py-16 sm:px-6 border-t border-border/40">
        <div className="mx-auto max-w-3xl text-center">
          <FadeIn>
            <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-3">
              En 15 secondes
            </p>
            <h2 className="text-2xl font-bold sm:text-3xl">Idée → score → copier</h2>
            <p className="mt-3 text-muted-foreground text-sm">
              Teste le parcours guidé sans compte : une vraie génération par jour sur la landing.
            </p>
            <Button className="mt-6" asChild>
              <Link href="/#funnel">Essayer maintenant</Link>
            </Button>
          </FadeIn>
        </div>
      </section>
    );
  }

  return (
    <section className="px-4 py-16 sm:px-6 border-t border-border/40">
      <div className="mx-auto max-w-4xl">
        <FadeIn className="text-center mb-8">
          <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-3">
            Démo 15 s
          </p>
          <h2 className="text-2xl font-bold sm:text-3xl">Idée → score → copier</h2>
        </FadeIn>
        <FadeIn delay={0.1}>
          <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/15 bg-black/60">
            <video
              src={VIDEO_URL}
              controls
              playsInline
              preload="metadata"
              className="w-full h-full object-cover"
              poster="/opengraph-image"
            />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
