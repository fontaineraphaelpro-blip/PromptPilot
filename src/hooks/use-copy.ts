"use client";

import { useCallback, useState } from "react";

export function useCopy() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copy = useCallback(async (text: string, id = "default") => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
      return true;
    } catch {
      return false;
    }
  }, []);

  const resetCopy = useCallback(() => setCopiedId(null), []);

  return { copy, copied: copiedId !== null, copiedId, resetCopy };
}
