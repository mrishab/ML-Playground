import { Database, FileSpreadsheet, Shuffle } from "lucide-react";
import type { NavItem } from "@/components/nav-main";
import type { NavBuilderContext } from "./types";

export function buildIngestionNav(ctx: NavBuilderContext): NavItem {
  const { hasDataset, steps, openLockedModal } = ctx;
  const step1 = steps[0];

  return {
    title: "1. Data Ingestion",
    icon: Database,
    isActive: true,
    items: [
      {
        title: "Select Dataset",
        icon: FileSpreadsheet,
        url: "/data/select",
      },
      {
        title: "Transform",
        icon: Shuffle,
        url: "/data/transform",
        disabled: !hasDataset,
        disabledReason: "Select a dataset first",
        onLockedClick: () => openLockedModal(step1),
      },
    ],
  };
}
