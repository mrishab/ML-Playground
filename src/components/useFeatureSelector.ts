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

export function useFeatureSelector(props: UseFeatureSelectorProps) {
  const {
    numericColumns,
    selectedFeatures,
    availableInteractionColumns,
    addFeature,
    removeFeature,
    updateFeatureTransformation,
    clearFeatures,
  } = props;

  const handleAddFeature = (column: string) => {
    if (column) {
      addFeature(column);
    }
  };

  const handleRemoveFeature = (id: string) => {
    removeFeature(id);
  };

  const handleTransformationChange = (
    id: string,
    transformation: TransformationType,
  ) => {
    updateFeatureTransformation(id, transformation);
  };

  const handlePolynomialDegreeChange = (id: string, degree: number) => {
    const feature = selectedFeatures.find((f) => f.id === id);
    if (feature) {
      updateFeatureTransformation(id, "polynomial", {
        polynomialDegree: degree,
      });
    }
  };

  const handleInteractionColumnChange = (
    id: string,
    interactionWith: string,
  ) => {
    const feature = selectedFeatures.find((f) => f.id === id);
    if (feature) {
      updateFeatureTransformation(id, "interaction", { interactionWith });
    }
  };

  return {
    numericColumns,
    selectedFeatures,
    availableInteractionColumns,
    handleAddFeature,
    handleRemoveFeature,
    handleTransformationChange,
    handlePolynomialDegreeChange,
    handleInteractionColumnChange,
    clearFeatures,
  };
}
