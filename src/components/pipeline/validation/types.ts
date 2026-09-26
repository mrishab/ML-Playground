export interface EvaluatedModel {
  name: string;
  type: string;
  primaryMetric: string;
  secondaryMetric: string;
  rawScore: number;
  metrics: unknown;
}
