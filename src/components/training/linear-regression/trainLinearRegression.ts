import { initScikitjs, sk } from "@/lib/scikitjs";
import type { DataFrame } from "danfojs";
import { calculateMetrics } from "./calculateMetrics";
import type { RegressionMetrics } from "@/types/regression";

export async function trainLinearRegression(
  xTrain: DataFrame,
  yTrain: DataFrame,
  xTest: DataFrame,
  yTest: DataFrame,
  targetColumn: string,
): Promise<RegressionMetrics> {
  await initScikitjs();

  const XTrainData = xTrain.values as number[][];
  const yTrainData = yTrain.column(targetColumn).values as number[];
  const XTestData = xTest.values as number[][];
  const yTestData = yTest.column(targetColumn).values as number[];

  const model = new sk.LinearRegression({ fitIntercept: true });
  await model.fit(XTrainData, yTrainData);

  const predictionsResult = await model.predict(XTestData);
  const predictions = Array.isArray(predictionsResult)
    ? (predictionsResult as number[])
    : (predictionsResult.arraySync() as number[]);

  return calculateMetrics(predictions, yTestData);
}
