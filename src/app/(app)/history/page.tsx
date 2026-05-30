import { createClient } from "@/lib/supabase/server";
import { PromptList } from "@/components/history/prompt-list";
import { EmptyState } from "@/components/shared/empty-state";
import { History } from "lucide-react";
import type { PromptRecord } from "@/types";

export default async function HistoryPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: prompts } = await supabase
    .from("prompts")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <h1 className="text-2xl font-bold">Historique</h1>
      {prompts && prompts.length > 0 ? (
        <PromptList prompts={prompts as PromptRecord[]} />
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
