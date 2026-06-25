export async function callApiForm(endpoint: string, formData: FormData) {
  const response = await fetch(`/api/${endpoint}`, {
    method: "POST",
    body: formData
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`API error ${response.status}: ${text}`);
  }

  return response.json();
}
