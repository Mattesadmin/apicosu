// src/utils/ocr.ts

export async function extractTextFromFile(file: File): Promise<string> {
  // Dynamischer Import → wird NICHT in den Server-Build gepackt
  const Tesseract = await import("tesseract.js");

  const result = await Tesseract.recognize(file, "eng", {
    logger: () => {}
  });

  return result.data.text || "";
}
