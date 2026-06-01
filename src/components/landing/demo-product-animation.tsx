"use client";

import { useEffect, useRef, useState } from "react";
import {
  Check,
  Copy,
  Sparkles,
  Wand2,
  Zap,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

const IDEA =
  "Landing page SaaS B2B qui convertit les visiteurs en essai gratuit";
const PROMPT_LINES = [
  "RÔLE: Copywriter SaaS B2B senior, expert conversion.",
  "CONTEXTE: Produit = générateur de prompts IA, cible PME marketing.",
  "TÂCHE: Rédiger hero + 3 sections + CTA essai 14j.",
  "FORMAT: Markdown, titres H2, bullets, ton pro mais humain.",
  "CONTRAINTES: Pas de jargon vide, preuves chiffrées, FR.",
];

type Phase = "input" | "generating" | "result";

const PHASE_MS: Record<Phase, number> = {
  input: 2600,
  generating: 2400,
  result: 4200,
};

const PHASES: Phase[] = ["input", "generating", "result"];

const SCORE_BREAKDOWN = [
  { label: "Clarté", value: 24 },
  { label: "Contraintes", value: 23 },
  { label: "Format", value: 24 },
  { label: "Adaptation IA", value: 23 },
];

export function DemoProductAnimation() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [inView, setInView] = useState(true);
  const [phase, setPhase] = useState<Phase>("input");
  const [typedLen, setTypedLen] = useState(0);
  const [genProgress, setGenProgress] = useState(0);
  const [visibleLines, setVisibleLines] = useState(0);
  const [score, setScore] = useState(0);
  const [breakdownFill, setBreakdownFill] = useState(0);
  const [copied, setCopied] = useState(false);
  const [flashScore, setFlashScore] = useState(false);
  const [playing, setPlaying] = useState(true);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => setInView(e.isIntersecting),
      { threshold: 0.12, rootMargin: "80px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [mounted]);

  useEffect(() => {
    if (!mounted || !playing || !inView) return;
    const ms = PHASE_MS[phase];
    const t = window.setTimeout(() => {
      setPhase((p) => PHASES[(PHASES.indexOf(p) + 1) % PHASES.length]);
    }, ms);
    return () => window.clearTimeout(t);
  }, [phase, mounted, playing, inView]);

  useEffect(() => {
    if (!mounted || phase !== "input") return;
    setTypedLen(0);
    let i = 0;
    const t = window.setInterval(() => {
      i += 2;
      setTypedLen(Math.min(IDEA.length, i));
      if (i >= IDEA.length) window.clearInterval(t);
    }, 28);
    return () => window.clearInterval(t);
  }, [phase, mounted]);

  useEffect(() => {
    if (!mounted || phase !== "generating") return;
    setGenProgress(0);
    setVisibleLines(0);
    const prog = window.setInterval(() => {
      setGenProgress((p) => Math.min(100, p + 4));
    }, 45);
    const lines = window.setInterval(() => {
      setVisibleLines((n) => {
        if (n >= PROMPT_LINES.length) {
          window.clearInterval(lines);
          return n;
        }
        return n + 1;
      });
    }, 380);
    return () => {
      window.clearInterval(prog);
      window.clearInterval(lines);
    };
  }, [phase, mounted]);

  useEffect(() => {
    if (!mounted || phase !== "result") return;
    setScore(0);
    setBreakdownFill(0);
    setCopied(false);
    setFlashScore(false);

    const scoreT = window.setInterval(() => {
      setScore((s) => {
        const next = Math.min(94, s + 6);
        if (next >= 94) {
          window.clearInterval(scoreT);
          setFlashScore(true);
          window.setTimeout(() => setFlashScore(false), 600);
        }
        return next;
      });
    }, 35);

    const barT = window.setTimeout(() => {
      setBreakdownFill(100);
    }, 400);

    const copyT = window.setTimeout(() => setCopied(true), 2200);

    return () => {
      window.clearInterval(scoreT);
      window.clearTimeout(barT);
      window.clearTimeout(copyT);
    };
  }, [phase, mounted]);

  const circumference = 2 * Math.PI * 46;
  const scoreOffset = circumference - (score / 100) * circumference;

  if (!mounted) {
    return (
      <div className="mx-auto max-w-4xl w-full rounded-2xl border border-white/10 bg-black/90 min-h-[380px] animate-pulse" />
    );
  }

  return (
    <div ref={rootRef} className="mx-auto max-w-4xl w-full">
      <div className="demo-mock-glow relative rounded-2xl border border-white/15 bg-[#050505] overflow-hidden">
        {/* Shimmer sweep */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden z-20">
          <div
            className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/[0.07] to-transparent"
            style={{ animation: "demo-shimmer 4s ease-in-out infinite" }}
          />
        </div>

        {/* App chrome */}
        <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3 bg-black/60">
          <div className="flex items-center gap-2 min-w-0">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-black shrink-0">
              <Sparkles className="h-4 w-4" />
            </span>
            <div className="min-w-0">
              <p className="text-sm font-semibold truncate">PromptPilot</p>
              <p className="text-[10px] text-muted-foreground">Générateur · Cursor</p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 demo-live-dot" />
              Simulation live
            </span>
            <button
              type="button"
              onClick={() => setPlaying((p) => !p)}
              className="text-[10px] px-2 py-1 rounded border border-white/15 hover:bg-white/5"
            >
              {playing ? "Pause" : "▶"}
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 min-h-[340px] sm:min-h-[380px]">
          {/* Panneau gauche — saisie */}
          <div
            className={cn(
              "p-4 sm:p-5 border-b lg:border-b-0 lg:border-r border-white/10 transition-opacity duration-300",
              phase === "generating" && "opacity-60"
            )}
          >
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-2">
              1 · Ton idée
            </p>
            <div
              className={cn(
                "rounded-xl border p-3 min-h-[100px] transition-colors duration-300",
                phase === "input" ? "border-white/25 bg-white/[0.04]" : "border-white/10 bg-black/40"
              )}
            >
              <p className="text-sm leading-relaxed text-foreground/95">
                {IDEA.slice(0, typedLen)}
                {phase === "input" && (
                  <span className="inline-block w-0.5 h-4 bg-white ml-0.5 align-middle animate-pulse" />
                )}
              </p>
            </div>

            <p className="text-[10px] uppercase tracking-wider text-muted-foreground mt-4 mb-2">
              2 · IA cible
            </p>
            <div className="flex flex-wrap gap-2">
              {["ChatGPT", "Claude", "Cursor"].map((ai) => (
                <span
                  key={ai}
                  className={cn(
                    "rounded-lg px-2.5 py-1.5 text-[11px] font-medium border transition-all duration-200",
                    ai === "Cursor"
                      ? "border-white/50 bg-white text-black scale-105 shadow-lg shadow-white/10"
                      : "border-white/10 text-muted-foreground"
                  )}
                >
                  {ai}
                </span>
              ))}
            </div>

            <div
              className={cn(
                "mt-5 inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-xs font-semibold transition-all duration-300",
                phase === "input" && typedLen >= IDEA.length
                  ? "bg-white text-black scale-100 opacity-100"
                  : "bg-white/20 text-white/50 scale-95 opacity-70",
                phase === "generating" && "bg-white/30 text-white animate-pulse"
              )}
            >
              {phase === "generating" ? (
                <>
                  <Sparkles className="h-3.5 w-3.5 animate-spin" />
                  Génération…
                </>
              ) : (
                <>
                  <Wand2 className="h-3.5 w-3.5" />
                  Générer le prompt
                  <ArrowRight className="h-3.5 w-3.5" />
                </>
              )}
            </div>
          </div>

          {/* Panneau droit — sortie */}
          <div className="relative p-4 sm:p-5 bg-gradient-to-br from-white/[0.03] to-transparent overflow-hidden">
            {phase === "input" && (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 opacity-40">
                <Zap className="h-10 w-10 text-muted-foreground mb-3" />
                <p className="text-sm text-muted-foreground">
                  Le prompt expert apparaît ici en quelques secondes
                </p>
              </div>
            )}

            {phase === "generating" && (
              <div className="space-y-4 opacity-100 transition-opacity duration-300">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-white animate-pulse" />
                  <p className="text-sm font-medium">Structuration R-C-T-C…</p>
                  <span className="ml-auto text-xs tabular-nums text-muted-foreground">
                    {genProgress}%
                  </span>
                </div>
                <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-white/80 to-white rounded-full transition-[width] duration-75"
                    style={{ width: `${genProgress}%` }}
                  />
                </div>
                <div className="space-y-2 rounded-xl border border-white/10 bg-black/50 p-3 font-mono text-[11px] leading-relaxed">
                  {PROMPT_LINES.slice(0, visibleLines).map((line, i) => (
                    <p
                      key={i}
                      className="text-foreground/80"
                    >
                      {line}
                    </p>
                  ))}
                  {visibleLines < PROMPT_LINES.length && (
                    <span className="inline-block w-1.5 h-3 bg-white/60 animate-pulse" />
                  )}
                </div>
              </div>
            )}

            {phase === "result" && (
              <div className="space-y-4">
                <div
                  className={cn(
                    "flex items-center gap-4 rounded-xl border p-3 transition-all duration-300",
                    flashScore
                      ? "border-emerald-400/50 bg-emerald-500/10 scale-[1.02]"
                      : "border-white/15 bg-white/[0.04]"
                  )}
                >
                  <div className="relative h-16 w-16 shrink-0">
                    <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
                      <circle
                        cx="50"
                        cy="50"
                        r="46"
                        fill="none"
                        stroke="rgba(255,255,255,0.08)"
                        strokeWidth="7"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="46"
                        fill="none"
                        stroke="#4ade80"
                        strokeWidth="7"
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        strokeDashoffset={scoreOffset}
                        className="transition-[stroke-dashoffset] duration-100"
                      />
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center text-lg font-bold tabular-nums">
                      {score}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] uppercase text-muted-foreground">Prompt Score</p>
                    <p className="text-xl font-bold text-emerald-400">
                      {score}
                      <span className="text-sm font-normal text-muted-foreground">/100</span>
                    </p>
                    <p className="text-xs text-emerald-400/90 font-medium">Excellent · prêt à coller</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-1.5">
                  {SCORE_BREAKDOWN.map((row, i) => (
                    <div key={row.label} className="rounded-lg bg-black/40 px-2 py-1.5">
                      <div className="flex justify-between text-[9px] text-muted-foreground mb-1">
                        <span>{row.label}</span>
                        <span>
                          {Math.round((breakdownFill / 100) * row.value)}/{row.value}
                        </span>
                      </div>
                      <div className="h-1 rounded-full bg-white/10 overflow-hidden">
                        <div
                          className="h-full bg-white/70 rounded-full transition-all duration-700 ease-out"
                          style={{
                            width: `${(breakdownFill / 100) * (row.value / 24) * 100}%`,
                            transitionDelay: `${i * 80}ms`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="rounded-xl border border-white/10 bg-black/50 p-3 max-h-[88px] overflow-hidden">
                  <p className="text-[10px] text-muted-foreground mb-1.5 font-mono">
                    Variante principale
                  </p>
                  <p className="text-[11px] font-mono text-foreground/75 line-clamp-3 leading-relaxed">
                    {PROMPT_LINES.join(" ")}
                  </p>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  <span
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-lg bg-white px-3 py-2 text-xs font-bold text-black transition-transform",
                      copied && "scale-95"
                    )}
                  >
                    <Copy className="h-3.5 w-3.5" />
                    Copier le prompt
                  </span>
                  {copied && (
                    <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/40 bg-emerald-500/15 px-3 py-1.5 text-xs font-semibold text-emerald-400">
                      <Check className="h-3.5 w-3.5" />
                      Copié dans le presse-papiers
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Barre de statut */}
        <div className="flex items-center justify-between gap-2 border-t border-white/10 px-4 py-2 bg-black/50 text-[10px] text-muted-foreground">
          <span className="flex items-center gap-1.5">
            {phase === "generating" && (
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
            )}
            {phase === "result" && <Check className="h-3 w-3 text-emerald-400" />}
            {phase === "input" && "En attente de génération"}
            {phase === "generating" && "OpenAI · prompt structuré en cours"}
            {phase === "result" && "4 variantes disponibles · Expert débloqué au Creator"}
          </span>
          <span className="tabular-nums font-mono text-white/50">
            {phase === "input" ? "00:02" : phase === "generating" ? "00:08" : "00:12"}
          </span>
        </div>
      </div>
    </div>
  );
}
