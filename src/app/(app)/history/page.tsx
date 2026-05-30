import { getAuthUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { mapPrompt } from "@/lib/mappers";
import { PromptList } from "@/components/history/prompt-list";
import { EmptyState } from "@/components/shared/empty-state";
import { History } from "lucide-react";

export default async function HistoryPage() {
  const user = await getAuthUser();
  if (!user) return null;

  const rows = await prisma.prompt.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });

  const prompts = rows.map(mapPrompt);

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <h1 className="text-2xl font-bold">Historique</h1>
      {prompts.length > 0 ? (
        <PromptList prompts={prompts} />
      ) : (
        <EmptyState
          icon={History}
          title="Aucun prompt"
          description="Générez votre premier prompt pour le retrouver ici."
          actionLabel="Créer un prompt"
          actionHref="/generate"
        />
      )}
    </div>
  );
}
