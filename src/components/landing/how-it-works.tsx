import { MessageSquare, Cpu, Copy } from "lucide-react";

const steps = [
  {
    icon: MessageSquare,
    title: "Décris ton idée",
    description: "Une phrase suffit. PromptPilot comprend ton intention.",
  },
  {
    icon: Cpu,
    title: "Choisis ton IA",
    description: "ChatGPT, Claude, Cursor, Midjourney, Sora… adapté à ton outil.",
  },
  {
    icon: Copy,
    title: "Copie ton prompt optimisé",
    description: "Prompt structuré, variantes incluses, prêt à coller.",
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center text-3xl font-bold">Comment ça marche</h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-muted-foreground">
          Trois étapes pour passer d&apos;une idée vague à un prompt expert.
        </p>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {steps.map((step, i) => (
            <div
              key={step.title}
              className="relative rounded-xl border border-border bg-card p-6 shadow-sm"
            >
              <span className="absolute -top-3 left-6 flex h-6 w-6 items-center justify-center rounded-full gradient-bg text-xs font-bold text-white">
                {i + 1}
              </span>
              <step.icon className="mb-4 h-10 w-10 text-primary" />
              <h3 className="font-semibold text-lg">{step.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
