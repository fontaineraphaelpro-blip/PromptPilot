"use client";

/**
 * Démo produit en boucle (~16s) — 100 % CSS, sans fichier vidéo.
 * Parcours : idée → IA → génération → score → copier
 */
export function DemoProductAnimation() {
  return (
    <div
      className="demo-showcase relative mx-auto max-w-2xl"
      role="img"
      aria-label="Animation : idée transformée en prompt scoré puis copié"
    >
      <div className="demo-showcase__glow pointer-events-none absolute -inset-8 rounded-3xl bg-gradient-radial-top opacity-60" />
      <div className="demo-showcase__frame glass-card relative overflow-hidden rounded-2xl border border-white/12 bg-black/80 aspect-[16/10] min-h-[280px] sm:min-h-[320px]">
        <div className="demo-showcase__chrome flex items-center gap-2 border-b border-white/8 px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
          <span className="ml-2 text-[10px] font-mono text-muted-foreground tracking-wide">
            promptexpert.app — démo
          </span>
        </div>

        <div className="demo-showcase__steps flex justify-center gap-1.5 px-4 pt-3">
          {["Idée", "IA", "Génération", "Résultat"].map((label, i) => (
            <div key={label} className="flex items-center gap-1.5">
              <span
                className={`demo-showcase__dot demo-showcase__dot--${i + 1} flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold border border-white/15 bg-white/5`}
              >
                {i + 1}
              </span>
              <span
                className={`demo-showcase__label demo-showcase__label--${i + 1} hidden text-[10px] text-muted-foreground sm:inline`}
              >
                {label}
              </span>
              {i < 3 && (
                <span
                  className={`demo-showcase__connector demo-showcase__connector--${i + 1} mx-0.5 h-px w-4 sm:w-8 bg-white/15`}
                />
              )}
            </div>
          ))}
        </div>

        <div className="relative flex-1 p-4 sm:p-6 min-h-[200px]">
          {/* Scène 1 — Idée */}
          <div className="demo-showcase__scene demo-showcase__scene--1 absolute inset-x-4 sm:inset-x-6 top-14 sm:top-16 bottom-4">
            <p className="text-xs font-medium text-muted-foreground mb-2">Ton idée</p>
            <div className="rounded-lg border border-white/12 bg-black/50 p-3 min-h-[72px]">
              <p className="demo-showcase__typed text-sm leading-relaxed font-mono text-foreground/90">
                Une landing SaaS B2B pour vendre des prompts IA
              </p>
              <span className="demo-showcase__caret inline-block w-0.5 h-4 bg-white align-middle ml-0.5" />
            </div>
            <div className="demo-showcase__cta-idea mt-4 inline-flex items-center justify-center rounded-lg bg-white px-4 py-2 text-xs font-semibold text-black">
              Continuer →
            </div>
          </div>

          {/* Scène 2 — Choix IA */}
          <div className="demo-showcase__scene demo-showcase__scene--2 absolute inset-x-4 sm:inset-x-6 top-14 sm:top-16 bottom-4">
            <p className="text-xs font-medium text-muted-foreground mb-3">Pour quelle IA ?</p>
            <div className="grid grid-cols-3 gap-2">
              {["ChatGPT", "Claude", "Cursor"].map((name) => (
                <div
                  key={name}
                  className={`demo-showcase__ai-chip demo-showcase__ai-chip--${name.toLowerCase()} rounded-lg border px-2 py-2.5 text-center text-[11px] font-medium border-white/10 bg-white/[0.03]`}
                >
                  {name}
                </div>
              ))}
            </div>
          </div>

          {/* Scène 3 — Génération */}
          <div className="demo-showcase__scene demo-showcase__scene--3 absolute inset-0 flex flex-col items-center justify-center gap-4">
            <div className="demo-showcase__spinner h-10 w-10 rounded-full border-2 border-white/15 border-t-white" />
            <p className="text-sm font-medium">Génération du prompt expert…</p>
            <div className="w-48 h-1.5 rounded-full bg-white/10 overflow-hidden">
              <div className="demo-showcase__progress h-full rounded-full bg-white" />
            </div>
          </div>

          {/* Scène 4 — Résultat */}
          <div className="demo-showcase__scene demo-showcase__scene--4 absolute inset-x-4 sm:inset-x-6 top-12 sm:top-14 bottom-4 flex flex-col sm:flex-row gap-4">
            <div className="flex shrink-0 flex-col items-center justify-center sm:w-28">
              <div className="demo-showcase__score-ring relative h-20 w-20 sm:h-24 sm:w-24">
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
                    className="demo-showcase__score-arc"
                    cx="50"
                    cy="50"
                    r="42"
                    fill="none"
                    stroke="white"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray="264"
                    strokeDashoffset="264"
                  />
                </svg>
                <span className="demo-showcase__score-num absolute inset-0 flex items-center justify-center text-xl font-bold">
                  92
                </span>
              </div>
              <span className="mt-1 text-[10px] text-emerald-400/90 font-medium">Excellent</span>
            </div>
            <div className="flex-1 min-w-0 flex flex-col">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1.5">
                Prompt optimisé
              </p>
              <div className="demo-showcase__prompt-lines flex-1 rounded-lg border border-white/10 bg-black/40 p-2.5 space-y-1.5 overflow-hidden">
                <div className="h-2 rounded bg-white/25 w-full demo-showcase__line demo-showcase__line--1" />
                <div className="h-2 rounded bg-white/15 w-[92%] demo-showcase__line demo-showcase__line--2" />
                <div className="h-2 rounded bg-white/10 w-[78%] demo-showcase__line demo-showcase__line--3" />
                <div className="h-2 rounded bg-white/10 w-[85%] demo-showcase__line demo-showcase__line--4" />
              </div>
              <div className="mt-3 flex items-center gap-2">
                <span className="demo-showcase__copy-btn inline-flex items-center gap-1.5 rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-black">
                  <CopyIcon />
                  Copier
                </span>
                <span className="demo-showcase__copied text-xs font-medium text-emerald-400 opacity-0">
                  ✓ Copié !
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CopyIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="9" y="9" width="11" height="11" rx="2" stroke="currentColor" strokeWidth="2" />
      <path
        d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}
