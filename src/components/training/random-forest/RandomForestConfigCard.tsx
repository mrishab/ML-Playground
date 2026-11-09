import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

type Props = {
  nEstimators: number;
  maxDepth: number;
  onChange: (params: { nEstimators?: number; maxDepth?: number }) => void;
  disabled?: boolean;
};

export function RandomForestConfigCard({
  nEstimators,
  maxDepth,
  onChange,
  disabled,
}: Props) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Ensemble Hyperparameters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs">
            <Label>Number of Trees ({nEstimators})</Label>
            <span className="text-muted-foreground">10 – 60 trees</span>
          </div>
          <Slider
            min={10}
            max={60}
            step={5}
            value={[nEstimators]}
            onValueChange={([val]) => onChange({ nEstimators: val })}
            disabled={disabled}
          />
        </div>
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs">
            <Label>Max Tree Depth ({maxDepth})</Label>
            <span className="text-muted-foreground">2 – 12 levels</span>
          </div>
          <Slider
            min={2}
            max={12}
            step={1}
            value={[maxDepth]}
            onValueChange={([val]) => onChange({ maxDepth: val })}
            disabled={disabled}
          />
        </div>
      </CardContent>
    </Card>
  );
}
