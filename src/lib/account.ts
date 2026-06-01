import { prisma } from "@/lib/db";
import { getStripe } from "@/lib/stripe";

export async function deleteUserAccount(userId: string): Promise<void> {
  const profile = await prisma.profile.findUnique({
    where: { userId },
    select: { stripeSubscriptionId: true },
  });

  if (profile?.stripeSubscriptionId && process.env.STRIPE_SECRET_KEY?.trim()) {
    try {
      const stripe = getStripe();
      await stripe.subscriptions.cancel(profile.stripeSubscriptionId);
    } catch (error) {
      console.error("[account] Stripe cancel failed:", error);
    }
  }

  await prisma.$transaction([
    prisma.prompt.deleteMany({ where: { userId } }),
    prisma.dailyUsage.deleteMany({ where: { userId } }),
    prisma.passwordResetToken.deleteMany({ where: { userId } }),
    prisma.profile.deleteMany({ where: { userId } }),
    prisma.user.delete({ where: { id: userId } }),
  ]);
}
