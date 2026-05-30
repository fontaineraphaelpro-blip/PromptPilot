"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCopy } from "@/hooks/use-copy";
import { Copy, Check, Lock, Wand2, ChevronDown, ChevronUp } from "lucide-react";
import { toast } from "sonner";
import type { Template } from "@/types";
import { TEMPLATE_CATEGORIES } from "@/lib/constants";
import { canAccessPremiumTemplates } from "@/lib/plans";
import type { Plan } from "@/lib/constants";
import { saveTemplatePrefill } from "@/lib/conversion/template-prefill";
import { cn } from "@/lib/utils";

interface TemplateGridProps {
  templates: Template[];
  plan: Plan;
}

function TemplateCard({
  template: t,
  locked,
  onCopy,
  onUse,
  copied,
}: {
  template: Template;
  locked: boolean;
  onCopy: () => void;
  onUse: () => void;
  copied: boolean;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card className={cn("glass-card flex flex-col h-full", locked && "opacity-80")}>
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-base leading-snug">{t.title}</CardTitle>
          {t.is_premium && <Badge variant="pro">Premium</Badge>}
        </div>
        <CardDescription className="leading-relaxed">{t.description}</CardDescription>
        <p className="text-xs text-muted-foreground font-mono">
          {t.category} · {t.target_ai}
        </p>
      </CardHeader>
      <CardContent className="flex flex-col flex-1">
        <pre
          className={cn(
            "text-xs text-muted-foreground whitespace-pre-wrap font-sans leading-relaxed rounded-lg border border-white/10 bg-black/40 p-3 mb-3",
            expanded ? "max-h-[420px] overflow-y-auto" : "line-clamp-6"
          )}
        >
          {t.content}
        </pre>
        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className="mb-4 inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          {expanded ? (
            <>
              <ChevronUp className="h-3.5 w-3.5" /> Réduire
            </>
          ) : (
            <>
              <ChevronDown className="h-3.5 w-3.5" /> Voir le prompt complet
            </>
          )}
        </button>

        <div className="mt-auto flex flex-wrap gap-2">
          {locked ? (
            <Button variant="outline" size="sm" asChild className="w-full sm:w-auto">
              <Link href="/pricing?plan=pro">
                <Lock className="h-3 w-3" />
                Débloquer avec Pro
              </Link>
            </Button>
          ) : (
            <>
              <Button size="sm" className="flex-1 min-w-[140px]" onClick={onUse}>
                <Wand2 className="h-3 w-3" />
                Utiliser
              </Button>
              <Button size="sm" variant="outline" onClick={onCopy}>
                {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                Copier
              </Button>
            </>
          )}
        </div>
        {!locked && (
          <p className="mt-2 text-[10px] text-muted-foreground">
            Remplace les [PLACEHOLDER] avant de générer ou coller dans ton IA.
          </p>
        )}
      </CardContent>
    </Card>
  );
}

export function TemplateGrid({ templates, plan }: TemplateGridProps) {
  const router = useRouter();
  const [category, setCategory] = useState<string>("Tous");
  const { copy, copiedId, resetCopy } = useCopy();

  const hasPremium = canAccessPremiumTemplates(plan);

  const filtered =
    category === "Tous"
      ? templates
      : templates.filter((t) => t.category === category);

  async function handleCopy(id: string, content: string, isPremium: boolean) {
    if (isPremium && !hasPremium) {
      toast.error("Passez au plan Pro pour accéder à ce template");
      return;
    }
    await copy(content, id);
    toast.success("Prompt copié — adapte les [PLACEHOLDER]");
  }

  function handleUse(t: Template, isPremium: boolean) {
    if (isPremium && !hasPremium) {
      toast.error("Passez au plan Pro pour utiliser ce template");
      return;
    }
    saveTemplatePrefill({
      userIdea: t.content,
      targetAI: t.target_ai,
      templateTitle: t.title,
    });
    toast.success(`Template « ${t.title} » chargé dans le générateur`);
    router.push("/generate");
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {["Tous", ...TEMPLATE_CATEGORIES].map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => {
              setCategory(cat);
              resetCopy();
            }}
            className={cn(
              "rounded-full px-3 py-1.5 text-sm transition-all",
              category === cat
                ? "bg-white text-black font-medium"
                : "border border-white/10 text-muted-foreground hover:border-white/25 hover:text-foreground"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      <p className="text-sm text-muted-foreground">
        {filtered.length} template{filtered.length > 1 ? "s" : ""} — prompts structurés Rôle / Contexte /
        Mission / Contraintes, prêts pour {filtered[0]?.target_ai ?? "ton IA"}.
      </p>

      <div className="grid gap-5 sm:grid-cols-2">
        {filtered.map((t) => {
          const locked = t.is_premium && !hasPremium;
          return (
            <TemplateCard
              key={t.id}
              template={t}
              locked={locked}
              copied={copiedId === t.id}
              onCopy={() => handleCopy(t.id, t.content, t.is_premium)}
              onUse={() => handleUse(t, t.is_premium)}
            />
          );
        })}
      </div>
    </div>
  );
}
