import { calculatePearsonCorrelation, calculateCovariance } from "./pearson";
import { calculateSpearmanCorrelation } from "./spearman";
import { calculateLinearRegressionFit } from "./regressionFit";
import { calculateSummaryStats } from "./summaryStats";
import {
  getCorrelationStrength,
  getCorrelationDirection,
} from "./strengthHelper";
import type { BivariateAnalysis } from "./types";

export function analyzeBivariate(
  x: number[],
  y: number[],
  featureName: string,
  targetName: string,
  problemType?: string,
): BivariateAnalysis {
  const r = calculatePearsonCorrelation(x, y);
  const rho = calculateSpearmanCorrelation(x, y);
  const cov = calculateCovariance(x, y);
  const fit = calculateLinearRegressionFit(x, y);
  const xStats = calculateSummaryStats(x);
  const yStats = calculateSummaryStats(y);

  const strength = getCorrelationStrength(Math.abs(r));
  const direction = getCorrelationDirection(r);
  const rPct = (fit.r2 * 100).toFixed(1);

  let sentence = "";
  if (problemType === "classification") {
    sentence = `${featureName} has a ${strength.toLowerCase()} correlation (${r >= 0 ? "+" : ""}${r.toFixed(2)}) with target class ${targetName}.`;
  } else {
    const verb = fit.slope >= 0 ? "increases" : "decreases";
    const delta = Math.abs(fit.slope).toFixed(2);
    sentence = `For each 1 unit increase in ${featureName}, ${targetName} on average ${verb} by ~${delta} units (${rPct}% variance explained).`;
  }

  return {
    featureName,
    targetName,
    pearsonR: r,
    spearmanRho: rho,
    covariance: cov,
    fit,
    xStats,
    yStats,
    strengthLabel: strength,
    directionLabel: direction,
    summarySentence: sentence,
  };
}
