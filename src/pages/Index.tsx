import { useMemo, useState } from "react";
import {
  AlertTriangle,
  ArrowRight,
  BookOpenCheck,
  Boxes,
  ClipboardCheck,
  DatabaseZap,
  FileText,
  GraduationCap,
  Hexagon,
  Layers3,
  Network,
  Route,
  SearchCheck,
  Settings2,
  ShieldCheck,
  Sparkles,
  UploadCloud,
  type LucideIcon,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type ModuleId =
  | "error-finder"
  | "customizing-analyzer"

  | "transport-impact"
  | "blueprint-generator"
  | "testdata-generator"
  | "training-generator";

type ModuleConfig = {
  id: ModuleId;
  title: string;
  shortTitle: string;
  description: string;
  icon: typeof AlertTriangle;
  inputLabel: string;
  inputPlaceholder: string;
  acceptedInputs: string[];
  icon: LucideIcon;
  sample: string;
};

const modules: ModuleConfig[] = [
  {
    id: "error-finder",
    title: "Error Finder",

    shortTitle: "Fehleranalyse",
    description: "Analysiert SAP-Fehlertexte und liefert Ursachen, Lösungsschritte und technische Details.",
    icon: SearchCheck,
    inputLabel: "SAP-Fehlermeldung oder Analysekontext",
    inputPlaceholder:
      "Beispiel: Fehlermeldung aus MIGO / MIRO, betroffener SAP-Modulbereich FI/MM/SD, Transaktion, Tabellenhinweis, Log-Auszug ...",
    acceptedInputs: ["SAP-Fehlermeldung", "Screenshot-Kontext", "Modul FI/MM/SD/PP/Basis"],
    sample:
      "M8 147: Konto kann nicht ermittelt werden. Kontext: MIRO, Buchungskreis 1000, MM-IV, Bewertungsbereich 1000.",
  },
  {
    id: "customizing-analyzer",
    title: "Customizing Analyzer",
    shortTitle: "Customizing-Check",
    description: "Prüft Customizing-Einstellungen, Abhängigkeiten und Konflikte in SAP-Prozessen.",
    icon: Settings2,
    inputLabel: "Customizing-Export, IMG-Pfad oder Tabellenkontext",
    inputPlaceholder:
      "Beispiel: SPRO-Pfad, Tabellen T001/T001K/T030, Kopiersteuerung, Preisfindung, Partnerfindung, Screenshots ...",
    acceptedInputs: ["Tabellen", "IMG-Pfade", "Customizing-Texte"],
    sample:
      "IMG: Materialwirtschaft > Bewertung und Kontierung > Kontenfindung. Tabellen T030, T001K, Bewertungsbereich 1000.",
  },
  {
    id: "transport-impact",
    title: "Transport Impact Analyzer",
    shortTitle: "Transportanalyse",
    description: "Bewertet Auswirkungen von Transporten auf Objekte, Tabellen, Programme und Systemlandschaften.",
    icon: Route,
    inputLabel: "Transportnummern, Objektliste oder Protokollauszug",
    inputPlaceholder:
      "Beispiel: DEVK900123, R3TR TABU, R3TR PROG, Customizing-Aufträge, Importprotokolle, Zielsystem QAS/PRD ...",
    acceptedInputs: ["Transportnummern", "Objekttypen", "Systemlandschaft"],
    sample:
      "DEVK900123 enthält R3TR TABU T030 und R3TR VIEW V_T001K. Ziel: QAS vor PRD. Abhängigkeit zu DEVK900119.",
  },
  {
    id: "blueprint-generator",
    title: "Blueprint Generator",
    shortTitle: "Blueprint",
    description: "Erstellt strukturierte Blueprint-Dokumentationen für SAP-Prozesse und technische Details.",
    icon: FileText,
    inputLabel: "Prozessbeschreibung, Rollen, Tabellen und Transaktionen",
    inputPlaceholder:
      "Beispiel: Purchase-to-Pay Prozess mit ME21N, MIGO, MIRO; Rollen Einkauf, Wareneingang, Kreditorenbuchhaltung ...",
    acceptedInputs: ["Prozessbeschreibung", "Transaktionen", "Tabellen/Felder"],
    sample:
      "Prozess: Bestellung bis Rechnung. Transaktionen ME21N, MIGO, MIRO. Tabellen EKKO, EKPO, MSEG, RBKP, RSEG.",
  },
  {
    id: "testdata-generator",
    title: "Testdaten Generator",
    shortTitle: "Testdaten",
    description: "Generiert realistische SAP-Testdatensätze mit Tabellenwerten, IDs und Abhängigkeiten.",
    icon: DatabaseZap,
    inputLabel: "Prozess, Tabellen, Felder und Constraints",
    inputPlaceholder:
      "Beispiel: Bestellung mit Lieferant, Material, Werk, Buchungskreis, Einkaufsorganisation, Pflichtfelder und Abhängigkeiten ...",
    acceptedInputs: ["Prozess", "Tabellenfelder", "Constraints"],
    sample:
      "Prozess Bestellung: Lieferant 100000, Material MAT-100, Werk 1000, EKOrg 1000, Menge 25 ST, Währung EUR.",
  },
  {
    id: "training-generator",
    title: "Training Generator",
    shortTitle: "Training",
    description: "Erzeugt Trainingsunterlagen, Übungen und Quizfragen aus SAP-Prozessinformationen.",
    icon: GraduationCap,
    inputLabel: "Prozessbeschreibung, Rollen und Lernziel",
    inputPlaceholder:
      "Beispiel: Endanwendertraining für Wareneingang mit MIGO, Rollen, Screenshots, typische Fehler und Übungen ...",
    acceptedInputs: ["Prozessbeschreibung", "Rollen", "Screenshots-Kontext"],
    sample:
      "Training: Wareneingang zur Bestellung in MIGO. Rolle Lagerist. Lernziel: Beleg prüfen, Menge erfassen, Materialbeleg buchen.",
  },
];

const quickStats = [
  { label: "Module", value: "6", icon: Boxes },
  { label: "SAP-Fokus", value: "FI · MM · SD · PP", icon: Layers3 },
  { label: "Output", value: "Analyse + Doku", icon: ClipboardCheck },
];

function createAnalysis(module: ModuleConfig, input: string) {
  const cleanInput = input.trim() || module.sample;

  if (module.id === "error-finder") {
    return {
      title: "SAP-Fehleranalyse",
      sections: [
        {
          heading: "1. Einordnung",
          items: [
            "Fehlertext und Kontext werden gegen Modul, Transaktion und technische Objekte abgegrenzt.",
            "Priorität: Ursache vor Workaround; Belegfluss, Kontierung und Berechtigungen separat prüfen.",
            `Analysierter Kontext: ${cleanInput}`,
          ],
        },
        {
          heading: "2. Mögliche Ursache",
          items: [
            "Fehlende oder inkonsistente Customizing-Einstellung im betroffenen Organisationsbereich.",
            "Unvollständige Stammdaten wie Material, Lieferant, Sachkonto, Steuerkennzeichen oder Kontierungsobjekt.",
            "Abweichung zwischen Buchungskreis, Werk, Bewertungsbereich und Prozessvariante.",
          ],
        },
        {
          heading: "3. Lösungsschritte",
          items: [
            "Transaktion und Belegkontext reproduzierbar dokumentieren.",
            "Relevante Stammdaten und Customizing-Tabellen gezielt vergleichen.",
            "Fehler mit Testbeleg in QAS validieren und Ergebnis im Transport-/Testprotokoll sichern.",
          ],
        },
        {
          heading: "4. Technische Checks",
          items: ["Tabellen abhängig vom Prozess prüfen, z. B. EKKO/EKPO, BKPF/BSEG, VBAK/VBAP.", "ST22 und SM21 nur bei Dumps oder Systemmeldungen einbeziehen.", "SU53 prüfen, wenn Berechtigungsfehler vermutet werden."],
        },
      ],
    };
  }

  if (module.id === "customizing-analyzer") {
    return {
      title: "Customizing-Konfliktanalyse",
      sections: [
        {
          heading: "1. Prüfumfang",
          items: [`Analysierter Input: ${cleanInput}`, "Organisationsstrukturen, Prozesssteuerung und abhängige Tabellen werden getrennt bewertet.", "IMG-Pfade werden nur mit zugehörigem Prozesskontext interpretiert."],
        },
        {
          heading: "2. Konfliktmuster",
          items: ["Customizing ist für Buchungskreis/Werk/Verkaufsorganisation nicht vollständig gepflegt.", "Tabellenwerte sind transportiert, aber abhängige View- oder Stammdaten fehlen.", "Mehrere Prozessvarianten greifen auf dieselbe Konten-, Preis- oder Partnerfindung zu."],
        },
        {
          heading: "3. Empfehlung",
          items: ["Soll-/Ist-Matrix pro Organisationseinheit erstellen.", "Abhängigkeiten zwischen Customizing, Stammdaten und Berechtigungen dokumentieren.", "Änderungen in QAS mit repräsentativen End-to-End-Testfällen prüfen."],
        },
      ],
    };
  }

  if (module.id === "transport-impact") {
    return {
      title: "Transport Impact Assessment",
      sections: [
        {
          heading: "1. Objektwirkung",
          items: [`Analysierter Transportkontext: ${cleanInput}`, "Customizing-Objekte wirken mandantenabhängig; Workbench-Objekte wirken mandantenübergreifend.", "Tabelleninhalte, Views, Programme und Berechtigungsobjekte separat klassifizieren."],
        },
        {
          heading: "2. Risiken",
          items: ["Falsche Importreihenfolge kann inkonsistente Customizing-Zustände erzeugen.", "Tabellenänderungen können laufende Tests oder produktive Prozesse beeinflussen.", "Nicht transportierte Abhängigkeiten führen zu Folgefehlern in QAS/PRD."],
        },
        {
          heading: "3. Testempfehlung",
          items: ["Importreihenfolge nach Abhängigkeiten festlegen.", "Smoke-Test direkt nach Import ausführen.", "Regressionstest für betroffene SAP-Prozesse und Schnittstellen planen."],
        },
      ],
    };
  }

  if (module.id === "blueprint-generator") {
    return {
      title: "Blueprint-Struktur",
      sections: [
        {
          heading: "1. Prozessdefinition",
          items: [`Ausgangsbeschreibung: ${cleanInput}`, "Zielprozess, Prozessgrenzen und beteiligte Organisationseinheiten definieren.", "Varianten, Ausnahmen und offene Punkte getrennt dokumentieren."],
        },
        {
          heading: "2. Prozessfluss",
          items: ["Start: Fachlicher Auslöser und relevante Stammdaten.", "Ausführung: Transaktionen, Rollen, Pflichtfelder und Prüfungen.", "Abschluss: Belegstatus, Folgebelege, Reporting und Archivierung."],
        },
        {
          heading: "3. Technische Dokumentation",
          items: ["Tabellen und Schlüsselfelder je Prozessschritt aufführen.", "Customizing-Einstellungen mit IMG-Kontext dokumentieren.", "Schnittstellen, Berechtigungen und Testfälle ergänzen."],
        },
      ],
    };
  }

  if (module.id === "testdata-generator") {
    return {
      title: "SAP-Testdatenpaket",
      sections: [
        {
          heading: "1. Datensatzvorschlag",
          items: [`Input-Basis: ${cleanInput}`, "Buchungskreis: 1000; Werk: 1000; Währung: EUR; Sprache: DE.", "Beispiel-IDs sind konsistent zu verwenden und vor Nutzung gegen das QAS-System zu prüfen."],
        },
        {
          heading: "2. Tabellenstruktur",
          items: ["Kopfdaten und Positionsdaten trennen, z. B. EKKO/EKPO oder VBAK/VBAP.", "Belegnummern werden vom System vergeben; externe Referenzen eindeutig halten.", "Abhängigkeiten zu Material, Lieferant/Kunde, Werk und Organisationseinheiten prüfen."],
        },
        {
          heading: "3. JSON-Export",
          items: [
            '{ "companyCode": "1000", "plant": "1000", "currency": "EUR", "scenario": "SAP process test" }',
            "Constraints: Pflichtfelder, Mengeneinheiten, Steuerkennzeichen und Buchungsperioden beachten.",
          ],
        },
      ],
    };
  }

  return {
    title: "Trainingsunterlage",
    sections: [
      {
        heading: "1. Lernziel",
        items: [`Trainingskontext: ${cleanInput}`, "Anwender verstehen Prozessziel, Rollenverantwortung und relevante SAP-Belege.", "Fokus liegt auf sicheren Eingaben, Prüfungen und Fehlervermeidung."],
      },
      {
        heading: "2. Schritt-für-Schritt-Struktur",
        items: ["Prozess starten und erforderliche Eingabefelder erklären.", "Belegdaten prüfen, sichern oder buchen.", "Ergebnis kontrollieren: Belegnummer, Status, Folgebelege und Reporting."],
      },
      {
        heading: "3. Übungen und Quiz",
        items: ["Übung: Standardfall mit vollständigen Stammdaten durchführen.", "Übung: Fehlerfall analysieren und fachliche Korrektur ableiten.", "Quiz: Welche Rolle prüft welche Daten? Welche Tabellen speichern Kopf- und Positionsdaten?"],
      },
    ],
  };
}

const Index = () => {
  const [activeModule, setActiveModule] = useState<ModuleId>("error-finder");
  const [inputValue, setInputValue] = useState(modules[0].sample);
  const selectedModule = modules.find((module) => module.id === activeModule) ?? modules[0];
  const SelectedModuleIcon = selectedModule.icon;

  const analysis = useMemo(
    () => createAnalysis(selectedModule, inputValue),
    [inputValue, selectedModule],
  );

  const handleSelectModule = (module: ModuleConfig) => {
    setActiveModule(module.id);
    setInputValue(module.sample);
  };

  return (
    <div className="min-h-screen bg-[#0e0e0e] text-white antialiased">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-[-18rem] h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-[#0A6ED1]/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-[28rem] w-[28rem] rounded-full bg-[#0A6ED1]/10 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:46px_46px] opacity-25" />
      </div>

      <header className="sticky top-0 z-40 border-b border-[#2a2a2a] bg-[#0e0e0e]/92 shadow-[0_18px_55px_rgba(0,0,0,0.45)] backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#0A6ED1]/40 bg-[#0A6ED1]/12 shadow-[0_0_35px_rgba(10,110,209,0.2)]">
              <Hexagon className="h-6 w-6 text-[#5bb3ff]" />
            </div>
            <div>
              <p className="text-lg font-semibold tracking-tight text-white">APICOSU</p>
              <p className="hidden text-xs text-zinc-400 sm:block">Application for Intelligent Consulting Support</p>
            </div>
          </div>
          <nav className="hidden items-center gap-6 text-sm text-zinc-300 md:flex">
            <a href="#modules" className="transition hover:text-white">Module</a>
            <a href="#workspace" className="transition hover:text-white">Workspace</a>
            <a href="#governance" className="transition hover:text-white">SAP-Standards</a>
          </nav>
          <Badge className="rounded-full border border-[#0A6ED1]/40 bg-[#0A6ED1]/15 px-3 py-1 text-[#9ad1ff] hover:bg-[#0A6ED1]/20">
            AI Consulting Suite
          </Badge>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-[1200px] px-4 pb-16 pt-8 sm:px-6 lg:px-8">
        <section className="grid gap-8 py-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-16">
          <div className="space-y-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#2a2a2a] bg-[#181818]/80 px-4 py-2 text-sm text-zinc-300 shadow-xl">
              <Sparkles className="h-4 w-4 text-[#5bb3ff]" />
              KI-gestützte SAP-Beratung, Analyse und Dokumentation
            </div>
            <div className="space-y-5">
              <h1 className="max-w-4xl text-4xl font-semibold leading-tight tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl">
                Präzise SAP-Analysen für Beratungsteams.
              </h1>
              <p className="max-w-2xl text-base leading-8 text-zinc-300 sm:text-lg">
                APICOSU bündelt Fehleranalyse, Customizing-Checks, Transportbewertung, Blueprint-Erstellung, Testdaten und Trainingsunterlagen in einem klaren Dark-Mode-Dashboard.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                asChild
                className="rounded-2xl bg-[#0A6ED1] px-6 py-6 text-base font-semibold text-white shadow-[0_18px_45px_rgba(10,110,209,0.25)] hover:bg-[#0b7eea]"
              >
                <a href="#workspace">Analyse starten <ArrowRight className="ml-2 h-5 w-5" /></a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="rounded-2xl border-[#2a2a2a] bg-[#181818] px-6 py-6 text-base text-zinc-100 hover:bg-[#222] hover:text-white"
              >
                <a href="#modules">Module ansehen</a>
              </Button>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {quickStats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <Card key={stat.label} className="rounded-2xl border-[#2a2a2a] bg-[#181818]/82 p-4 shadow-2xl">
                    <Icon className="mb-3 h-5 w-5 text-[#5bb3ff]" />
                    <p className="text-2xl font-semibold text-white">{stat.value}</p>
                    <p className="text-sm text-zinc-400">{stat.label}</p>
                  </Card>
                );
              })}
            </div>
          </div>

          <Card className="relative overflow-hidden rounded-[2rem] border-[#2a2a2a] bg-[#181818] p-5 shadow-[0_30px_90px_rgba(0,0,0,0.55)]">
            <div className="absolute inset-x-0 top-0 h-1 bg-[#0A6ED1]" />
            <div className="rounded-[1.5rem] border border-[#2a2a2a] bg-[#101010] p-5">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-sm text-zinc-400">System Landscape</p>
                  <p className="text-xl font-semibold text-white">DEV → QAS → PRD</p>
                </div>
                <ShieldCheck className="h-7 w-7 text-[#5bb3ff]" />
              </div>
              <div className="space-y-4">
                {[
                  { label: "Error Finder", progress: "92%", icon: AlertTriangle },
                  { label: "Transport Impact", progress: "78%", icon: Network },
                  { label: "Blueprint Generator", progress: "86%", icon: BookOpenCheck },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} className="rounded-2xl border border-[#2a2a2a] bg-[#181818] p-4">
                      <div className="mb-3 flex items-center justify-between text-sm">
                        <span className="flex items-center gap-2 font-medium text-zinc-100"><Icon className="h-4 w-4 text-[#5bb3ff]" /> {item.label}</span>
                        <span className="text-zinc-400">{item.progress}</span>
                      </div>
                      <div className="h-2 rounded-full bg-[#2a2a2a]">
                        <div className="h-2 rounded-full bg-[#0A6ED1]" style={{ width: item.progress }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </Card>
        </section>

        <section id="modules" className="py-10">
          <div className="mb-7 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <Badge className="mb-3 rounded-full border border-[#0A6ED1]/35 bg-[#0A6ED1]/12 text-[#9ad1ff]">Hauptmodule</Badge>
              <h2 className="text-3xl font-semibold tracking-tight text-white">Sechs spezialisierte SAP-Workflows</h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-zinc-400">
              Jede Karte führt direkt in einen fokussierten Arbeitsbereich mit definierten Inputs und strukturierten Outputs.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {modules.map((module) => {
              const Icon = module.icon;
              const isActive = module.id === activeModule;
              return (
                <button
                  key={module.id}
                  onClick={() => handleSelectModule(module)}
                  className={`group rounded-2xl border p-5 text-left shadow-[0_22px_70px_rgba(0,0,0,0.35)] transition duration-300 hover:-translate-y-1 hover:bg-[#202020] hover:shadow-[0_30px_90px_rgba(0,0,0,0.55)] ${
                    isActive ? "border-[#0A6ED1]/70 bg-[#202020]" : "border-[#2a2a2a] bg-[#181818]"
                  }`}
                >
                  <div className="mb-5 flex items-start justify-between gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#0A6ED1]/30 bg-[#0A6ED1]/12">
                      <Icon className="h-6 w-6 text-[#5bb3ff]" />
                    </div>
                    <ArrowRight className="h-5 w-5 text-zinc-500 transition group-hover:translate-x-1 group-hover:text-[#5bb3ff]" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold text-white">{module.title}</h3>
                  <p className="mb-5 min-h-[72px] text-sm leading-6 text-zinc-400">{module.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {module.acceptedInputs.map((input) => (
                      <span key={input} className="rounded-full border border-[#2a2a2a] bg-[#101010] px-3 py-1 text-xs text-zinc-300">
                        {input}
                      </span>
                    ))}
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        <section id="workspace" className="grid gap-5 py-10 lg:grid-cols-[0.9fr_1.1fr]">
          <Card className="rounded-[1.75rem] border-[#2a2a2a] bg-[#181818] p-5 shadow-[0_30px_90px_rgba(0,0,0,0.4)]">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0A6ED1]/15">
                <SelectedModuleIcon className="h-6 w-6 text-[#5bb3ff]" />
              </div>
              <div>
                <p className="text-sm text-zinc-400">Aktiver Workflow</p>
                <h2 className="text-2xl font-semibold text-white">{selectedModule.title}</h2>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <Label htmlFor="module-input" className="text-sm font-medium text-zinc-200">
                  {selectedModule.inputLabel}
                </Label>

                <Textarea
                  id="module-input"
                  value={inputValue}
                  onChange={(event) => setInputValue(event.target.value)}
                  placeholder={selectedModule.inputPlaceholder}
                  className="mt-3 min-h-[220px] rounded-2xl border-[#2a2a2a] bg-[#101010] p-4 text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-[#0A6ED1]"
                />
              </div>
              <div className="rounded-2xl border border-dashed border-[#2a2a2a] bg-[#101010] p-4">
                <div className="flex items-center gap-3 text-sm text-zinc-300">
                  <UploadCloud className="h-5 w-5 text-[#5bb3ff]" />
                  Optional: Screenshot-Kontext, Exporttext oder Protokollauszug im Eingabefeld beschreiben.
                </div>
              </div>
              <Button className="w-full rounded-2xl bg-[#0A6ED1] py-6 text-base font-semibold text-white hover:bg-[#0b7eea]">
                Strukturierte Ausgabe generieren
              </Button>
            </div>
          </Card>

          <Card className="rounded-[1.75rem] border-[#2a2a2a] bg-[#181818] p-5 shadow-[0_30px_90px_rgba(0,0,0,0.4)]">
            <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
              <div>
                <p className="text-sm text-zinc-400">APICOSU Output</p>
                <h2 className="text-2xl font-semibold text-white">{analysis.title}</h2>
              </div>
              <Badge className="w-fit rounded-full bg-[#0A6ED1]/15 text-[#9ad1ff] hover:bg-[#0A6ED1]/20">
                {selectedModule.shortTitle}
              </Badge>
            </div>
            <div className="space-y-4">
              {analysis.sections.map((section) => (
                <div key={section.heading} className="rounded-2xl border border-[#2a2a2a] bg-[#101010] p-4">
                  <h3 className="mb-3 font-semibold text-white">{section.heading}</h3>
                  <ul className="space-y-2 text-sm leading-6 text-zinc-300">
                    {section.items.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0A6ED1]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Card>
        </section>

        <section id="governance" className="py-10">
          <Card className="overflow-hidden rounded-[1.75rem] border-[#2a2a2a] bg-[#181818] shadow-[0_30px_90px_rgba(0,0,0,0.4)]">
            <div className="grid gap-0 lg:grid-cols-[0.75fr_1.25fr]">
              <div className="border-b border-[#2a2a2a] bg-[#101010] p-6 lg:border-b-0 lg:border-r">
                <Badge className="mb-4 rounded-full border border-[#0A6ED1]/35 bg-[#0A6ED1]/12 text-[#9ad1ff]">Beratungsstandard</Badge>
                <h2 className="mb-3 text-2xl font-semibold text-white">Präzise SAP-Aussagen statt generischer Antworten.</h2>
                <p className="text-sm leading-6 text-zinc-400">
                  APICOSU strukturiert Ergebnisse mit validierbaren SAP-Begriffen, vermeidet erfundene Transaktionen und trennt fachliche Bewertung von technischer Prüfung.
                </p>
              </div>
              <div className="grid gap-4 p-6 sm:grid-cols-3">
                {[
                  { title: "Keine Fantasieobjekte", text: "Nur bekannte SAP-Konzepte und prüfbare Tabellen-/Transaktionshinweise verwenden." },
                  { title: "Klare Outputs", text: "Analysen liefern Ursache, Risiko, Lösung, Test und Dokumentationspunkte." },
                  { title: "Consulting-ready", text: "Strukturierte Ergebnisse für Workshops, QAS-Tests und Blueprint-Dokumente." },
                ].map((item) => (
                  <div key={item.title} className="rounded-2xl border border-[#2a2a2a] bg-[#101010] p-4">
                    <h3 className="mb-2 font-semibold text-white">{item.title}</h3>
                    <p className="text-sm leading-6 text-zinc-400">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </section>
      </main>
    </div>
  );
};

export default Index;
