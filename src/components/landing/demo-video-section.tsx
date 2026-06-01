"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { ScrollLink } from "@/components/navigation/scroll-link";
import { FadeIn } from "@/components/motion/fade-in";
import { Button } from "@/components/ui/button";
import { MARKETING_CONTAINER } from "@/lib/layout-width";
import { cn } from "@/lib/utils";

const DemoProductAnimation = dynamic(
  () =>
    import("@/components/landing/demo-product-animation").then((m) => m.DemoProductAnimation),
  {
    ssr: false,
    loading: () => (
      <div className="mx-auto max-w-5xl w-full rounded-2xl border border-white/12 bg-black/80 min-h-[440px] animate-pulse" />
    ),
  }
);

const VIDEO_URL = process.env.NEXT_PUBLIC_DEMO_VIDEO_URL;

export function DemoVideoSection() {
  return (
    <section className="py-16 sm:py-20 border-t border-border/40 w-full scroll-mt-20 sm:scroll-mt-24" id="demo">
      <div className={cn(MARKETING_CONTAINER)}>
        <FadeIn className="text-center mb-6 sm:mb-8 px-2">
          <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-3">
            Démo interactive
          </p>
          <h2 className="text-2xl font-bold sm:text-3xl lg:text-4xl tracking-tight leading-tight">
            L&apos;app en direct :{" "}
            <span className="gradient-text">idée → score → copier</span>
          </h2>
          <p className="mt-3 text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Regarde la génération se dérouler comme dans PromptPilot : saisie, barre de progression,
            score /100 et brief prêt à coller — en moins de 30 secondes.
          </p>
        </FadeIn>

        <DemoProductAnimation />

        <FadeIn delay={0.15} className="mt-6 sm:mt-8 flex flex-col items-center gap-3 px-4 w-full sm:w-auto">
          <Button asChild size="lg" className="w-full sm:w-auto">
            <ScrollLink section="funnel">Tester avec mon idée</ScrollLink>
          </Button>
          <Button asChild variant="outline" size="lg" className="w-full sm:w-auto border-white/20">
            <Link href="/signup">Créer un compte free</Link>
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
