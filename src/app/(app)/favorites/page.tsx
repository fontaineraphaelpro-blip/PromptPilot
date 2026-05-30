import Link from "next/link";
import { getAuthUser } from "@/lib/auth";
import { getOrCreateProfile } from "@/lib/profile";
import { prisma } from "@/lib/db";
import { mapPrompt } from "@/lib/mappers";
import { PromptList } from "@/components/history/prompt-list";
import { EmptyState } from "@/components/shared/empty-state";
import { canUseFavorites } from "@/lib/plans";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

export default async function FavoritesPage() {
  const user = await getAuthUser();
  if (!user) return null;

  const profile = await getOrCreateProfile(user.id, user.email);
  const favoritesAllowed = canUseFavorites(profile.plan);

  const rows = await prisma.prompt.findMany({
    where: { userId: user.id, isFavorite: true },
    orderBy: { createdAt: "desc" },
  });

  const prompts = rows.map(mapPrompt);

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <h1 className="text-2xl font-bold">Favoris</h1>
      {!favoritesAllowed && (
        <p className="text-sm text-muted-foreground rounded-lg border border-border bg-muted/30 p-4">
          Les favoris sont inclus dans le plan Pro (9€/mois).{" "}
          <Button variant="link" className="h-auto p-0 text-sm" asChild>
            <Link href="/pricing?plan=pro">Passer au Pro</Link>
          </Button>
        </p>
      )}
      {prompts.length > 0 ? (
        <PromptList prompts={prompts} plan={profile.plan} />
      ) : (
        <EmptyState
          icon={Star}
          title="Aucun favori"
          description={
            favoritesAllowed
              ? "Marquez des prompts en favoris depuis l'historique."
              : "Passez au Pro pour sauvegarder vos meilleurs prompts en favoris."
          }
          actionLabel={favoritesAllowed ? "Voir l'historique" : "Voir les tarifs"}
          actionHref={favoritesAllowed ? "/history" : "/pricing?plan=pro"}
        />
      )}
    </div>
  );
}
