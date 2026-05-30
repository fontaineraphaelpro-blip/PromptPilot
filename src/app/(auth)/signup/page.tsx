import { Suspense } from "react";
import { AuthForm } from "@/components/auth/auth-form";
import { SignupFunnelBanner } from "@/components/conversion/signup-funnel-banner";

export default function SignupPage() {
  return (
    <Suspense fallback={<div className="h-96 animate-pulse bg-muted rounded-xl max-w-md w-full" />}>
      <SignupFunnelBanner />
      <AuthForm mode="signup" />
    </Suspense>
  );
}
