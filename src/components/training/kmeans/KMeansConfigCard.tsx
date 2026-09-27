import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

export function KMeansConfigCard({
  k,
  onKChange,
  disabled,
}: {
  k: number;
  onKChange: (k: number) => void;
  disabled?: boolean;
}) {
  return (
    <Card>
      <CardContent className="space-y-4 p-4">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-medium">Clusters (k): {k}</Label>
          <span className="text-xs text-muted-foreground">Range: 2 - 8</span>
        </div>
        <Slider
          value={[k]}
          min={2}
          max={8}
          step={1}
          disabled={disabled}
          onValueChange={([val]) => onKChange(val ?? 3)}
        />
      </CardContent>
    </Card>
  );
}
