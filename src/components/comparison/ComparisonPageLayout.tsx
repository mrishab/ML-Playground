import { type LucideIcon } from "lucide-react";
import { PageLayout } from "@/components/shared/PageLayout";
import { NoDatasetAlert } from "@/components/shared/NoDatasetAlert";
import {
  ComparisonTabs,
  type ComparisonAlgorithm,
} from "@/components/comparison/ComparisonTabs";

type ComparisonPageLayoutProps<TMetrics> = {
  title: string;
  subtitle: string;
  icon: LucideIcon;
  hasAnyTrained: boolean;
  algorithms: ComparisonAlgorithm<TMetrics>[];
  tabs: {
    value: string;
    label: string;
    renderContent: (metrics: TMetrics) => React.ReactNode;
  }[];
  defaultValue: string;
  noModelsLinkTo: string;
  nextStep?: {
    message: string;
    linkTo: string;
    linkText: string;
  };
};

export function ComparisonPageLayout<TMetrics>({
  title,
  subtitle,
  icon,
  hasAnyTrained,
  algorithms,
  tabs,
  defaultValue,
  noModelsLinkTo,
  nextStep,
}: ComparisonPageLayoutProps<TMetrics>) {
  return (
    <PageLayout
      icon={icon}
      title={title}
      subtitle={subtitle}
      nextStep={nextStep}
    >
      {!hasAnyTrained && (
        <NoDatasetAlert
          title="No models trained"
          description={`Train at least one model to compare results.`}
          linkTo={noModelsLinkTo}
          linkText="Go to Training"
        />
      )}

      {hasAnyTrained && (
        <ComparisonTabs
          algorithms={algorithms}
          defaultValue={defaultValue}
          tabs={tabs}
        />
      )}
    </PageLayout>
  );
}
