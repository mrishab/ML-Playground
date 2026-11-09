import { saveTrainedModel } from "@/lib/models/saveTrainedModel";
import type { AlgorithmType } from "@/types/savedModel";
import type { RandomForestResult } from "@/lib/random-forest/trainRandomForest";
import type { XGBoostResult } from "@/lib/xgboost/trainXGBoost";
import type { RegressionMetrics } from "@/types/regression";
import type { ClassificationMetrics } from "@/types/classification";

type EnsembleResult = RandomForestResult | XGBoostResult;

interface StoreDispatches {
  setRegressionMetrics: (m: RegressionMetrics) => void;
  setClassificationMetrics: (m: ClassificationMetrics) => void;
}

export function handleEnsembleResult(
  algorithm: AlgorithmType,
  name: string,
  params: Record<string, number | string>,
  res: EnsembleResult,
  dispatch: StoreDispatches,
): void {
  const isReg = res.kind === "regression";
  if (isReg) {
    dispatch.setRegressionMetrics(res.metrics);
  } else {
    dispatch.setClassificationMetrics(res.metrics);
  }
  saveTrainedModel({
    algorithm,
    algorithmName: `${name} (${isReg ? "Regressor" : "Classifier"})`,
    hyperparameters: {
      ...params,
      task: isReg ? "Regression" : "Classification",
    },
    metrics: res.metrics,
  });
}
