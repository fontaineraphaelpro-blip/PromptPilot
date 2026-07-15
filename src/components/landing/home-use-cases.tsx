"use client";

import { FadeIn } from "@/components/motion/fade-in";
import { useLocale } from "@/components/providers/locale-provider";

const USE_CASES_FR = [
  { key: "Marketing" as const, outcome: "Pages, ads, emails — un brief scoré prêt à coller" },
  { key: "Développement" as const, outcome: "Specs Cursor / Lovable avec stack et critères d'acceptation" },
  { key: "Image" as const, outcome: "Prompts Midjourney / DALL·E cohérents, style catalogue" },
  { key: "Vidéo" as const, outcome: "Scripts Reels + prompts Sora / Runway structurés" },
  { key: "Business" as const, outcome: "Propositions, cold emails, pitchs fondateurs" },
  { key: "Écriture" as const, outcome: "Articles, newsletters, scripts — ton de marque inclus" },
  { key: "No-code" as const, outcome: "Briefs Bolt / Lovable pour apps et sites sans code" },
  { key: "Analyse" as const, outcome: "Audits, SWOT, synthèses avec format de sortie imposé" },
] as const;

const USE_CASES_EN = [
  { key: "Marketing" as const, outcome: "Pages, ads, emails — a scored brief ready to paste" },
  { key: "Développement" as const, outcome: "Cursor / Lovable specs with stack and acceptance criteria" },
  { key: "Image" as const, outcome: "Consistent Midjourney / DALL·E prompts, catalog style" },
  { key: "Vidéo" as const, outcome: "Reel scripts + structured Sora / Runway prompts" },
  { key: "Business" as const, outcome: "Proposals, cold emails, founder pitches" },
  { key: "Écriture" as const, outcome: "Articles, newsletters, scripts — brand voice included" },
  { key: "No-code" as const, outcome: "Bolt / Lovable briefs for apps and sites without code" },
  { key: "Analyse" as const, outcome: "Audits, SWOT, summaries with enforced output format" },
] as const;

export function HomeUseCases() {
  const { locale, messages: m } = useLocale();
  const labels = m.home.taskTypes;
  const cases = locale === "en" ? USE_CASES_EN : USE_CASES_FR;
  const subtitle =
    locale === "en"
      ? "A prompt studio for every deliverable — not a generic chat."
      : "Un studio de prompts pour chaque livrable — pas un chat générique.";

  return (
    <section className="py-24 border-t border-border/40 w-full">
      <div className="w-full max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-10">
        <FadeIn className="text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-4">
            {m.home.useCases}
          </p>
          <h2 className="text-3xl font-bold sm:text-4xl tracking-tight">{m.home.useCasesTitle}</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground">{subtitle}</p>
        </FadeIn>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cases.map((use, i) => (
            <FadeIn key={use.key} delay={i * 0.06}>
              <div className="glass-card hover-lift h-full rounded-2xl p-5 text-left">
                <p className="font-medium text-sm sm:text-base">
                  {labels[use.key] ?? use.key}
                </p>
                <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                  {use.outcome}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
