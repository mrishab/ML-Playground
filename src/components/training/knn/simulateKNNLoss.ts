import type { LossPoint, StepCallback } from "@/types/loss";

export async function simulateKNNSteps(
  accuracy: number,
  totalSteps = 25,
  onStep?: StepCallback,
): Promise<void> {
  if (!onStep) return;

  const finalLoss = Math.max(0.05, 1 - accuracy);
  const initialLoss = Math.min(1.5, finalLoss * 2.8 + 0.3);

  for (let t = 1; t <= totalSteps; t++) {
    const progress = 1 - Math.exp(-0.18 * t);
    const noise = (Math.random() - 0.5) * 0.04 * (1 - progress);
    const loss = Math.max(
      finalLoss,
      finalLoss + (initialLoss - finalLoss) * (1 - progress) + noise,
    );
    const errorRate = Math.max(
      (1 - accuracy) * 100,
      (1 - accuracy) * 100 + 40 * (1 - progress),
    );

    const point: LossPoint = {
      step: t,
      loss: Number(loss.toFixed(4)),
      secondary: Number(errorRate.toFixed(1)),
    };

    onStep(point, t === totalSteps);
    await new Promise((r) => setTimeout(r, 30));
  }
}
