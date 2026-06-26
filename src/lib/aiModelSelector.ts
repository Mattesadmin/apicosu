// src/lib/aiModelSelector.ts

/**
 * Automatische Modellwahl für APICOSU-Module.
 * 
 * Aktuell: Fallback auf OpenAI, bis Anthropic wieder funktioniert.
 * Später: Automatische Modellwahl aktivieren.
 */

export function selectModelForModule(moduleApi: string): "openai" | "anthropic" {
  // SPÄTER: Automatische Modellwahl aktivieren
  // -----------------------------------------
  // if (moduleApi === "error-finder") return "anthropic";
  // if (moduleApi === "transport-analyzer") return "anthropic";
  // if (moduleApi === "blueprint-generator") return "openai";
  // if (moduleApi === "training-generator") return "openai";

  // JETZT: Immer OpenAI nutzen (bis Anthropic-Token gefixt ist)
  return "openai";
}
