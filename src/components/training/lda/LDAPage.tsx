import { Layers } from "lucide-react";
import { TrainingPageLayout } from "@/components/shared/TrainingPageLayout";
import { ClassificationSummary } from "@/components/training/classification/ClassificationSummary";
import { ClassificationDetailsTabs } from "@/components/training/classification/ClassificationDetailsTabs";
import { useLDAPage } from "./useLDAPage";

export function LDAPage() {
  const pageState = useLDAPage();
  const { metrics } = pageState;

  return (
    <TrainingPageLayout
      {...pageState}
      title="Linear Discriminant Analysis"
      subtitle="Probabilistic linear classifier"
      icon={Layers}
      algorithmName="Linear Discriminant Analysis"
      configOptions={[
        { label: "Covariance", value: "Pooled (shared)" },
        { label: "Priors", value: "Empirical" },
      ]}
      summaryComponent={
        <ClassificationSummary metrics={metrics!} direction="vertical" />
      }
      detailsComponent={<ClassificationDetailsTabs metrics={metrics!} />}
      nextStepProps={{
        message: "Model training complete.",
        linkTo: "/data/select",
        linkText: "Start New Pipeline",
      }}
      onRun={pageState.runTraining}
      onReset={pageState.reset}
    />
  );
}
