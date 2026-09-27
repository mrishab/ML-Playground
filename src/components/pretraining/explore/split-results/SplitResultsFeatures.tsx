import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

interface SplitResultsFeaturesProps {
  targetColumn: string;
  featureNames: string[];
}

export function SplitResultsFeatures({
  targetColumn,
  featureNames,
}: SplitResultsFeaturesProps) {
  return (
    <>
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm text-muted-foreground">Target (Y):</span>
        <Badge variant="secondary" className="truncate max-w-full">
          {targetColumn}
        </Badge>
      </div>

      <div>
        <span className="text-sm text-muted-foreground">Features (X):</span>
        <ScrollArea className="mt-2 max-h-[120px]">
          <div className="flex flex-wrap gap-1 py-0.5">
            {featureNames.map((name) => (
              <Badge key={name} variant="outline" className="text-xs">
                {name}
              </Badge>
            ))}
          </div>
        </ScrollArea>
      </div>
    </>
  );
}
