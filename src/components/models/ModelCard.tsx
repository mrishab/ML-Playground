import { Card, CardContent } from "@/components/ui/card";
import { ModelCardHeader } from "./ModelCardHeader";
import { ModelCardMetrics } from "./ModelCardMetrics";
import { ModelCardActions } from "./ModelCardActions";
import type { SavedModel } from "@/types/savedModel";

interface ModelCardProps {
  model: SavedModel;
  onInspect: (model: SavedModel) => void;
  onDownload: (model: SavedModel) => void;
  onRename: (model: SavedModel) => void;
  onDelete: (model: SavedModel) => void;
}

export function ModelCard({
  model,
  onInspect,
  onDownload,
  onRename,
  onDelete,
}: ModelCardProps) {
  return (
    <Card className="flex flex-col justify-between border-border/80 bg-card hover:border-primary/40 hover:shadow-sm transition-[border-color,box-shadow] duration-200">
      <CardContent className="flex flex-col gap-1 p-4 pb-2">
        <ModelCardHeader model={model} />
        <ModelCardMetrics model={model} />
        <ModelCardActions
          model={model}
          onInspect={onInspect}
          onDownload={onDownload}
          onRename={onRename}
          onDelete={onDelete}
        />
      </CardContent>
    </Card>
  );
}
