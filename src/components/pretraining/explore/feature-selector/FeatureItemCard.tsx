import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { TransformationType, SelectedFeature } from "@/stores/mlConfig";
import { FeatureTransformOptions } from "./FeatureTransformOptions";

interface FeatureItemCardProps {
  feature: SelectedFeature;
  availableInteractionColumns: string[];
  onRemove: (id: string) => void;
  onTransformChange: (id: string, t: TransformationType) => void;
  onDegreeChange: (id: string, deg: number) => void;
  onInteractionChange: (id: string, col: string) => void;
}

export function FeatureItemCard({
  feature,
  availableInteractionColumns,
  onRemove,
  onTransformChange,
  onDegreeChange,
  onInteractionChange,
}: FeatureItemCardProps) {
  return (
    <div className="flex flex-col gap-2 rounded-lg border bg-muted/30 p-3 transition-[background-color,border-color,box-shadow] duration-150 ease-out hover:border-primary/40 hover:bg-muted/50">
      <div className="flex items-center justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary">{feature.column}</Badge>
          {feature.transformation !== "none" && (
            <Badge variant="outline" className="text-xs">
              {feature.transformation === "polynomial"
                ? `^${feature.polynomialDegree ?? 2}`
                : `× ${feature.interactionWith ?? "?"}`}
            </Badge>
          )}
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 transition-[opacity,transform,color] duration-150 ease-out hover:scale-110 active:scale-95 hover:text-destructive"
          onClick={() => onRemove(feature.id)}
        >
          <X className="h-3 w-3" />
        </Button>
      </div>

      <FeatureTransformOptions
        feature={feature}
        availableInteractionColumns={availableInteractionColumns}
        onTransformChange={onTransformChange}
        onDegreeChange={onDegreeChange}
        onInteractionChange={onInteractionChange}
      />
    </div>
  );
}
