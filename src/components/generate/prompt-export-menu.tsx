"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Download,
  Share2,
  FileText,
  Copy,
  Check,
  ExternalLink,
} from "lucide-react";
import { toast } from "sonner";
import { useCopy } from "@/hooks/use-copy";
import type { GeneratePromptResult } from "@/types";
import type { TargetAI } from "@/lib/constants";
import {
  downloadTextFile,
  formatPromptForAI,
  toMarkdownExport,
  toNotionBlocks,
} from "@/lib/export-prompt";

interface PromptExportMenuProps {
  result: GeneratePromptResult & {
    id?: string;
    original_idea?: string;
    target_ai?: TargetAI;
    prompt_score?: number;
  };
  activeVariant?: "main" | "short" | "detailed" | "expert";
}

export function PromptExportMenu({ result, activeVariant = "main" }: PromptExportMenuProps) {
  const { copy, copied } = useCopy();
  const [sharing, setSharing] = useState(false);
  const [shareUrl, setShareUrl] = useState<string | null>(null);
  const [pdfLoading, setPdfLoading] = useState(false);

  const variants = {
    main: result.generated_prompt,
    short: result.short_variant,
    detailed: result.detailed_variant,
    expert: result.expert_variant,
  };
  const text = variants[activeVariant] ?? result.generated_prompt;
  const targetAI = (result.target_ai ?? "ChatGPT") as TargetAI;

  async function handleShare() {
    if (!result.id) {
      toast.error("Sauvegarde requise pour partager");
      return;
    }
    setSharing(true);
    try {
      const res = await fetch(`/api/prompts/${result.id}/share`, { method: "POST" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      const base = window.location.origin;
      const url = `${base}/p/${data.token}`;
      setShareUrl(url);
      await copy(url);
      toast.success("Lien de partage copié !");
    } catch {
      toast.error("Impossible de créer le lien");
    } finally {
      setSharing(false);
    }
  }

  function exportMarkdown() {
    const md = toMarkdownExport(
      { ...result, generated_prompt: text },
      activeVariant
    );
    downloadTextFile(md, `promptpilot-${result.id ?? "export"}.md`, "text/markdown");
    toast.success("Markdown téléchargé");
  }

  async function exportNotion() {
    const md = toMarkdownExport({ ...result, generated_prompt: text }, activeVariant);
    const notion = toNotionBlocks(md);
    const ok = await copy(notion);
    if (ok) toast.success("Format Notion copié — colle dans Notion");
  }

  async function exportFormatted() {
    const ok = await copy(formatPromptForAI(targetAI, text));
    if (ok) toast.success(`Prompt formaté pour ${targetAI} copié`);
  }

  const variantLabels: Record<typeof activeVariant, string> = {
    main: "Principal",
    short: "Court",
    detailed: "Détaillé",
    expert: "Expert",
  };

  async function exportPdf() {
    setPdfLoading(true);
    try {
      const { downloadPromptPdf } = await import("@/lib/download-prompt-pdf");
      await downloadPromptPdf({
        filename: `promptpilot-${result.id ?? "export"}.pdf`,
        promptText: text,
        score: result.prompt_score,
        originalIdea: result.original_idea,
        targetAI: result.target_ai,
        variantLabel: variantLabels[activeVariant],
        aiTips: result.ai_tips,
      });
      toast.success("PDF téléchargé");
    } catch {
      toast.error("Impossible de générer le PDF");
    } finally {
      setPdfLoading(false);
    }
  }

  return (
    <div className="flex flex-wrap gap-2">
      <Button size="sm" variant="outline" onClick={exportFormatted}>
        {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
        Snippet {targetAI}
      </Button>
      <Button size="sm" variant="outline" onClick={exportMarkdown}>
        <FileText className="h-3 w-3" />
        Markdown
      </Button>
      <Button size="sm" variant="outline" onClick={exportNotion}>
        Notion
      </Button>
      <Button size="sm" variant="outline" onClick={exportPdf} disabled={pdfLoading}>
        <Download className="h-3 w-3" />
        {pdfLoading ? "PDF…" : "PDF"}
      </Button>
      {result.id && (
        <Button size="sm" variant="outline" onClick={handleShare} disabled={sharing}>
          <Share2 className="h-3 w-3" />
          {shareUrl ? "Lien copié" : "Partager"}
        </Button>
      )}
      {shareUrl && (
        <Button size="sm" variant="ghost" asChild>
          <a href={shareUrl} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="h-3 w-3" />
            Voir
          </a>
        </Button>
      )}
    </div>
  );
}
