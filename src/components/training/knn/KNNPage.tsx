import { Users } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrainingPageLayout } from "@/components/shared/TrainingPageLayout";
import { ConfusionMatrix } from "@/components/training/classification/ConfusionMatrix";
import { ClassificationSummary } from "@/components/training/classification/ClassificationSummary";
import { AccuracyBreakdown } from "@/components/training/classification/AccuracyBreakdown";
import { PrecisionRecallBreakdown } from "@/components/training/classification/PrecisionRecallBreakdown";
import { F1ScoreBreakdown } from "@/components/training/classification/F1ScoreBreakdown";
import { ROCCurve } from "@/components/training/classification/ROCCurve";
import { KSelector } from "./KSelector";
import { useKNNPage } from "./useKNNPage";

export function KNNPage() {
  const pageState = useKNNPage();
  const { metrics, k, setK, effectiveMaxK, trainingState } = pageState;

  return (
    <TrainingPageLayout
      {...pageState}
      title="K-Nearest Neighbors"
      subtitle="Train and evaluate a KNN classifier"
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
      detailsComponent={
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
            <ConfusionMatrix metrics={metrics!} />
          </TabsContent>
          <TabsContent value="accuracy">
            <AccuracyBreakdown metrics={metrics!} />
          </TabsContent>
          <TabsContent value="precision-recall">
            <PrecisionRecallBreakdown metrics={metrics!} />
          </TabsContent>
          <TabsContent value="f1">
            <F1ScoreBreakdown metrics={metrics!} />
          </TabsContent>
          <TabsContent value="roc">
            <ROCCurve metrics={metrics!} />
          </TabsContent>
        </Tabs>
      }
      nextStepProps={{
        message: "Model trained. Compare your results.",
        linkTo: "/comparison/classification",
        linkText: "Go to Comparison",
      }}
      onRun={pageState.runTraining}
      onReset={pageState.reset}
    />
  );
}
