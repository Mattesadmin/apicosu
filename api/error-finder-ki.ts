import { OpenAI } from "openai";
import { Anthropic } from "@anthropic-ai/sdk";

export const config = {
  runtime: "node.js",
};

const SYSTEM_PROMPT = `
Du bist ein Senior SAP-Basis- und ABAP-Experte mit über 15 Jahren Erfahrung.
Du analysierst SAP-Fehlertexte, Dumps, Logs, ST22-Ausgaben, Systemmeldungen,
Customizing-Konflikte, Transportprobleme und Berechtigungsfehler.

Liefere IMMER eine präzise, strukturierte und professionelle Analyse im folgenden JSON-Format:

{
  "error_summary": "",
  "error_classification": "",
  "root_cause": [],
  "technical_details": [],
  "solution_steps": [],
  "customizing_hints": [],
  "abap_hints": [],
  "risk_assessment": "",
  "priority": "",
  "recommended_actions": []
}

Regeln:
- Keine Einleitungen, keine Floskeln.
- Nur konkrete, technische Aussagen.
- Wenn Informationen fehlen, mache plausible Annahmen.
- Wenn mehrere Ursachen möglich sind, liste alle auf.
- Wenn der Fehler typisch für bestimmte SAP-Module ist, erwähne es.
- Wenn ABAP-Code relevant ist, liefere konkrete Hinweise.
- Wenn Customizing relevant ist, nenne Tabellen, Pfade und Transaktionen.
- Wenn Berechtigungen relevant sind, nenne Rollen/Objekte.
- Wenn Transportprobleme möglich sind, erwähne sie.
- Wenn Performance relevant ist, nenne Tabellen, Indizes, Selektionslogik.
`;

export default async function handler(req: Request) {
  try {
    const { text, model } = await req.json();

    if (!text) {
      return new Response(JSON.stringify({ error: "No text provided" }), { status: 400 });
    }

    let aiResponse = "";

    if (model === "openai") {
      const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

      const completion = await client.chat.completions.create({
        model: "gpt-4.1",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: text }
        ]
      });

      aiResponse = completion.choices[0].message.content;
    } else {
      const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

      const completion = await client.messages.create({
        model: "claude-3.5-sonnet",
        max_tokens: 1200,
        messages: [
          { role: "user", content: SYSTEM_PROMPT + "\n\n" + text }
        ]
      });

      aiResponse = completion.content[0].text;
    }

    return new Response(JSON.stringify({ ai: aiResponse }), {
      headers: { "Content-Type": "application/json" }
    });

  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
