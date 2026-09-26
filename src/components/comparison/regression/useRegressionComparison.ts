import { useTrainingResultsStore } from "@/stores/trainingResults";
import type { RegressionMetrics } from "@/types/regression";
import type { ComparisonAlgorithm } from "@/components/comparison/ComparisonTabs";

export function useRegressionComparison() {
  const linReg = useTrainingResultsStore((s) => s.linearRegression);

  const algorithms: ComparisonAlgorithm<RegressionMetrics>[] = [
    {
      key: "linear",
      name: "Linear Regression",
      subtitle: "OLS with intercept",
      metrics: linReg.metrics,
      trained: linReg.trainingState === "complete",
    },
  ];

  const hasAnyTrained = algorithms.some((a) => a.trained);

  return { algorithms, hasAnyTrained };
}
