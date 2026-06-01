import type { Metadata } from "next";
import Link from "next/link";
import { APP_NAME } from "@/lib/constants";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { getSupportEmail } from "@/lib/support";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = buildPageMetadata({
  title: `Qu'est-ce que ${APP_NAME} ? — Studio de prompts IA`,
  description:
    "PromptPilot transforme une idée en prompt expert pour ChatGPT, Claude, Cursor, Midjourney. Score /100, preview, 4 variantes.",
  path: "/a-propos",
});

export default function AboutPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:py-24 prose prose-invert prose-headings:tracking-tight">
      <h1>Qu&apos;est-ce que {APP_NAME} ?</h1>
      <p>
        {APP_NAME} est un <strong>studio de prompt engineering</strong> en ligne. Contrairement à
        ChatGPT qui répond à vos questions, {APP_NAME} produit le{" "}
        <strong>prompt optimal à copier-coller</strong> dans l&apos;outil de votre choix.
      </p>
      <h2>Fonctionnalités clés</h2>
      <ul>
        <li>Adaptation à 12+ IA (ChatGPT, Claude, Gemini, Cursor, Midjourney, Sora…)</li>
        <li>Score qualité /100 et regénération gratuite si score &lt; 70</li>
        <li>Preview « tester avant de coller »</li>
        <li>4 variantes par génération (Principal, Court, Détaillé, Expert)</li>
        <li>Workflows métier (plan Creator)</li>
      </ul>
      <h2>Pour qui ?</h2>
      <p>
        Fondateurs, marketers, développeurs, créateurs de contenu — toute personne qui utilise des
        IA quotidiennement et veut gagner du temps sur la formulation des prompts.
      </p>
      <h2>Contact</h2>
      <p>
        Email : <a href={`mailto:${getSupportEmail()}`}>{getSupportEmail()}</a>
      </p>
      <div className="not-prose flex flex-wrap gap-3 mt-8">
        <Button asChild>
          <Link href="/signup">Essayer gratuitement</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/pricing">Voir les tarifs</Link>
        </Button>
      </div>
    </article>
  );
}
