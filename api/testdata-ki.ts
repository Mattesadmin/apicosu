import { OpenAI } from "openai";

export const config = {
  runtime: "nodejs",
};

const SYSTEM_PROMPT = `
Du bist ein Senior SAP-Testdaten-Experte.
Generiere konsistente Testdaten für Tabellen, Felder und Beziehungen.

Gib IMMER folgendes JSON zurück:

{
  "data_summary": "",
  "tables": [],
  "fields": [],
  "constraints": [],
  "generated_records": [],
  "relationships": [],
  "recommended_actions": []
}
`;

export default async function handler(req, res) {
  try {
    const { text } = req.body || {};

    if (!text) {
      res.status(400).json({ error: "No text provided" });
      return;
    }

    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const completion = await client.chat.completions.create({
      model: "gpt-4.1",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: text }
      ]
    });

    const aiResponse = completion.choices[0].message.content || "";
    const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);

    if (!jsonMatch) {
      res.status(500).json({ error: "Invalid JSON", raw: aiResponse });
      return;
    }

    res.status(200).json(JSON.parse(jsonMatch[0]));

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
