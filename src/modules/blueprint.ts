import { parseRequest } from "./utils";

export async function runBlueprint(req: Request) {
  const { combined } = await parseRequest(req);

  // TODO: echte Blueprint-Logik
  return {
    module: "Blueprint Generator",
    length: combined.length,
    preview: combined.slice(0, 300)
  };
}
