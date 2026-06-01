import type { Metadata } from "next";
import { Suspense } from "react";
import { ImprovePromptClient } from "@/components/improve/improve-prompt-client";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Améliorer un prompt IA faible — restructuration + score",
  description:
    "Collez un prompt raté, recevez une version expert structurée avec score avant/après. Gratuit, 3 fois par jour.",
  path: "/improve",
  keywords: ["améliorer prompt ChatGPT", "prompt faible", "restructurer prompt IA"],
});

export default function ImprovePage() {
  return (
    <Suspense fallback={<div className="py-12 text-center text-muted-foreground">Chargement…</div>}>
      <ImprovePromptClient />
    </Suspense>
  );
}
