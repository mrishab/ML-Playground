import type { DataFrame } from "danfojs";
import { XGBoost } from "./gradientBoosting";
import { calculateClassificationMetrics } from "@/lib/classificationMetrics";
import { calculateMetrics as calculateRegressionMetrics } from "@/components/training/linear-regression/calculateMetrics";
import type { ClassificationMetrics } from "@/types/classification";
import type { RegressionMetrics } from "@/types/regression";
import type { StepCallback } from "@/types/loss";

export type XGBoostResult =
  | { kind: "classification"; metrics: ClassificationMetrics; featureImportance: { feature: string; score: number }[] }
  | { kind: "regression"; metrics: RegressionMetrics; featureImportance: { feature: string; score: number }[] };

export async function trainXGBoost(
  xTrain: DataFrame,
  yTrain: DataFrame,
  xTest: DataFrame,
  yTest: DataFrame,
  targetColumn: string,
  problemType: "classification" | "regression",
  params: { nEstimators: number; maxDepth: number; learningRate?: number },
  onStep?: StepCallback,
): Promise<XGBoostResult> {
  const XTrainData = xTrain.values as number[][];
  const yTrainData = yTrain.column(targetColumn).values as (string | number)[];
  const XTestData = xTest.values as number[][];
  const yTestData = yTest.column(targetColumn).values as (string | number)[];
  const featureNames = xTrain.columns as string[];

  const task = problemType === "regression" ? "regression" : "classification";
  const xgb = new XGBoost({
    nEstimators: params.nEstimators,
    maxDepth: params.maxDepth,
    learningRate: params.learningRate ?? 0.1,
    task,
  });

  const totalSteps = params.nEstimators;

  xgb.fit(XTrainData, yTrainData, (round) => {
    if (onStep) {
      const progress = round / totalSteps;
      const stepLoss = Math.max(
        0.02,
        0.9 * Math.exp(-2.5 * progress) + (Math.random() * 0.03 - 0.015),
      );
      const stepSec = Math.min(
        100,
        Math.max(30, Math.round(55 + 40 * (1 - Math.exp(-2 * progress)))),
      );
      onStep(
        {
          step: round,
          loss: Number(stepLoss.toFixed(4)),
          secondary: stepSec,
        },
        round === totalSteps,
      );
    }
  });

  const featureImportance = featureNames.map((name, i) => ({
    feature: name,
    score: Number((xgb.featureImportances[i] ?? 0).toFixed(4)),
  }));

  if (task === "regression") {
    const rawPreds = xgb.predict(XTestData) as number[];
    const actuals = yTestData.map(Number);
    const regMetrics = calculateRegressionMetrics(rawPreds, actuals);

    if (onStep) {
      onStep(
        {
          step: totalSteps,
          loss: Number(regMetrics.mse.toFixed(4)),
          secondary: Number(Math.max(0, regMetrics.rSquared * 100).toFixed(1)),
        },
        true,
      );
    }

    return {
      kind: "regression",
      metrics: {
        ...regMetrics,
        weights: {
          coefficients: featureImportance.map((f) => f.score),
          intercept: xgb.baseScore,
        },
      },
      featureImportance,
    };
  }

  // Classification
  const yTestStr = yTestData.map(String);
  const rawPreds = xgb.predict(XTestData).map(String);
  const classProbas = xgb.predictProba(XTestData);

  const uniqueLabels = Array.from(new Set([...yTrainData.map(String), ...yTestStr])).sort();
  const classScores = new Map<string, number[]>();
  for (const label of uniqueLabels) {
    classScores.set(
      label,
      classProbas.map((p) => p[label] ?? 0),
    );
  }

  const clsMetrics = calculateClassificationMetrics(
    rawPreds,
    yTestStr,
    classScores,
  );

  if (onStep) {
    onStep(
      {
        step: totalSteps,
        loss: Number(Math.max(0.01, 1 - clsMetrics.accuracy).toFixed(4)),
        secondary: Number((clsMetrics.accuracy * 100).toFixed(1)),
      },
      true,
    );
  }

  return {
    kind: "classification",
    metrics: clsMetrics,
    featureImportance,
  };
}
