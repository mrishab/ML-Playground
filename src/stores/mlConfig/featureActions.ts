import type { SelectedFeature, TransformationType } from "./types";

let featureIdCounter = 0;

export const resetFeatureCounter = () => {
  featureIdCounter = 0;
};

export const generateFeatureId = () => {
  featureIdCounter += 1;
  return `feature-${featureIdCounter}`;
};

export const createFeature = (column: string): SelectedFeature => ({
  id: generateFeatureId(),
  column,
  transformation: "none",
});

export const updateFeature = (
  features: SelectedFeature[],
  id: string,
  transformation: TransformationType,
  options?: { polynomialDegree?: number; interactionWith?: string },
): SelectedFeature[] =>
  features.map((f) =>
    f.id === id
      ? {
          ...f,
          transformation,
          polynomialDegree: options?.polynomialDegree ?? f.polynomialDegree,
          interactionWith: options?.interactionWith ?? f.interactionWith,
        }
      : f,
  );
