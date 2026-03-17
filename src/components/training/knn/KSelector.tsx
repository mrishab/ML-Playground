import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";

type KSelectorProps = {
  k: number;
  onKChange: (k: number) => void;
  maxK: number;
  disabled?: boolean;
};

export function KSelector({ k, onKChange, maxK, disabled }: KSelectorProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">K Value Selection</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            Number of Neighbors (K)
          </span>
          <Badge variant="secondary" className="text-base">
            {k}
          </Badge>
        </div>
        <Slider
          min={1}
          max={maxK}
          step={1}
          value={[k]}
          onValueChange={([value]) => onKChange(value)}
          disabled={disabled}
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>1</span>
          <span>{maxK}</span>
        </div>
        <p className="text-xs text-muted-foreground">
          Lower K captures more local patterns (risk of overfitting). Higher K
          produces smoother decision boundaries (risk of underfitting).
        </p>
      </CardContent>
    </Card>
  );
}
