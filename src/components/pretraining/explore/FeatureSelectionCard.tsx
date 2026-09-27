import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FeatureSelector } from "./FeatureSelector";
import type { SelectedFeature, TransformationType } from "@/stores/mlConfig";

interface FeatureSelectionCardProps {
  numericColumns: string[];
  selectedFeatures: SelectedFeature[];
  availableInteractionColumns: string[];
  addFeature: (c: string) => void;
  removeFeature: (id: string) => void;
  updateFeatureTransformation: (
    id: string,
    t: TransformationType,
    opt?: { polynomialDegree?: number; interactionWith?: string },
  ) => void;
  clearFeatures: () => void;
}

export function FeatureSelectionCard(props: FeatureSelectionCardProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Feature Selection</CardTitle>
      </CardHeader>
      <CardContent>
        <FeatureSelector {...props} />
      </CardContent>
    </Card>
  );
}
