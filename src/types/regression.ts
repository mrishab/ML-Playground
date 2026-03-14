export type RegressionMetrics = {
  // Core metrics
  mse: number;
  rse: number;
  rSquared: number;

  // Intermediate values for breakdown
  residuals: number[];
  squaredResiduals: number[];
  rss: number;
  tss: number;
  yMean: number;
  n: number;

  // Predictions
  predictions: number[];
  actuals: number[];
};

export type TrainingState = "idle" | "training" | "complete" | "error";
