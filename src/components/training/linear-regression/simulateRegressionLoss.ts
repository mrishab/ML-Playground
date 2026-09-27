import type { LossPoint, StepCallback } from "@/types/loss";

export async function simulateRegressionSteps(
  initialTrainMSE: number,
  finalTrainMSE: number,
  initialValMSE: number,
  finalValMSE: number,
  totalSteps = 30,
  onStep?: StepCallback,
): Promise<void> {
  if (!onStep) return;

  for (let t = 1; t <= totalSteps; t++) {
    const progress = 1 - Math.exp(-0.15 * t);
    const noise =
      (Math.random() - 0.5) *
      0.03 *
      (1 - progress) *
      (initialTrainMSE - finalTrainMSE);
    const loss = Math.max(
      finalTrainMSE,
      finalTrainMSE +
        (initialTrainMSE - finalTrainMSE) * (1 - progress) +
        noise,
    );
    const valLoss = Math.max(
      finalValMSE,
      finalValMSE + (initialValMSE - finalValMSE) * (1 - progress),
    );

    const point: LossPoint = {
      step: t,
      loss: Number(loss.toFixed(4)),
      valLoss: Number(valLoss.toFixed(4)),
    };

    onStep(point, t === totalSteps);
    await new Promise((r) => setTimeout(r, 30));
  }
}
