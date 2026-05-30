import { createClient } from "@/lib/supabase/server";
import { PromptList } from "@/components/history/prompt-list";
import { EmptyState } from "@/components/shared/empty-state";
import { Star } from "lucide-react";
import type { PromptRecord } from "@/types";

export default async function FavoritesPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: prompts } = await supabase
    .from("prompts")
    .select("*")
    .eq("user_id", user.id)
    .eq("is_favorite", true)
    .order("created_at", { ascending: false });

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <h1 className="text-2xl font-bold">Favoris</h1>
      {prompts && prompts.length > 0 ? (
        <PromptList prompts={prompts as PromptRecord[]} />
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
