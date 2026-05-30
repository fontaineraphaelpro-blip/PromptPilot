"use client";

import { StickyCtaBar } from "./sticky-cta-bar";
import { ExitIntentModal } from "./exit-intent-modal";

export function ConversionShell() {
  return (
    <>
      <StickyCtaBar />
      <ExitIntentModal />
    </>
  );
}
