import {
  AlertTriangle,
  Boxes,
  FileText,
  GitBranch,
  GraduationCap,
  Table2,
  type LucideIcon,
} from "lucide-react";

export type ApicosuModule = {
  title: string;
  navTitle: string;
  description: string;
  icon: LucideIcon;
  input: string;
  output: string;
  path: string;
  textPlaceholder: string;
  api: string; // ← WICHTIG: API-ROUTE
};

export const modules: ApicosuModule[] = [
  {
    title: "Error Finder",
    navTitle: "Error Finder",
    description:
      "Analysiert SAP-Fehlertexte und liefert präzise Ursachen, Lösungsvorschläge und technische Details.",
    icon: AlertTriangle,
    input: "SAP-Fehlermeldung, Screenshot, Modul FI/MM/SD/PP/Basis",
    output: "Ursache, Workaround, Tabellen, Transaktionen, technische Analyse",
    path: "/error-finder",
    textPlaceholder:
      "SAP-Fehlermeldung, Langtext, Systemkontext oder betroffene Anwendung eingeben...",
    api: "error-finder",
  },
  {
    title: "Customizing Analyzer",
    navTitle: "Customizing Analyzer",
    description:
      "Prüft Customizing-Einstellungen, IMG-Pfade und Tabellen auf Konflikte und Abhängigkeiten.",
    icon: Boxes,
    input: "Tabellen, IMG-Pfade, Customizing-Exports, Screenshots",
    output: "Konflikte, fehlende Einstellungen, Risiken, Empfehlungen",
    path: "/customizing-analyzer",
    textPlaceholder:
      "IMG-Pfad, Customizing-Auszug, Tabellen oder Prozesskontext eingeben...",
    api: "customizing-analyzer",
  },
  {
    title: "Transport Impact Analyzer",
    navTitle: "Transport Impact Analyzer",
    description:
      "Bewertet Transportauswirkungen auf Programme, Tabellen, Abhängigkeiten und Testbedarf.",
    icon: GitBranch,
    input: "Transportnummern, Protokolle, Objekttypen, Systemlandschaft",
    output: "Risiken, Konflikte, Reihenfolge, betroffene Objekte, Tests",
    path: "/transport-impact-analyzer",
    textPlaceholder:
      "Transportnummern, Objektliste, Importprotokoll oder Systemlandschaft eingeben...",
    api: "transport-impact",
  },
  {
    title: "Blueprint Generator",
    navTitle: "Blueprint Generator",
    description:
      "Erstellt strukturierte Blueprint-Dokumentationen aus Prozess- und SAP-Informationen.",
    icon: FileText,
    input: "Prozessbeschreibung, Tabellen, Transaktionen, Customizing-Infos",
    output: "Prozessfluss, Rollen, Felder, Customizing, offene Punkte",
    path: "/blueprint-generator",
    textPlaceholder:
      "Prozessbeschreibung, Rollen, Tabellen, Felder oder offene Punkte eingeben...",
    api: "blueprint",
  },
  {
    title: "Testdaten Generator",
    navTitle: "Test Data Generator",
    description:
      "Generiert realistische, konsistente Testdaten für SAP-Prozesse und Tabellenbeziehungen.",
    icon: Table2,
    input: "Prozess, Tabellen, Felder, Constraints, Abhängigkeiten",
    output: "Testdatensätze, Tabellenwerte, IDs, JSON- oder Tabellenstruktur",
    path: "/test-data-generator",
    textPlaceholder:
      "Prozess, Tabellen, Felder, Constraints oder gewünschte Datenstruktur eingeben...",
    api: "testdata",
  },
  {
    title: "Training Generator",
    navTitle: "Training Generator",
    description:
      "Erzeugt Trainingsunterlagen aus SAP-Prozessen.",
    icon: GraduationCap,
    input: "Prozessbeschreibung, Screenshots, Tabellen, Rollen",
    output: "Schritt-Anleitung, Rollenbeschreibung, Übungen, PDF-Struktur",
    path: "/training-generator",
    textPlaceholder:
      "Prozessbeschreibung, Zielgruppe, Rollen oder Trainingsziel eingeben...",
    api: "training",
  },
];
