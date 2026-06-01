import type { AuthUser } from "@/lib/auth";
import { getAppUrl } from "@/lib/env";
import { prisma } from "@/lib/db";
import {
  buildPaymentLinkUrl,
  getPlanCheckoutRef,
  getStripe,
} from "@/lib/stripe";

export async function createCheckoutUrl(
  user: AuthUser,
  plan: "pro" | "creator",
  interval: "monthly" | "yearly" = "monthly"
): Promise<string> {
  const checkoutRef = getPlanCheckoutRef(plan, interval);

  if (checkoutRef.type === "payment_link") {
    return buildPaymentLinkUrl(
      checkoutRef.value,
      user.id,
      plan,
      user.email
    );
  }

  const stripe = getStripe();
  const appUrl = getAppUrl();

  const profile = await prisma.profile.findUnique({
    where: { userId: user.id },
    select: { stripeCustomerId: true },
  });

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [{ price: checkoutRef.value, quantity: 1 }],
    success_url: `${appUrl}/dashboard?checkout=success`,
    cancel_url: `${appUrl}/pricing?checkout=cancelled`,
    metadata: { user_id: user.id, plan },
    client_reference_id: `${user.id}:${plan}`,
    ...(profile?.stripeCustomerId
      ? { customer: profile.stripeCustomerId }
      : { customer_email: user.email }),
  });

  if (!session.url) {
    throw new Error("Stripe n'a pas renvoyé d'URL de checkout");
  }

  return session.url;
}
