import { Layers } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrainingPageLayout } from "@/components/shared/TrainingPageLayout";
import { ConfusionMatrix } from "@/components/training/classification/ConfusionMatrix";
import { ClassificationSummary } from "@/components/training/classification/ClassificationSummary";
import { AccuracyBreakdown } from "@/components/training/classification/AccuracyBreakdown";
import { PrecisionRecallBreakdown } from "@/components/training/classification/PrecisionRecallBreakdown";
import { F1ScoreBreakdown } from "@/components/training/classification/F1ScoreBreakdown";
import { ROCCurve } from "@/components/training/classification/ROCCurve";
import { useLDAPage } from "./useLDAPage";

export function LDAPage() {
  const pageState = useLDAPage();
  const { metrics } = pageState;

  return (
    <TrainingPageLayout
      {...pageState}
      title="Linear Discriminant Analysis"
      subtitle="Train and evaluate an LDA classifier"
      icon={Layers}
      algorithmName="Linear Discriminant Analysis"
      configOptions={[
        { label: "Covariance", value: "Pooled (shared)" },
        { label: "Priors", value: "Empirical" },
      ]}
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
