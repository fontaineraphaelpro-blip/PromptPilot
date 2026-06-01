"use client";

import { TASK_TYPES } from "@/lib/constants";
import { Card, CardContent } from "@/components/ui/card";
import { FadeIn } from "@/components/motion/fade-in";
import { useLocale } from "@/components/providers/locale-provider";

export function HomeUseCases() {
  const { messages: m } = useLocale();
  const labels = m.home.taskTypes;

  return (
    <section className="py-24 border-t border-border/40 w-full">
      <div className="w-full max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-10">
        <FadeIn className="text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-4">
            {m.home.useCases}
          </p>
          <h2 className="text-3xl font-bold sm:text-4xl tracking-tight">{m.home.useCasesTitle}</h2>
        </FadeIn>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {TASK_TYPES.filter((t) => t !== "Autre").map((use, i) => (
            <FadeIn key={use} delay={i * 0.06}>
              <Card className="glass-card hover-lift h-full">
                <CardContent className="p-6 text-center font-medium">
                  {labels[use as keyof typeof labels] ?? use}
                </CardContent>
              </Card>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
