import { parseRequest } from "./utils";

export const config = {
  runtime: "edge"
};

export default async function handler(req: Request) {
  const { combined } = await parseRequest(req);

  return new Response(
    JSON.stringify({
      module: "Blueprint Generator",
      structure: [
        "1. Ausgangssituation",
        "2. Zieldefinition",
        "3. Prozessbeschreibung",
        "4. Technische Details",
        "5. Risiken & Abhängigkeiten",
        "6. Empfehlungen"
      ],
      inputPreview: combined.slice(0, 300)
    }),
    { status: 200 }
  );
}