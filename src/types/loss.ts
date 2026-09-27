export type AlgorithmKind = "regression" | "classification" | "clustering";

export type LossPoint = {
  step: number;
  loss: number;
  valLoss?: number;
  secondary?: number;
};

export type LossTelemetry = {
  kind: AlgorithmKind;
  metricName: string;
  shortMetric: string;
  unit?: string;
  history: LossPoint[];
  currentStep: number;
  totalSteps: number;
  isComplete: boolean;
  secondaryName?: string;
  secondaryUnit?: string;
};

export type StepCallback = (point: LossPoint, isComplete: boolean) => void;
