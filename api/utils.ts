export async function parseRequest(req: Request) {
  const formData = await req.formData();

  const file = formData.get("file") as File | null;
  const textInput = formData.get("text") as string | null;

  let fileContent = "";
  if (file) {
    const buffer = await file.arrayBuffer();
    fileContent = Buffer.from(buffer).toString("utf8");
  }

  return {
    fileContent,
    textInput: textInput || "",
    combined: `${fileContent}\n${textInput || ""}`.trim()
  };
}
