import {
  ArrowRight,
  BookOpenCheck,
  ClipboardList,
  Database,
  Layers3,
  SearchCode,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";
import { AppLayout } from "@/components/AppLayout";
import { modules } from "@/data/modules";

const capabilities = [
  "SAP-Fehleranalyse mit Ursache, Workaround und technischem Kontext",
  "Customizing-Checks für IMG, Tabellen und Prozessabhängigkeiten",
  "Blueprint-, Testdaten- und Trainingsdokumente im Beratungsformat",
];

const qualityRules = ["Keine erfundenen Transaktionen", "Keine falschen Tabellen", "Klare SAP-Begriffe"];

const Index = () => {
  return (
    <AppLayout>
      <section className="relative mx-auto max-w-[1200px] px-5 pb-12 pt-10 md:px-8 md:pb-16 md:pt-16">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="space-y-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#0A6ED1]/30 bg-[#0A6ED1]/10 px-4 py-2 text-sm font-medium text-[#9bd2ff]">
              <Sparkles className="h-4 w-4" />
              KI-gestützter Berater Support, Analyse und Dokumentation
            </div>

            <div className="space-y-5">
              <h1 className="max-w-4xl text-4xl font-semibold leading-tight tracking-[-0.04em] text-white md:text-6xl">
                Effektive SAP-Unterstützung für Beratungsteams.
              </h1>
              <p className="max-w-2xl text-base leading-8 text-zinc-300 md:text-lg">
                APICOSU strukturiert Fehleranalysen, Customizing-Prüfungen, Transportbewertungen,
                Blueprints, Testdaten und Trainingsunterlagen in einem professionellen Dashboard.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {qualityRules.map((rule) => (
                <div key={rule} className="rounded-2xl border border-[#2a2a2a] bg-[#181818]/85 px-4 py-3 shadow-xl shadow-black/20">
                  <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-xl bg-[#0A6ED1]/15 text-[#70bdff]">
                    <ShieldCheck className="h-4 w-4" />
                  </div>
                  <p className="text-sm font-medium text-zinc-100">{rule}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-[#2a2a2a] bg-[#181818] p-4 shadow-2xl shadow-black/50">
            <div className="rounded-[1.5rem] border border-[#2a2a2a] bg-[#101010] p-5">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-sm text-zinc-400">Live Analysis Workspace</p>
                  <p className="mt-1 text-xl font-semibold text-white">SAP Issue Intake</p>
                </div>
                <div className="rounded-2xl bg-[#0A6ED1] px-3 py-2 text-sm font-semibold text-white shadow-lg shadow-[#0A6ED1]/25">
                  Ready
                </div>
              </div>

              <div className="space-y-3">
                {capabilities.map((item, index) => (
                  <div key={item} className="flex gap-3 rounded-2xl border border-[#2a2a2a] bg-[#181818] p-4">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#0A6ED1]/15 text-[#70bdff]">
                      {index === 0 ? <SearchCode className="h-5 w-5" /> : index === 1 ? <Layers3 className="h-5 w-5" /> : <BookOpenCheck className="h-5 w-5" />}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">{item}</p>
                      <p className="mt-1 text-xs leading-5 text-zinc-400">Strukturiert mit Überschriften, Listen, Tabellen und konkreten SAP-Begriffen.</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-2xl border border-[#0A6ED1]/25 bg-[#0A6ED1]/10 p-4">
                <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-[#9bd2ff]">
                  <Database className="h-4 w-4" />
                  Beispielausgabe
                </div>
                <div className="grid gap-2 text-sm text-zinc-300 sm:grid-cols-2">
                  <span>• Betroffene Tabellen</span>
                  <span>• Lösungsschritte</span>
                  <span>• Risiken & Abhängigkeiten</span>
                  <span>• Technische Details</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-[1200px] px-5 pb-16 md:px-8 md:pb-24">
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-[#70bdff]">Module</p>
            <h2 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">Sechs professionelle Assistenten</h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-zinc-400">
            Jedes Modul ist auf einen klaren Beratungszweck optimiert: Input erfassen, Kontext strukturieren,
            Analyse und Ergebnisse generieren.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {modules.map((module) => {
            const Icon = module.icon;
            return (
              <Link
                to={module.path}
                key={module.title}
                className="group rounded-2xl border border-[#2a2a2a] bg-[#181818] p-5 shadow-2xl shadow-black/35 transition duration-300 hover:-translate-y-1 hover:border-[#0A6ED1]/45 hover:bg-[#202020] hover:shadow-[#0A6ED1]/10"
              >
                <div className="mb-5 flex items-start justify-between gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#0A6ED1]/25 bg-[#0A6ED1]/12 text-[#70bdff] transition duration-300 group-hover:bg-[#0A6ED1] group-hover:text-white">
                    <Icon className="h-6 w-6" />
                  </div>
                  <ArrowRight className="mt-3 h-5 w-5 text-zinc-500 transition duration-300 group-hover:translate-x-1 group-hover:text-[#70bdff]" />
                </div>

                <h3 className="text-xl font-semibold tracking-tight text-white">{module.title}</h3>
                <p className="mt-3 min-h-20 text-sm leading-6 text-zinc-400">{module.description}</p>

                <div className="mt-5 space-y-3 border-t border-[#2a2a2a] pt-5">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">Input</p>
                    <p className="mt-1 text-sm leading-6 text-zinc-300">{module.input}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">Output</p>
                    <p className="mt-1 text-sm leading-6 text-zinc-300">{module.output}</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </AppLayout>
  );
};

export default Index;
