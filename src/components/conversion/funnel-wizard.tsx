"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { TARGET_AIS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  ArrowLeft,
  Check,
  Lock,
  Sparkles,
  Wand2,
} from "lucide-react";
import { buildTeaserPrompt, saveFunnelDraft } from "@/lib/conversion/funnel-storage";

const POPULAR_AIS = ["ChatGPT", "Claude", "Cursor", "Midjourney", "Sora", "Lovable"] as const;

const IDEA_EXAMPLES = [
  "Une app fitness avec suivi calories",
  "Campagne LinkedIn pour mon SaaS",
  "Logo minimaliste startup IA",
];

const STEPS = ["Ton idée", "Ton IA", "Ton prompt"];

export function FunnelWizard() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [idea, setIdea] = useState("");
  const [targetAi, setTargetAi] = useState<string>("Cursor");
  const [generating, setGenerating] = useState(false);
  const [typedLines, setTypedLines] = useState(0);
  const [teaser, setTeaser] = useState("");

  const canNextStep0 = idea.trim().length >= 8;
  const canNextStep1 = !!targetAi;

  useEffect(() => {
    if (step !== 2 || !generating) return;
    const full = buildTeaserPrompt(idea, targetAi);
    setTeaser(full);
    const lines = full.split("\n").length;
    setTypedLines(0);
    const interval = setInterval(() => {
      setTypedLines((n) => {
        if (n >= lines) {
          clearInterval(interval);
          setGenerating(false);
          return n;
        }
        return n + 1;
      });
    }, 120);
    return () => clearInterval(interval);
  }, [step, generating, idea, targetAi]);

  function goToPreview() {
    setStep(2);
    setGenerating(true);
  }

  function handleUnlock() {
    const prompt = buildTeaserPrompt(idea, targetAi);
    saveFunnelDraft({ idea: idea.trim(), targetAi, teaserPrompt: prompt });
    router.push("/signup?from=funnel");
  }

  const visibleTeaser = teaser
    .split("\n")
    .slice(0, typedLines)
    .join("\n");

  return (
    <section id="funnel" className="relative px-4 py-16 sm:px-6 sm:py-20 scroll-mt-24">
      <div className="absolute inset-0 bg-gradient-radial-top opacity-40 pointer-events-none" />
      <div className="relative mx-auto max-w-3xl">
        <div className="text-center mb-10">
          <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-3">
            Parcours guidé — 30 secondes
          </p>
          <h2 className="text-2xl font-bold sm:text-4xl tracking-tight">
            Crée ton premier prompt{" "}
            <span className="gradient-text">maintenant</span>
          </h2>
        </div>

        {/* Progress */}
        <div className="flex items-center justify-center gap-2 sm:gap-4 mb-10">
          {STEPS.map((label, i) => (
            <div key={label} className="flex items-center gap-2">
              <div
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-all",
                  i < step
                    ? "bg-white text-black"
                    : i === step
                      ? "bg-white text-black ring-4 ring-white/20"
                      : "bg-white/10 text-muted-foreground"
                )}
              >
                {i < step ? <Check className="h-4 w-4" /> : i + 1}
              </div>
              <span
                className={cn(
                  "text-xs sm:text-sm hidden sm:inline",
                  i === step ? "text-foreground font-medium" : "text-muted-foreground"
                )}
              >
                {label}
              </span>
              {i < STEPS.length - 1 && (
                <div
                  className={cn(
                    "w-6 sm:w-12 h-px",
                    i < step ? "bg-white" : "bg-white/20"
                  )}
                />
              )}
            </div>
          ))}
        </div>

        <div className="glass-card rounded-2xl p-6 sm:p-10 min-h-[320px]">
          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div
                key="step0"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div>
                  <label className="text-sm font-medium">
                    Étape 1 — Quelle est ton idée ? <span className="text-muted-foreground">(1 phrase)</span>
                  </label>
                  <Textarea
                    value={idea}
                    onChange={(e) => setIdea(e.target.value)}
                    placeholder="Ex : Je veux une landing page pour mon SaaS de prompts IA..."
                    className="mt-3 min-h-[120px] text-base border-white/15 bg-black/40"
                    autoFocus
                  />
                </div>
                <p className="text-xs text-muted-foreground">Inspire-toi :</p>
                <div className="flex flex-wrap gap-2">
                  {IDEA_EXAMPLES.map((ex) => (
                    <button
                      key={ex}
                      type="button"
                      onClick={() => setIdea(ex)}
                      className="rounded-full border border-white/10 px-3 py-1.5 text-xs hover:bg-white/5 transition-colors"
                    >
                      {ex}
                    </button>
                  ))}
                </div>
                <Button
                  size="lg"
                  className="w-full group"
                  disabled={!canNextStep0}
                  onClick={() => setStep(1)}
                >
                  Continuer — choisir mon IA
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
            )}

            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div>
                  <p className="text-sm font-medium">
                    Étape 2 — Pour quelle IA optimiser le prompt ?
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Ton idée : <em className="text-foreground/80">&quot;{idea.slice(0, 60)}{idea.length > 60 ? "…" : ""}&quot;</em>
                  </p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {POPULAR_AIS.map((ai) => (
                    <button
                      key={ai}
                      type="button"
                      onClick={() => setTargetAi(ai)}
                      className={cn(
                        "rounded-xl border px-4 py-3 text-sm font-medium transition-all",
                        targetAi === ai
                          ? "border-white bg-white text-black"
                          : "border-white/10 hover:border-white/30"
                      )}
                    >
                      {ai}
                    </button>
                  ))}
                </div>
                <details className="text-xs text-muted-foreground">
                  <summary className="cursor-pointer hover:text-foreground">
                    Autres IA ({TARGET_AIS.length - POPULAR_AIS.length}+)
                  </summary>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {TARGET_AIS.filter((a) => !(POPULAR_AIS as readonly string[]).includes(a)).map(
                      (ai) => (
                        <button
                          key={ai}
                          type="button"
                          onClick={() => setTargetAi(ai)}
                          className={cn(
                            "rounded-full border px-3 py-1 text-xs",
                            targetAi === ai ? "border-white bg-white/10" : "border-white/10"
                          )}
                        >
                          {ai}
                        </button>
                      )
                    )}
                  </div>
                </details>
                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => setStep(0)}>
                    <ArrowLeft className="h-4 w-4" />
                    Retour
                  </Button>
                  <Button
                    size="lg"
                    className="flex-1 group"
                    disabled={!canNextStep1}
                    onClick={goToPreview}
                  >
                    <Wand2 className="h-4 w-4" />
                    Générer mon aperçu
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-2 text-sm">
                  {generating ? (
                    <>
                      <Sparkles className="h-4 w-4 animate-pulse" />
                      <span className="text-muted-foreground">
                        Prompt expert en cours pour <strong className="text-foreground">{targetAi}</strong>…
                      </span>
                    </>
                  ) : (
                    <>
                      <Check className="h-4 w-4 text-foreground" />
                      <span className="font-medium">Ton prompt est prêt — débloque-le gratuitement</span>
                    </>
                  )}
                </div>

                <div className="relative rounded-xl border border-white/15 bg-black/60 overflow-hidden">
                  <pre className="p-4 text-xs sm:text-sm text-muted-foreground whitespace-pre-wrap font-mono leading-relaxed max-h-[220px] overflow-hidden">
                    {visibleTeaser || " "}
                  </pre>
                  {!generating && (
                    <div className="absolute inset-0 flex flex-col items-center justify-end bg-gradient-to-t from-black via-black/90 to-transparent pb-6 pt-16">
                      <Lock className="h-8 w-8 text-white/80 mb-3" />
                      <p className="text-sm font-semibold text-center px-4">
                        + variantes Expert, contraintes & checklist qualité
                      </p>
                      <p className="text-xs text-muted-foreground mt-1 text-center px-4">
                        Inscription gratuite — 3 prompts aujourd&apos;hui
                      </p>
                    </div>
                  )}
                </div>

                {!generating && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-3"
                  >
                    <Button size="lg" className="w-full group" onClick={handleUnlock}>
                      Débloquer mon prompt complet — gratuit
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                    <p className="text-center text-xs text-muted-foreground">
                      Déjà inscrit ?{" "}
                      <Link href="/login" className="text-foreground hover:underline">
                        Connexion
                      </Link>
                    </p>
                    <Button variant="ghost" size="sm" className="w-full" onClick={() => setStep(1)}>
                      Modifier mon IA
                    </Button>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
