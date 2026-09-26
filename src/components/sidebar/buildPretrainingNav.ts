import { Search, BarChart3 } from "lucide-react";
import type { NavItem } from "@/components/nav-main";
import type { NavBuilderContext } from "./types";

export function buildPretrainingNav(ctx: NavBuilderContext): NavItem {
  const { hasDataset, steps, openLockedModal } = ctx;
  const step2 = steps[1];

  return {
    title: "2. Pretraining",
    icon: Search,
    isActive: true,
    disabled: !hasDataset,
    disabledReason: "Select a dataset in Step 1 first",
    onLockedClick: () => openLockedModal(step2),
    items: [
      {
        title: "Explore",
        url: "/pretrain/explore",
        disabled: !hasDataset,
        disabledReason: "Select a dataset first",
        onLockedClick: () => openLockedModal(step2),
      },
      {
        title: "Visualize",
        icon: BarChart3,
        url: "/pretrain/visualize",
        disabled: !hasDataset,
        disabledReason: "Select a dataset first",
        onLockedClick: () => openLockedModal(step2),
      },
    ],
  };
}
