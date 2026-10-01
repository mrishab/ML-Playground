import type { ModelArtifactDetails, AlgorithmType } from "@/types/savedModel";
import type { RegressionMetrics } from "@/types/regression";
import type { ClassificationMetrics } from "@/types/classification";
import type { KMeansMetrics } from "@/types/kmeans";

export function extractModelArtifacts(
  algorithm: AlgorithmType,
  features: string[],
  targetColumn: string,
  metrics: RegressionMetrics | ClassificationMetrics | KMeansMetrics,
  k?: number,
): ModelArtifactDetails {
  if (algorithm === "clustering") {
    const km = metrics as KMeansMetrics;
    return {
      k: km.k,
      centroids: km.centroids,
    };
  }
  if (algorithm === "linear") {
    const reg = metrics as RegressionMetrics & {
      weights?: { coefficients: number[]; intercept: number };
    };
    const coefs = reg.weights?.coefficients ?? [];
    const intercept = reg.weights?.intercept ?? 0;
    const coefficients = features.map((feat, i) => ({
      feature: feat,
      weight: Number((coefs[i] ?? 0).toFixed(4)),
    }));
    const formulaTerms = coefficients
      .map((c) => `${c.weight >= 0 ? "+" : ""}${c.weight} × ${c.feature}`)
      .join(" ");
    const formula = `${targetColumn} = ${Number(intercept.toFixed(4))} ${formulaTerms}`;
    return { formula, intercept, coefficients };
  }
  const cls = metrics as ClassificationMetrics & {
    weights?: { coefficients?: number[][] | number[]; intercept?: number[] | number };
  };
  return {
    classes: cls.labels,
    k,
    intercept: cls.weights?.intercept,
  };
}
