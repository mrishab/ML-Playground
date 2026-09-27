import type { ReactNode } from "react";
import type { ClassificationMetrics } from "@/types/classification";
import { AccuracyContent } from "./AccuracyContent";
import { ConfusionMatrixContent } from "./ConfusionMatrixContent";
import { PrecisionRecallContent } from "./PrecisionRecallContent";
import { F1Content } from "./F1Content";
import { ROCContent } from "./ROCContent";

export interface ClassificationTabItem {
  value: string;
  label: string;
  renderContent: (metrics: ClassificationMetrics) => ReactNode;
}

export const CLASSIFICATION_COMPARISON_TABS: ClassificationTabItem[] = [
  {
    value: "accuracy",
    label: "Accuracy",
    renderContent: (metrics) => <AccuracyContent metrics={metrics} />,
  },
  {
    value: "confusion",
    label: "Confusion Matrix",
    renderContent: (metrics) => <ConfusionMatrixContent metrics={metrics} />,
  },
  {
    value: "precision-recall",
    label: "Precision & Recall",
    renderContent: (metrics) => <PrecisionRecallContent metrics={metrics} />,
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
];
