import Tesseract from "tesseract.js";

export async function extractTextFromFile(file: File): Promise<string> {
  if (file.type.startsWith("image/")) {
    const buffer = await file.arrayBuffer();
    const { data } = await Tesseract.recognize(buffer, "deu+eng", {
      logger: () => {}
    });
    return data.text;
  }

  if (file.type.startsWith("text/")) {
    return await file.text();
  }

  return "[Binary file detected – no text extracted]";
}
