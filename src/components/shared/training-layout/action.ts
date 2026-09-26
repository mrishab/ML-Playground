import type { NextStepProps } from "./types";

export function deriveTrainingAction(
  metrics: unknown,
  trainingState: string,
  canTrain: boolean,
  nextStepProps: NextStepProps,
  onRun: () => void,
) {
  if (metrics) {
    return { label: nextStepProps.linkText, linkTo: nextStepProps.linkTo };
  }
  return {
    label: trainingState === "training" ? "Training Model..." : "Run Training",
    onClick: onRun,
    disabled: !canTrain || trainingState === "training",
  };
}
