import { OpenAI } from "openai";
import { Anthropic } from "@anthropic-ai/sdk";

export const config = {
  runtime: "nodejs",
};

const SYSTEM_PROMPT = `
Du bist ein Senior SAP-Customizing-Experte mit über 15 Jahren Erfahrung.
Du analysierst IMG-Pfade, Tabellen, Customizing-Exporte, Prozessbeschreibungen
und Systemkontexte und erkennst fehlende Einstellungen, Konflikte und Abhängigkeiten.

Liefere IMMER eine präzise, strukturierte und professionelle Analyse im folgenden JSON-Format:

{
  "customizing_summary": "",
  "customizing_area": "",
  "root_cause": [],
  "missing_settings": [],
  "dependent_settings": [],
  "solution_steps": [],
  "transport_notes": [],
  "risk_assessment": "",
  "recommended_actions": []
}
`;

export default async function handler(req, res) {
  try {
    const { text, model } = req.body || {};

    if (!text) {
      res.status(400).json({ error: "No text provided" });
      return;
    }

    let aiResponse = "";

    // OPENAI
    if (model === "openai") {
      const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

      const completion = await client.chat.completions.create({
        model: "gpt-4.1",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: text }
        ]
      });

      aiResponse = completion.choices[0].message.content || "";
    }

    // ANTHROPIC
    else {
      const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

      const completion = await client.messages.create({
        model: "claude-3-5-sonnet-latest",
        max_tokens: 2000,
        messages: [
          { role: "user", content: SYSTEM_PROMPT + "\n\n" + text }
        ]
      });

      aiResponse = "";
      for (const block of completion.content) {
        if (block.type === "text") {
          aiResponse += block.text;
        }
      }
    }

    // KI-Antwort kann bereits JSON sein
    if (typeof aiResponse === "object") {
      res.status(200).json(aiResponse);
      return;
    }

    // JSON aus Text extrahieren
    const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);

    if (!jsonMatch) {
      res.status(500).json({
        error: "KI lieferte kein gültiges JSON",
        raw: aiResponse
      });
      return;
    }

    const cleanJson = jsonMatch[0];

    try {
      const parsed = JSON.parse(cleanJson);
      res.status(200).json(parsed);
      return;
    } catch (e) {
      res.status(500).json({
        error: "Ungültiges JSON aus KI",
        raw: aiResponse
      });
      return;
    }

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
