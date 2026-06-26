
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
    // Vercel liefert den Body direkt in req.body
    const { text, model } = req.body || {};

    if (!text) {
      res.status(400).json({ error: "No text provided" });
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
          { role: "user", content: text }
        ]
      });

      aiResponse = completion.choices[0].message.content || "";
    }

    // -----------------------------
    // ANTHROPIC
    // -----------------------------
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

    // -----------------------------
    // KI-Antwort kann bereits JSON sein
    // -----------------------------
    if (typeof aiResponse === "object") {
      res.status(200).json(aiResponse);
      return;
    }

    // -----------------------------
    // Falls KI Text liefert → JSON extrahieren
    // -----------------------------
    const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);

    if (!jsonMatch) {
      res.status(500).json({
        error: "KI lieferte kein gültiges JSON",
        raw: aiResponse
      });
      return;
    }

    const cleanJson = jsonMatch[0];

    // JSON validieren
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
