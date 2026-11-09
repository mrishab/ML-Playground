import type { ModelArtifactDetails, AlgorithmType } from "@/types/savedModel";
import type { RegressionMetrics } from "@/types/regression";
import type { ClassificationMetrics } from "@/types/classification";
import type { KMeansMetrics } from "@/types/kmeans";
import type { IsolationForestMetrics } from "@/types/isolationForest";

export function extractModelArtifacts(
  algorithm: AlgorithmType,
  features: string[],
  targetColumn: string,
  metrics:
    | RegressionMetrics
    | ClassificationMetrics
    | KMeansMetrics
    | IsolationForestMetrics,
  k?: number,
): ModelArtifactDetails {
  if (algorithm === "clustering") {
    const km = metrics as KMeansMetrics;
    return {
      k: km.k,
      centroids: km.centroids,
    };
  }
  if (algorithm === "isolation-forest") {
    const iso = metrics as IsolationForestMetrics;
    return {
      coefficients: iso.featureImportance?.map((f) => ({
        feature: f.feature,
        weight: Number(f.score.toFixed(4)),
      })),
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
  if (algorithm === "random-forest" || algorithm === "xgboost") {
    const ens = metrics as {
      featureImportance?: { feature: string; score: number }[];
      labels?: string[];
    };
    if (ens.featureImportance) {
      return {
        coefficients: ens.featureImportance.map((f) => ({
          feature: f.feature,
          weight: Number(f.score.toFixed(4)),
        })),
        classes: ens.labels,
      };
    }
  }
  const cls = metrics as ClassificationMetrics & {
    weights?: {
      coefficients?: number[][] | number[];
      intercept?: number[] | number;
    };
  };
  return {
    classes: cls.labels,
    k,
    intercept: cls.weights?.intercept,
  };
}
