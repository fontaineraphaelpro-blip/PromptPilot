/** Génère et télécharge un PDF du prompt (pas d’impression navigateur). */
export async function downloadPromptPdf(options: {
  filename: string;
  promptText: string;
  score?: number | null;
  originalIdea?: string;
  targetAI?: string;
  variantLabel?: string;
  aiTips?: string;
}): Promise<void> {
  const { jsPDF } = await import("jspdf");

  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const margin = 18;
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  const maxW = pageW - margin * 2;
  let y = margin;

  const ensureSpace = (neededMm: number) => {
    if (y + neededMm > pageH - margin) {
      doc.addPage();
      y = margin;
    }
  };

  const writeBlock = (
    text: string,
    fontSize: number,
    style: "normal" | "bold" = "normal",
    lineGap = 1.5
  ) => {
    doc.setFontSize(fontSize);
    doc.setFont("helvetica", style);
    const lines = doc.splitTextToSize(text, maxW);
    const lineHeight = fontSize * 0.42;

    for (const line of lines) {
      ensureSpace(lineHeight + lineGap);
      doc.text(line, margin, y);
      y += lineHeight + lineGap;
    }
    y += 2;
  };

  writeBlock("PromptExpert", 16, "bold", 2);
  if (options.score != null) {
    writeBlock(`Score : ${options.score}/100`, 11);
  }
  if (options.targetAI) {
    writeBlock(`IA : ${options.targetAI}`, 10);
  }
  if (options.originalIdea) {
    writeBlock(`Idée : ${options.originalIdea}`, 10);
  }
  if (options.variantLabel) {
    writeBlock(`Variante : ${options.variantLabel}`, 10);
  }

  y += 2;
  writeBlock("Prompt", 12, "bold", 2);
  writeBlock(options.promptText, 9);

  if (options.aiTips?.trim()) {
    y += 2;
    writeBlock("Conseils", 12, "bold", 2);
    writeBlock(options.aiTips.trim(), 9);
  }

  doc.save(options.filename.endsWith(".pdf") ? options.filename : `${options.filename}.pdf`);
}
