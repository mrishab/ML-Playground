import { TrendingUp } from "lucide-react";
import { TrainingPageLayout } from "@/components/shared/TrainingPageLayout";
import { MetricsSummary } from "./MetricsSummary";
import { LinearRegressionDetailsTabs } from "./LinearRegressionDetailsTabs";
import { useLinearRegressionPage } from "./useLinearRegressionPage";

export function LinearRegressionPage() {
  const pageState = useLinearRegressionPage();
  const { metrics, lossTelemetry } = pageState;

  return (
    <TrainingPageLayout
      {...pageState}
      title="Linear Regression"
      subtitle="Ordinary Least Squares regression"
      icon={TrendingUp}
      algorithmName="Linear Regression (OLS)"
      configOptions={[{ label: "Fit Intercept", value: "True" }]}
      summaryComponent={
        <MetricsSummary metrics={metrics!} direction="vertical" />
      }
      detailsComponent={
        <LinearRegressionDetailsTabs
          metrics={metrics!}
          telemetry={lossTelemetry}
        />
      }
      nextStepProps={{
        message: "Model trained.",
        linkTo: "/comparison/regression",
        linkText: "Compare Models",
      }}
      onRun={pageState.runTraining}
      onReset={pageState.reset}
    />
  );
}
