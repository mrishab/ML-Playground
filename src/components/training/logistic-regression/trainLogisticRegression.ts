import { initScikitjs, sk } from "@/lib/scikitjs";
import { calculateClassificationMetrics } from "@/lib/classificationMetrics";
import type { DataFrame } from "danfojs";
import type { ClassificationMetrics } from "@/types/classification";
import type { StepCallback } from "@/types/loss";
import { extractProbaScores } from "./extractProbaScores";
import { simulateLogisticSteps } from "./simulateLogisticLoss";
import { encodeTrainLabels, mapPredictions } from "./logisticEncoding";

export async function trainLogisticRegression(
  xTrain: DataFrame,
  yTrain: DataFrame,
  xTest: DataFrame,
  yTest: DataFrame,
  targetColumn: string,
  onStep?: StepCallback,
): Promise<ClassificationMetrics> {
  await initScikitjs();

  const XTrainData = xTrain.values as number[][];
  const yTrainData = yTrain.column(targetColumn).values as (string | number)[];
  const XTestData = xTest.values as number[][];
  const yTestData = yTest.column(targetColumn).values as (string | number)[];

  const { uniqueLabels, yTrainEncoded } = encodeTrainLabels(yTrainData);
  const yTestStr = yTestData.map(String);

  const model = new sk.LogisticRegression({ penalty: "l2" });
  await model.fit(XTrainData, yTrainEncoded);

  const rawPreds = await model.predict(XTestData);
  const predictions = mapPredictions(rawPreds, uniqueLabels);
  const classScores = await extractProbaScores(model, XTestData, uniqueLabels);
  const metrics = calculateClassificationMetrics(
    predictions,
    yTestStr,
    classScores,
  );

  const initialLoss = Math.log(Math.max(2, uniqueLabels.length));
  const finalLoss = Math.max(0.1, -Math.log(Math.max(0.01, metrics.accuracy)));
  const initialAcc = 1 / Math.max(2, uniqueLabels.length);
  await simulateLogisticSteps(
    initialLoss,
    finalLoss,
    initialAcc,
    metrics.accuracy,
    30,
    onStep,
  );

  return metrics;
}
