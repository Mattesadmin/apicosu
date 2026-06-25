export async function runBlueprint({ combined }: { combined: string }) {
  return {
    module: "Blueprint Generator",
    length: combined.length,
    preview: combined.slice(0, 300),
    message: "Blueprint erfolgreich generiert",
    content: combined.toUpperCase()
  };
}
