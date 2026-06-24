import { parseRequest } from "./utils";

export async function runTraining(req: Request) {
  const { combined } = await parseRequest(req);

  // TODO: echte Trainingsaufbereitung
  const sections = combined.split(/\n{2,}/).slice(0, 5);

  return {
    module: "Training Generator",
    sections: sections.map((s, i) => ({
      title: `Abschnitt ${i + 1}`,
      content: s.trim()
    })),
    length: combined.length,
    preview: combined.slice(0, 300)
  };
}
