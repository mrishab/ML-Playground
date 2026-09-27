import type { LossPoint, StepCallback } from "@/types/loss";

export async function simulateLogisticSteps(
  initialLoss: number,
  finalLoss: number,
  initialAccuracy: number,
  finalAccuracy: number,
  totalSteps = 30,
  onStep?: StepCallback,
): Promise<void> {
  if (!onStep) return;

  for (let t = 1; t <= totalSteps; t++) {
    const progress = 1 - Math.exp(-0.16 * t);
    const noise = (Math.random() - 0.5) * 0.02 * (1 - progress);
    const loss = Math.max(
      finalLoss,
      finalLoss + (initialLoss - finalLoss) * (1 - progress) + noise,
    );
    const acc = Math.min(
      finalAccuracy,
      initialAccuracy + (finalAccuracy - initialAccuracy) * progress,
    );

    const point: LossPoint = {
      step: t,
      loss: Number(loss.toFixed(4)),
      secondary: Number((acc * 100).toFixed(1)),
    };

    onStep(point, t === totalSteps);
    await new Promise((r) => setTimeout(r, 30));
  }
}
