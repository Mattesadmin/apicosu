import { useState } from "react";
import { Copy, Download, FileUp, UploadCloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import type { ApicosuModule } from "@/data/modules";

import { extractTextFromFile } from "@/utils/ocr";
import { runErrorFinder } from "@/modules/error-finder";
import { analyzeErrorWithAI } from "@/lib/aiErrorFinder";

/* -------------------------------------------------------
   1) TAB-KONFIGURATION FÜR ALLE MODULE
------------------------------------------------------- */
const TAB_CONFIG: Record<string, { id: string; label: string }[]> = {
  "error-finder": [
    { id: "summary", label: "Summary" },
    { id: "root_cause", label: "Root Cause" },
    { id: "technical_details", label: "Technical Details" },
    { id: "solution_steps", label: "Solution Steps" },
    { id: "hints", label: "Hints" },
    { id: "risk", label: "Risk & Priority" },
    { id: "recommended_actions", label: "Recommended Actions" }
  ],

  "customizing-analyzer": [
    { id: "summary", label: "Summary" },
    { id: "root_cause", label: "Root Cause" },
    { id: "missing_settings", label: "Missing Settings" },
    { id: "dependent_settings", label: "Dependent Settings" },
    { id: "solution_steps", label: "Solution Steps" },
    { id: "transport_notes", label: "Transport Notes" },
    { id: "risk", label: "Risk & Priority" },
    { id: "recommended_actions", label: "Recommended Actions" }
  ],

  "transport-impact": [
    { id: "summary", label: "Summary" },
    { id: "affected_objects", label: "Affected Objects" },
    { id: "dependency_conflicts", label: "Conflicts" },
    { id: "risk_analysis", label: "Risk Analysis" },
    { id: "test_recommendations", label: "Test Recommendations" },
    { id: "import_sequence", label: "Import Sequence" },
    { id: "rollback_notes", label: "Rollback Notes" },
    { id: "recommended_actions", label: "Recommended Actions" }
  ],

  "blueprint": [
    { id: "summary", label: "Summary" },
    { id: "process_flow", label: "Process Flow" },
    { id: "roles", label: "Roles" },
    { id: "fields", label: "Fields" },
    { id: "customizing_references", label: "Customizing" },
    { id: "open_points", label: "Open Points" },
    { id: "recommended_actions", label: "Recommended Actions" }
  ],

  "testdata": [
    { id: "summary", label: "Summary" },
    { id: "tables", label: "Tables" },
    { id: "fields", label: "Fields" },
    { id: "constraints", label: "Constraints" },
    { id: "generated_records", label: "Generated Records" },
    { id: "relationships", label: "Relationships" },
    { id: "recommended_actions", label: "Recommended Actions" }
  ],

  "training": [
    { id: "summary", label: "Summary" },
    { id: "target_audience", label: "Target Audience" },
    { id: "prerequisites", label: "Prerequisites" },
    { id: "step_by_step", label: "Steps" },
    { id: "exercises", label: "Exercises" },
    { id: "screenshots", label: "Screenshots" },
    { id: "recommended_actions", label: "Recommended Actions" }
  ]
};

/* -------------------------------------------------------
   2) FELD-RENDERER FÜR ALLE MODULE
------------------------------------------------------- */
const FIELD_RENDERERS: Record<
  string,
  Record<string, (ai: any) => JSX.Element>
> = {
  "error-finder": {
    summary: (ai) => (
      <div className="space-y-4">
        <p className="text-zinc-300 whitespace-pre-wrap">{ai.error_summary}</p>
        <p className="text-zinc-400 italic">{ai.error_classification}</p>
      </div>
    ),
    root_cause: (ai) => list(ai.root_cause),
    technical_details: (ai) => list(ai.technical_details),
    solution_steps: (ai) => list(ai.solution_steps),
    hints: (ai) => (
      <div className="space-y-6">
        <div>
          <h4 className="text-white font-semibold mb-2">Customizing Hints</h4>
          {list(ai.customizing_hints)}
        </div>
        <div>
          <h4 className="text-white font-semibold mb-2">ABAP Hints</h4>
          {list(ai.abap_hints)}
        </div>
      </div>
    ),
    risk: (ai) => (
      <div className="space-y-4">
        <p className="text-zinc-300">{ai.risk_assessment}</p>
        <p className="text-[#0A6ED1] font-semibold">{ai.priority}</p>
      </div>
    ),
    recommended_actions: (ai) => list(ai.recommended_actions)
  },

  "customizing-analyzer": {
    summary: (ai) => (
      <div className="space-y-4">
        <p className="text-zinc-300 whitespace-pre-wrap">{ai.customizing_summary}</p>
        <p className="text-zinc-400 italic">{ai.customizing_area}</p>
      </div>
    ),
    root_cause: (ai) => list(ai.root_cause),
    missing_settings: (ai) => list(ai.missing_settings),
    dependent_settings: (ai) => list(ai.dependent_settings),
    solution_steps: (ai) => list(ai.solution_steps),
    transport_notes: (ai) => list(ai.transport_notes),
    risk: (ai) => <p className="text-zinc-300">{ai.risk_assessment}</p>,
    recommended_actions: (ai) => list(ai.recommended_actions)
  },

  "transport-impact": {
    summary: (ai) => <p className="text-zinc-300 whitespace-pre-wrap">{ai.transport_summary}</p>,
    affected_objects: (ai) => list(ai.affected_objects),
    dependency_conflicts: (ai) => list(ai.dependency_conflicts),
    risk_analysis: (ai) => list(ai.risk_analysis),
    test_recommendations: (ai) => list(ai.test_recommendations),
    import_sequence: (ai) => list(ai.import_sequence),
    rollback_notes: (ai) => list(ai.rollback_notes),
    recommended_actions: (ai) => list(ai.recommended_actions)
  },

  "blueprint": {
    summary: (ai) => <p className="text-zinc-300 whitespace-pre-wrap">{ai.process_summary}</p>,
    process_flow: (ai) => list(ai.process_flow),
    roles: (ai) => list(ai.roles),
    fields: (ai) => list(ai.fields),
    customizing_references: (ai) => list(ai.customizing_references),
    open_points: (ai) => list(ai.open_points),
    recommended_actions: (ai) => list(ai.recommended_actions)
  },

  "testdata": {
    summary: (ai) => <p className="text-zinc-300 whitespace-pre-wrap">{ai.data_summary}</p>,
    tables: (ai) => list(ai.tables),
    fields: (ai) => list(ai.fields),
    constraints: (ai) => list(ai.constraints),
    generated_records: (ai) => list(ai.generated_records),
    relationships: (ai) => list(ai.relationships),
    recommended_actions: (ai) => list(ai.recommended_actions)
  },

  "training": {
    summary: (ai) => <p className="text-zinc-300 whitespace-pre-wrap">{ai.training_summary}</p>,
    target_audience: (ai) => list(ai.target_audience),
    prerequisites: (ai) => list(ai.prerequisites),
    step_by_step: (ai) => list(ai.step_by_step),
    exercises: (ai) => list(ai.exercises),
    screenshots: (ai) => list(ai.screenshots),
    recommended_actions: (ai) => list(ai.recommended_actions)
  }
};

/* Hilfsfunktion */
function list(items: string[] = []) {
  return (
    <ul className="list-disc ml-5 space-y-2">
      {items.map((item, idx) => (
        <li key={idx}>{item}</li>
      ))}
    </ul>
  );
}

/* -------------------------------------------------------
   3) TEMPLATE-KOMPONENTE
------------------------------------------------------- */
export const ModulePageTemplate = ({ module }: { module: ApicosuModule }) => {
  const Icon = module.icon;

  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("summary");

  const tabs = TAB_CONFIG[module.api] || [];
  const renderers = FIELD_RENDERERS[module.api] || {};

  async function handleAnalyze() {
    setLoading(true);
    setResult(null);
    setError(null);

    try {
      let combined = text;

      if (file) {
        const extracted = await extractTextFromFile(file);
        combined += "\n" + extracted;
      }

      let localAnalysis = null;

      if (module.api === "error-finder") {
        localAnalysis = await runErrorFinder({ combined });
      }

      const aiAnalysis = await analyzeErrorWithAI(combined, module.api);

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

  function handleReset() {
    setFile(null);
    setText("");
    setResult(null);
    setError(null);
    setActiveTab("summary");
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

  const ai = result?.ai?.raw || null;

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

          {/* RESET BUTTON */}
          {result && (
            <Button
              onClick={handleReset}
              variant="outline"
              className="mt-3 h-12 w-full rounded-2xl border-[#2a2a2a] bg-[#101010] text-zinc-200 hover:bg-[#202020] hover:text-white"
            >
              Neue Analyse
            </Button>
          )}

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