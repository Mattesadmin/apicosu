// ---------------------------------------------
// SMART SAP ERROR EXTRACTOR HELPERS
// ---------------------------------------------

// Extrahiert ABAP-Programm
export function extractProgram(text: string): string | undefined {
  const m = text.match(/ABAP Program\s+([A-Z0-9_]+)/i);
  return m?.[1];
}

// Extrahiert Dump-Typ (z.B. DBSQL_DUPLICATE_KEY_ERROR)
export function extractDumpType(text: string): string | undefined {
  const m = text.match(/Runtime Error\s+([A-Z0-9_]+)/i);
  return m?.[1];
}

// Extrahiert Tabellen (z.B. VBAK, MARA, Z*)
export function extractTables(text: string): string[] {
  const matches =
    text.match(/Table\s+([A-Z0-9_]+)/gi) ||
    text.match(/FROM\s+([A-Z0-9_]+)/gi) ||
    [];
  return matches.map((m) => m.replace(/(Table|FROM)/i, "").trim());
}

// Extrahiert Funktionsbaustein (RFC)
export function extractRFCFunction(text: string): string | undefined {
  const m = text.match(/CALL_FUNCTION\s+([A-Z0-9_]+)/i);
  return m?.[1];
}

// Extrahiert Transaktion (z.B. VA01, SE16, Z*)
export function extractTransaction(text: string): string | undefined {
  const m = text.match(/Transaction\s+([A-Z0-9_]+)/i);
  return m?.[1];
}

// Extrahiert User
export function extractUser(text: string): string | undefined {
  const m = text.match(/User\s+([A-Z0-9_]+)/i);
  return m?.[1];
}

// Extrahiert Mandant (Client)
export function extractClient(text: string): string | undefined {
  const m = text.match(/Client\s+(\d{3})/i);
  return m?.[1];
}

// Extrahiert Include-Datei
export function extractInclude(text: string): string | undefined {
  const m = text.match(/Include\s+([A-Z0-9_]+)/i);
  return m?.[1];
}

// Extrahiert Zeilennummer
export function extractLine(text: string): string | undefined {
  const m = text.match(/Line\s+(\d+)/i);
  return m?.[1];
}
