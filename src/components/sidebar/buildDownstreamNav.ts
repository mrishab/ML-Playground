import { Scale, Award } from "lucide-react";
import type { NavItem } from "@/components/nav-main";
import type { NavBuilderContext } from "./types";
import { buildComparisonItems } from "./buildComparisonNav";

export function buildDownstreamNav(ctx: NavBuilderContext): NavItem[] {
  const {
    isSplit,
    hasRegressionModel,
    hasClassificationModel,
    steps,
    openLockedModal,
  } = ctx;
  const onLock4 = () => openLockedModal(steps[3]);
  const onLock5 = () => openLockedModal(steps[4]);

  return [
    {
      title: "4. Comparison",
      icon: Scale,
      isActive: true,
      disabled: !isSplit,
      disabledReason: "Train at least one model in Step 3 first",
      onLockedClick: onLock4,
      items: buildComparisonItems(ctx, onLock4),
    },
    {
      title: "5. Validation & Results",
      icon: Award,
      isActive: true,
      url: "/validation",
      disabled: !hasRegressionModel && !hasClassificationModel,
      disabledReason:
        "Train and evaluate models before reviewing final results",
      onLockedClick: onLock5,
    },
  ];
}
