import type { ProblemType } from "@/stores/mlConfig";

export const PROBLEM_TYPES: { value: ProblemType; label: string }[] = [
  { value: "regression", label: "Regression" },
  { value: "classification", label: "Classification" },
  { value: "clustering", label: "Clustering" },
  { value: "dimensionality_reduction", label: "Dimensionality Reduction" },
];
