import { Suspense } from "react";
import { AuthForm } from "@/components/auth/auth-form";

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="h-96 animate-pulse bg-muted rounded-xl max-w-md w-full" />}>
      <AuthForm mode="login" />
    </Suspense>
  );
}
