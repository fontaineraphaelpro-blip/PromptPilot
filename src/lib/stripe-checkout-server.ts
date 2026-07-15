import type { AuthUser } from "@/lib/auth";
import { getAppUrl } from "@/lib/env";
import { prisma } from "@/lib/db";
import type { PaidPlan } from "@/lib/plans";
import {
  buildPaymentLinkUrl,
  getPlanCheckoutRef,
  getStripe,
} from "@/lib/stripe";
import type { OneShotProductId } from "@/lib/commerce-products";
import { getOneShotLineItem } from "@/lib/stripe-oneshot";

export async function createCheckoutUrl(
  user: AuthUser,
  plan: PaidPlan,
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

export async function createOneShotCheckoutUrl(
  user: AuthUser,
  product: OneShotProductId,
  promptId?: string
): Promise<string> {
  const stripe = getStripe();
  const appUrl = getAppUrl();

  const profile = await prisma.profile.findUnique({
    where: { userId: user.id },
    select: { stripeCustomerId: true },
  });

  const successPath =
    product === "expert_unlock" && promptId
      ? `/history/${promptId}?checkout=expert_unlocked`
      : product === "workflow_pack"
        ? "/workflows?checkout=workflow_unlocked"
        : "/dashboard?checkout=credits";

  // price_data = pas besoin de créer de produit dans le Dashboard Stripe
  // metadata.oneshot_product = source de vérité pour le webhook
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    line_items: [getOneShotLineItem(product)],
    success_url: `${appUrl}${successPath}`,
    cancel_url: `${appUrl}/pricing?checkout=cancelled`,
    metadata: {
      user_id: user.id,
      oneshot_product: product,
      ...(promptId ? { prompt_id: promptId } : {}),
    },
    payment_intent_data: {
      metadata: {
        user_id: user.id,
        oneshot_product: product,
        ...(promptId ? { prompt_id: promptId } : {}),
      },
    },
    client_reference_id: `${user.id}:oneshot:${product}`,
    ...(profile?.stripeCustomerId
      ? { customer: profile.stripeCustomerId }
      : { customer_email: user.email }),
  });

  if (!session.url) {
    throw new Error("Stripe n'a pas renvoyé d'URL de checkout");
  }

  return session.url;
}
