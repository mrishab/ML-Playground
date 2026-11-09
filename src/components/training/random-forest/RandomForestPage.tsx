import { Trees } from "lucide-react";
import { TrainingPageLayout } from "@/components/shared/TrainingPageLayout";
import { ClassificationSummary } from "@/components/training/classification/ClassificationSummary";
import { ClassificationDetailsTabs } from "@/components/training/classification/ClassificationDetailsTabs";
import { MetricsSummary } from "@/components/training/linear-regression/MetricsSummary";
import { LinearRegressionDetailsTabs } from "@/components/training/linear-regression/LinearRegressionDetailsTabs";
import { RandomForestConfigCard } from "./RandomForestConfigCard";
import { FeatureImportanceCard } from "./FeatureImportanceCard";
import { useRandomForestPage } from "./useRandomForestPage";

export function RandomForestPage() {
  const p = useRandomForestPage();
  const isReg = p.problemType === "regression";
  const metrics = isReg ? p.regressionMetrics : p.classificationMetrics;

  return (
    <TrainingPageLayout
      {...p}
      title="Random Forest"
      subtitle={isReg ? "Ensemble bootstrap regressor" : "Ensemble bootstrap classifier"}
      icon={Trees}
      algorithmName="Random Forest"
      metrics={metrics}
      configOptions={[
        { label: "Trees", value: String(p.nEstimators) },
        { label: "Max Depth", value: String(p.maxDepth) },
      ]}
      headerExtras={
        <RandomForestConfigCard
          nEstimators={p.nEstimators}
          maxDepth={p.maxDepth}
          onChange={p.setParams}
          disabled={p.trainingState === "training"}
        />
      }
      summaryComponent={
        isReg ? (
          <MetricsSummary metrics={p.regressionMetrics!} />
        ) : (
          <ClassificationSummary metrics={p.classificationMetrics!} direction="vertical" />
        )
      }
      detailsComponent={
        isReg ? (
          <LinearRegressionDetailsTabs metrics={p.regressionMetrics!} />
        ) : (
          <ClassificationDetailsTabs metrics={p.classificationMetrics!} />
        )
      }
      footerExtras={<FeatureImportanceCard importances={p.importances} />}
      nextStepProps={{ message: "Training complete.", linkTo: "/models", linkText: "Saved Models" }}
      onRun={p.runTraining}
      onReset={p.reset}
    />
  );
}
