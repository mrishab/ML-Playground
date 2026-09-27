import { initScikitjs, sk } from "@/lib/scikitjs";
import type { DataFrame } from "danfojs";
import { calculateMetrics } from "./calculateMetrics";
import { simulateRegressionSteps } from "./simulateRegressionLoss";
import { calculateBaselineMSE, toNumericArray } from "./baselineMSE";
import type { RegressionMetrics } from "@/types/regression";
import type { StepCallback } from "@/types/loss";

export async function trainLinearRegression(
  xTrain: DataFrame,
  yTrain: DataFrame,
  xTest: DataFrame,
  yTest: DataFrame,
  targetColumn: string,
  onStep?: StepCallback,
): Promise<RegressionMetrics> {
  await initScikitjs();

  const XTrainData = xTrain.values as number[][];
  const yTrainData = yTrain.column(targetColumn).values as number[];
  const XTestData = xTest.values as number[][];
  const yTestData = yTest.column(targetColumn).values as number[];

  const initialTrainMSE = calculateBaselineMSE(yTrainData);
  const initialValMSE = calculateBaselineMSE(yTestData);

  const model = new sk.LinearRegression({ fitIntercept: true });
  await model.fit(XTrainData, yTrainData);

  const trainPreds = toNumericArray(await model.predict(XTrainData));
  const finalTrainMSE =
    trainPreds.reduce((acc, p, i) => acc + (yTrainData[i] - p) ** 2, 0) /
    yTrainData.length;

  const predictions = toNumericArray(await model.predict(XTestData));
  const metrics = calculateMetrics(predictions, yTestData);

  await simulateRegressionSteps(
    initialTrainMSE,
    finalTrainMSE,
    initialValMSE,
    metrics.mse,
    30,
    onStep,
  );

  return metrics;
}
