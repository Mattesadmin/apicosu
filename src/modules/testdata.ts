export async function runTestdata({ combined }: { combined: string }) {
  return {
    module: "Testdaten Generator",
    generated: combined.split("\n").map((line, i) => ({
      id: i + 1,
      value: line.trim()
    })),
    count: combined.split("\n").length
  };
}
