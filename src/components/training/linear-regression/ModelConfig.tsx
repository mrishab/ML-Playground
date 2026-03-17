import { Play, RotateCcw, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type ModelConfigProps = {
  algorithm: string;
  featureCount: number;
  targetColumn: string;
  onRun: () => void;
  onReset: () => void;
  isTraining: boolean;
  isComplete: boolean;
  canTrain: boolean;
  options?: { label: string; value: string }[];
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
  options = [],
}: ModelConfigProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Model Configuration</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Algorithm</span>
          <Badge variant="secondary">{algorithm}</Badge>
        </div>
        {options.map((option) => (
          <div key={option.label} className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              {option.label}
            </span>
            <Badge variant="outline">{option.value}</Badge>
          </div>
        ))}
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Features</span>
          <Badge variant="outline">{featureCount}</Badge>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Target</span>
          <Badge variant="outline">{targetColumn || "—"}</Badge>
        </div>
        <div className="flex gap-2 pt-2">
          <Button
            onClick={onRun}
            disabled={!canTrain || isTraining}
            className="flex-1"
          >
            {isTraining ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Training...
              </>
            ) : (
              <>
                <Play className="mr-2 h-4 w-4" />
                Run Training
              </>
            )}
          </Button>
          {isComplete && (
            <Button variant="outline" onClick={onReset}>
              <RotateCcw className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
