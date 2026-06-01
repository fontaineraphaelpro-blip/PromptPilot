import Link from "next/link";
import { Star } from "lucide-react";
import type { PromptRecord } from "@/types";

export function ExcellencePromptsBanner({ prompts }: { prompts: PromptRecord[] }) {
  const top = prompts
    .filter(
      (p) => (p.prompt_score ?? 0) >= 85 || (p.tags ?? []).includes("excellence")
    )
    .slice(0, 5);

  if (top.length === 0) return null;

  return (
    <section className="rounded-xl border border-primary/25 bg-primary/5 p-5 space-y-3">
      <div className="flex items-center gap-2">
        <Star className="h-5 w-5 text-primary fill-primary" />
        <h2 className="font-semibold">Meilleurs prompts</h2>
        <span className="text-xs text-muted-foreground">score ≥ 85</span>
      </div>
      <ul className="space-y-2">
        {top.map((p) => (
          <li key={p.id}>
            <Link
              href={`/history/${p.id}`}
              className="flex items-center justify-between gap-3 rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm hover:border-primary/40 transition-colors"
            >
              <span className="line-clamp-1 font-medium">{p.original_idea}</span>
              <span className="shrink-0 text-xs font-mono text-primary">
                {p.prompt_score ?? "—"}/100
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
