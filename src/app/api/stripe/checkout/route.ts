import { NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth";
import { getStripe, getPriceIdForPlan } from "@/lib/stripe";
import { getOrCreateProfile, updateProfileByUserId } from "@/lib/profile";
import { getAppUrl } from "@/lib/env";

export async function POST(request: Request) {
  try {
    const { plan } = await request.json();

    if (plan !== "pro" && plan !== "creator") {
      return NextResponse.json({ error: "Plan invalide" }, { status: 400 });
    }

    const user = await getAuthUser();

    if (!user) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
    }

    const profile = await getOrCreateProfile(user.id, user.email ?? "");
    const stripe = getStripe();
    const appUrl = getAppUrl();

    let customerId = profile.stripe_customer_id;

    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        metadata: { user_id: user.id },
      });
      customerId = customer.id;
      await updateProfileByUserId(user.id, { stripeCustomerId: customerId });
    }

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [{ price: getPriceIdForPlan(plan), quantity: 1 }],
      success_url: `${appUrl}/dashboard?checkout=success`,
      cancel_url: `${appUrl}/pricing?checkout=cancelled`,
      metadata: { user_id: user.id, plan },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json({ error: "Erreur checkout" }, { status: 500 });
  }
}
