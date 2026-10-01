import { ModelCard } from "./ModelCard";
import type { SavedModel } from "@/types/savedModel";

interface ListGridProps {
  models: SavedModel[];
  onInspect: (model: SavedModel) => void;
  onDownload: (model: SavedModel) => void;
  onRename: (model: SavedModel) => void;
  onDelete: (model: SavedModel) => void;
}

export function ModelsListGrid({
  models,
  onInspect,
  onDownload,
  onRename,
  onDelete,
}: ListGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {models.map((model) => (
        <ModelCard
          key={model.id}
          model={model}
          onInspect={onInspect}
          onDownload={onDownload}
          onRename={onRename}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
