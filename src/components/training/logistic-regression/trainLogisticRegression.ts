import { initScikitjs, sk } from "@/lib/scikitjs";
import { calculateClassificationMetrics } from "@/lib/classificationMetrics";
import type { DataFrame } from "danfojs";
import type { ClassificationMetrics } from "@/types/classification";
import { extractProbaScores } from "./extractProbaScores";

export async function trainLogisticRegression(
  xTrain: DataFrame,
  yTrain: DataFrame,
  xTest: DataFrame,
  yTest: DataFrame,
  targetColumn: string,
): Promise<ClassificationMetrics> {
  await initScikitjs();

  const XTrainData = xTrain.values as number[][];
  const yTrainData = yTrain.column(targetColumn).values as (string | number)[];
  const XTestData = xTest.values as number[][];
  const yTestData = yTest.column(targetColumn).values as (string | number)[];

  const yTrainStr = yTrainData.map(String);
  const yTestStr = yTestData.map(String);

  const uniqueLabels = Array.from(new Set(yTrainStr)).sort();
  const labelToIndex = new Map(uniqueLabels.map((l, i) => [l, i]));
  const yTrainEncoded = yTrainStr.map((l) => labelToIndex.get(l)!);

  const model = new sk.LogisticRegression({ penalty: "l2" });
  await model.fit(XTrainData, yTrainEncoded);

  const predictionsResult = await model.predict(XTestData);
  const predictedIndices: number[] = Array.isArray(predictionsResult)
    ? (predictionsResult as number[])
    : (predictionsResult.arraySync() as number[]);

  const predictions = predictedIndices.map(
    (idx) => uniqueLabels[Math.round(idx)],
  );

  const classScores = await extractProbaScores(model, XTestData, uniqueLabels);

  return calculateClassificationMetrics(predictions, yTestStr, classScores);
}
