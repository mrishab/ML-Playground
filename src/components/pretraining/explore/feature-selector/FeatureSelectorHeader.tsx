import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface FeatureSelectorHeaderProps {
  hasFeatures: boolean;
  onClear: () => void;
}

export function FeatureSelectorHeader({
  hasFeatures,
  onClear,
}: FeatureSelectorHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <Label>Independent Variables (X)</Label>
      {hasFeatures && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onClear}
          className="h-7 text-xs text-muted-foreground"
        >
          Clear all
        </Button>
      )}
    </div>
  );
}
