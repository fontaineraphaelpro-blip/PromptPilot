"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Trash2 } from "lucide-react";
import { toast } from "sonner";

export function DeleteAccountForm() {
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    if (confirm !== "SUPPRIMER") {
      toast.error('Tapez exactement "SUPPRIMER" pour confirmer');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/account", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ confirm: "SUPPRIMER" }),
      });
      if (!res.ok) {
        const json = await res.json();
        toast.error(json.error ?? "Erreur");
        return;
      }
      toast.success("Compte supprimé");
      await signOut({ callbackUrl: "/" });
    } catch {
      toast.error("Erreur réseau");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-3">
      <div className="space-y-2">
        <Label htmlFor="delete-confirm">
          Tapez <strong className="text-foreground">SUPPRIMER</strong> pour confirmer
        </Label>
        <Input
          id="delete-confirm"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          placeholder="SUPPRIMER"
          autoComplete="off"
        />
      </div>
      <p className="text-xs text-muted-foreground">
        Action irréversible : prompts, historique et abonnement Stripe seront annulés.
      </p>
      <Button
        variant="destructive"
        size="sm"
        onClick={handleDelete}
        disabled={loading || confirm !== "SUPPRIMER"}
      >
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
        Supprimer mon compte définitivement
      </Button>
    </div>
  );
}
