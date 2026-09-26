import { useTrainingResultsStore } from "@/stores/trainingResults";
import type { ClassificationMetrics } from "@/types/classification";
import type { ComparisonAlgorithm } from "@/components/comparison/ComparisonTabs";

export function useClassificationComparison() {
  const knn = useTrainingResultsStore((s) => s.knn);
  const lda = useTrainingResultsStore((s) => s.lda);
  const logReg = useTrainingResultsStore((s) => s.logisticRegression);

  const algorithms: ComparisonAlgorithm<ClassificationMetrics>[] = [
    {
      key: "knn",
      name: "K-Nearest Neighbors",
      subtitle: `K = ${knn.k}`,
      metrics: knn.metrics,
      trained: knn.trainingState === "complete",
    },
    {
      key: "lda",
      name: "Linear Discriminant Analysis",
      metrics: lda.metrics,
      trained: lda.trainingState === "complete",
    },
    {
      key: "logistic",
      name: "Logistic Regression",
      subtitle: "L2 penalty",
      metrics: logReg.metrics,
      trained: logReg.trainingState === "complete",
    },
  ];

  const hasAnyTrained = algorithms.some((a) => a.trained);

  return { algorithms, hasAnyTrained };
}
