export type TransformationType = "none" | "polynomial" | "interaction";

export type ProblemType =
  | "regression"
  | "classification"
  | "clustering"
  | "dimensionality_reduction";

export type SelectedFeature = {
  id: string;
  column: string;
  transformation: TransformationType;
  polynomialDegree?: number;
  interactionWith?: string;
};
