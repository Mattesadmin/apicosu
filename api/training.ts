import { parseRequest } from "./utils";

export const config = {
  runtime: "edge"
};

export default async function handler(req: Request) {
  const { combined } = await parseRequest(req);

  return new Response(
    JSON.stringify({
      module: "Training Generator",
      steps: [
        "1. Transaktion öffnen",
        "2. Eingabefelder prüfen",
        "3. Werte erfassen",
        "4. Validierung durchführen",
        "5. Buchung ausführen"
      ],
      inputPreview: combined.slice(0, 300)
    }),
    { status: 200 }
  );
}