import { Binary } from "lucide-react";
import { TrainingPageLayout } from "@/components/shared/TrainingPageLayout";
import { ClassificationSummary } from "@/components/training/classification/ClassificationSummary";
import { ClassificationDetailsTabs } from "@/components/training/classification/ClassificationDetailsTabs";
import { useLogisticRegressionPage } from "./useLogisticRegressionPage";

export function LogisticRegressionPage() {
  const pageState = useLogisticRegressionPage();
  const { metrics } = pageState;

  return (
    <TrainingPageLayout
      {...pageState}
      title="Logistic Regression"
      subtitle="Linear model for classification"
      icon={Binary}
      algorithmName="Logistic Regression"
      configOptions={[
        { label: "Penalty", value: "L2" },
        { label: "Optimizer", value: "Adam" },
        { label: "Loss", value: "Softmax Cross-Entropy" },
      ]}
      summaryComponent={
        <ClassificationSummary metrics={metrics!} direction="vertical" />
      }
      detailsComponent={<ClassificationDetailsTabs metrics={metrics!} />}
      nextStepProps={{
        message: "Model training complete.",
        linkTo: "/models",
        linkText: "Manage Saved Models",
      }}
      onRun={pageState.runTraining}
      onReset={pageState.reset}
    />
  );
}
