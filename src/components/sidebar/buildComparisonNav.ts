import { Target, TrendingUp, CircleDot } from "lucide-react";
import type { NavItem } from "@/components/nav-main";
import type { NavBuilderContext } from "./types";

export function buildComparisonItems(
  ctx: NavBuilderContext,
  onLock4: () => void,
): NavItem[] {
  const {
    isSplit,
    isRegressionProblem,
    isClassificationProblem,
    isClusteringProblem,
    hasRegressionModel,
    hasClassificationModel,
  } = ctx;
  const splitReason = "Create a train/test split first";

  return [
    {
      title: "Classification",
      icon: Target,
      url: "/comparison/classification",
      disabled: !isSplit || !isClassificationProblem || !hasClassificationModel,
      disabledReason: !isSplit
        ? splitReason
        : !isClassificationProblem
          ? "Only available for classification problems"
          : "Train at least one classification model first",
      onLockedClick: onLock4,
    },
    {
      title: "Regression",
      icon: TrendingUp,
      url: "/comparison/regression",
      disabled: !isSplit || !isRegressionProblem || !hasRegressionModel,
      disabledReason: !isSplit
        ? splitReason
        : !isRegressionProblem
          ? "Only available for regression problems"
          : "Train at least one regression model first",
      onLockedClick: onLock4,
    },
    {
      title: "Clustering",
      icon: CircleDot,
      url: "/comparison/clustering",
      disabled: !isSplit || !isClusteringProblem,
      disabledReason: !isSplit
        ? splitReason
        : "Only available for clustering problems",
      onLockedClick: onLock4,
    },
  ];
}
