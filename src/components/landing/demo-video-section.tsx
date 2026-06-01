"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
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
    <section className="py-16 sm:py-20 border-t border-border/40 w-full" id="demo">
      <div className={cn(MARKETING_CONTAINER)}>
        <FadeIn className="text-center mb-8">
          <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-3">
            Aperçu produit
          </p>
          <h2 className="text-2xl font-bold sm:text-3xl tracking-tight">
            Une phrase → brief <span className="gradient-text">1 000+ mots</span> scoré /100
          </h2>
          <p className="mt-3 text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Simulation fidèle à l&apos;app : mode <strong className="text-foreground">Expert · Détaillé</strong>
            , sections ##, contraintes, critères d&apos;acceptation — le même livrable que tu copies
            dans ChatGPT ou Cursor.
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
