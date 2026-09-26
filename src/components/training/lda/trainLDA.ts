import { fitLDA, predictLDA, predictProbaLDA } from "@/lib/lda";
import { calculateClassificationMetrics } from "@/lib/classificationMetrics";
import type { DataFrame } from "danfojs";
import type { ClassificationMetrics } from "@/types/classification";

export function trainLDA(
  xTrain: DataFrame,
  yTrain: DataFrame,
  xTest: DataFrame,
  yTest: DataFrame,
  targetColumn: string,
): ClassificationMetrics {
  const XTrainData = xTrain.values as number[][];
  const yTrainData = yTrain.column(targetColumn).values as (string | number)[];
  const XTestData = xTest.values as number[][];
  const yTestData = yTest.column(targetColumn).values as (string | number)[];

  const yTrainStr = yTrainData.map(String);
  const yTestStr = yTestData.map(String);

  const model = fitLDA(XTrainData, yTrainStr);
  const predictions = predictLDA(model, XTestData);
  const classScores = predictProbaLDA(model, XTestData);

  return calculateClassificationMetrics(predictions, yTestStr, classScores);
}
