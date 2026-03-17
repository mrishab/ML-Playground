import { TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageHeader } from "@/components/PageHeader";
import { NoDatasetAlert } from "@/components/NoDatasetAlert";
import { ModelConfig } from "./ModelConfig";
import { MetricsSummary } from "./MetricsSummary";
import { PredictionsTable } from "./PredictionsTable";
import { MSEBreakdown } from "./MSEBreakdown";
import { RSEBreakdown } from "./RSEBreakdown";
import { RSquaredBreakdown } from "./RSquaredBreakdown";
import { useLinearRegressionPage } from "./useLinearRegressionPage";

export function LinearRegressionPage() {
  const {
    trainingState,
    metrics,
    error,
    isSplit,
    canTrain,
    featureNames,
    targetColumn,
    runTraining,
    reset,
  } = useLinearRegressionPage();

  if (!isSplit) {
    return (
      <div className="flex flex-1 flex-col gap-4 p-4">
        <PageHeader
          icon={TrendingUp}
          title="Linear Regression"
          subtitle="Train and evaluate a linear regression model"
        />
        <NoDatasetAlert
          title="No split data available"
          description="Please configure and split your data first."
          linkTo="/pretrain/explore"
          linkText="Go to Explore page"
        />
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <PageHeader
        icon={TrendingUp}
        title="Linear Regression"
        subtitle="Train and evaluate a linear regression model"
      />

      {error && (
        <Card className="border-red-500/30 bg-red-500/5">
          <CardContent className="p-4">
            <p className="text-sm text-red-500">{error}</p>
          </CardContent>
        </Card>
      )}

      {/* Top Row: Model Config (left) + Metrics Summary (right) */}
      <div className="grid gap-4 md:grid-cols-2">
        <ModelConfig
          algorithm="Linear Regression (OLS)"
          featureCount={featureNames.length}
          targetColumn={targetColumn}
          onRun={runTraining}
          onReset={reset}
          isTraining={trainingState === "training"}
          isComplete={trainingState === "complete"}
          canTrain={canTrain}
          options={[{ label: "Fit Intercept", value: "True" }]}
        />

        {metrics ? (
          <MetricsSummary metrics={metrics} direction="vertical" />
        ) : (
          <Card className="border-dashed">
            <CardContent className="flex h-full items-center justify-center p-6">
              <p className="text-center text-sm text-muted-foreground">
                Run training to see metrics
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Bottom: Tabs with PredictionsTable and Breakdowns */}
      {metrics && (
        <Tabs defaultValue="predictions" className="w-full">
          <TabsList>
            <TabsTrigger value="predictions">Predictions</TabsTrigger>
            <TabsTrigger value="mse">MSE</TabsTrigger>
            <TabsTrigger value="rse">RSE</TabsTrigger>
            <TabsTrigger value="rsquared">R²</TabsTrigger>
          </TabsList>
          <TabsContent value="predictions">
            <PredictionsTable metrics={metrics} />
          </TabsContent>
          <TabsContent value="mse">
            <MSEBreakdown metrics={metrics} />
          </TabsContent>
          <TabsContent value="rse">
            <RSEBreakdown metrics={metrics} />
          </TabsContent>
          <TabsContent value="rsquared">
            <RSquaredBreakdown metrics={metrics} />
          </TabsContent>
        </Tabs>
      )}

      {trainingState === "idle" && !metrics && (
        <Card className="border-dashed">
          <CardContent className="flex h-[200px] items-center justify-center">
            <p className="text-center text-muted-foreground">
              Click "Run Training" to train the model and view results
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
