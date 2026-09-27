import type { AlgorithmKind, LossPoint, LossTelemetry } from "@/types/loss";

export function createTelemetryUpdater(
  kind: AlgorithmKind,
  metricName: string,
  shortMetric: string,
  setTelemetry: (t: LossTelemetry | null) => void,
  secondaryName?: string,
  secondaryUnit?: string,
  totalSteps = 30,
) {
  const history: LossPoint[] = [];
  setTelemetry({
    kind,
    metricName,
    shortMetric,
    history: [],
    currentStep: 0,
    totalSteps,
    isComplete: false,
    secondaryName,
    secondaryUnit,
  });

  return (point: LossPoint, isComplete: boolean) => {
    history.push(point);
    setTelemetry({
      kind,
      metricName,
      shortMetric,
      history: [...history],
      currentStep: point.step,
      totalSteps,
      isComplete,
      secondaryName,
      secondaryUnit,
    });
  };
}
