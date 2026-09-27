import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { SelectedFeature } from "@/stores/mlConfig";

interface ExploreSplitButtonProps {
  isSplit: boolean;
  isExploreDirty: boolean;
  canSplit: boolean;
  performSplit: () => void;
  targetColumn: string;
  selectedFeatures: SelectedFeature[];
}

export function ExploreSplitButton({
  isSplit,
  isExploreDirty,
  canSplit,
  performSplit,
  targetColumn,
  selectedFeatures,
}: ExploreSplitButtonProps) {
  return (
    <>
      <Button
        onClick={performSplit}
        disabled={!canSplit}
        className="w-full"
        size="lg"
        variant={isExploreDirty ? "destructive" : "default"}
      >
        {isSplit ? "Re-split Data" : "Create Split"}
      </Button>

      {!canSplit && targetColumn && selectedFeatures.length > 0 && (
        <Card className="border-red-500/30 bg-red-500/5 animate-in fade-in-50 duration-200">
          <CardContent className="flex items-center gap-3 p-3">
            <AlertCircle className="h-4 w-4 text-red-500 shrink-0" />
            <p className="text-sm">Target column cannot be used as a feature</p>
          </CardContent>
        </Card>
      )}
    </>
  );
}
