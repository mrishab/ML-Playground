import { useCallback } from "react";
import { useDatasetStore } from "@/stores/dataset";
import { useMLConfigStore } from "@/stores/mlConfig";
import { useTrainingResultsStore } from "@/stores/trainingResults";
import { usePipelineSteps } from "@/hooks/usePipelineSteps";
import { useEvaluatedModels } from "./useEvaluatedModels";
import { exportValidationReport } from "./exportReport";

export function useValidationResults() {
  const { currentStep } = usePipelineSteps();
  const { selectedDataset } = useDatasetStore();
  const { problemType, targetColumn, selectedFeatures, xTrain, xTest } =
    useMLConfigStore();
  const results = useTrainingResultsStore();

  const models = useEvaluatedModels(problemType, results);
  const bestModel = models[0];

  const handleExportJSON = useCallback(() => {
    exportValidationReport({
      selectedDataset,
      problemType,
      targetColumn,
      selectedFeatures,
      trainRows: xTrain?.shape[0],
      testRows: xTest?.shape[0],
      models,
    });
  }, [
    selectedDataset,
    problemType,
    targetColumn,
    selectedFeatures,
    xTrain,
    xTest,
    models,
  ]);

  return {
    currentStep,
    selectedDataset,
    targetColumn,
    selectedFeatures,
    xTest,
    models,
    bestModel,
    handleExportJSON,
  };
}
