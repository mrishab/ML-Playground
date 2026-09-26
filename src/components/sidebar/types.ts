import type { PipelineStepInfo } from "@/stores/pipeline";

export interface NavBuilderContext {
  hasDataset: boolean;
  isSplit: boolean;
  isRegressionProblem: boolean;
  isClassificationProblem: boolean;
  isClusteringProblem: boolean;
  hasRegressionModel: boolean;
  hasClassificationModel: boolean;
  steps: PipelineStepInfo[];
  openLockedModal: (step: PipelineStepInfo) => void;
}
