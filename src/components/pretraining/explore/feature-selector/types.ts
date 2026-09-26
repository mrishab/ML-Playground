import type { TransformationType, SelectedFeature } from "@/stores/mlConfig";

export type UseFeatureSelectorProps = {
  numericColumns: string[];
  selectedFeatures: SelectedFeature[];
  availableInteractionColumns: string[];
  addFeature: (column: string) => void;
  removeFeature: (id: string) => void;
  updateFeatureTransformation: (
    id: string,
    transformation: TransformationType,
    options?: { polynomialDegree?: number; interactionWith?: string },
  ) => void;
  clearFeatures: () => void;
};
