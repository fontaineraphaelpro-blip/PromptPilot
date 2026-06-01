"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import { toast } from "sonner";

interface CopyFeedbackProps {
  promptId: string;
  initial?: string | null;
}

export function CopyFeedback({ promptId, initial }: CopyFeedbackProps) {
  const [sent, setSent] = useState(!!initial);

  async function submit(value: "yes" | "no") {
    try {
      const res = await fetch(`/api/prompts/${promptId}/feedback`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ feedback: value }),
      });
      if (!res.ok) throw new Error();
      setSent(true);
      toast.success("Merci pour votre retour !");
    } catch {
      toast.error("Impossible d'enregistrer le retour");
    }
  }

  if (!promptId) return null;

  if (sent) {
    return (
      <p className="text-xs text-muted-foreground">Merci pour votre retour sur ce prompt.</p>
    );
  }

  return (
    <div className="rounded-lg border border-border/60 bg-muted/30 p-3">
      <p className="text-sm font-medium mb-2">Ça a marché dans votre IA ?</p>
      <div className="flex gap-2">
        <Button size="sm" variant="outline" onClick={() => submit("yes")}>
          <ThumbsUp className="h-4 w-4" />
          Oui
        </Button>
        <Button size="sm" variant="outline" onClick={() => submit("no")}>
          <ThumbsDown className="h-4 w-4" />
          Pas vraiment
        </Button>
      </div>
    </div>
  );
}
