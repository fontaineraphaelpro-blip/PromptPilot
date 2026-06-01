import Link from "next/link";
import { getDailyPrompt, getRecentDailyPrompts } from "@/lib/seo/daily-prompt";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DailyPromptCta } from "@/components/seo/daily-prompt-cta";

export const metadata = buildPageMetadata({
  title: "Prompt du jour — Défi quotidien PromptExpert",
  description:
    "Chaque jour un nouveau défi prompt IA : idée, IA cible et conseil. Génère ton prompt expert gratuitement.",
  path: "/prompt-du-jour",
});

export default function PromptDuJourPage() {
  const today = getDailyPrompt();
  const recent = getRecentDailyPrompts(7);

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-bold sm:text-4xl tracking-tight mb-2">Prompt du jour</h1>
      <p className="text-muted-foreground mb-10">
        Un défi quotidien pour muscler ton prompt engineering — comme un Wordle du prompt.
      </p>

      <Card className="glass-card border-white/20 mb-10">
        <CardHeader>
          <p className="text-xs text-muted-foreground">{today.date}</p>
          <CardTitle>{today.title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm leading-relaxed">{today.idea}</p>
          <p className="text-xs text-muted-foreground">
            IA : {today.targetAI} · {today.taskType}
          </p>
          <p className="text-sm border-l-2 border-primary pl-3 text-muted-foreground">
            💡 {today.tip}
          </p>
          <DailyPromptCta prompt={today} />
        </CardContent>
      </Card>

      <h2 className="font-semibold mb-4">7 derniers défis</h2>
      <ul className="space-y-3">
        {recent.slice(1).map((p) => (
          <li key={p.date}>
            <Card>
              <CardContent className="py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div>
                  <p className="text-xs text-muted-foreground">{p.date}</p>
                  <p className="font-medium text-sm">{p.title}</p>
                </div>
                <DailyPromptCta prompt={p} compact />
              </CardContent>
            </Card>
          </li>
        ))}
      </ul>

      <p className="mt-10 text-center text-sm text-muted-foreground">
        <Link href="/blog" className="text-primary hover:underline">
          Voir tous les guides prompts
        </Link>
      </p>
    </div>
  );
}
