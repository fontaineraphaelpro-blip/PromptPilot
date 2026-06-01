import { NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth";
import { getAppUrl } from "@/lib/env";
import { stripeConfigErrorMessage } from "@/lib/stripe";
import { createCheckoutUrl } from "@/lib/stripe-checkout-server";

function isValidPlan(plan: unknown): plan is "pro" | "creator" {
  return plan === "pro" || plan === "creator";
}

function loginRedirect(plan: "pro" | "creator") {
  return NextResponse.redirect(
    new URL(`/login?redirect=/pricing&plan=${plan}`, getAppUrl())
  );
}

function pricingErrorRedirect() {
  return NextResponse.redirect(
    new URL("/pricing?checkout=error", getAppUrl())
  );
}

async function handleCheckout(plan: "pro" | "creator") {
  const user = await getAuthUser();

  if (!user) {
    return loginRedirect(plan);
  }

  try {
    const url = await createCheckoutUrl(user, plan);
    return NextResponse.redirect(url);
  } catch (error) {
    console.error("Checkout error:", error);
    return pricingErrorRedirect();
  }
}

/** Redirection directe vers Stripe — le navigateur part immédiatement au clic. */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const plan = searchParams.get("plan");

  if (!isValidPlan(plan)) {
    return pricingErrorRedirect();
  }

  return handleCheckout(plan);
}

export async function POST(request: Request) {
  try {
    const { plan } = await request.json();

    if (!isValidPlan(plan)) {
      return NextResponse.json({ error: "Plan invalide" }, { status: 400 });
    }

    const user = await getAuthUser();

    if (!user) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
    }

    const url = await createCheckoutUrl(user, plan);
    return NextResponse.json({ url });
  } catch (error) {
    console.error("Checkout error:", error);
    const configMessage = stripeConfigErrorMessage(error);
    return NextResponse.json(
      {
        error: configMessage ?? "Erreur checkout",
        message: configMessage,
      },
      { status: configMessage ? 503 : 500 }
    );
  }
}
