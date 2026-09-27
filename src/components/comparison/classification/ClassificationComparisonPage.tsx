import { Target } from "lucide-react";
import { ComparisonPageLayout } from "../ComparisonPageLayout";
import { useClassificationComparison } from "./useClassificationComparison";
import { CLASSIFICATION_COMPARISON_TABS } from "./classificationTabs";

export function ClassificationComparisonPage() {
  const pageState = useClassificationComparison();

  return (
    <ComparisonPageLayout
      {...pageState}
      title="Classification Comparison"
      subtitle="Compare classification models"
      icon={Target}
      defaultValue="accuracy"
      noModelsLinkTo="/train/knn"
      nextStep={{
        message: "Pipeline complete.",
        linkTo: "/data/select",
        linkText: "Start New Pipeline",
      }}
      tabs={CLASSIFICATION_COMPARISON_TABS}
    />
  );
}
