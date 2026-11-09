export type IsolationForestParams = {
  nEstimators: number;
  maxSamples: number;
  contamination: number;
};

export type AnomalySamplePoint = {
  index: number;
  score: number;
  isAnomaly: boolean;
  features: Record<string, number>;
};

export type IsolationForestMetrics = {
  totalSamples: number;
  anomalyCount: number;
  inlierCount: number;
  contamination: number;
  anomalyRate: number;
  thresholdScore: number;
  meanScore: number;
  minScore: number;
  maxScore: number;
  scores: number[];
  predictions: number[];
  featureImportance: { feature: string; score: number }[];
  topAnomalies: AnomalySamplePoint[];
  coordinates2D?: { x: number; y: number; isAnomaly: boolean; score: number }[];
};
