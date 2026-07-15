"use client";

import { StickyCtaBar } from "./sticky-cta-bar";
import { ExitIntentModal } from "./exit-intent-modal";

export function ConversionShell({ mode = "guest" }: { mode?: "guest" | "free" }) {
  return (
    <>
      <StickyCtaBar mode={mode} />
      {mode === "guest" && <ExitIntentModal />}
    </>
  );
}
