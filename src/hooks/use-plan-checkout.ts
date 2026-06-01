"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { startCheckout } from "@/lib/start-checkout";
import { isPaymentsLive } from "@/lib/sales-mode";

export function usePlanCheckout(billingInterval: "monthly" | "yearly" = "monthly") {
  const router = useRouter();
  const { data: session, status } = useSession();

  const handleCheckout = useCallback(
    (plan: "pro" | "creator") => {
      if (status === "loading") return;

      if (!isPaymentsLive()) {
        toast.error("Paiements en cours de configuration. Réessayez dans quelques minutes.");
        router.push("/pricing");
        return;
      }

      startCheckout(
        plan,
        session,
        () => {
          toast.info("Connectez-vous pour vous abonner");
          router.push(`/login?redirect=/pricing&plan=${plan}`);
        },
        billingInterval
      );
    },
    [session, status, router, billingInterval]
  );

  return {
    handleCheckout,
    sessionLoading: status === "loading",
  };
}
