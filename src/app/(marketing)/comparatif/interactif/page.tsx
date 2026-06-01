import Link from "next/link";
import { ComparatifInteractifClient } from "@/components/seo/comparatif-interactif-client";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata = buildPageMetadata({
  title: "Comparatif interactif — Ton prompt vs PromptExpert",
  description:
    "Compare le score qualité de ton prompt manuel vs un prompt structuré PromptExpert. Clarté, contraintes, format, adaptation IA.",
  path: "/comparatif/interactif",
});

export default function ComparatifInteractifPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
        <Link href="/comparatif" className="hover:text-foreground">
          Comparatifs
        </Link>
      </p>
      <h1 className="text-3xl font-bold sm:text-4xl tracking-tight mb-4">
        Comparatif interactif
      </h1>
      <p className="text-muted-foreground mb-10 max-w-2xl">
        Colle ton prompt habituel et compare-le au format expert PromptExpert — score /100 en
        direct sur 4 critères.
      </p>
      <ComparatifInteractifClient />
    </div>
  );
}
