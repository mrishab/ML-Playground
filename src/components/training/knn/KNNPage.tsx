import { Users } from "lucide-react";
import { TrainingPageLayout } from "@/components/shared/TrainingPageLayout";
import { ClassificationSummary } from "@/components/training/classification/ClassificationSummary";
import { ClassificationDetailsTabs } from "@/components/training/classification/ClassificationDetailsTabs";
import { KSelector } from "./KSelector";
import { useKNNPage } from "./useKNNPage";

export function KNNPage() {
  const pageState = useKNNPage();
  const { metrics, k, setK, effectiveMaxK, trainingState } = pageState;

  return (
    <TrainingPageLayout
      {...pageState}
      title="K-Nearest Neighbors"
      subtitle="Instance-based classifier"
      icon={Users}
      algorithmName="K-Nearest Neighbors"
      configOptions={[
        { label: "K (Neighbors)", value: String(k) },
        { label: "Distance Metric", value: "Euclidean" },
      ]}
      headerExtras={
        <KSelector
          k={k}
          onKChange={setK}
          maxK={effectiveMaxK}
          disabled={trainingState === "training"}
        />
      }
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
