import type { BuildModelOptions, SavedModel } from "@/types/savedModel";
import { useTrainingResultsStore } from "@/stores/trainingResults";
import { buildSavedModel } from "./buildSavedModel";
import { saveModelToStorage } from "./storage";

export function saveTrainedModel(opts: BuildModelOptions): SavedModel {
  const model = buildSavedModel(opts);
  const results = useTrainingResultsStore.getState();
  const telemetry =
    opts.algorithm === "linear"
      ? results.linearRegression.lossTelemetry
      : opts.algorithm === "knn"
        ? results.knn.lossTelemetry
        : opts.algorithm === "lda"
          ? results.lda.lossTelemetry
          : opts.algorithm === "logistic"
            ? results.logisticRegression.lossTelemetry
            : results.kmeans.lossTelemetry;

  if (telemetry && telemetry.history.length > 0) {
    model.lossHistory = telemetry.history;
    model.sizeBytes = new Blob([JSON.stringify(model)]).size;
  }

  saveModelToStorage(model);
  return model;
}
