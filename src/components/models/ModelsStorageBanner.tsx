import { HardDrive, Database } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { SavedModel } from "@/types/savedModel";

interface StorageBannerProps {
  formattedSize: string;
  models: SavedModel[];
}

export function ModelsStorageBanner({ formattedSize, models }: StorageBannerProps) {
  const regCount = models.filter((m) => m.problemType === "regression").length;
  const clsCount = models.filter((m) => m.problemType === "classification").length;
  const clusterCount = models.filter((m) => m.problemType === "clustering").length;

  return (
    <Card className="border-border/80 bg-muted/20">
      <CardContent className="flex flex-wrap items-center justify-between gap-4 p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <HardDrive className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold tracking-tight text-foreground font-mono">
                {formattedSize}
              </span>
              <span className="text-xs text-muted-foreground">storage used</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Stored locally on your device in browser localStorage
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary" className="flex items-center gap-1.5 font-normal">
            <Database className="h-3 w-3" />
            {models.length} {models.length === 1 ? "Model" : "Models"}
          </Badge>
          {regCount > 0 && <Badge variant="outline">{regCount} Regression</Badge>}
          {clsCount > 0 && <Badge variant="outline">{clsCount} Classification</Badge>}
          {clusterCount > 0 && <Badge variant="outline">{clusterCount} Clustering</Badge>}
        </div>
      </CardContent>
    </Card>
  );
}
