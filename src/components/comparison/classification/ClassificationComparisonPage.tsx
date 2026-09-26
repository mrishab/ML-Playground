import { Target } from "lucide-react";
import { ComparisonPageLayout } from "../ComparisonPageLayout";
import { useClassificationComparison } from "./useClassificationComparison";
import { AccuracyContent } from "./AccuracyContent";
import { ConfusionMatrixContent } from "./ConfusionMatrixContent";
import { PrecisionRecallContent } from "./PrecisionRecallContent";
import { F1Content } from "./F1Content";
import { ROCContent } from "./ROCContent";

export function ClassificationComparisonPage() {
  const pageState = useClassificationComparison();

  return (
    <ComparisonPageLayout
      {...pageState}
      title="Classification Comparison"
      subtitle="Compare classification algorithms side by side"
      icon={Target}
      defaultValue="accuracy"
      noModelsLinkTo="/train/knn"
      nextStep={{
        message:
          "Comparison complete. View final leaderboard and export evaluation results.",
        linkTo: "/validation",
        linkText: "Proceed to Final Validation",
      }}
      tabs={[
        {
          value: "accuracy",
          label: "Accuracy",
          renderContent: (metrics) => <AccuracyContent metrics={metrics} />,
        },
        {
          value: "confusion",
          label: "Confusion Matrix",
          renderContent: (metrics) => (
            <ConfusionMatrixContent metrics={metrics} />
          ),
        },
        {
          value: "precision-recall",
          label: "Precision & Recall",
          renderContent: (metrics) => (
            <PrecisionRecallContent metrics={metrics} />
          ),
        },
        {
          value: "f1",
          label: "F1-Score",
          renderContent: (metrics) => <F1Content metrics={metrics} />,
        },
        {
          value: "roc",
          label: "ROC & AUC",
          renderContent: (metrics) => <ROCContent metrics={metrics} />,
        },
      ]}
    />
  );
}
