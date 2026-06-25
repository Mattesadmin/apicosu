export async function runTransportImpact({ combined }: { combined: string }) {
  const lines = combined.split("\n").filter(Boolean);

  return {
    module: "Transport Impact Analyzer",
    entries: lines.map((line, i) => ({
      id: i + 1,
      raw: line,
      impact: line.length * 2
    })),
    totalImpact: lines.reduce((acc, l) => acc + l.length * 2, 0)
  };
}
