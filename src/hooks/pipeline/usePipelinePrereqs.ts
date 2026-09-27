import { useDatasetStore } from "@/stores/dataset";
import { useMLConfigStore } from "@/stores/mlConfig";
import { useTrainingResultsStore } from "@/stores/trainingResults";
import { usePipelineDirtyState } from "./usePipelineDirtyState";
import { usePipelineRoutes } from "./usePipelineRoutes";
import { getModelArtifactDesc } from "./modelArtifactDesc";

export function usePipelinePrereqs() {
  const { df, selectedDataset } = useDatasetStore();
  const ml = useMLConfigStore();
  const res = useTrainingResultsStore();

  const hasDataset = df !== null;
  const isSplitReady = Boolean(ml.isSplit && ml.xTrain && ml.xTest);
  const hasTrainedModel =
    ml.problemType === "regression"
      ? res.linearRegression.metrics !== null
      : ml.problemType === "clustering"
        ? res.kmeans.metrics !== null
        : Boolean(
            res.knn.metrics ||
              res.lda.metrics ||
              res.logisticRegression.metrics,
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
    dirty,
    routes,
    modelDesc,
  };
}
