import type { SavedModel, BuildModelOptions } from "@/types/savedModel";
import type { RegressionMetrics } from "@/types/regression";
import type { ClassificationMetrics } from "@/types/classification";
import type { KMeansMetrics } from "@/types/kmeans";
import { useDatasetStore } from "@/stores/dataset";
import { useMLConfigStore } from "@/stores/mlConfig";
import { extractFeatureAnalysis } from "./analysisExtractor";
import { extractModelArtifacts } from "./artifactExtractor";

export function buildSavedModel(opts: BuildModelOptions): SavedModel {
  const ds = useDatasetStore.getState();
  const ml = useMLConfigStore.getState();
  const datasetName = ds.selectedDataset || "Custom Dataset";
  const featureNames = (ml.xTrain?.columns as string[]) ?? [];
  const baseName = opts.customName || `${opts.algorithmName} (${datasetName})`;
  const partial: Omit<SavedModel, "sizeBytes"> = {
    id: `mod_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
    name: baseName,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    datasetName,
    problemType: ml.problemType,
    algorithm: opts.algorithm,
    algorithmName: opts.algorithmName,
    hyperparameters: opts.hyperparameters,
    splitConfig: {
      testSplitPercent: ml.testSplitPercent,
      shuffle: ml.shuffle,
      trainSamples: ml.xTrain?.shape[0] ?? 0,
      testSamples: ml.xTest?.shape[0] ?? 0,
      targetColumn: ml.targetColumn,
      features: featureNames,
      selectedFeatures: ml.selectedFeatures,
    },
    regressionMetrics: opts.algorithm === "linear" ? (opts.metrics as RegressionMetrics) : undefined,
    classificationMetrics: ["knn", "lda", "logistic"].includes(opts.algorithm)
      ? (opts.metrics as ClassificationMetrics)
      : undefined,
    kmeansMetrics: opts.algorithm === "clustering" ? (opts.metrics as KMeansMetrics) : undefined,
    featureAnalysis: extractFeatureAnalysis(ml.xTrain, ml.yTrain, ml.targetColumn),
    modelArtifacts: extractModelArtifacts(
      opts.algorithm,
      featureNames,
      ml.targetColumn,
      opts.metrics,
      opts.k,
    ),
  };
  return { ...partial, sizeBytes: new Blob([JSON.stringify(partial)]).size };
}
