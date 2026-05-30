import { Suspense } from "react";
import Link from "next/link";
import { getAuthUser } from "@/lib/auth";
import { CheckoutSuccessBanner } from "@/components/dashboard/checkout-success-banner";
import { getOrCreateProfile } from "@/lib/profile";
import { getTodayUsage } from "@/lib/usage";
import { hasUnlimitedPrompts, PLAN_LABELS } from "@/lib/plans";
import { FREE_DAILY_LIMIT } from "@/lib/constants";
import { prisma } from "@/lib/db";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Wand2, History, Star, ArrowRight } from "lucide-react";

export default async function DashboardPage() {
  const user = await getAuthUser();
  if (!user) return null;

  const profile = await getOrCreateProfile(user.id, user.email ?? "");
  const todayUsage = await getTodayUsage(user.id);
  const unlimited = hasUnlimitedPrompts(profile.plan);

  const recentRows = await prisma.prompt.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
    take: 5,
    select: {
      id: true,
      originalIdea: true,
      targetAi: true,
      createdAt: true,
    },
  });

  const firstName = user.email?.split("@")[0] ?? "utilisateur";

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <Suspense fallback={null}>
        <CheckoutSuccessBanner />
      </Suspense>
      <div>
        <h1 className="text-2xl font-bold sm:text-3xl">
          Bonjour, {firstName} 👋
        </h1>
        <p className="mt-1 text-muted-foreground">
          Prêt à créer ton prochain prompt expert ?
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Plan actuel</CardDescription>
            <CardTitle className="flex items-center gap-2">
              {PLAN_LABELS[profile.plan]}
              <Badge variant={profile.plan === "free" ? "free" : "pro"}>
                {profile.plan === "free" ? "Gratuit" : "Premium"}
              </Badge>
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Prompts aujourd&apos;hui</CardDescription>
            <CardTitle>
              {unlimited ? (
                <span className="text-primary">Illimité</span>
              ) : (
                <>
                  {todayUsage} / {FREE_DAILY_LIMIT}
                </>
              )}
            </CardTitle>
          </CardHeader>
          {!unlimited && (
            <CardContent className="pt-0">
              <p className="text-xs text-muted-foreground">
                {FREE_DAILY_LIMIT - todayUsage} restant(s)
              </p>
            </CardContent>
          )}
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Action rapide</CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <Button asChild className="w-full">
              <Link href="/generate">
                <Wand2 className="h-4 w-4" />
                Nouveau prompt
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Link href="/history">
          <Card className="hover:border-primary/30 transition-colors cursor-pointer h-full">
            <CardContent className="flex items-center gap-4 p-6">
              <History className="h-8 w-8 text-primary" />
              <div>
                <p className="font-semibold">Historique</p>
                <p className="text-sm text-muted-foreground">Voir tous vos prompts</p>
              </div>
              <ArrowRight className="h-4 w-4 ml-auto text-muted-foreground" />
            </CardContent>
          </Card>
        </Link>
        <Link href="/favorites">
          <Card className="hover:border-primary/30 transition-colors cursor-pointer h-full">
            <CardContent className="flex items-center gap-4 p-6">
              <Star className="h-8 w-8 text-primary" />
              <div>
                <p className="font-semibold">Favoris</p>
                <p className="text-sm text-muted-foreground">Prompts sauvegardés</p>
              </div>
              <ArrowRight className="h-4 w-4 ml-auto text-muted-foreground" />
            </CardContent>
          </Card>
        </Link>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-lg">Historique récent</h2>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/history">Tout voir</Link>
          </Button>
        </div>
        {recentRows.length > 0 ? (
          <ul className="space-y-2">
            {recentRows.map((p) => (
              <li key={p.id}>
                <Link
                  href={`/history/${p.id}`}
                  className="block rounded-lg border border-border bg-card p-4 hover:bg-muted/50 transition-colors"
                >
                  <p className="font-medium line-clamp-1">{p.originalIdea}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {p.targetAi} · {p.createdAt.toLocaleDateString("fr-FR")}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <Card>
            <CardContent className="py-8 text-center text-muted-foreground text-sm">
              Aucun prompt encore.{" "}
              <Link href="/generate" className="text-primary hover:underline">
                Créer le premier
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
