import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ModelConfigRows } from "./model-config/ModelConfigRows";
import { ModelConfigActions } from "./model-config/ModelConfigActions";

const EMPTY_OPTIONS: { label: string; value: string }[] = [];

type ModelConfigProps = {
  algorithm: string;
  featureCount: number;
  targetColumn: string;
  onRun: () => void;
  onReset: () => void;
  isTraining: boolean;
  isComplete: boolean;
  canTrain: boolean;
  options?: typeof EMPTY_OPTIONS;
};

export function ModelConfig({
  algorithm,
  featureCount,
  targetColumn,
  onRun,
  onReset,
  isTraining,
  isComplete,
  canTrain,
  options = EMPTY_OPTIONS,
}: ModelConfigProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Model Configuration</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <ModelConfigRows
          algorithm={algorithm}
          options={options}
          featureCount={featureCount}
          targetColumn={targetColumn}
        />
        <ModelConfigActions
          onRun={onRun}
          onReset={onReset}
          isTraining={isTraining}
          isComplete={isComplete}
          canTrain={canTrain}
        />
      </CardContent>
    </Card>
  );
}
