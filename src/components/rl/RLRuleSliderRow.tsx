import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

type Props = {
  label: string;
  sub: string;
  val: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
};

export function RLRuleSliderRow({
  label,
  sub,
  val,
  min,
  max,
  step,
  onChange,
}: Props) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs">
        <Label>{label}</Label>
        <span className="text-muted-foreground">{sub}</span>
      </div>
      <Slider
        min={min}
        max={max}
        step={step}
        value={[val]}
        onValueChange={([v]) => onChange(v)}
      />
    </div>
  );
}
