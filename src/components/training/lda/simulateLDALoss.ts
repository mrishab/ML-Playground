import type { LossPoint, StepCallback } from "@/types/loss";

export async function simulateLDASteps(
  accuracy: number,
  totalSteps = 25,
  onStep?: StepCallback,
): Promise<void> {
  if (!onStep) return;

  const finalScatterRatio = Math.max(0.08, (1 - accuracy) * 1.2);
  const initialScatterRatio = Math.min(2.5, finalScatterRatio * 3.5 + 0.5);

  for (let t = 1; t <= totalSteps; t++) {
    const progress = 1 - Math.exp(-0.16 * t);
    const noise = (Math.random() - 0.5) * 0.03 * (1 - progress);
    const loss = Math.max(
      finalScatterRatio,
      finalScatterRatio +
        (initialScatterRatio - finalScatterRatio) * (1 - progress) +
        noise,
    );
    const fisherVariance = Math.min(100, Math.round(progress * 100));

    const point: LossPoint = {
      step: t,
      loss: Number(loss.toFixed(4)),
      secondary: fisherVariance,
    };

    onStep(point, t === totalSteps);
    await new Promise((r) => setTimeout(r, 30));
  }
}
