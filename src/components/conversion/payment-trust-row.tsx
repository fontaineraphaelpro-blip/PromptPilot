import { CreditCard, RefreshCw, Shield } from "lucide-react";
export function PaymentTrustRow({ className = "" }: { className?: string }) {

  const items = [
    { icon: CreditCard, text: "Paiement sécurisé Stripe" },
    { icon: RefreshCw, text: "Annulation en 1 clic" },
    { icon: Shield, text: "Sans engagement long terme" },
  ] as const;

  return (
    <ul
      className={`mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs text-muted-foreground ${className}`}
    >
      {items.map(({ icon: Icon, text }) => (
        <li key={text} className="inline-flex items-center gap-2">
          <Icon className="h-3.5 w-3.5 shrink-0 text-foreground/70" />
          {text}
        </li>
      ))}
    </ul>
  );
}
