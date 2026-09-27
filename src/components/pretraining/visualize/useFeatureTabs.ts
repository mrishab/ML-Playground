import type { ReactNode } from "react";

export type FeatureTabItem = {
  id: string;
  label: string;
  content: ReactNode;
};

type UseFeatureTabsProps = {
  features: string[];
  targetColumn: string;
  overviewContent?: ReactNode;
  renderContent: (feature: string, target: string) => ReactNode;
};

export function useFeatureTabs({
  features,
  targetColumn,
  overviewContent,
  renderContent,
}: UseFeatureTabsProps): FeatureTabItem[] {
  const tabs: FeatureTabItem[] = [];

  if (overviewContent) {
    tabs.push({
      id: "overview",
      label: "All Features & Correlations",
      content: overviewContent,
    });
  }

  for (const feature of features) {
    tabs.push({
      id: feature,
      label: `${feature} vs ${targetColumn}`,
      content: renderContent(feature, targetColumn),
    });
  }

  return tabs;
}
