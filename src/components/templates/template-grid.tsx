"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCopy } from "@/hooks/use-copy";
import { Copy, Check, Lock } from "lucide-react";
import { toast } from "sonner";
import type { Template } from "@/types";
import { TEMPLATE_CATEGORIES } from "@/lib/constants";
import { canAccessPremiumTemplates } from "@/lib/plans";
import type { Plan } from "@/lib/constants";
import Link from "next/link";

interface TemplateGridProps {
  templates: Template[];
  plan: Plan;
}

export function TemplateGrid({ templates, plan }: TemplateGridProps) {
  const [category, setCategory] = useState<string>("Tous");
  const { copy, copied } = useCopy();
  const hasPremium = canAccessPremiumTemplates(plan);

  const filtered =
    category === "Tous"
      ? templates
      : templates.filter((t) => t.category === category);

  async function handleCopy(content: string, isPremium: boolean) {
    if (isPremium && !hasPremium) {
      toast.error("Passez au plan Pro pour accéder à ce template");
      return;
    }
    await copy(content);
    toast.success("Template copié !");
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {["Tous", ...TEMPLATE_CATEGORIES].map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`rounded-full px-3 py-1 text-sm transition-colors ${
              category === cat
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {filtered.map((t) => {
          const locked = t.is_premium && !hasPremium;
          return (
            <Card key={t.id} className={locked ? "opacity-75" : ""}>
              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-base">{t.title}</CardTitle>
                  {t.is_premium && (
                    <Badge variant="pro">Premium</Badge>
                  )}
                </div>
                <CardDescription>{t.description}</CardDescription>
                <p className="text-xs text-muted-foreground">
                  {t.category} · {t.target_ai}
                </p>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                  {t.content}
                </p>
                {locked ? (
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/pricing">
                      <Lock className="h-3 w-3" />
                      Débloquer avec Pro
                    </Link>
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleCopy(t.content, t.is_premium)}
                  >
                    {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                    Copier
                  </Button>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
