import { toast } from "sonner";

type UpgradePlan = "pro" | "creator";

export function toastUpgradeRequired(message: string, plan: UpgradePlan = "pro") {
  toast.error(message, {
    duration: 8000,
    action: {
      label: plan === "creator" ? "Débloquer Creator — 19€" : "Pro illimité — 9€",
      onClick: () => {
        window.location.href = `/pricing?plan=${plan}`;
      },
    },
  });
}
