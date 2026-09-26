import { Brain, TrendingUp } from "lucide-react";
import type { NavItem } from "@/components/nav-main";
import type { NavBuilderContext } from "./types";
import { buildClassificationNavItems } from "./trainingNavHelpers";

export function buildTrainingNav(ctx: NavBuilderContext): NavItem {
  const {
    isSplit,
    isRegressionProblem,
    isClassificationProblem,
    steps,
    openLockedModal,
  } = ctx;
  const onLock = () => openLockedModal(steps[2]);
  const splitReason = "Create a train/test split in Step 2 first";
  const classReason = !isSplit
    ? splitReason
    : "Only available for classification problems";
  const classDisabled = !isSplit || !isClassificationProblem;

  return {
    title: "3. Training",
    icon: Brain,
    isActive: true,
    disabled: !isSplit,
    disabledReason: splitReason,
    onLockedClick: onLock,
    items: [
      {
        title: "Linear Regression",
        icon: TrendingUp,
        url: "/train/linear",
        disabled: !isSplit || !isRegressionProblem,
        disabledReason: !isSplit
          ? splitReason
          : "Only available for regression problems",
        onLockedClick: onLock,
      },
      ...buildClassificationNavItems(classDisabled, classReason, onLock),
    ],
  };
}
