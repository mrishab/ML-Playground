import type { ProblemType, SelectedFeature } from "@/stores/mlConfig";
import type { MLConfigJson, MappedConfig } from "./types";

function generateFeatureId(): string {
  return `config-${crypto.randomUUID()}`;
}

export function mapProblemType(type: string): ProblemType {
  switch (type) {
    case "regression":
      return "regression";
    case "classification":
      return "classification";
    case "clustering":
      return "clustering";
    case "dimensionality_reduction":
      return "dimensionality_reduction";
    default:
      return "regression";
  }
}

export function mapConfigToState(config: MLConfigJson): MappedConfig {
  const features: SelectedFeature[] = [];

  for (const term of config.features.regular_terms) {
    features.push({
      id: generateFeatureId(),
      column: term,
      transformation: "none",
    });
  }

  for (const poly of config.features.polynomial_terms) {
    features.push({
      id: generateFeatureId(),
      column: poly.term,
      transformation: "polynomial",
      polynomialDegree: poly.degree,
    });
  }

  for (const interaction of config.features.interaction_terms) {
    features.push({
      id: generateFeatureId(),
      column: interaction.term_1,
      transformation: "interaction",
      interactionWith: interaction.term_2,
    });
  }

  return {
    problemType: mapProblemType(config.problem_type),
    targetColumn: config.target_variable,
    features,
  };
}
