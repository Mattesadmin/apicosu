// src/utils/ocr.ts

export async function extractTextFromFile(file: File): Promise<string> {
  if (typeof window === "undefined") {
    return "";
  }

  // @ts-ignore
  const Tesseract = window.Tesseract;

  const result = await Tesseract.recognize(file, "eng", {
    logger: () => {}
  });

  return result.data.text || "";
}
