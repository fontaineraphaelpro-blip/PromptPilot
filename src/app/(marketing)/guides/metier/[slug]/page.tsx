import Link from "next/link";
import { notFound } from "next/navigation";
import { PROFESSION_GUIDES, getProfessionGuide } from "@/lib/seo/profession-guides";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ProfessionGuideCta } from "@/components/seo/profession-guide-cta";

export function generateStaticParams() {
  return PROFESSION_GUIDES.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = getProfessionGuide(slug);
  if (!guide) return {};
  return buildPageMetadata({
    title: guide.title,
    description: guide.metaDescription,
    path: `/guides/metier/${slug}`,
  });
}

export default async function ProfessionGuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = getProfessionGuide(slug);
  if (!guide) notFound();

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <Link href="/guides" className="text-xs text-muted-foreground hover:text-foreground">
        ← Guides
      </Link>
      <h1 className="text-3xl font-bold mt-4 mb-4">{guide.title}</h1>
      <p className="text-muted-foreground mb-8">{guide.description}</p>

      <section className="mb-8">
        <h2 className="font-semibold mb-3">Problèmes fréquents</h2>
        <ul className="space-y-2 text-sm text-muted-foreground">
          {guide.pains.map((p) => (
            <li key={p}>• {p}</li>
          ))}
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="font-semibold mb-3">Cas d&apos;usage</h2>
        <div className="grid gap-2 sm:grid-cols-2">
          {guide.useCases.map((u) => (
            <Card key={u}>
              <CardContent className="py-3 text-sm">{u}</CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Card className="glass-card border-white/15 mb-8">
        <CardContent className="py-6 space-y-4">
          <p className="text-sm font-medium">Exemple de prompt</p>
          <p className="text-sm text-muted-foreground italic">{guide.templateIdea}</p>
          <ProfessionGuideCta guide={guide} />
        </CardContent>
      </Card>

      <Button asChild variant="outline">
        <Link href="/prompt-du-jour">Prompt du jour</Link>
      </Button>
    </div>
  );
}
