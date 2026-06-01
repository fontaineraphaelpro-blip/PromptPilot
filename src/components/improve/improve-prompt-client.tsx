"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TARGET_AIS } from "@/lib/constants";
import { useCopy } from "@/hooks/use-copy";
import { ArrowRight, Copy, Loader2, Sparkles, TrendingUp } from "lucide-react";
import { toast } from "sonner";
import { GuaranteeBadge } from "@/components/conversion/guarantee-badge";

export function ImprovePromptClient() {
  const searchParams = useSearchParams();
  const [weakPrompt, setWeakPrompt] = useState("");

  useEffect(() => {
    const q = searchParams.get("q");
    if (q && q.trim().length >= 10) setWeakPrompt(q.trim());
  }, [searchParams]);
  const [targetAI, setTargetAI] = useState<string>("ChatGPT");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    before: string;
    before_score: number;
    generated_prompt: string;
    after_score: number;
    score_gain: number;
  } | null>(null);
  const { copy, copied } = useCopy();

  async function handleImprove() {
    if (weakPrompt.trim().length < 10) {
      toast.error("Collez un prompt d'au moins 10 caractères");
      return;
    }
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch("/api/improve-prompt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ weakPrompt, targetAI }),
      });
      const json = await res.json();
      if (!res.ok) {
        if (json.requiresSignup) {
          toast.info(json.message);
          window.location.href = "/signup?from=improve";
          return;
        }
        toast.error(json.message ?? json.error);
        return;
      }
      setResult(json);
    } catch {
      toast.error("Erreur réseau");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-3xl space-y-8 py-12 px-4">
      <div className="text-center space-y-3">
        <h1 className="text-3xl font-bold tracking-tight flex items-center justify-center gap-2">
          <Sparkles className="h-8 w-8 text-primary" />
          Améliorer mon prompt
        </h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Collez un prompt faible — obtenez une version expert scorée avant/après. 3 essais gratuits
          par jour sans compte.
        </p>
        <GuaranteeBadge />
      </div>

      <Card>
        <CardContent className="pt-6 space-y-4">
          <div className="space-y-2">
            <Label>Votre prompt actuel</Label>
            <Textarea
              value={weakPrompt}
              onChange={(e) => setWeakPrompt(e.target.value)}
              placeholder="Ex: Écris-moi un post LinkedIn pour mon app"
              rows={5}
              className="font-mono text-sm"
            />
          </div>
          <div className="space-y-2">
            <Label>IA cible</Label>
            <select
              value={targetAI}
              onChange={(e) => setTargetAI(e.target.value)}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              {TARGET_AIS.map((ai) => (
                <option key={ai} value={ai}>
                  {ai}
                </option>
              ))}
            </select>
          </div>
          <Button className="w-full" size="lg" onClick={handleImprove} disabled={loading}>
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            Restructurer mon prompt
          </Button>
        </CardContent>
      </Card>

      {result && (
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-base text-muted-foreground">Avant</CardTitle>
              <p className="text-2xl font-bold">{result.before_score}/100</p>
            </CardHeader>
            <CardContent>
              <pre className="text-xs whitespace-pre-wrap font-mono text-muted-foreground max-h-48 overflow-auto">
                {result.before}
              </pre>
            </CardContent>
          </Card>
          <Card className="border-primary/30">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                Après
                {result.score_gain > 0 && (
                  <span className="text-emerald-400 text-sm inline-flex items-center gap-1">
                    <TrendingUp className="h-4 w-4" />+{result.score_gain}
                  </span>
                )}
              </CardTitle>
              <p className="text-2xl font-bold">{result.after_score}/100</p>
            </CardHeader>
            <CardContent className="space-y-3">
              <pre className="text-xs whitespace-pre-wrap font-mono max-h-48 overflow-auto">
                {result.generated_prompt}
              </pre>
              <Button
                className="w-full"
                onClick={async () => {
                  const ok = await copy(result.generated_prompt);
                  if (ok) toast.success("Copié !");
                }}
              >
                {copied ? "Copié !" : <Copy className="h-4 w-4" />}
                Copier le prompt amélioré
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="py-6 text-center">
          <p className="text-sm text-muted-foreground mb-4">
            Sauvegardez vos prompts, débloquez les variantes Expert et l&apos;historique complet.
          </p>
          <Button asChild>
            <Link href="/signup">
              Créer un compte gratuit
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
