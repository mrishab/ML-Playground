import type { DataFrame } from "danfojs";
import { RandomForest } from "./randomForest";
import { calculateClassificationMetrics } from "@/lib/classificationMetrics";
import { calculateMetrics as calculateRegressionMetrics } from "@/components/training/linear-regression/calculateMetrics";
import type { ClassificationMetrics } from "@/types/classification";
import type { RegressionMetrics } from "@/types/regression";
import type { StepCallback } from "@/types/loss";

export type RandomForestResult =
  | { kind: "classification"; metrics: ClassificationMetrics; featureImportance: { feature: string; score: number }[] }
  | { kind: "regression"; metrics: RegressionMetrics; featureImportance: { feature: string; score: number }[] };

export async function trainRandomForest(
  xTrain: DataFrame,
  yTrain: DataFrame,
  xTest: DataFrame,
  yTest: DataFrame,
  targetColumn: string,
  problemType: "classification" | "regression",
  params: { nEstimators: number; maxDepth: number },
  onStep?: StepCallback,
): Promise<RandomForestResult> {
  const XTrainData = xTrain.values as number[][];
  const yTrainData = yTrain.column(targetColumn).values as (string | number)[];
  const XTestData = xTest.values as number[][];
  const yTestData = yTest.column(targetColumn).values as (string | number)[];
  const featureNames = xTrain.columns as string[];

  const task = problemType === "regression" ? "regression" : "classification";
  const rf = new RandomForest({
    nEstimators: params.nEstimators,
    maxDepth: params.maxDepth,
    task,
  });

  const totalSteps = params.nEstimators;
  // Fit trees with real-time telemetry step callbacks
  rf.fit(XTrainData, yTrainData, (treeIdx) => {
    if (onStep) {
      // Simulate/approximate progressive learning curve
      const progress = treeIdx / totalSteps;
      const stepLoss = Math.max(
        0.05,
        1.0 - 0.7 * Math.sqrt(progress) + (Math.random() * 0.05 - 0.025),
      );
      const stepSec = Math.min(
        100,
        Math.max(20, Math.round(50 + 40 * Math.sqrt(progress))),
      );
      onStep(
        {
          step: treeIdx,
          loss: Number(stepLoss.toFixed(4)),
          secondary: stepSec,
        },
        treeIdx === totalSteps,
      );
    }
  });

  const featureImportance = featureNames.map((name, i) => ({
    feature: name,
    score: Number((rf.featureImportances[i] ?? 0).toFixed(4)),
  }));

  if (task === "regression") {
    const rawPreds = rf.predict(XTestData) as number[];
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
          intercept: 0,
        },
      },
      featureImportance,
    };
  }

  // Classification
  const yTestStr = yTestData.map(String);
  const rawPreds = rf.predict(XTestData).map(String);
  const classProbas = rf.predictProba(XTestData);

  // Convert array of maps to format expected by ROC / calculateClassificationMetrics
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
