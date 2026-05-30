import { getAuthUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { mapPrompt } from "@/lib/mappers";
import { PromptList } from "@/components/history/prompt-list";
import { EmptyState } from "@/components/shared/empty-state";
import { Star } from "lucide-react";

export default async function FavoritesPage() {
  const user = await getAuthUser();
  if (!user) return null;

  const rows = await prisma.prompt.findMany({
    where: { userId: user.id, isFavorite: true },
    orderBy: { createdAt: "desc" },
  });

  const prompts = rows.map(mapPrompt);

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <h1 className="text-2xl font-bold">Favoris</h1>
      {prompts.length > 0 ? (
        <PromptList prompts={prompts} />
      ) : (
        <EmptyState
          icon={Star}
          title="Aucun favori"
          description="Marquez des prompts en favoris depuis l'historique."
          actionLabel="Voir l'historique"
          actionHref="/history"
        />
      )}
    </div>
  );
}
