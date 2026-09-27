import {
  calculatePearsonCorrelation,
  calculateSpearmanCorrelation,
  calculateLinearRegressionFit,
} from "@/lib/bivariate";
import type { FeatureSeriesData } from "@/types/dataset";

export interface FeatureRankItem {
  feature: string;
  r: number;
  absR: number;
  rho: number;
  r2: number;
  direction: string;
}

export function buildFeatureRankings(
  featureNames: string[],
  featureVectors: FeatureSeriesData,
  targetVector: number[],
): FeatureRankItem[] {
  const rankings: FeatureRankItem[] = featureNames.map((f) => {
    const x = featureVectors[f] ?? [];
    const r = calculatePearsonCorrelation(x, targetVector);
    const rho = calculateSpearmanCorrelation(x, targetVector);
    const fit = calculateLinearRegressionFit(x, targetVector);
    return {
      feature: f,
      r: Number(r.toFixed(3)),
      absR: Math.abs(r),
      rho: Number(rho.toFixed(3)),
      r2: Number(fit.r2.toFixed(3)),
      direction: r > 0.05 ? "Positive" : r < -0.05 ? "Negative" : "Neutral",
    };
  });

  rankings.sort((a, b) => b.absR - a.absR);
  return rankings;
}
