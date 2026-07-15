import { toast } from "sonner";
import type { PaidPlan } from "@/lib/plans";
import { PLAN_LABELS, PLAN_PRICES, planFromCheckoutQuery } from "@/lib/plans";

type UpgradePlan = PaidPlan | "pro";

export function toastUpgradeRequired(
  message: string,
  planInput: UpgradePlan = "plus"
) {
  const plan = planFromCheckoutQuery(planInput) ?? "plus";
  const label = PLAN_LABELS[plan];
  const price = PLAN_PRICES[plan].label;

  toast.error(message, {
    duration: 8000,
    action: {
      label: `${label} — ${price}`,
      onClick: () => {
        window.location.href = `/pricing?plan=${plan === "plus" ? "pro" : plan}`;
      },
    },
  });
}
