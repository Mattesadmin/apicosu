// src/utils/ocr.client.ts
export async function extractTextFromFile(file: File): Promise<string> {
  const Tesseract = await import("tesseract.js");

  const result = await Tesseract.recognize(file, "eng", {
    logger: () => {}
  });

  return result.data.text || "";
}
