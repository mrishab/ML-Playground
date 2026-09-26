import type { TransformationType } from "@/stores/mlConfig";
import type { UseFeatureSelectorProps } from "./feature-selector/types";

export type { UseFeatureSelectorProps } from "./feature-selector/types";

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
    if (column) addFeature(column);
  };

  const handleTransformationChange = (
    id: string,
    transformation: TransformationType,
  ) => {
    updateFeatureTransformation(id, transformation);
  };

  const handlePolynomialDegreeChange = (id: string, degree: number) => {
    updateFeatureTransformation(id, "polynomial", { polynomialDegree: degree });
  };

  const handleInteractionColumnChange = (
    id: string,
    interactionWith: string,
  ) => {
    updateFeatureTransformation(id, "interaction", { interactionWith });
  };

  return {
    numericColumns,
    selectedFeatures,
    availableInteractionColumns,
    handleAddFeature,
    handleRemoveFeature: removeFeature,
    handleTransformationChange,
    handlePolynomialDegreeChange,
    handleInteractionColumnChange,
    clearFeatures,
  };
}
