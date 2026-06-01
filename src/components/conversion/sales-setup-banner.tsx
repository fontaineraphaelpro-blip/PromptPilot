import Link from "next/link";
import { isPaymentsLive } from "@/lib/sales-mode";

/** Alerte admin si Stripe public non configuré (upgrade dashboard). */
export function SalesSetupBanner() {
  if (isPaymentsLive()) return null;

  return (
    <div className="border-b border-amber-500/30 bg-amber-500/15 px-4 py-2 text-center text-xs sm:text-sm text-amber-100">
      Configure{" "}
      <code className="rounded bg-black/30 px-1">NEXT_PUBLIC_STRIPE_PRO_PRICE_ID</code> sur Railway
      pour activer le checkout.{" "}
      <Link href="/pricing" className="underline font-medium">
        Page tarifs
      </Link>
    </div>
  );
}
