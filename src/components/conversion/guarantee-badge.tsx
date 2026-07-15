import { ShieldCheck } from "lucide-react";

export function GuaranteeBadge({ className = "" }: { className?: string }) {
  return (
    <p
      className={`inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-xs sm:text-sm text-emerald-100/90 ${className}`}
    >
      <ShieldCheck className="h-4 w-4 shrink-0 text-emerald-400" />
      Garantie qualité : score &lt; 70 → regen offerte · annulation 1 clic
    </p>
  );
}
