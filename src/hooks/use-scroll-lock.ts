"use client";

import { useEffect } from "react";

let lockCount = 0;

function applyLock() {
  if (typeof document === "undefined") return;
  document.documentElement.classList.add("pp-scroll-locked");
}

function releaseLock() {
  if (typeof document === "undefined") return;
  if (lockCount <= 0) {
    document.documentElement.classList.remove("pp-scroll-locked");
  }
}

/**
 * Lock page scroll while overlays are open.
 * Compteur partagé + classe CSS (pas de position:fixed) pour ne pas casser la molette.
 */
export function useScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return;

    lockCount += 1;
    applyLock();

    return () => {
      lockCount = Math.max(0, lockCount - 1);
      releaseLock();
    };
  }, [locked]);
}
