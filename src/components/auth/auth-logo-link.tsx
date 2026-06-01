"use client";

import { Sparkles } from "lucide-react";
import { APP_NAME } from "@/lib/constants";
import { ScrollLink } from "@/components/navigation/scroll-link";

export function AuthLogoLink() {
  return (
    <ScrollLink
      section="funnel"
      className="relative z-10 mb-8 flex items-center gap-2.5 font-semibold group"
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-black transition-transform group-hover:scale-105">
        <Sparkles className="h-4 w-4" />
      </span>
      {APP_NAME}
    </ScrollLink>
  );
}
