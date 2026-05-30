"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { SelectField } from "@/components/ui/select-field";
import { Input } from "@/components/ui/input";
import { TARGET_AIS, TASK_TYPES } from "@/lib/constants";
import { useCopy } from "@/hooks/use-copy";
import { Copy, Star, Trash2, Check, Search } from "lucide-react";
import { toast } from "sonner";
import type { PromptRecord } from "@/types";
import type { Plan } from "@/lib/constants";
import { canUseFavorites } from "@/lib/plans";

interface PromptListProps {
  prompts: PromptRecord[];
  plan?: Plan;
}

export function PromptList({ prompts: initial, plan = "free" }: PromptListProps) {
  const [prompts, setPrompts] = useState(initial);
  const [search, setSearch] = useState("");
  const [filterAI, setFilterAI] = useState("Tous");
  const [filterTask, setFilterTask] = useState("Tous");
  const { copy, copied } = useCopy();
  const router = useRouter();

  const filtered = prompts.filter((p) => {
    const matchSearch =
      !search ||
      p.original_idea.toLowerCase().includes(search.toLowerCase()) ||
      p.generated_prompt.toLowerCase().includes(search.toLowerCase());
    const matchAI = filterAI === "Tous" || p.target_ai === filterAI;
    const matchTask = filterTask === "Tous" || p.task_type === filterTask;
    return matchSearch && matchAI && matchTask;
  });

  const favoritesAllowed = canUseFavorites(plan);

  async function toggleFavorite(id: string, current: boolean) {
    if (!favoritesAllowed) {
      toast.error("Favoris réservés au plan Pro — 9€/mois");
      return;
    }
    const res = await fetch(`/api/prompts/${id}/favorite`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ is_favorite: !current }),
    });
    if (res.ok) {
      setPrompts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, is_favorite: !current } : p))
      );
      toast.success(current ? "Retiré des favoris" : "Ajouté aux favoris");
    } else if (res.status === 403) {
      toast.error("Favoris réservés au plan Pro — 9€/mois");
    } else {
      toast.error("Impossible de mettre à jour le favori");
    }
  }

  async function handleDelete(id: string) {
    const res = await fetch(`/api/prompts/${id}`, { method: "DELETE" });
    if (!res.ok) {
      toast.error("Erreur suppression");
      return;
    }
    setPrompts((prev) => prev.filter((p) => p.id !== id));
    toast.success("Prompt supprimé");
    router.refresh();
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Rechercher…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <SelectField
          label="IA"
          id="filterAI"
          value={filterAI}
          onChange={setFilterAI}
          options={["Tous", ...TARGET_AIS]}
          className="sm:w-40"
        />
        <SelectField
          label="Type"
          id="filterTask"
          value={filterTask}
          onChange={setFilterTask}
          options={["Tous", ...TASK_TYPES]}
          className="sm:w-40"
        />
      </div>

      {filtered.length === 0 ? (
        <p className="text-center text-muted-foreground py-12">Aucun prompt trouvé.</p>
      ) : (
        <ul className="space-y-3">
          {filtered.map((p) => (
            <li
              key={p.id}
              className="rounded-xl border border-border bg-card p-4 shadow-sm"
            >
              <Link href={`/history/${p.id}`} className="block">
                <p className="font-medium line-clamp-2 hover:text-primary">
                  {p.original_idea}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {p.target_ai} · {p.task_type} ·{" "}
                  {new Date(p.created_at).toLocaleDateString("fr-FR")}
                </p>
              </Link>
              <div className="mt-3 flex flex-wrap gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => copy(p.generated_prompt)}
                >
                  {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                  Copier
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => toggleFavorite(p.id, p.is_favorite)}
                  title={favoritesAllowed ? "Favori" : "Favoris — plan Pro requis"}
                >
                  <Star
                    className={`h-3 w-3 ${p.is_favorite ? "fill-primary text-primary" : ""}`}
                  />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleDelete(p.id)}
                >
                  <Trash2 className="h-3 w-3 text-destructive" />
                </Button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
