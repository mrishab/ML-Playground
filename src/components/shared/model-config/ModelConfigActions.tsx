import { Play, RotateCcw, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ModelConfigActionsProps {
  onRun: () => void;
  onReset: () => void;
  isTraining: boolean;
  isComplete: boolean;
  canTrain: boolean;
}

export function ModelConfigActions({
  onRun,
  onReset,
  isTraining,
  isComplete,
  canTrain,
}: ModelConfigActionsProps) {
  return (
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
        <Button
          variant="outline"
          onClick={onReset}
          className="animate-in fade-in zoom-in-95 duration-200"
          title="Reset Model"
        >
          <RotateCcw className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
