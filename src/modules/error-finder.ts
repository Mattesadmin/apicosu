import {
  extractProgram,
  extractDumpType,
  extractTables,
  extractRFCFunction,
  extractTransaction,
  extractUser,
  extractClient,
  extractInclude,
  extractLine
} from "../lib/error-finder-helpers";

type ErrorDetail = {
  type: string;
  message: string;
  context?: string;
  objects?: string[];
  severity: "critical" | "high" | "medium" | "low";
  recommendation?: string;
};

export async function runErrorFinder({ combined }: { combined: string }) {
  const errors: ErrorDetail[] = [];

  // ---------------------------------------------
  // MESSAGE_TYPE_X
  // ---------------------------------------------
  if (combined.includes("MESSAGE_TYPE_X")) {
    errors.push({
      type: "MESSAGE_TYPE_X",
      message: "Abbruch durch MESSAGE_TYPE_X (nicht abgefangene Ausnahme).",
      context: extractProgram(combined),
      severity: "critical",
      recommendation:
        "Stelle finden, an der MESSAGE_TYPE_X ausgelöst wird; Ausnahme sauber abfangen oder Logik korrigieren."
    });
  }

  // ---------------------------------------------
  // ABAP Dump / Short Dump
  // ---------------------------------------------
  const dumpType = extractDumpType(combined);
  if (dumpType) {
    errors.push({
      type: "ABAP Dump",
      message: dumpType,
      context: extractProgram(combined),
      objects: extractTables(combined),
      severity: "high",
      recommendation:
        "ST22-Eintrag analysieren, fehlerhafte Anweisung identifizieren und Ursache (z.B. Null-Referenz, Typfehler, fehlende Daten) beheben."
    });
  }

  // ---------------------------------------------
  // DBSQL Fehler
  // ---------------------------------------------
  if (combined.includes("DBSQL") || combined.includes("SQL_ERROR")) {
    errors.push({
      type: "DBSQL Fehler",
      message: "Datenbankfehler (DBSQL/SQL_ERROR) erkannt.",
      objects: extractTables(combined),
      severity: "high",
      recommendation:
        "Tabellenkonsistenz prüfen, Keys und Selektionsbedingungen kontrollieren, ggf. falsches Customizing oder doppelte Einträge bereinigen."
    });
  }

  // ---------------------------------------------
  // Berechtigungsfehler
  // ---------------------------------------------
  if (
    combined.includes("NO_AUTHORITY") ||
    combined.includes("NOT_AUTHORIZED") ||
    combined.includes("RFC_NO_AUTHORITY")
  ) {
    errors.push({
      type: "Berechtigungsfehler",
      message: "Fehlende Berechtigung für eine Aktion oder ein Objekt.",
      severity: "medium",
      recommendation:
        "SU53 auswerten, Rollen/Profile prüfen, Berechtigungsobjekte gezielt nachziehen."
    });
  }

  // ---------------------------------------------
  // RFC Fehler
  // ---------------------------------------------
  const rfcFunc = extractRFCFunction(combined);
  if (rfcFunc) {
    errors.push({
      type: "RFC Fehler",
      message: `Fehler beim Aufruf des RFC-Funktionsbausteins ${rfcFunc}.`,
      severity: "high",
      recommendation:
        "Verbindung, Zielsystem, Benutzer und Berechtigungen prüfen; Funktionsbaustein im Zielsystem testen."
    });
  }

  // ---------------------------------------------
  // ENQUEUE / Sperrfehler
  // ---------------------------------------------
  if (combined.includes("ENQUEUE") || combined.includes("LOCK")) {
    errors.push({
      type: "Sperrfehler",
      message: "Sperrobjekt/Locking-Problem erkannt.",
      severity: "medium",
      recommendation:
        "SM12 prüfen, konkurrierende Prozesse identifizieren, Sperrlogik überarbeiten."
    });
  }

  // ---------------------------------------------
  // Kontextinformationen (werden nicht als Fehler gewertet)
  // ---------------------------------------------
  const context = {
    program: extractProgram(combined),
    transaction: extractTransaction(combined),
    user: extractUser(combined),
    client: extractClient(combined),
    include: extractInclude(combined),
    line: extractLine(combined)
  };

  return {
    module: "Error Finder",
    foundErrors: errors,
    context,
    length: combined.length,
    preview: combined.slice(0, 300)
  };
}
