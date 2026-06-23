import { parseRequest } from "./utils";

export const config = {
  runtime: "edge"
};

export default async function handler(req: Request) {
  const { combined } = await parseRequest(req);

  return new Response(
    JSON.stringify({
      module: "Testdaten Generator",
      examples: [
        { field: "BUKRS", value: "1000" },
        { field: "WERKS", value: "1010" },
        { field: "MATNR", value: "MAT-10001" }
      ],
      inputPreview: combined.slice(0, 300)
    }),
    { status: 200 }
  );
}