import { Users, Layers, Binary } from "lucide-react";
import type { NavItem } from "@/components/nav-main";

export function buildClassificationNavItems(
  disabled: boolean,
  disabledReason: string,
  onLock: () => void,
): NavItem[] {
  return [
    {
      title: "KNN",
      icon: Users,
      url: "/train/knn",
      disabled,
      disabledReason,
      onLockedClick: onLock,
    },
    {
      title: "LDA",
      icon: Layers,
      url: "/train/lda",
      disabled,
      disabledReason,
      onLockedClick: onLock,
    },
    {
      title: "Logistic Regression",
      icon: Binary,
      url: "/train/logistic",
      disabled,
      disabledReason,
      onLockedClick: onLock,
    },
  ];
}
