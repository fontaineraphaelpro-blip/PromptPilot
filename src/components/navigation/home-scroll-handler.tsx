"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  consumeScrollTarget,
  isHomeSectionId,
  scrollToHomeTop,
  scrollToSection,
  stripHashFromUrl,
} from "@/lib/scroll-to-section";

/**
 * À l’ouverture de la home : toujours en haut (hero), sauf navigation volontaire
 * vers une section (ScrollLink depuis une autre page ou ancien #hash).
 */
export function HomeScrollHandler() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/") return;

    let previousScrollRestoration: ScrollRestoration | undefined;
    if (typeof history !== "undefined" && "scrollRestoration" in history) {
      previousScrollRestoration = history.scrollRestoration;
      history.scrollRestoration = "manual";
    }

    const hash = window.location.hash.replace(/^#/, "");
    if (hash && isHomeSectionId(hash)) {
      stripHashFromUrl();
      requestAnimationFrame(() => scrollToSection(hash, "auto"));
    } else if (hash) {
      stripHashFromUrl();
      requestAnimationFrame(() => scrollToHomeTop("instant"));
    } else {
      const target = consumeScrollTarget();
      if (target) {
        requestAnimationFrame(() => scrollToSection(target, "smooth"));
      } else {
        requestAnimationFrame(() => scrollToHomeTop("instant"));
      }
    }

    return () => {
      if (previousScrollRestoration !== undefined) {
        history.scrollRestoration = previousScrollRestoration;
      }
    };
  }, [pathname]);

  return null;
}
