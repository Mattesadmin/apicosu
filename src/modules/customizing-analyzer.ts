export async function runCustomizingAnalyzer({ combined }: { combined: string }) {
  const findings = [];

  if (combined.includes("SPRO")) findings.push("Customizing-Hinweis: SPRO gefunden");
  if (combined.includes("TABLE")) findings.push("Tabellenreferenz erkannt");

  return {
    module: "Customizing Analyzer",
    findings,
    length: combined.length,
    preview: combined.slice(0, 300)
  };
}
