"use client";

import { useEffect } from "react";
import { forceUnlockScroll } from "@/hooks/use-scroll-lock";

/** Nettoie tout bloquage de molette au chargement. */
export function ScrollFix() {
  useEffect(() => {
    forceUnlockScroll();
  }, []);

  return null;
}
