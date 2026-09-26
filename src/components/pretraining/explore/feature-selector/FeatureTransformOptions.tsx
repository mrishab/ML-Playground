import type { TransformationType, SelectedFeature } from "@/stores/mlConfig";
import { TransformationTypeSelect } from "./TransformationTypeSelect";
import { PolynomialDegreeSelect } from "./PolynomialDegreeSelect";
import { InteractionColumnSelect } from "./InteractionColumnSelect";

interface FeatureTransformOptionsProps {
  feature: SelectedFeature;
  availableInteractionColumns: string[];
  onTransformChange: (id: string, t: TransformationType) => void;
  onDegreeChange: (id: string, deg: number) => void;
  onInteractionChange: (id: string, col: string) => void;
}

export function FeatureTransformOptions({
  feature,
  availableInteractionColumns,
  onTransformChange,
  onDegreeChange,
  onInteractionChange,
}: FeatureTransformOptionsProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <TransformationTypeSelect
        value={feature.transformation}
        onChange={(v) => onTransformChange(feature.id, v)}
      />

      {feature.transformation === "polynomial" && (
        <PolynomialDegreeSelect
          degree={feature.polynomialDegree}
          onDegreeChange={(deg) => onDegreeChange(feature.id, deg)}
        />
      )}

      {feature.transformation === "interaction" && (
        <InteractionColumnSelect
          currentColumn={feature.column}
          interactionWith={feature.interactionWith}
          availableColumns={availableInteractionColumns}
          onInteractionChange={(col) => onInteractionChange(feature.id, col)}
        />
      )}
    </div>
  );
}
