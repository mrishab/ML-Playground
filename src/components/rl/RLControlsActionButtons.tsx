import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw, StepForward, FastForward } from "lucide-react";

type Props = {
  isSimulating: boolean;
  onTrain: (episodes: number) => void;
  onStep: () => void;
  onToggleSimulate: () => void;
  onResetQ: () => void;
};

export function RLControlsActionButtons({
  isSimulating,
  onTrain,
  onStep,
  onToggleSimulate,
  onResetQ,
}: Props) {
  const SimIcon = isSimulating ? Pause : Play;
  return (
    <div className="flex items-center gap-1.5 pt-1">
      <Button
        size="sm"
        className="flex-1 gap-1 h-8 text-xs"
        onClick={() => onTrain(50)}
      >
        <FastForward className="h-3 w-3" /> Train 50
      </Button>
      <Button
        size="sm"
        variant={isSimulating ? "default" : "secondary"}
        className="h-8 text-xs gap-1"
        onClick={onToggleSimulate}
        title={isSimulating ? "Pause simulation" : "Run continuous simulation"}
      >
        <SimIcon className="h-3 w-3" />
        {isSimulating ? "Pause" : "Play"}
      </Button>
      <Button
        size="sm"
        variant="outline"
        className="h-8 text-xs gap-1"
        onClick={onStep}
        disabled={isSimulating}
      >
        <StepForward className="h-3 w-3" /> Step
      </Button>
      <Button
        size="sm"
        variant="ghost"
        className="h-8 text-xs px-2 text-muted-foreground"
        onClick={onResetQ}
        title="Reset Q-Table"
      >
        <RotateCcw className="h-3.5 w-3.5" />
      </Button>
    </div>
  );
}
