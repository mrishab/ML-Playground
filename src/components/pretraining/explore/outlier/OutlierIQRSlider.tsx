import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

interface OutlierIQRSliderProps {
  iqrMultiplier: number;
  setIqrMultiplier: (value: number) => void;
}

export function OutlierIQRSlider({
  iqrMultiplier,
  setIqrMultiplier,
}: OutlierIQRSliderProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Label>IQR multiplier</Label>
        <span className="text-sm font-medium">{iqrMultiplier.toFixed(1)}x</span>
      </div>
      <Slider
        value={[iqrMultiplier]}
        onValueChange={([val]) => {
          if (typeof val === "number") setIqrMultiplier(val);
        }}
        min={0.5}
        max={3}
        step={0.1}
      />
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>0.5x</span>
        <span>Default: 1.5x</span>
        <span>3.0x</span>
      </div>
    </div>
  );
}
