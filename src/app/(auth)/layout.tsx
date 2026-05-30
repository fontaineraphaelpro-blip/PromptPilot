import Link from "next/link";
import { APP_NAME } from "@/lib/constants";
import { Sparkles } from "lucide-react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 hero-glow">
      <Link href="/" className="mb-8 flex items-center gap-2 font-semibold">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg gradient-bg text-white">
          <Sparkles className="h-4 w-4" />
        </span>
        {APP_NAME}
      </Link>
      {children}
    </div>
  );
}
