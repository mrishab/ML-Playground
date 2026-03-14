import type { ReactNode } from "react";

export type FeatureTabItem = {
  id: string;
  label: string;
  content: ReactNode;
};

export type UseFeatureTabsProps = {
  features: string[];
  targetColumn: string;
  renderContent: (feature: string, target: string) => ReactNode;
};

export function useFeatureTabs({
  features,
  targetColumn,
  renderContent,
}: UseFeatureTabsProps): FeatureTabItem[] {
  return features.map((feature) => ({
    id: feature,
    label: `${feature} vs ${targetColumn}`,
    content: renderContent(feature, targetColumn),
  }));
}
