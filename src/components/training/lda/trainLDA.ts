import { fitLDA, predictLDA, predictProbaLDA } from "@/lib/lda";
import { calculateClassificationMetrics } from "@/lib/classificationMetrics";
import type { DataFrame } from "danfojs";
import type { ClassificationMetrics } from "@/types/classification";
import type { StepCallback } from "@/types/loss";
import { simulateLDASteps } from "./simulateLDALoss";

export async function trainLDA(
  xTrain: DataFrame,
  yTrain: DataFrame,
  xTest: DataFrame,
  yTest: DataFrame,
  targetColumn: string,
  onStep?: StepCallback,
): Promise<ClassificationMetrics> {
  const XTrainData = xTrain.values as number[][];
  const yTrainData = yTrain.column(targetColumn).values as (string | number)[];
  const XTestData = xTest.values as number[][];
  const yTestData = yTest.column(targetColumn).values as (string | number)[];

  const yTrainStr = yTrainData.map(String);
  const yTestStr = yTestData.map(String);

  const model = fitLDA(XTrainData, yTrainStr);
  const predictions = predictLDA(model, XTestData);
  const classScores = predictProbaLDA(model, XTestData);
  const metrics = calculateClassificationMetrics(
    predictions,
    yTestStr,
    classScores,
  );

  await simulateLDASteps(metrics.accuracy, 25, onStep);

  return metrics;
}
