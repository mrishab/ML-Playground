import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import type { ComparisonAlgorithm } from "../ComparisonTabs";

export type ComparisonPageLayoutProps<TMetrics> = {
  title: string;
  subtitle: string;
  icon: LucideIcon;
  hasAnyTrained: boolean;
  algorithms: ComparisonAlgorithm<TMetrics>[];
  tabs: {
    value: string;
    label: string;
    renderContent: (metrics: TMetrics) => ReactNode;
  }[];
  defaultValue: string;
  noModelsLinkTo: string;
  nextStep?: {
    message: string;
    linkTo: string;
    linkText: string;
  };
};
