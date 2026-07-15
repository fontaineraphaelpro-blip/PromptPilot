import { NextResponse } from "next/server";
import { z } from "zod";
import { getAuthUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { stripeConfigErrorMessage } from "@/lib/stripe";
import { createOneShotCheckoutUrl } from "@/lib/stripe-checkout-server";
import { isOneShotProductId } from "@/lib/stripe-oneshot";

const bodySchema = z.object({
  product: z.string(),
  promptId: z.string().uuid().optional(),
});

export async function POST(request: Request) {
  try {
    const user = await getAuthUser();
    if (!user) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
    }

    const parsed = bodySchema.safeParse(await request.json());
    if (!parsed.success || !isOneShotProductId(parsed.data.product)) {
      return NextResponse.json({ error: "Produit invalide" }, { status: 400 });
    }

    const { product, promptId } = parsed.data;

    if (product === "expert_unlock") {
      if (!promptId) {
        return NextResponse.json(
          { error: "promptId requis pour débloquer Expert" },
          { status: 400 }
        );
      }
      const prompt = await prisma.prompt.findFirst({
        where: { id: promptId, userId: user.id },
        select: { id: true, expertUnlocked: true },
      });
      if (!prompt) {
        return NextResponse.json({ error: "Prompt introuvable" }, { status: 404 });
      }
      if (prompt.expertUnlocked) {
        return NextResponse.json(
          { error: "Expert déjà débloqué pour ce prompt" },
          { status: 400 }
        );
      }
    }

    const url = await createOneShotCheckoutUrl(user, product, promptId);
    return NextResponse.json({ url });
  } catch (error) {
    console.error("One-shot checkout error:", error);
    const configMessage = stripeConfigErrorMessage(error);
    const message =
      configMessage ??
      (error instanceof Error ? error.message : "Erreur checkout");
    return NextResponse.json(
      { error: message, message },
      { status: configMessage ? 503 : 500 }
    );
  }
}
