import { useDatasetStore } from "@/stores/dataset";
import { useMLConfigStore } from "@/stores/mlConfig";
import { useTrainingResultsStore } from "@/stores/trainingResults";
import { useSavedModelsStore } from "@/stores/savedModels";
import { usePipelineDirtyState } from "./usePipelineDirtyState";
import { usePipelineRoutes } from "./usePipelineRoutes";
import { getModelArtifactDesc } from "./modelArtifactDesc";

export function usePipelinePrereqs() {
  const { df, selectedDataset } = useDatasetStore();
  const ml = useMLConfigStore();
  const res = useTrainingResultsStore();
  const models = useSavedModelsStore((s) => s.models);

  const hasDataset = df !== null;
  const isSplitReady = Boolean(ml.isSplit && ml.xTrain && ml.xTest);
  const hasTrainedModel =
    ml.problemType === "regression"
      ? Boolean(
          res.linearRegression.metrics ||
            res.randomForest.regressionMetrics ||
            res.xgboost.regressionMetrics,
        )
      : ml.problemType === "clustering"
        ? Boolean(res.kmeans.metrics || res.isolationForest.metrics)
        : Boolean(
            res.knn.metrics ||
              res.lda.metrics ||
              res.logisticRegression.metrics ||
              res.randomForest.classificationMetrics ||
              res.xgboost.classificationMetrics ||
              res.isolationForest.metrics,
          );

  const dirty = usePipelineDirtyState(isSplitReady);
  const routes = usePipelineRoutes(ml.problemType);
  const modelDesc = getModelArtifactDesc(res, ml.problemType);

  return {
    df,
    selectedDataset,
    ml,
    hasDataset,
    isSplitReady,
    hasTrainedModel,
    hasSavedModels: models.length > 0,
    savedModelsCount: models.length,
    dirty,
    routes,
    modelDesc,
  };
}
