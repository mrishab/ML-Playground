import { useMemo } from "react";
import { Award, Download, CheckCircle2, Sparkles } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PageLayout } from "@/components/shared/PageLayout";
import { useDatasetStore } from "@/stores/dataset";
import { useMLConfigStore } from "@/stores/mlConfig";
import { useTrainingResultsStore } from "@/stores/trainingResults";
import { usePipelineSteps } from "@/hooks/usePipelineSteps";
import { PrerequisiteGate } from "./PrerequisiteGate";

export function ValidationResultsPage() {
  const { currentStep } = usePipelineSteps();
  const { selectedDataset } = useDatasetStore();
  const { problemType, targetColumn, selectedFeatures, xTrain, xTest } =
    useMLConfigStore();
  const { linearRegression, knn, lda, logisticRegression } =
    useTrainingResultsStore();

  const isRegression = problemType === "regression";
  const isClassification = problemType === "classification";

  // Model comparison leaderboard
  const models = useMemo(() => {
    if (isRegression) {
      const list = [];
      if (linearRegression.metrics) {
        list.push({
          name: "Linear Regression",
          type: "OLS",
          primaryMetric: `R²: ${linearRegression.metrics.rSquared.toFixed(3)}`,
          secondaryMetric: `MSE: ${linearRegression.metrics.mse.toFixed(4)}`,
          rawScore: linearRegression.metrics.rSquared,
          metrics: linearRegression.metrics,
        });
      }
      return list;
    }

    if (isClassification) {
      const list = [];
      if (knn.metrics) {
        list.push({
          name: "K-Nearest Neighbors",
          type: `k=${knn.k}`,
          primaryMetric: `Accuracy: ${(knn.metrics.accuracy * 100).toFixed(1)}%`,
          secondaryMetric: `F1: ${knn.metrics.macroF1.toFixed(3)}`,
          rawScore: knn.metrics.accuracy,
          metrics: knn.metrics,
        });
      }
      if (lda.metrics) {
        list.push({
          name: "Linear Discriminant Analysis",
          type: "Linear",
          primaryMetric: `Accuracy: ${(lda.metrics.accuracy * 100).toFixed(1)}%`,
          secondaryMetric: `F1: ${lda.metrics.macroF1.toFixed(3)}`,
          rawScore: lda.metrics.accuracy,
          metrics: lda.metrics,
        });
      }
      if (logisticRegression.metrics) {
        list.push({
          name: "Logistic Regression",
          type: "Sigmoid",
          primaryMetric: `Accuracy: ${(logisticRegression.metrics.accuracy * 100).toFixed(1)}%`,
          secondaryMetric: `F1: ${logisticRegression.metrics.macroF1.toFixed(3)}`,
          rawScore: logisticRegression.metrics.accuracy,
          metrics: logisticRegression.metrics,
        });
      }
      return list.sort((a, b) => b.rawScore - a.rawScore);
    }

    return [];
  }, [
    isRegression,
    isClassification,
    linearRegression.metrics,
    knn,
    lda,
    logisticRegression,
  ]);

  const bestModel = models[0];

  const handleExportJSON = () => {
    const report = {
      pipeline: "ML Playground Client Compute",
      timestamp: new Date().toISOString(),
      dataset: selectedDataset,
      problemType,
      targetColumn,
      features: selectedFeatures.map((f) => f.column),
      trainRows: xTrain?.shape[0],
      testRows: xTest?.shape[0],
      models: models.map((m) => ({
        name: m.name,
        type: m.type,
        metrics: m.metrics,
      })),
    };

    const blob = new Blob([JSON.stringify(report, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `ml-results-${selectedDataset.toLowerCase()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (currentStep.status === "locked") {
    return (
      <PageLayout
        icon={Award}
        title="Validation & Results"
        subtitle="Final model evaluation and benchmark reports"
      >
        <PrerequisiteGate step={currentStep} />
      </PageLayout>
    );
  }

  return (
    <PageLayout
      icon={Award}
      title="Validation & Results"
      subtitle={`Final model evaluation and pipeline report for ${selectedDataset}`}
      actions={
        <Button
          variant="outline"
          size="sm"
          onClick={handleExportJSON}
          className="text-xs"
        >
          <Download className="mr-1.5 h-3.5 w-3.5" />
          Export JSON Report
        </Button>
      }
      primaryAction={{
        label: "Start New Pipeline",
        linkTo: "/data/select",
        variant: "default",
      }}
    >
      <div className="space-y-6">
        {/* Completion Celebration Card */}
        <Card className="border-emerald-500/30 bg-emerald-500/5 transition-all duration-200">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
              <Sparkles className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground text-base">
                Pipeline Workflow Completed
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                All 5 stages of client-side computation (Data Ingestion,
                Pretraining, Training, Comparison, and Validation) have executed
                successfully in your browser.
              </p>
            </div>
            <Badge
              variant="outline"
              className="border-emerald-500/40 text-emerald-600 dark:text-emerald-400 px-3 py-1"
            >
              <CheckCircle2 className="mr-1.5 h-3.5 w-3.5" />
              Verified Complete
            </Badge>
          </CardContent>
        </Card>

        {/* Best Model Banner */}
        {bestModel && (
          <Card className="border-primary/30 bg-card shadow-sm">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-lg font-bold">
                      Top Performing Model: {bestModel.name}
                    </CardTitle>
                    <Badge className="bg-primary text-primary-foreground text-xs">
                      Best Score
                    </Badge>
                  </div>
                  <CardDescription className="text-xs mt-1">
                    Evaluated on held-out test partition ({xTest?.shape[0]} test
                    samples)
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-4">
                <div className="rounded-lg border bg-muted/30 p-3">
                  <p className="text-xs text-muted-foreground">
                    Primary Metric
                  </p>
                  <p className="text-xl font-bold text-foreground mt-1">
                    {bestModel.primaryMetric}
                  </p>
                </div>
                <div className="rounded-lg border bg-muted/30 p-3">
                  <p className="text-xs text-muted-foreground">
                    Secondary Metric
                  </p>
                  <p className="text-xl font-bold text-foreground mt-1">
                    {bestModel.secondaryMetric}
                  </p>
                </div>
                <div className="rounded-lg border bg-muted/30 p-3">
                  <p className="text-xs text-muted-foreground">
                    Input Features
                  </p>
                  <p className="text-xl font-bold text-foreground mt-1">
                    {selectedFeatures.length}
                  </p>
                </div>
                <div className="rounded-lg border bg-muted/30 p-3">
                  <p className="text-xs text-muted-foreground">
                    Target Variable
                  </p>
                  <p className="text-xl font-bold text-foreground mt-1 truncate">
                    {targetColumn}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* All Evaluated Models Grid */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold tracking-tight text-foreground">
            Evaluated Models Benchmark
          </h4>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {models.map((m, idx) => (
              <Card key={m.name} className="transition-all duration-200">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base font-semibold">
                      {m.name}
                    </CardTitle>
                    <Badge variant="secondary" className="text-[10px]">
                      Rank #{idx + 1}
                    </Badge>
                  </div>
                  <CardDescription className="text-xs">
                    Configuration: {m.type}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 pt-2">
                  <div className="flex justify-between text-xs py-1 border-b">
                    <span className="text-muted-foreground">Primary:</span>
                    <span className="font-semibold text-foreground">
                      {m.primaryMetric}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs py-1">
                    <span className="text-muted-foreground">Secondary:</span>
                    <span className="font-medium text-foreground">
                      {m.secondaryMetric}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
