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
    downloadTextFile(md, `promptexpert-${result.id ?? "export"}.md`, "text/markdown");
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

  function exportPdf() {
    const win = window.open("", "_blank");
    if (!win) {
      toast.error("Autorise les pop-ups pour exporter en PDF");
      return;
    }
    win.document.write(`
      <!DOCTYPE html><html><head><title>Prompt PromptExpert</title>
      <style>body{font-family:system-ui;max-width:720px;margin:40px auto;padding:0 20px;line-height:1.6}
      h1{font-size:1.25rem}pre{white-space:pre-wrap;background:#f4f4f5;padding:16px;border-radius:8px}</style></head>
      <body><h1>Prompt PromptExpert</h1>
      ${result.prompt_score ? `<p><strong>Score:</strong> ${result.prompt_score}/100</p>` : ""}
      <pre>${text.replace(/</g, "&lt;")}</pre>
      <script>window.onload=()=>window.print()</script></body></html>`);
    win.document.close();
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
      <Button size="sm" variant="outline" onClick={exportPdf}>
        <Download className="h-3 w-3" />
        PDF
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
