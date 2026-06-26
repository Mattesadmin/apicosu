// src/lib/aiErrorFinder.ts

import { selectModelForModule } from "./aiModelSelector";

export async function analyzeErrorWithAI(text: string, moduleApi: string) {
  try {
    const model = selectModelForModule(moduleApi);

    const response = await fetch("/api/error-finder-ki", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, model })
    });

    const data = await response.json();

    if (!data.ai) {
      return {
        error: "KI-Antwort leer oder ungültig",
        raw: data
      };
    }

    // KI-Antwort parsen (falls JSON)
    let parsed = null;
    try {
      parsed = JSON.parse(data.ai);
    } catch {
      parsed = { raw: data.ai };
    }

    return parsed;

  } catch (err: any) {
    return {
      error: err.message || "Unbekannter KI-Fehler"
    };
  }
}
