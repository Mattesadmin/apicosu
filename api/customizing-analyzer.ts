import { parseRequest } from "./utils";

export const config = {
  runtime: "edge"
};

export default async function handler(req: Request) {
  const { combined } = await parseRequest(req);

  const tables = ["T001", "T100", "TSTC", "T030", "T003"];
  const foundTables = tables.filter(t => combined.includes(t));

  return new Response(
    JSON.stringify({
      module: "Customizing Analyzer",
      foundTables,
      hasIMG: combined.includes("SPRO") || combined.includes("IMG"),
      preview: combined.slice(0, 300)
    }),
    { status: 200 }
  );
}