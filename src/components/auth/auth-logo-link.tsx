"use client";

import { APP_NAME } from "@/lib/constants";
import { BrandMark } from "@/components/brand/brand-mark";
import { ScrollLink } from "@/components/navigation/scroll-link";

export function AuthLogoLink() {
  return (
    <ScrollLink
      section="funnel"
      className="relative z-10 mb-8 flex items-center gap-2.5 font-semibold group"
    >
      <BrandMark className="h-9 w-9" />
      {APP_NAME}
    </ScrollLink>
  );
}
