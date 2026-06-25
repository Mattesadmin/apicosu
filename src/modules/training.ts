export async function runTraining({ combined }: { combined: string }) {
  return {
    module: "Training Generator",
    steps: combined.split(".").map((s) => s.trim()).filter(Boolean),
    stepCount: combined.split(".").length
  };
}
