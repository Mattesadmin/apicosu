// src/utils/ocr.ts

// Diese Datei wird von Vercel gebundled – also KEIN Tesseract import hier!

export async function extractTextFromFile(file: File): Promise<string> {
  // Nur im Browser laden
  if (typeof window === "undefined") {
    return "";
  }

  // Dynamisch die client-only Version laden
  const { extractTextFromFile: clientFn } = await import("./ocr.client");

  return clientFn(file);
}
