import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

type Props = {
  nEstimators: number;
  contamination: number;
  onChange: (params: { nEstimators?: number; contamination?: number }) => void;
  disabled?: boolean;
};

export function IsolationForestConfigCard({
  nEstimators,
  contamination,
  onChange,
  disabled,
}: Props) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Isolation Hyperparameters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs">
            <Label>Isolation Trees ({nEstimators})</Label>
            <span className="text-muted-foreground">20 – 100 trees</span>
          </div>
          <Slider
            min={20}
            max={100}
            step={10}
            value={[nEstimators]}
            onValueChange={([val]) => onChange({ nEstimators: val })}
            disabled={disabled}
          />
        </div>
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs">
            <Label>Expected Contamination ({Math.round(contamination * 100)}%)</Label>
            <span className="text-muted-foreground">3% – 25%</span>
          </div>
          <Slider
            min={3}
            max={25}
            step={1}
            value={[Math.round(contamination * 100)]}
            onValueChange={([val]) => onChange({ contamination: val / 100 })}
            disabled={disabled}
          />
        </div>
      </CardContent>
    </Card>
  );
}
