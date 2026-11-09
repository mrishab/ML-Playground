import { Zap } from "lucide-react";
import { TrainingPageLayout } from "@/components/shared/TrainingPageLayout";
import { ClassificationSummary } from "@/components/training/classification/ClassificationSummary";
import { ClassificationDetailsTabs } from "@/components/training/classification/ClassificationDetailsTabs";
import { MetricsSummary } from "@/components/training/linear-regression/MetricsSummary";
import { LinearRegressionDetailsTabs } from "@/components/training/linear-regression/LinearRegressionDetailsTabs";
import { XGBoostConfigCard } from "./XGBoostConfigCard";
import { FeatureImportanceCard } from "../random-forest/FeatureImportanceCard";
import { useXGBoostPage } from "./useXGBoostPage";

export function XGBoostPage() {
  const p = useXGBoostPage();
  const isReg = p.problemType === "regression";
  const metrics = isReg ? p.regressionMetrics : p.classificationMetrics;

  return (
    <TrainingPageLayout
      {...p}
      title="XGBoost"
      subtitle={isReg ? "Gradient boosted tree regressor" : "Gradient boosted tree classifier"}
      icon={Zap}
      algorithmName="XGBoost"
      metrics={metrics}
      configOptions={[
        { label: "Rounds", value: String(p.nEstimators) },
        { label: "Max Depth", value: String(p.maxDepth) },
        { label: "Learning Rate", value: "0.1" },
      ]}
      headerExtras={
        <XGBoostConfigCard
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
