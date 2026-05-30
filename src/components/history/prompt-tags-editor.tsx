"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { toastUpgradeRequired } from "@/lib/upgrade-toast";
import type { Plan } from "@/lib/constants";
import { canUseAdvancedGeneratorOptions } from "@/lib/generate-plan-guard";

interface PromptTagsEditorProps {
  promptId: string;
  initialTags: string[];
  plan: Plan;
}

export function PromptTagsEditor({ promptId, initialTags, plan }: PromptTagsEditorProps) {
  const [tags, setTags] = useState(initialTags);
  const [input, setInput] = useState("");
  const [saving, setSaving] = useState(false);

  const allowed = canUseAdvancedGeneratorOptions(plan);

  async function save(next: string[]) {
    if (!allowed) {
      toastUpgradeRequired("Les tags sont inclus dans le plan Pro (9€/mois).", "pro");
      return;
    }
    setSaving(true);
    try {
      const res = await fetch(`/api/prompts/${promptId}/tags`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tags: next }),
      });
      if (!res.ok) throw new Error();
      setTags(next);
      toast.success("Tags mis à jour");
    } catch {
      toast.error("Erreur tags");
    } finally {
      setSaving(false);
    }
  }

  function addTag() {
    const t = input.trim().toLowerCase();
    if (!t || tags.includes(t)) return;
    const next = [...tags, t];
    setInput("");
    save(next);
  }

  function removeTag(t: string) {
    save(tags.filter((x) => x !== t));
  }

  return (
    <div className="rounded-lg border border-border p-4 space-y-3">
      <p className="text-sm font-medium">Tags { !allowed && "(Pro)" }</p>
      <div className="flex flex-wrap gap-2">
        {tags.map((t) => (
          <Badge key={t} variant="outline" className="gap-1">
            #{t}
            {allowed && (
              <button type="button" onClick={() => removeTag(t)} className="ml-1 opacity-60 hover:opacity-100">
                ×
              </button>
            )}
          </Badge>
        ))}
        {tags.length === 0 && (
          <span className="text-xs text-muted-foreground">client, projet, campagne…</span>
        )}
      </div>
      {allowed && (
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ajouter un tag"
            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
          />
          <Button type="button" size="sm" onClick={addTag} disabled={saving}>
            Ajouter
          </Button>
        </div>
      )}
    </div>
  );
}
