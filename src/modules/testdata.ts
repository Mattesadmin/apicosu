import { parseRequest } from "./utils";

export async function runTestdata(req: Request) {
  const { combined } = await parseRequest(req);

  // TODO: echte Testdaten-Generierung
  const suggestedScenarios = [
    "Standardprozess mit Erfolgsfall",
    "Fehlerfall mit ungültigen Eingaben",
    "Grenzwerte (maximale Feldlängen, Datumsgrenzen)"
  ];

  return {
    module: "Testdaten Generator",
    suggestedScenarios,
    length: combined.length,
    preview: combined.slice(0, 300)
  };
}
