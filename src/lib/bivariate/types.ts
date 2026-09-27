import type { RegressionFit } from "./regressionFit";

export type { RegressionFit };

export interface ColumnSummaryStats {
  count: number;
  mean: number;
  std: number;
  min: number;
  q25: number;
  median: number;
  q75: number;
  max: number;
  iqr: number;
}

export interface BivariateAnalysis {
  featureName: string;
  targetName: string;
  pearsonR: number;
  spearmanRho: number;
  covariance: number;
  fit: RegressionFit;
  xStats: ColumnSummaryStats;
  yStats: ColumnSummaryStats;
  strengthLabel: string;
  directionLabel: string;
  summarySentence: string;
}
