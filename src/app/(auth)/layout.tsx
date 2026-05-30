import Link from "next/link";
import { APP_NAME } from "@/lib/constants";
import { Sparkles } from "lucide-react";
import { GridBackground } from "@/components/landing/grid-background";
import { FomoStrip } from "@/components/conversion/fomo-strip";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 py-12 overflow-hidden">
      <GridBackground />
      <div className="relative z-20 w-full max-w-md mb-4">
        <FomoStrip />
      </div>
      <Link
        href="/#funnel"
        className="relative z-10 mb-8 flex items-center gap-2.5 font-semibold group"
      >
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-black transition-transform group-hover:scale-105">
          <Sparkles className="h-4 w-4" />
        </span>
        {APP_NAME}
      </Link>
      <div className="relative z-10 w-full">{children}</div>
    </div>
  );
}
