import { GridBackground } from "@/components/landing/grid-background";
import { AuthLogoLink } from "@/components/auth/auth-logo-link";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 py-12 overflow-hidden">
      <GridBackground />
      <AuthLogoLink />
      <div className="relative z-10 w-full">{children}</div>
    </div>
  );
}
