import { useMemo } from "react";
import type { NavItem } from "@/components/nav-main";
import { useDatasetStore } from "@/stores/dataset";
import { useMLConfigStore } from "@/stores/mlConfig";
import { useTrainingResultsStore } from "@/stores/trainingResults";
import { usePipelineSteps } from "@/hooks/usePipelineSteps";
import { usePipelineStore } from "@/stores/pipeline";
import { buildDataNav } from "./buildDataNav";
import { buildTrainingNav } from "./buildTrainingNav";
import { buildDownstreamNav } from "./buildDownstreamNav";

export function useAppSidebarNav(): NavItem[] {
  const hasDataset = useDatasetStore((state) => state.df !== null);
  const problemType = useMLConfigStore((state) => state.problemType);
  const isSplit = useMLConfigStore((state) => state.isSplit);
  const { linearRegression, knn, lda, logisticRegression } =
    useTrainingResultsStore();
  const { steps } = usePipelineSteps();
  const { openLockedModal } = usePipelineStore();

  return useMemo(() => {
    const ctx = {
      hasDataset,
      isSplit,
      isRegressionProblem: problemType === "regression",
      isClassificationProblem: problemType === "classification",
      isClusteringProblem: problemType === "clustering",
      hasRegressionModel: linearRegression.metrics !== null,
      hasClassificationModel:
        knn.metrics !== null ||
        lda.metrics !== null ||
        logisticRegression.metrics !== null,
      steps,
      openLockedModal,
    };

    return [
      ...buildDataNav(ctx),
      buildTrainingNav(ctx),
      ...buildDownstreamNav(ctx),
    ];
  }, [
    hasDataset,
    isSplit,
    problemType,
    linearRegression.metrics,
    knn.metrics,
    lda.metrics,
    logisticRegression.metrics,
    steps,
    openLockedModal,
  ]);
}
