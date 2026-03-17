import { Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageHeader } from "@/components/PageHeader";
import { NoDatasetAlert } from "@/components/NoDatasetAlert";
import { ModelConfig } from "@/components/training/linear-regression/ModelConfig";
import { ConfusionMatrix } from "@/components/training/classification/ConfusionMatrix";
import { ClassificationSummary } from "@/components/training/classification/ClassificationSummary";
import { AccuracyBreakdown } from "@/components/training/classification/AccuracyBreakdown";
import { PrecisionRecallBreakdown } from "@/components/training/classification/PrecisionRecallBreakdown";
import { F1ScoreBreakdown } from "@/components/training/classification/F1ScoreBreakdown";
import { ROCCurve } from "@/components/training/classification/ROCCurve";
import { KSelector } from "./KSelector";
import { useKNNPage } from "./useKNNPage";

export function KNNPage() {
  const {
    trainingState,
    metrics,
    error,
    isSplit,
    canTrain,
    featureNames,
    targetColumn,
    k,
    setK,
    effectiveMaxK,
    runTraining,
    reset,
  } = useKNNPage();

  if (!isSplit) {
    return (
      <div className="flex flex-1 flex-col gap-4 p-4">
        <PageHeader
          icon={Users}
          title="K-Nearest Neighbors"
          subtitle="Train and evaluate a KNN classifier"
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
        icon={Users}
        title="K-Nearest Neighbors"
        subtitle="Train and evaluate a KNN classifier"
      />

      {error && (
        <Card className="border-red-500/30 bg-red-500/5">
          <CardContent className="p-4">
            <p className="text-sm text-red-500">{error}</p>
          </CardContent>
        </Card>
      )}

      {/* Top Row: K Selector + Model Config + Summary */}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-4">
          <KSelector
            k={k}
            onKChange={setK}
            maxK={effectiveMaxK}
            disabled={trainingState === "training"}
          />
          <ModelConfig
            algorithm="K-Nearest Neighbors"
            featureCount={featureNames.length}
            targetColumn={targetColumn}
            onRun={runTraining}
            onReset={reset}
            isTraining={trainingState === "training"}
            isComplete={trainingState === "complete"}
            canTrain={canTrain}
            options={[
              { label: "K (Neighbors)", value: String(k) },
              { label: "Distance Metric", value: "Euclidean" },
            ]}
          />
        </div>

        {metrics ? (
          <ClassificationSummary metrics={metrics} direction="vertical" />
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

      {/* Bottom: Tabs with classification metric breakdowns */}
      {metrics && (
        <Tabs defaultValue="confusion" className="w-full">
          <TabsList>
            <TabsTrigger value="confusion">Confusion Matrix</TabsTrigger>
            <TabsTrigger value="accuracy">Accuracy</TabsTrigger>
            <TabsTrigger value="precision-recall">
              Precision & Recall
            </TabsTrigger>
            <TabsTrigger value="f1">F1-Score</TabsTrigger>
            <TabsTrigger value="roc">ROC & AUC</TabsTrigger>
          </TabsList>
          <TabsContent value="confusion">
            <ConfusionMatrix metrics={metrics} />
          </TabsContent>
          <TabsContent value="accuracy">
            <AccuracyBreakdown metrics={metrics} />
          </TabsContent>
          <TabsContent value="precision-recall">
            <PrecisionRecallBreakdown metrics={metrics} />
          </TabsContent>
          <TabsContent value="f1">
            <F1ScoreBreakdown metrics={metrics} />
          </TabsContent>
          <TabsContent value="roc">
            <ROCCurve metrics={metrics} />
          </TabsContent>
        </Tabs>
      )}

      {trainingState === "idle" && !metrics && (
        <Card className="border-dashed">
          <CardContent className="flex h-[200px] items-center justify-center">
            <p className="text-center text-muted-foreground">
              Click "Run Training" to train the KNN classifier and view results
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
