"use client";

import { useEffect } from "react";
import {
  consumeScrollTarget,
  isHomeSectionId,
  scrollToSection,
  stripHashFromUrl,
} from "@/lib/scroll-to-section";

/** Applique le scroll différé (autre page → home) et nettoie les anciens liens #section. */
export function HomeScrollHandler() {
  useEffect(() => {
    const hash = window.location.hash.replace(/^#/, "");
    if (hash && isHomeSectionId(hash)) {
      stripHashFromUrl();
      window.setTimeout(() => scrollToSection(hash, "auto"), 80);
      return;
    }
    if (hash) stripHashFromUrl();

    const target = consumeScrollTarget();
    if (target) {
      window.setTimeout(() => scrollToSection(target, "smooth"), 120);
    }
  }, []);

  return null;
}
