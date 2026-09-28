import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ConfusionMatrix } from "./ConfusionMatrix";
import { AccuracyBreakdown } from "./AccuracyBreakdown";
import { PrecisionRecallBreakdown } from "./PrecisionRecallBreakdown";
import { F1ScoreBreakdown } from "./F1ScoreBreakdown";
import { ROCCurve } from "./ROCCurve";
import type { ClassificationMetrics } from "@/types/classification";

export function ClassificationDetailsTabs({
  metrics,
}: {
  metrics: ClassificationMetrics;
}) {
  return (
    <Tabs defaultValue="confusion" className="w-full">
      <TabsList>
        <TabsTrigger value="confusion">Confusion Matrix</TabsTrigger>
        <TabsTrigger value="accuracy">Accuracy</TabsTrigger>
        <TabsTrigger value="precision-recall">Precision & Recall</TabsTrigger>
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
  );
}
