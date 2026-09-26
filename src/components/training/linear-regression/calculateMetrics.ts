import type { RegressionMetrics } from "@/types/regression";

export function calculateMetrics(
  predictions: number[],
  actuals: number[],
): RegressionMetrics {
  const n = predictions.length;
  const yMean = actuals.reduce((sum, y) => sum + y, 0) / n;
  const residuals = actuals.map((y, i) => y - predictions[i]);
  const squaredResiduals = residuals.map((r) => r * r);

  const rss = squaredResiduals.reduce((sum, sr) => sum + sr, 0);
  const tss = actuals.reduce((sum, y) => sum + (y - yMean) ** 2, 0);
  const mse = rss / n;
  const rse = Math.sqrt(rss / (n - 2));
  const rSquared = 1 - rss / tss;

  return {
    mse,
    rse,
    rSquared,
    residuals,
    squaredResiduals,
    rss,
    tss,
    yMean,
    n,
    predictions,
    actuals,
  };
}
