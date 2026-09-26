import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

interface TestSplitSliderProps {
  value: number;
  onChange: (value: number) => void;
}

export function TestSplitSlider({ value, onChange }: TestSplitSliderProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Label>Test split percentage</Label>
        <span className="text-sm font-medium">{value}%</span>
      </div>
      <Slider
        value={[value]}
        onValueChange={([val]) => onChange(val)}
        min={5}
        max={50}
        step={5}
      />
    </div>
  );
}
