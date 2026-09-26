import { Award } from "lucide-react";
import { PageLayout } from "@/components/shared/PageLayout";
import { PrerequisiteGate } from "./PrerequisiteGate";
import { useValidationResults } from "./validation/useValidationResults";
import { CompletionCelebrationCard } from "./validation/CompletionCelebrationCard";
import { BestModelBanner } from "./validation/BestModelBanner";
import { EvaluatedModelsGrid } from "./validation/EvaluatedModelsGrid";
import { ExportReportButton } from "./validation/ExportReportButton";

export function ValidationResultsPage() {
  const r = useValidationResults();

  if (r.currentStep.status === "locked") {
    return (
      <PageLayout
        icon={Award}
        title="Validation & Results"
        subtitle="Model evaluation and benchmarks"
      >
        <PrerequisiteGate step={r.currentStep} />
      </PageLayout>
    );
  }

  return (
    <PageLayout
      icon={Award}
      title="Validation & Results"
      subtitle={`Evaluation & metrics for ${r.selectedDataset}`}
      actions={<ExportReportButton onClick={r.handleExportJSON} />}
      primaryAction={{
        label: "New Pipeline",
        linkTo: "/data/select",
        variant: "default",
      }}
    >
      <div className="space-y-6">
        <CompletionCelebrationCard />
        {r.bestModel && (
          <BestModelBanner
            bestModel={r.bestModel}
            testCount={r.xTest?.shape[0]}
            featureCount={r.selectedFeatures.length}
            targetColumn={r.targetColumn}
          />
        )}
        <EvaluatedModelsGrid models={r.models} />
      </div>
    </PageLayout>
  );
}
