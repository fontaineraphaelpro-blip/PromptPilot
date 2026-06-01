"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { ComponentProps } from "react";
import {
  setScrollTarget,
  scrollToSection,
  type HomeSectionId,
} from "@/lib/scroll-to-section";

type ScrollLinkProps = Omit<ComponentProps<typeof Link>, "href"> & {
  section: HomeSectionId;
};

/** Scroll vers une section home sans afficher #funnel dans l’URL. */
export function ScrollLink({ section, onClick, ...props }: ScrollLinkProps) {
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === "/";

  return (
    <Link
      href="/"
      {...props}
      onClick={(e) => {
        onClick?.(e);
        if (e.defaultPrevented) return;

        if (isHome) {
          e.preventDefault();
          scrollToSection(section);
        } else {
          e.preventDefault();
          setScrollTarget(section);
          router.push("/");
        }
      }}
    />
  );
}
