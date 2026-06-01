"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { FadeIn } from "@/components/motion/fade-in";
import { Button } from "@/components/ui/button";

const DemoProductAnimation = dynamic(
  () =>
    import("@/components/landing/demo-product-animation").then((m) => m.DemoProductAnimation),
  {
    ssr: false,
    loading: () => (
      <div className="mx-auto max-w-2xl w-full rounded-2xl border border-white/12 bg-black/80 min-h-[320px] animate-pulse" />
    ),
  }
);

const VIDEO_URL = process.env.NEXT_PUBLIC_DEMO_VIDEO_URL;

export function DemoVideoSection() {
  return (
    <section className="px-4 py-16 sm:px-6 border-t border-border/40" id="demo">
      <div className="mx-auto max-w-4xl">
        <FadeIn className="text-center mb-8">
          <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-3">
            Démo interactive
          </p>
          <h2 className="text-2xl font-bold sm:text-3xl">Idée → score → copier</h2>
          <p className="mt-3 text-muted-foreground text-sm max-w-lg mx-auto">
            Animation en boucle (environ 14 s). Descends jusqu&apos;ici si tu ne la vois pas bouger
            — elle démarre quand la section est visible.
          </p>
        </FadeIn>

        <DemoProductAnimation />

        <FadeIn delay={0.15} className="mt-8 flex flex-col items-center gap-4">
          <Button asChild>
            <Link href="/#funnel">Essayer avec mon idée</Link>
          </Button>
          {VIDEO_URL && (
            <div className="w-full max-w-2xl mt-4">
              <p className="text-xs text-muted-foreground text-center mb-2">Vidéo complète</p>
              <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/15 bg-black/60">
                <video
                  src={VIDEO_URL}
                  controls
                  playsInline
                  preload="metadata"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}
        </FadeIn>
      </div>
    </section>
  );
}
