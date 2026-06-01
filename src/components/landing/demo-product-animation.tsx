"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const STEPS = ["Idée", "IA", "Génération", "Résultat"] as const;
const IDEA_TEXT = "Une landing SaaS B2B pour vendre des prompts IA";
const SCENE_MS = 3500;

type SceneId = 0 | 1 | 2 | 3;

export function DemoProductAnimation() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [inView, setInView] = useState(true);
  const [scene, setScene] = useState<SceneId>(0);
  const [typedLen, setTypedLen] = useState(0);
  const [progress, setProgress] = useState(0);
  const [score, setScore] = useState(0);
  const [copied, setCopied] = useState(false);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.15, rootMargin: "40px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [mounted]);

  useEffect(() => {
    if (!mounted || !playing || !inView) return;

    const tick = window.setInterval(() => {
      setScene((s) => ((s + 1) % 4) as SceneId);
    }, SCENE_MS);

    return () => window.clearInterval(tick);
  }, [mounted, playing, inView]);

  useEffect(() => {
    if (!mounted || scene !== 0) return;
    setTypedLen(0);
    let i = 0;
    const type = window.setInterval(() => {
      i += 1;
      setTypedLen(i);
      if (i >= IDEA_TEXT.length) window.clearInterval(type);
    }, 40);
    return () => window.clearInterval(type);
  }, [scene, mounted]);

  useEffect(() => {
    if (!mounted || scene !== 2) return;
    setProgress(0);
    const start = Date.now();
    const prog = window.setInterval(() => {
      const p = Math.min(100, ((Date.now() - start) / (SCENE_MS - 300)) * 100);
      setProgress(p);
    }, 40);
    return () => window.clearInterval(prog);
  }, [scene, mounted]);

  useEffect(() => {
    if (!mounted || scene !== 3) return;
    setScore(0);
    setCopied(false);
    const scoreInc = window.setInterval(() => {
      setScore((v) => {
        if (v >= 92) {
          window.clearInterval(scoreInc);
          return 92;
        }
        return v + 5;
      });
    }, 40);
    const copyT = window.setTimeout(() => setCopied(true), SCENE_MS - 800);
    return () => {
      window.clearInterval(scoreInc);
      window.clearTimeout(copyT);
    };
  }, [scene, mounted]);

  const circumference = 2 * Math.PI * 42;
  const scoreOffset = circumference - (score / 100) * circumference;

  if (!mounted) {
    return (
      <div className="relative mx-auto max-w-2xl w-full">
        <div className="glass-card rounded-2xl border border-white/12 bg-black/80 min-h-[320px] animate-pulse" />
      </div>
    );
  }

  return (
    <div ref={rootRef} className="relative mx-auto max-w-2xl w-full">
      <div className="pointer-events-none absolute -inset-8 rounded-3xl bg-gradient-radial-top opacity-60" />

      <div className="glass-card relative overflow-hidden rounded-2xl border border-white/12 bg-black/80 shadow-2xl">
        <div className="flex items-center gap-2 border-b border-white/8 px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
          <span className="ml-2 flex-1 text-[10px] font-mono text-muted-foreground tracking-wide truncate">
            promptpilot.app — démo live
          </span>
          <button
            type="button"
            onClick={() => setPlaying((p) => !p)}
            className="pointer-events-auto text-[10px] font-medium text-muted-foreground hover:text-foreground px-2 py-0.5 rounded border border-white/10"
          >
            {playing ? "Pause" : "Lecture"}
          </button>
        </div>

        <div className="flex justify-center gap-1 px-4 pt-3 pb-1 flex-wrap">
          {STEPS.map((label, i) => (
            <div key={label} className="flex items-center gap-1">
              <span
                className={cn(
                  "flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold border transition-all duration-300",
                  scene === i
                    ? "bg-white text-black border-white scale-110"
                    : scene > i
                      ? "bg-white/20 text-white border-white/30"
                      : "bg-white/5 text-muted-foreground border-white/15"
                )}
              >
                {scene > i ? <Check className="h-3 w-3" /> : i + 1}
              </span>
              <span className="hidden sm:inline text-[10px] text-muted-foreground">{label}</span>
              {i < 3 && (
                <span
                  className={cn(
                    "mx-0.5 h-px w-4 sm:w-6 transition-colors duration-500",
                    scene > i ? "bg-white/50" : "bg-white/15"
                  )}
                />
              )}
            </div>
          ))}
        </div>

        <div className="relative min-h-[260px] sm:min-h-[280px] p-4 sm:p-6">
          {/* Scène 1 */}
          <div
            className={cn(
              "absolute inset-x-4 sm:inset-x-6 top-4 bottom-4 transition-all duration-500",
              scene === 0 ? "opacity-100 translate-y-0 z-10" : "opacity-0 translate-y-2 pointer-events-none z-0"
            )}
            aria-hidden={scene !== 0}
          >
            <p className="text-xs font-medium text-muted-foreground mb-2">Ton idée</p>
            <div className="rounded-lg border border-white/12 bg-black/50 p-3 min-h-[80px]">
              <p className="text-sm font-mono text-foreground/90 leading-relaxed">
                {IDEA_TEXT.slice(0, typedLen)}
                <span className="inline-block w-0.5 h-4 bg-white align-middle ml-0.5 animate-pulse" />
              </p>
            </div>
            <div
              className={cn(
                "mt-4 inline-flex rounded-lg bg-white px-4 py-2 text-xs font-semibold text-black transition-opacity duration-300",
                typedLen >= IDEA_TEXT.length ? "opacity-100" : "opacity-0"
              )}
            >
              Continuer →
            </div>
          </div>

          {/* Scène 2 */}
          <div
            className={cn(
              "absolute inset-x-4 sm:inset-x-6 top-4 bottom-4 transition-all duration-500",
              scene === 1 ? "opacity-100 translate-y-0 z-10" : "opacity-0 translate-y-2 pointer-events-none z-0"
            )}
            aria-hidden={scene !== 1}
          >
            <p className="text-xs font-medium text-muted-foreground mb-3">Pour quelle IA ?</p>
            <div className="grid grid-cols-3 gap-2">
              {(["ChatGPT", "Claude", "Cursor"] as const).map((name) => (
                <div
                  key={name}
                  className={cn(
                    "rounded-lg border px-2 py-3 text-center text-[11px] font-medium transition-all duration-300",
                    name === "Cursor" && scene === 1
                      ? "border-white/55 bg-white/12 scale-[1.03] shadow-[0_0_20px_rgba(255,255,255,0.12)]"
                      : "border-white/10 bg-white/[0.03]"
                  )}
                >
                  {name}
                </div>
              ))}
            </div>
          </div>

          {/* Scène 3 */}
          <div
            className={cn(
              "absolute inset-0 flex flex-col items-center justify-center gap-4 px-6 transition-all duration-500",
              scene === 2 ? "opacity-100 z-10" : "opacity-0 pointer-events-none z-0"
            )}
            aria-hidden={scene !== 2}
          >
            <Loader2 className="h-10 w-10 animate-spin text-white" />
            <p className="text-sm font-medium">Génération du prompt expert…</p>
            <div className="w-full max-w-xs h-1.5 rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full rounded-full bg-white transition-[width] duration-100 ease-linear"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground tabular-nums">{Math.round(progress)}%</p>
          </div>

          {/* Scène 4 */}
          <div
            className={cn(
              "absolute inset-x-4 sm:inset-x-6 top-2 bottom-4 flex flex-col sm:flex-row gap-4 transition-all duration-500",
              scene === 3 ? "opacity-100 translate-y-0 z-10" : "opacity-0 translate-y-2 pointer-events-none z-0"
            )}
            aria-hidden={scene !== 3}
          >
            <div className="flex shrink-0 flex-col items-center justify-center sm:w-28">
              <div className="relative h-20 w-20 sm:h-24 sm:w-24">
                <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="42"
                    fill="none"
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth="8"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="42"
                    fill="none"
                    stroke="white"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={scoreOffset}
                    className="transition-[stroke-dashoffset] duration-150"
                  />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-xl font-bold tabular-nums">
                  {score}
                </span>
              </div>
              <span className="mt-1 text-[10px] text-emerald-400 font-medium">Excellent</span>
            </div>
            <div className="flex-1 min-w-0 flex flex-col">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1.5">
                Prompt optimisé
              </p>
              <div className="rounded-lg border border-white/10 bg-black/40 p-2.5 space-y-1.5 flex-1">
                {[100, 92, 78, 85].map((w, i) => (
                  <div
                    key={i}
                    className="h-2 rounded bg-white/20 origin-left transition-transform duration-500 ease-out"
                    style={{
                      width: `${w}%`,
                      transform: scene === 3 ? "scaleX(1)" : "scaleX(0)",
                      transitionDelay: scene === 3 ? `${i * 120}ms` : "0ms",
                    }}
                  />
                ))}
              </div>
              <div className="mt-3 flex items-center gap-2 min-h-[28px]">
                <span className="inline-flex items-center gap-1.5 rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-black">
                  <Copy className="h-3 w-3" />
                  Copier
                </span>
                <span
                  className={cn(
                    "text-xs font-medium text-emerald-400 transition-opacity duration-300",
                    copied ? "opacity-100" : "opacity-0"
                  )}
                >
                  ✓ Copié !
                </span>
              </div>
            </div>
          </div>
        </div>

        {!playing && (
          <p className="text-center text-[10px] text-muted-foreground pb-3">
            Démo en pause — cliquez Lecture
          </p>
        )}
      </div>
    </div>
  );
}
