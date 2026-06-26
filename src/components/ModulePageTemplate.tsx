import { useState } from "react";
import { Copy, Download, FileUp, UploadCloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import type { ApicosuModule } from "@/data/modules";

import { extractTextFromFile } from "@/utils/ocr";
import { runErrorFinder } from "@/modules/error-finder";
import { analyzeErrorWithAI } from "@/lib/aiErrorFinder";

export const ModulePageTemplate = ({ module }: { module: ApicosuModule }) => {
  const Icon = module.icon;

  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleAnalyze() {
    setLoading(true);
    setResult(null);
    setError(null);

    try {
      let combined = text;

      // 1. Datei → OCR
      if (file) {
        const extracted = await extractTextFromFile(file);
        combined += "\n" + extracted;
      }

      // 2. Lokale Analyse (Error Finder Modul)
      const localAnalysis = await runErrorFinder({ combined });

      // 3. KI-Analyse (ausgelagert in neue Datei)
      const aiAnalysis = await analyzeErrorWithAI(combined, module.api); 
     
      // 4. Ergebnis kombinieren
      setResult({
        local: localAnalysis,
        ai: aiAnalysis
      });

    } catch (err: any) {
      setError(err.message || "Unbekannter Fehler");
    } finally {
      setLoading(false);
    }
  }

  function handleCopy() {
    if (!result) return;
    navigator.clipboard.writeText(JSON.stringify(result, null, 2));
  }

  function handleDownload() {
    if (!result) return;

    const blob = new Blob([JSON.stringify(result, null, 2)], {
      type: "application/json",
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${module.api}-result.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <section className="relative mx-auto max-w-[1200px] px-5 py-10 md:px-8 md:py-16">
      {/* HEADER */}
      <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-[#0A6ED1]/25 bg-[#0A6ED1]/12 text-[#70bdff] shadow-xl shadow-black/25">
            <Icon className="h-7 w-7" />
          </div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-[#70bdff]">
            APICOSU Module
          </p>
          <h1 className="text-4xl font-semibold tracking-[-0.04em] text-white md:text-5xl">
            {module.title}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-8 text-zinc-300">
            {module.description}
          </p>
        </div>
      </div>

      {/* GRID */}
      <div className="grid gap-5 lg:grid-cols-[0.92fr_1.08fr]">
        {/* LEFT SIDE – INPUT */}
        <section className="rounded-2xl border border-[#2a2a2a] bg-[#181818] p-5 shadow-2xl shadow-black/35 md:p-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold tracking-tight text-white">
              Upload & Input
            </h2>
            <p className="mt-2 text-sm leading-6 text-zinc-400">
              Dateien, Screenshots oder strukturierte SAP-Informationen für die Analyse bereitstellen.
            </p>
          </div>

          {/* FILE UPLOAD */}
          <div className="rounded-2xl border border-dashed border-[#0A6ED1]/35 bg-[#0A6ED1]/8 p-8 text-center shadow-inner shadow-black/20">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0A6ED1]/15 text-[#70bdff]">
              <UploadCloud className="h-7 w-7" />
            </div>
            <p className="text-base font-semibold text-white">Drag & Drop files here</p>
            <p className="mt-2 text-sm leading-6 text-zinc-400">
              SAP-Screenshots, Exporte, Protokolle oder Dokumente auswählen.
            </p>

            <label className="mt-5 inline-flex cursor-pointer items-center justify-center gap-2 rounded-2xl bg-[#0A6ED1] px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[#0A6ED1]/25 transition hover:bg-[#0b7ce8]">
              <FileUp className="h-4 w-4" />
              File select
              <input
                type="file"
                className="sr-only"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
              />
            </label>

            {file && (
              <p className="mt-3 text-sm text-zinc-300">
                Selected: <span className="font-semibold">{file.name}</span>
              </p>
            )}
          </div>

          {/* TEXT INPUT */}
          <div className="mt-5">
            <label className="mb-2 block text-sm font-semibold text-zinc-200">
              Optional text input
            </label>
            <Textarea
              placeholder={module.textPlaceholder}
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="min-h-36 rounded-2xl border-[#2a2a2a] bg-[#101010] text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-[#0A6ED1] focus-visible:ring-offset-0"
            />
          </div>

          {/* ANALYZE BUTTON */}
          <Button
            onClick={handleAnalyze}
            disabled={loading}
            className="mt-5 h-12 w-full rounded-2xl bg-[#0A6ED1] text-sm font-semibold text-white shadow-lg shadow-[#0A6ED1]/25 hover:bg-[#0b7ce8]"
          >
            {loading ? "Analysiere..." : "Analyze"}
          </Button>

          {error && (
            <p className="mt-4 text-sm text-red-400">
              {error}
            </p>
          )}
        </section>

        {/* RIGHT SIDE – RESULT */}
        <section className="rounded-2xl border border-[#2a2a2a] bg-[#181818] p-5 shadow-2xl shadow-black/35 md:p-6">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold tracking-tight text-white">Result</h2>
              <p className="mt-2 text-sm leading-6 text-zinc-400">
                Analyseausgabe für Review, Dokumentation und Weiterverarbeitung.
              </p>
            </div>

            <div className="flex gap-2">
              <Button
                onClick={handleCopy}
                variant="outline"
                className="rounded-2xl border-[#2a2a2a] bg-[#101010] text-zinc-200 hover:bg-[#202020] hover:text-white"
              >
                <Copy className="h-4 w-4" />
                Copy result
              </Button>

              <Button
                onClick={handleDownload}
                variant="outline"
                className="rounded-2a border-[#2a2a2a] bg-[#101010] text-zinc-200 hover:bg-[#202020] hover:text-white"
              >
                <Download className="h-4 w-4" />
                Download result
              </Button>
            </div>
          </div>

          <div className="min-h-[410px] rounded-2xl border border-[#2a2a2a] bg-[#101010] p-5 shadow-inner shadow-black/30">
            {!result && (
              <p className="text-sm leading-7 text-zinc-500">
                Analysis output will appear here.
              </p>
            )}

            {result && (
              <pre className="text-sm leading-7 text-zinc-300 whitespace-pre-wrap">
                {JSON.stringify(result, null, 2)}
              </pre>
            )}
          </div>
        </section>
      </div>
    </section>
  );
};
