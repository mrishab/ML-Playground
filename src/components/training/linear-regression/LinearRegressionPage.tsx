import { TrendingUp } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrainingPageLayout } from "@/components/shared/TrainingPageLayout";
import { MetricsSummary } from "./MetricsSummary";
import { PredictionsTable } from "./PredictionsTable";
import { MSEBreakdown } from "./MSEBreakdown";
import { RSEBreakdown } from "./RSEBreakdown";
import { RSquaredBreakdown } from "./RSquaredBreakdown";
import { useLinearRegressionPage } from "./useLinearRegressionPage";

export function LinearRegressionPage() {
  const pageState = useLinearRegressionPage();
  const { metrics } = pageState;

  return (
    <TrainingPageLayout
      {...pageState}
      title="Linear Regression"
      subtitle="Train and evaluate a linear regression model"
      icon={TrendingUp}
      algorithmName="Linear Regression (OLS)"
      configOptions={[{ label: "Fit Intercept", value: "True" }]}
      summaryComponent={
        <MetricsSummary metrics={metrics!} direction="vertical" />
      }
      detailsComponent={
        <Tabs defaultValue="predictions" className="w-full">
          <TabsList>
            <TabsTrigger value="predictions">Predictions</TabsTrigger>
            <TabsTrigger value="mse">MSE</TabsTrigger>
            <TabsTrigger value="rse">RSE</TabsTrigger>
            <TabsTrigger value="rsquared">R²</TabsTrigger>
          </TabsList>
          <TabsContent value="predictions">
            <PredictionsTable metrics={metrics!} />
          </TabsContent>
          <TabsContent value="mse">
            <MSEBreakdown metrics={metrics!} />
          </TabsContent>
          <TabsContent value="rse">
            <RSEBreakdown metrics={metrics!} />
          </TabsContent>
          <TabsContent value="rsquared">
            <RSquaredBreakdown metrics={metrics!} />
          </TabsContent>
        </Tabs>
      }
      nextStepProps={{
        message: "Model trained. Compare your results.",
        linkTo: "/comparison/regression",
        linkText: "Go to Comparison",
      }}
      onRun={pageState.runTraining}
      onReset={pageState.reset}
    />
  );
}
