import { parseRequest } from "./utils";

export const config = {
  runtime: "edge"
};

export default async function handler(req: Request) {
  const { combined } = await parseRequest(req);

  const objects = combined.match(/(R3TR|LIMU)\s+\w+/g) || [];

  return new Response(
    JSON.stringify({
      module: "Transport Impact Analyzer",
      objects,
      count: objects.length
    }),
    { status: 200 }
  );
}