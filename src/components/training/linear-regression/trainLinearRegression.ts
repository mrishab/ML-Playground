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

  let coefs: number[] = [];
  let intercept = 0;
  try {
    const c = (model as unknown as { coef?: { arraySync?: () => number[] } }).coef;
    const arr = c?.arraySync ? c.arraySync() : c;
    coefs = Array.isArray(arr) ? (arr as number[]).flat() : [];
    const intc = (model as unknown as { intercept?: number | { arraySync?: () => number[] } }).intercept;
    const iArr = intc && typeof intc === "object" && intc.arraySync ? intc.arraySync() : intc;
    intercept = typeof iArr === "number" ? iArr : (Array.isArray(iArr) ? iArr[0] : 0);
  } catch {
    coefs = [];
    intercept = 0;
  }

  const predictions = toNumericArray(await model.predict(XTestData));
  const metrics = calculateMetrics(predictions, yTestData, { coefficients: coefs, intercept });

  await simulateRegressionSteps(initialTrainMSE, finalTrainMSE, initialValMSE, metrics.mse, 30, onStep);
  return metrics;
}
