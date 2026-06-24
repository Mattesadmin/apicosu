import { parseRequest } from "./utils";

export async function runCustomizingAnalyzer(req: Request) {
  const { combined } = await parseRequest(req);

  // TODO: echte Customizing-Analyse
  const findings: string[] = [];

  if (combined.includes("Z_")) findings.push("Eigenes Z-Customizing erkannt");
  if (combined.includes("BADI")) findings.push("BAdI-Implementierung erwähnt");
  if (combined.includes("USEREXIT")) findings.push("User-Exit-Hinweise gefunden");

  return {
    module: "Customizing Analyzer",
    findings,
    length: combined.length,
    preview: combined.slice(0, 300)
  };
}
