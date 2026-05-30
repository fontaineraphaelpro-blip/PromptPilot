import { NextResponse } from "next/server";
import { headers } from "next/headers";
import Stripe from "stripe";
import { getStripe, planFromPriceId, parseClientReferenceId } from "@/lib/stripe";
import {
  updateProfileByStripeCustomerId,
  updateProfileByUserId,
} from "@/lib/profile";
import type { Plan } from "@/lib/constants";

async function resolvePlanFromSession(
  stripe: Stripe,
  session: Stripe.Checkout.Session,
  fallbackPlan?: Plan
): Promise<Plan> {
  if (fallbackPlan && fallbackPlan !== "free") return fallbackPlan;

  if (session.subscription) {
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string
    );
    const priceId = subscription.items.data[0]?.price.id;
    const fromPrice = planFromPriceId(priceId ?? "");
    if (fromPrice !== "free") return fromPrice;
  }

  return fallbackPlan ?? "free";
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
      let plan = (session.metadata?.plan as Plan | undefined) ?? fromRef?.plan;

      if (userId) {
        plan = await resolvePlanFromSession(stripe, session, plan);

        if (plan && plan !== "free") {
          await updateProfileByUserId(userId, {
            plan,
            stripeCustomerId:
              typeof session.customer === "string" ? session.customer : undefined,
            stripeSubscriptionId:
              typeof session.subscription === "string"
                ? session.subscription
                : undefined,
          });
        }
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
