import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { FREE_DAILY_LIMIT } from "@/lib/constants";

export function SeoCta() {
  return (
    <section className="mt-16 rounded-2xl border border-white/15 bg-white/5 p-8 sm:p-10 text-center">
      <h2 className="text-2xl font-bold tracking-tight">
        Génère ton prompt expert en 30 secondes
      </h2>
      <p className="mt-3 text-muted-foreground max-w-lg mx-auto">
        Décris ton idée, choisis ton IA, reçois un prompt structuré avec variantes —
        gratuit, {FREE_DAILY_LIMIT} générations par jour.
      </p>
      <Button size="lg" className="mt-6 group" asChild>
        <Link href="/signup">
          Essayer PromptExpert gratuitement
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </Button>
    </section>
  );
}
