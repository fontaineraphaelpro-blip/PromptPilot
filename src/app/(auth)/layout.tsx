import { GridBackground } from "@/components/landing/grid-background";
import { FomoStrip } from "@/components/conversion/fomo-strip";
import { AuthLogoLink } from "@/components/auth/auth-logo-link";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 py-12 overflow-hidden">
      <GridBackground />
      <div className="relative z-20 w-full max-w-md mb-4">
        <FomoStrip />
      </div>
      <AuthLogoLink />
      <div className="relative z-10 w-full">{children}</div>
    </div>
  );
}
