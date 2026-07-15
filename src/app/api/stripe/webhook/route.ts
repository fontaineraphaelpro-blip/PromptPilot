import { NextResponse } from "next/server";
import { headers } from "next/headers";
import Stripe from "stripe";
import { getStripe, planFromPriceId, parseClientReferenceId } from "@/lib/stripe";
import {
  updateProfileByStripeCustomerId,
  updateProfileByUserId,
} from "@/lib/profile";
import type { Plan } from "@/lib/constants";
import { normalizePlan } from "@/lib/plans";
import { prisma } from "@/lib/db";
import { addPromptCredits } from "@/lib/usage";
import {
  creditsForProduct,
  isCreditPackProduct,
  isOneShotProductId,
  oneShotProductFromPriceId,
} from "@/lib/stripe-oneshot";
import type { OneShotProductId } from "@/lib/commerce-products";

async function resolvePlanFromSession(
  stripe: Stripe,
  session: Stripe.Checkout.Session,
  fallbackPlan?: Plan
): Promise<Plan> {
  if (fallbackPlan && fallbackPlan !== "free") return normalizePlan(fallbackPlan);

  if (session.subscription) {
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string
    );
    const priceId = subscription.items.data[0]?.price.id;
    const fromPrice = planFromPriceId(priceId ?? "");
    if (fromPrice !== "free") return fromPrice;
  }

  return fallbackPlan ? normalizePlan(fallbackPlan) : "free";
}

async function fulfillOneShot(
  userId: string,
  product: OneShotProductId,
  promptId?: string | null
): Promise<void> {
  if (isCreditPackProduct(product)) {
    await addPromptCredits(userId, creditsForProduct(product));
    return;
  }

  if (product === "expert_unlock" && promptId) {
    await prisma.prompt.updateMany({
      where: { id: promptId, userId },
      data: { expertUnlocked: true },
    });
    return;
  }

  if (product === "workflow_pack") {
    await updateProfileByUserId(userId, { workflowUnlocked: true });
  }
}

async function resolveOneShotFromSession(
  stripe: Stripe,
  session: Stripe.Checkout.Session
): Promise<{ product: OneShotProductId; promptId?: string } | null> {
  const metaProduct = session.metadata?.oneshot_product;
  if (metaProduct && isOneShotProductId(metaProduct)) {
    return {
      product: metaProduct,
      promptId: session.metadata?.prompt_id,
    };
  }

  // Payment mode — resolve from line items price
  if (session.mode === "payment" && session.id) {
    try {
      const full = await stripe.checkout.sessions.retrieve(session.id, {
        expand: ["line_items"],
      });
      const priceId = full.line_items?.data[0]?.price?.id;
      if (priceId) {
        const product = oneShotProductFromPriceId(priceId);
        if (product) {
          return {
            product,
            promptId: session.metadata?.prompt_id,
          };
        }
      }
    } catch (err) {
      console.error("Failed to expand checkout session for oneshot:", err);
    }
  }

  return null;
}

export async function POST(request: Request) {
  const body = await request.text();
  const headersList = await headers();
  const signature = headersList.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  const stripe = getStripe();
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("Webhook signature error:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const fromRef = parseClientReferenceId(session.client_reference_id);
      const userId = session.metadata?.user_id ?? fromRef?.userId;

      if (!userId) break;

      const customerId =
        typeof session.customer === "string" ? session.customer : undefined;

      // One-shot payments
      if (session.mode === "payment") {
        const oneshot = await resolveOneShotFromSession(stripe, session);
        if (oneshot) {
          if (customerId) {
            await updateProfileByUserId(userId, { stripeCustomerId: customerId });
          }
          await fulfillOneShot(userId, oneshot.product, oneshot.promptId);
          break;
        }
      }

      // Subscriptions
      let plan =
        (session.metadata?.plan
          ? normalizePlan(session.metadata.plan)
          : undefined) ?? fromRef?.plan;

      plan = await resolvePlanFromSession(stripe, session, plan);

      if (plan && plan !== "free") {
        await updateProfileByUserId(userId, {
          plan,
          stripeCustomerId: customerId,
          stripeSubscriptionId:
            typeof session.subscription === "string"
              ? session.subscription
              : undefined,
        });
      }
      break;
    }

    case "customer.subscription.updated": {
      const subscription = event.data.object as Stripe.Subscription;
      const customerId = subscription.customer as string;
      const priceId = subscription.items.data[0]?.price.id;
      const plan: Plan =
        subscription.status === "active"
          ? planFromPriceId(priceId ?? "")
          : "free";

      await updateProfileByStripeCustomerId(customerId, {
        plan,
        stripeSubscriptionId: subscription.id,
      });
      break;
    }

    case "customer.subscription.deleted": {
      const subscription = event.data.object as Stripe.Subscription;
      const customerId = subscription.customer as string;

      await updateProfileByStripeCustomerId(customerId, {
        plan: "free",
        stripeSubscriptionId: null,
      });
      break;
    }
  }

  return NextResponse.json({ received: true });
}
