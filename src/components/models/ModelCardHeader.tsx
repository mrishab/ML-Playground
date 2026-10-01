import { TrendingUp, Users, Layers, Binary, CircleDot } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatFileSize } from "@/lib/csv-upload/formatFileSize";
import type { SavedModel, AlgorithmType } from "@/types/savedModel";

const ALGO_ICONS: Record<AlgorithmType, typeof TrendingUp> = {
  linear: TrendingUp,
  knn: Users,
  lda: Layers,
  logistic: Binary,
  clustering: CircleDot,
};

export function ModelCardHeader({ model }: { model: SavedModel }) {
  const Icon = ALGO_ICONS[model.algorithm] || TrendingUp;
  const dateStr = new Date(model.createdAt).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="flex items-start justify-between gap-3">
      <div className="flex items-center gap-2.5 min-w-0">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Icon className="h-4 w-4" />
        </div>
        <div className="min-w-0">
          <h4 className="text-sm font-semibold text-foreground truncate" title={model.name}>
            {model.name}
          </h4>
          <p className="text-xs text-muted-foreground truncate">
            {model.algorithmName} • {model.datasetName}
          </p>
        </div>
      </div>
      <div className="flex flex-col items-end shrink-0 gap-1">
        <Badge variant="outline" className="text-[10px] font-mono py-0 h-5">
          {formatFileSize(model.sizeBytes)}
        </Badge>
        <span className="text-[10px] text-muted-foreground">{dateStr}</span>
      </div>
    </div>
  );
}
