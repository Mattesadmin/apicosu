import { OpenAI } from "openai";
import { Anthropic } from "@anthropic-ai/sdk";

export const config = {
  runtime: "nodejs",
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
`;

export default async function handler(req, res) {
  try {
    // Body einlesen (Node.js Request)
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", async () => {
      let parsed;
      try {
        parsed = JSON.parse(body || "{}");
      } catch (e) {
        res.statusCode = 400;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ error: "Invalid JSON body" }));
        return;
      }

      const { text, model } = parsed;

      if (!text) {
        res.statusCode = 400;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ error: "No text provided" }));
        return;
      }

      let aiResponse = "";

      // -----------------------------
      // OPENAI
      // -----------------------------
      if (model === "openai") {
        const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

        const completion = await client.chat.completions.create({
          model: "gpt-4.1",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            { role: "user", content: text },
          ],
        });

        aiResponse = completion.choices[0].message.content || "";
      }

      // -----------------------------
      // ANTHROPIC
      // -----------------------------
      else {
        const client = new Anthropic({
          apiKey: process.env.ANTHROPIC_API_KEY,
        });

        const completion = await client.messages.create({
          model: "claude-3-5-sonnet-latest",
          max_tokens: 2000,
          messages: [
            { role: "user", content: SYSTEM_PROMPT + "\n\n" + text },
          ],
        });

        aiResponse = "";
        for (const block of completion.content) {
          if (block.type === "text") {
            aiResponse += block.text;
          }
        }
      }

      // -----------------------------
      // JSON aus KI-Antwort extrahieren
      // -----------------------------
      const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);

      if (!jsonMatch) {
        res.statusCode = 500;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ error: "KI lieferte kein gültiges JSON" }));
        return;
      }

      let cleanJson = jsonMatch[0];

      // JSON validieren
      try {
        JSON.parse(cleanJson);
      } catch (e) {
        res.statusCode = 500;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ error: "Ungültiges JSON aus KI" }));
        return;
      }

      // Erfolgreiche Antwort
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.end(cleanJson);
    });
  } catch (err) {
    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ error: err.message }));
  }
}
