import type { DataFrame } from "danfojs";
import { calculateSummaryStats } from "@/lib/bivariate/summaryStats";
import { calculatePearsonCorrelation } from "@/lib/bivariate/pearson";
import { getCorrelationStrength } from "@/lib/bivariate/strengthHelper";
import type { FeatureStatSummary } from "@/types/savedModel";

export function extractFeatureAnalysis(
  xTrain: DataFrame | null,
  yTrain: DataFrame | null,
  targetColumn: string,
): FeatureStatSummary[] {
  if (!xTrain) return [];
  const featureNames = xTrain.columns as string[];
  const targetValues = yTrain && targetColumn
    ? (yTrain.column(targetColumn).values as number[])
    : null;
  const isTargetNumeric =
    targetValues && targetValues.every((v) => typeof v === "number");

  return featureNames.map((name) => {
    const rawVals = (xTrain.column(name).values as number[]).filter(
      (v) => typeof v === "number" && !isNaN(v),
    );
    const stats = calculateSummaryStats(rawVals);
    let correlationWithTarget: number | undefined;
    let correlationStrength: string | undefined;

    if (isTargetNumeric && targetValues.length === rawVals.length) {
      const r = calculatePearsonCorrelation(rawVals, targetValues);
      if (!isNaN(r)) {
        correlationWithTarget = Number(r.toFixed(4));
        correlationStrength = getCorrelationStrength(Math.abs(r));
      }
    }

    return {
      feature: name,
      mean: Number(stats.mean.toFixed(4)),
      std: Number(stats.std.toFixed(4)),
      min: Number(stats.min.toFixed(4)),
      max: Number(stats.max.toFixed(4)),
      correlationWithTarget,
      correlationStrength,
    };
  });
}
