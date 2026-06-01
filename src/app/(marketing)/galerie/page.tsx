import Link from "next/link";
import type { Metadata } from "next";
import { prisma } from "@/lib/db";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = buildPageMetadata({
  title: "Galerie de prompts partagés par la communauté",
  description:
    "Découvrez des prompts IA experts partagés par les utilisateurs PromptPilot — ChatGPT, Claude, Cursor et plus.",
  path: "/galerie",
});

export const revalidate = 3600;

export default async function GaleriePage() {
  const shared = await prisma.prompt.findMany({
    where: { shareEnabled: true, shareToken: { not: null } },
    orderBy: { createdAt: "desc" },
    take: 48,
    select: {
      id: true,
      shareToken: true,
      originalIdea: true,
      targetAi: true,
      promptScore: true,
      previewSummary: true,
      createdAt: true,
    },
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:py-24">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold sm:text-4xl tracking-tight">Galerie de prompts</h1>
        <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
          Prompts partagés par la communauté PromptPilot. Inspirez-vous ou partagez les vôtres depuis
          l&apos;historique.
        </p>
      </div>

      {shared.length === 0 ? (
        <Card className="text-center py-12">
          <CardContent>
            <p className="text-muted-foreground mb-4">
              La galerie se remplit au fur et à mesure que les utilisateurs partagent leurs prompts.
            </p>
            <Button asChild>
              <Link href="/signup">Créer un compte et partager</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {shared.map((p) => (
            <Link key={p.id} href={`/p/${p.shareToken}`}>
              <Card className="h-full hover-lift glass-card">
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle className="text-base line-clamp-2">{p.originalIdea}</CardTitle>
                    {p.promptScore != null && (
                      <Badge variant="outline">{p.promptScore}/100</Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground">{p.targetAi}</p>
                  {p.previewSummary && (
                    <p className="text-sm text-muted-foreground mt-2 line-clamp-3">
                      {p.previewSummary}
                    </p>
                  )}
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
