import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import type { RLHyperparameters } from "@/lib/rl/types";

type Props = {
  params: RLHyperparameters;
  onChange: (patch: Partial<RLHyperparameters>) => void;
};

export function RLControlSliders({ params, onChange }: Props) {
  return (
    <div className="space-y-3.5">
      <div className="space-y-1">
        <div className="flex justify-between text-xs">
          <Label>Learning Rate α ({params.learningRate.toFixed(2)})</Label>
          <span className="text-muted-foreground">Step size</span>
        </div>
        <Slider
          min={5}
          max={100}
          step={5}
          value={[Math.round(params.learningRate * 100)]}
          onValueChange={([val]) => onChange({ learningRate: val / 100 })}
        />
      </div>
      <div className="space-y-1">
        <div className="flex justify-between text-xs">
          <Label>Discount Factor γ ({params.discountFactor.toFixed(2)})</Label>
          <span className="text-muted-foreground">
            Future vs immediate reward
          </span>
        </div>
        <Slider
          min={50}
          max={99}
          step={1}
          value={[Math.round(params.discountFactor * 100)]}
          onValueChange={([val]) => onChange({ discountFactor: val / 100 })}
        />
      </div>
      <div className="space-y-1">
        <div className="flex justify-between text-xs">
          <Label>
            Exploration Rate ε ({Math.round(params.explorationRate * 100)}%)
          </Label>
          <span className="text-muted-foreground">Random action chance</span>
        </div>
        <Slider
          min={0}
          max={80}
          step={5}
          value={[Math.round(params.explorationRate * 100)]}
          onValueChange={([val]) => onChange({ explorationRate: val / 100 })}
        />
      </div>
    </div>
  );
}
