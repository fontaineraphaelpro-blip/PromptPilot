"use client";

import {
  getCheckoutApiUrl,
  getInstantPaymentLinkUrl,
} from "@/lib/stripe-checkout-url";

type CheckoutSession = {
  user: { id: string; email?: string | null };
};

/** Navigation immédiate vers Stripe — sans fetch bloquant côté client. */
export function startCheckout(
  plan: "pro" | "creator",
  session: CheckoutSession | null,
  onUnauthenticated: () => void,
  interval: "monthly" | "yearly" = "monthly"
): void {
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
