"use client";

import type { PaidPlan } from "@/lib/plans";
import { planFromCheckoutQuery } from "@/lib/plans";
import {
  getCheckoutApiUrl,
  getInstantPaymentLinkUrl,
} from "@/lib/stripe-checkout-url";

type CheckoutSession = {
  user: { id: string; email?: string | null };
};

/** Navigation immédiate vers Stripe — sans fetch bloquant côté client. */
export function startCheckout(
  planInput: PaidPlan | "pro",
  session: CheckoutSession | null,
  onUnauthenticated: () => void,
  interval: "monthly" | "yearly" = "monthly"
): void {
  const plan = planFromCheckoutQuery(planInput);
  if (!plan) return;

  if (!session?.user?.id) {
    onUnauthenticated();
    return;
  }

  const instant = getInstantPaymentLinkUrl(
    plan,
    session.user.id,
    session.user.email
  );

  window.location.assign(instant ?? getCheckoutApiUrl(plan, interval));
}

/** Checkout one-shot (crédits, Expert, workflows). */
export async function startOneShotCheckout(
  product: string,
  opts?: { promptId?: string }
): Promise<void> {
  const res = await fetch("/api/stripe/checkout-oneshot", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ product, promptId: opts?.promptId }),
  });
  const data = (await res.json()) as { url?: string; error?: string; message?: string };
  if (!res.ok || !data.url) {
    throw new Error(data.message || data.error || "Impossible de lancer le paiement");
  }
  window.location.assign(data.url);
}
