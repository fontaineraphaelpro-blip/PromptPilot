import { Suspense } from "react";
import { ResetPasswordForm } from "@/components/auth/reset-password-form";

export default function ResetPasswordPage() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4 py-12">
      <Suspense fallback={<div className="h-96 w-full max-w-md animate-pulse bg-muted rounded-xl" />}>
        <ResetPasswordForm />
      </Suspense>
    </div>
  );
}
