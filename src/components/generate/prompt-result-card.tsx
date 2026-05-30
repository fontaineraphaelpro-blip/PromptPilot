"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCopy } from "@/hooks/use-copy";
import {
  Copy,
  Check,
  Star,
  Save,
  RefreshCw,
  Lightbulb,
} from "lucide-react";
import type { GeneratePromptResult } from "@/types";
import { toast } from "sonner";

interface PromptResultCardProps {
  result: GeneratePromptResult & { id?: string };
  isFavorite?: boolean;
  onSave?: () => Promise<void>;
  onToggleFavorite?: () => Promise<void>;
  onRegenerate?: () => void;
  onReset: () => void;
}

export function PromptResultCard({
  result,
  isFavorite = false,
  onSave,
  onToggleFavorite,
  onRegenerate,
  onReset,
}: PromptResultCardProps) {
  const { copy, copied } = useCopy();
  const [activeTab, setActiveTab] = useState("main");
  const [saving, setSaving] = useState(false);

  const variants: Record<string, string> = {
    main: result.generated_prompt,
    short: result.short_variant,
    detailed: result.detailed_variant,
    expert: result.expert_variant,
  };

  async function handleCopy() {
    const text = variants[activeTab] ?? result.generated_prompt;
    const ok = await copy(text);
    if (ok) toast.success("Copié !");
    else toast.error("Impossible de copier");
  }

  async function handleSave() {
    if (!onSave) return;
    setSaving(true);
    try {
      await onSave();
      toast.success("Prompt sauvegardé");
    } catch {
      toast.error("Erreur lors de la sauvegarde");
    } finally {
      setSaving(false);
    }
  }

  return (
    <Card className="border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Check className="h-5 w-5 text-primary" />
          Prompt optimisé
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="flex flex-wrap h-auto gap-1">
            <TabsTrigger value="main">Principal</TabsTrigger>
            <TabsTrigger value="short">Court</TabsTrigger>
            <TabsTrigger value="detailed">Détaillé</TabsTrigger>
            <TabsTrigger value="expert">Expert</TabsTrigger>
          </TabsList>
          {Object.entries(variants).map(([key, text]) => (
            <TabsContent key={key} value={key}>
              <pre className="max-h-96 overflow-auto rounded-lg bg-muted p-4 text-sm whitespace-pre-wrap font-mono">
                {text}
              </pre>
            </TabsContent>
          ))}
        </Tabs>

        {result.ai_tips && (
          <div className="rounded-lg border border-border bg-muted/50 p-4">
            <p className="flex items-center gap-2 text-sm font-medium mb-2">
              <Lightbulb className="h-4 w-4 text-primary" />
              Conseils pour l&apos;IA
            </p>
            <p className="text-sm text-muted-foreground whitespace-pre-wrap">
              {result.ai_tips}
            </p>
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          <Button onClick={handleCopy} variant="default">
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            {copied ? "Copié !" : "Copier"}
          </Button>
          {onSave && !result.id && (
            <Button variant="secondary" onClick={handleSave} disabled={saving}>
              <Save className="h-4 w-4" />
              Sauvegarder
            </Button>
          )}
          {onToggleFavorite && result.id && (
            <Button variant="outline" onClick={onToggleFavorite}>
              <Star className={`h-4 w-4 ${isFavorite ? "fill-primary text-primary" : ""}`} />
              {isFavorite ? "Retirer favori" : "Favori"}
            </Button>
          )}
          {onRegenerate && (
            <Button variant="outline" onClick={onRegenerate}>
              <RefreshCw className="h-4 w-4" />
              Nouvelle variante
            </Button>
          )}
          <Button variant="ghost" onClick={onReset}>
            Recommencer
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
