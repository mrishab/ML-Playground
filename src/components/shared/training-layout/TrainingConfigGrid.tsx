import { Card, CardContent } from "@/components/ui/card";
import { ModelConfig } from "../ModelConfig";
import { MiniLossMonitor } from "@/components/training/loss-plot/MiniLossMonitor";
import type { TrainingPageLayoutProps } from "./types";

type TrainingConfigGridProps = Pick<
  TrainingPageLayoutProps,
  | "algorithmName"
  | "featureNames"
  | "targetColumn"
  | "trainingState"
  | "canTrain"
  | "configOptions"
  | "headerExtras"
  | "summaryComponent"
  | "metrics"
  | "lossTelemetry"
  | "onRun"
  | "onReset"
>;

export function TrainingConfigGrid(props: TrainingConfigGridProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="space-y-4">
        {props.headerExtras}
        <ModelConfig
          algorithm={props.algorithmName}
          featureCount={props.featureNames.length}
          targetColumn={props.targetColumn}
          onRun={props.onRun}
          onReset={props.onReset}
          isTraining={props.trainingState === "training"}
          isComplete={props.trainingState === "complete"}
          canTrain={props.canTrain}
          options={props.configOptions}
        />
      </div>

      {props.metrics ? (
        props.summaryComponent
      ) : props.trainingState === "training" ? (
        <MiniLossMonitor telemetry={props.lossTelemetry ?? null} />
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
  );
}
