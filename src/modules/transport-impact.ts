import { parseRequest } from "./utils";

export async function runTransportImpact(req: Request) {
  const { combined } = await parseRequest(req);

  // TODO: echte Transport-Impact-Logik
  const risks: string[] = [];
  if (combined.includes("SPAU")) risks.push("SPAU-Konflikte möglich");
  if (combined.includes("SPDD")) risks.push("SPDD-Anpassungen prüfen");
  if (combined.includes("Z_")) risks.push("Eigenentwicklungen von Transporten betroffen");

  return {
    module: "Transport Impact Analyzer",
    risks,
    length: combined.length,
    preview: combined.slice(0, 300)
  };
}
