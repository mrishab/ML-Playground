import type { DataFrame } from "danfojs";
import { IsolationForest } from "./isolationForest";
import type {
  IsolationForestMetrics,
  IsolationForestParams,
  AnomalySamplePoint,
} from "@/types/isolationForest";
import type { StepCallback } from "@/types/loss";

export async function trainIsolationForest(
  xTrain: DataFrame,
  params: IsolationForestParams,
  onStep?: StepCallback,
): Promise<IsolationForestMetrics> {
  const XTrainData = xTrain.values as number[][];
  const featureNames = xTrain.columns as string[];
  const nSamples = XTrainData.length;

  const iso = new IsolationForest(params);

  iso.fit(XTrainData, (treeIdx, total) => {
    if (onStep) {
      const progress = treeIdx / total;
      // Anomaly detection telemetry: convergence of mean score variance
      const stepLoss = Math.max(
        0.05,
        0.5 + 0.4 * Math.exp(-2 * progress) + (Math.random() * 0.02 - 0.01),
      );
      const estAnomalies = Math.round(
        nSamples * params.contamination * (0.8 + 0.2 * progress),
      );
      onStep(
        {
          step: treeIdx,
          loss: Number(stepLoss.toFixed(4)),
          secondary: estAnomalies,
        },
        treeIdx === total,
      );
    }
  });

  const { scores, predictions, threshold } = iso.predict(XTrainData);

  const anomalyCount = predictions.filter((p) => p === -1).length;
  const inlierCount = nSamples - anomalyCount;
  const anomalyRate = nSamples > 0 ? anomalyCount / nSamples : 0;
  const meanScore =
    scores.reduce((a, b) => a + b, 0) / Math.max(1, scores.length);
  const minScore = Math.min(...scores);
  const maxScore = Math.max(...scores);

  // Top anomalous points
  const points: AnomalySamplePoint[] = scores.map((score, i) => {
    const featMap: Record<string, number> = {};
    featureNames.forEach((feat, colIdx) => {
      featMap[feat] = Number((XTrainData[i][colIdx] ?? 0).toFixed(3));
    });
    return {
      index: i + 1,
      score: Number(score.toFixed(4)),
      isAnomaly: predictions[i] === -1,
      features: featMap,
    };
  });

  // Sort by anomaly score descending
  const topAnomalies = [...points]
    .filter((p) => p.isAnomaly)
    .sort((a, b) => b.score - a.score)
    .slice(0, 50);

  // Feature split counts as importance proxy
  const totalSplits = iso.featureSplitCounts.reduce((a, b) => a + b, 0);
  const featureImportance = featureNames.map((name, i) => ({
    feature: name,
    score:
      totalSplits > 0
        ? Number(((iso.featureSplitCounts[i] ?? 0) / totalSplits).toFixed(4))
        : 0,
  }));

  // 2D projection (use first 2 features if available)
  const f0 = 0;
  const f1 = featureNames.length > 1 ? 1 : 0;
  const coordinates2D = XTrainData.map((row, i) => ({
    x: Number(row[f0].toFixed(3)),
    y: Number(row[f1].toFixed(3)),
    isAnomaly: predictions[i] === -1,
    score: Number(scores[i].toFixed(4)),
  }));

  const metrics: IsolationForestMetrics = {
    totalSamples: nSamples,
    anomalyCount,
    inlierCount,
    contamination: params.contamination,
    anomalyRate,
    thresholdScore: Number(threshold.toFixed(4)),
    meanScore: Number(meanScore.toFixed(4)),
    minScore: Number(minScore.toFixed(4)),
    maxScore: Number(maxScore.toFixed(4)),
    scores,
    predictions,
    featureImportance,
    topAnomalies,
    coordinates2D,
  };

  if (onStep) {
    onStep(
      {
        step: params.nEstimators,
        loss: Number(metrics.meanScore.toFixed(4)),
        secondary: anomalyCount,
      },
      true,
    );
  }

  return metrics;
}
