import { parseRequest } from "./utils";

export const config = {
  runtime: "edge"
};

export default async function handler(req: Request) {
  const { combined } = await parseRequest(req);

  const errors = [];
  if (combined.includes("DUMP")) errors.push("ABAP Dump erkannt");
  if (combined.includes("EXCEPTION")) errors.push("Exception erkannt");
  if (combined.includes("UPDATE_FAILED")) errors.push("Update-Fehler erkannt");

  return new Response(
    JSON.stringify({
      module: "Error Finder",
      foundErrors: errors,
      length: combined.length,
      preview: combined.slice(0, 300)
    }),
    { status: 200 }
  );
}