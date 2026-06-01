"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, Copy, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const STEPS = ["Idée", "IA", "Génération", "Résultat"] as const;
const IDEA_TEXT = "Une landing SaaS B2B pour vendre des prompts IA";
const SCENE_MS = 3800;

type SceneId = 0 | 1 | 2 | 3;

const sceneVariants = {
  enter: { opacity: 0, y: 12 },
  center: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

export function DemoProductAnimation() {
  const reduceMotion = useReducedMotion();
  const [scene, setScene] = useState<SceneId>(0);
  const [typedLen, setTypedLen] = useState(0);
  const [progress, setProgress] = useState(0);
  const [score, setScore] = useState(0);
  const [copied, setCopied] = useState(false);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    if (reduceMotion) {
      setScene(3);
      setTypedLen(IDEA_TEXT.length);
      setProgress(100);
      setScore(92);
      return;
    }
    if (!playing) return;

    const tick = setInterval(() => {
      setScene((s) => ((s + 1) % 4) as SceneId);
    }, SCENE_MS);

    return () => clearInterval(tick);
  }, [playing, reduceMotion]);

  useEffect(() => {
    if (reduceMotion || scene !== 0) return;
    setTypedLen(0);
    let i = 0;
    const type = setInterval(() => {
      i += 1;
      setTypedLen(i);
      if (i >= IDEA_TEXT.length) clearInterval(type);
    }, 45);
    return () => clearInterval(type);
  }, [scene, reduceMotion]);

  useEffect(() => {
    if (reduceMotion || scene !== 2) return;
    setProgress(0);
    const start = Date.now();
    const prog = setInterval(() => {
      const p = Math.min(100, ((Date.now() - start) / (SCENE_MS - 400)) * 100);
      setProgress(p);
    }, 50);
    return () => clearInterval(prog);
  }, [scene, reduceMotion]);

  useEffect(() => {
    if (reduceMotion || scene !== 3) return;
    setScore(0);
    setCopied(false);
    const scoreTimer = setTimeout(() => {
      let v = 0;
      const inc = setInterval(() => {
        v += 4;
        setScore(Math.min(92, v));
        if (v >= 92) clearInterval(inc);
      }, 35);
    }, 200);
    const copyTimer = setTimeout(() => setCopied(true), SCENE_MS - 900);
    return () => {
      clearTimeout(scoreTimer);
      clearTimeout(copyTimer);
    };
  }, [scene, reduceMotion]);

  const circumference = 2 * Math.PI * 42;

  return (
    <div className="relative mx-auto max-w-2xl w-full">
      <div className="pointer-events-none absolute -inset-8 rounded-3xl bg-gradient-radial-top opacity-60" />

      <div className="glass-card relative overflow-hidden rounded-2xl border border-white/12 bg-black/80 shadow-2xl">
        <div className="flex items-center gap-2 border-b border-white/8 px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
          <span className="ml-2 flex-1 text-[10px] font-mono text-muted-foreground tracking-wide truncate">
            promptpilot.app — démo live
          </span>
          {!reduceMotion && (
            <button
              type="button"
              onClick={() => setPlaying((p) => !p)}
              className="pointer-events-auto text-[10px] font-medium text-muted-foreground hover:text-foreground px-2 py-0.5 rounded border border-white/10"
            >
              {playing ? "Pause" : "Lecture"}
            </button>
          )}
        </div>

        <div className="flex justify-center gap-1 px-4 pt-3 pb-1">
          {STEPS.map((label, i) => (
            <div key={label} className="flex items-center gap-1">
              <span
                className={cn(
                  "flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold border transition-colors duration-300",
                  scene === i
                    ? "bg-white text-black border-white"
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

        <div className="relative min-h-[240px] sm:min-h-[260px] p-4 sm:p-6">
          <AnimatePresence mode="wait">
            {scene === 0 && (
              <motion.div
                key="idea"
                variants={sceneVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35 }}
                className="absolute inset-x-4 sm:inset-x-6 top-4 bottom-4"
              >
                <p className="text-xs font-medium text-muted-foreground mb-2">Ton idée</p>
                <div className="rounded-lg border border-white/12 bg-black/50 p-3 min-h-[80px]">
                  <p className="text-sm font-mono text-foreground/90 leading-relaxed">
                    {IDEA_TEXT.slice(0, typedLen)}
                    <motion.span
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ repeat: Infinity, duration: 0.8 }}
                      className="inline-block w-0.5 h-4 bg-white align-middle ml-0.5"
                    />
                  </p>
                </div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: typedLen >= IDEA_TEXT.length ? 1 : 0, scale: 1 }}
                  className="mt-4 inline-flex rounded-lg bg-white px-4 py-2 text-xs font-semibold text-black"
                >
                  Continuer →
                </motion.div>
              </motion.div>
            )}

            {scene === 1 && (
              <motion.div
                key="ai"
                variants={sceneVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35 }}
                className="absolute inset-x-4 sm:inset-x-6 top-4 bottom-4"
              >
                <p className="text-xs font-medium text-muted-foreground mb-3">Pour quelle IA ?</p>
                <div className="grid grid-cols-3 gap-2">
                  {(["ChatGPT", "Claude", "Cursor"] as const).map((name) => (
                    <motion.div
                      key={name}
                      animate={
                        name === "Cursor"
                          ? {
                              borderColor: "rgba(255,255,255,0.55)",
                              backgroundColor: "rgba(255,255,255,0.12)",
                              scale: [1, 1.03, 1],
                            }
                          : { borderColor: "rgba(255,255,255,0.1)", backgroundColor: "rgba(255,255,255,0.03)", scale: 1 }
                      }
                      transition={{ duration: 0.5, repeat: name === "Cursor" ? Infinity : 0, repeatDelay: 0.8 }}
                      className="rounded-lg border px-2 py-3 text-center text-[11px] font-medium"
                    >
                      {name}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {scene === 2 && (
              <motion.div
                key="gen"
                variants={sceneVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35 }}
                className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-6"
              >
                <Loader2 className="h-10 w-10 animate-spin text-white" />
                <p className="text-sm font-medium">Génération du prompt expert…</p>
                <div className="w-full max-w-xs h-1.5 rounded-full bg-white/10 overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-white"
                    style={{ width: `${progress}%` }}
                    transition={{ ease: "linear" }}
                  />
                </div>
                <p className="text-xs text-muted-foreground">{Math.round(progress)}%</p>
              </motion.div>
            )}

            {scene === 3 && (
              <motion.div
                key="result"
                variants={sceneVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35 }}
                className="absolute inset-x-4 sm:inset-x-6 top-2 bottom-4 flex flex-col sm:flex-row gap-4"
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
                      <motion.circle
                        cx="50"
                        cy="50"
                        r="42"
                        fill="none"
                        stroke="white"
                        strokeWidth="8"
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        animate={{ strokeDashoffset: circumference - (score / 100) * circumference }}
                        transition={{ duration: 0.2 }}
                      />
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center text-xl font-bold">
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
                      <motion.div
                        key={i}
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: 0.15 * i, duration: 0.35 }}
                        style={{ width: `${w}%`, transformOrigin: "left" }}
                        className="h-2 rounded bg-white/20"
                      />
                    ))}
                  </div>
                  <div className="mt-3 flex items-center gap-2">
                    <motion.span
                      animate={copied ? { scale: [1, 0.95, 1] } : {}}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-black"
                    >
                      <Copy className="h-3 w-3" />
                      Copier
                    </motion.span>
                    <AnimatePresence>
                      {copied && (
                        <motion.span
                          initial={{ opacity: 0, x: -6 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0 }}
                          className="text-xs font-medium text-emerald-400"
                        >
                          ✓ Copié !
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
