"use client";

import { useEffect } from "react";

let lockCount = 0;

function syncLockClass() {
  if (typeof document === "undefined") return;
  if (lockCount > 0) {
    document.documentElement.classList.add("pp-scroll-locked");
  } else {
    document.documentElement.classList.remove("pp-scroll-locked");
  }
}

/**
 * Lock vertical scroll while overlays are open.
 * Never touches overflow-x (breaks mouse wheel in Chrome).
 */
export function useScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return;

    lockCount += 1;
    syncLockClass();

    return () => {
      lockCount = Math.max(0, lockCount - 1);
      syncLockClass();
    };
  }, [locked]);
}

/** Force unlock — used once on page load to clear leftovers. */
export function forceUnlockScroll() {
  lockCount = 0;
  if (typeof document === "undefined") return;
  const html = document.documentElement;
  const body = document.body;
  html.classList.remove("pp-scroll-locked");
  html.style.overflow = "";
  html.style.height = "";
  body.style.overflow = "";
  body.style.position = "";
  body.style.top = "";
  body.style.left = "";
  body.style.right = "";
  body.style.width = "";
  body.style.height = "";
}
