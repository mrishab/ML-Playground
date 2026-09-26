import axios from "axios";
import type { ProblemType, SelectedFeature } from "@/stores/mlConfig";

// Types matching config.json structure
type InteractionTerm = {
  term_1: string;
  term_2: string;
};

type PolynomialTerm = {
  term: string;
  degree: number;
};

type MLConfigJson = {
  problem_type: string;
  target_variable: string;
  features: {
    regular_terms: string[];
    interaction_terms: InteractionTerm[];
    polynomial_terms: PolynomialTerm[];
  };
  candidate_models: string[];
};

export type DatasetConfigEntry = {
  ml_config: MLConfigJson;
};

export type DatasetConfigFileMap = Record<string, DatasetConfigEntry>;

type MappedConfig = {
  problemType: ProblemType;
  targetColumn: string;
  features: SelectedFeature[];
};

function generateFeatureId(): string {
  return `config-${crypto.randomUUID()}`;
}

function mapProblemType(type: string): ProblemType {
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

function mapConfigToState(config: MLConfigJson): MappedConfig {
  const features: SelectedFeature[] = [];

  // Add regular terms (no transformation)
  for (const term of config.features.regular_terms) {
    features.push({
      id: generateFeatureId(),
      column: term,
      transformation: "none",
    });
  }

  // Add polynomial terms
  for (const poly of config.features.polynomial_terms) {
    features.push({
      id: generateFeatureId(),
      column: poly.term,
      transformation: "polynomial",
      polynomialDegree: poly.degree,
    });
  }

  // Add interaction terms
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

let configCache: DatasetConfigFileMap | null = null;

export async function loadDatasetConfig(
  datasetFile: string,
): Promise<MappedConfig | null> {
  try {
    if (!configCache) {
      const url = `${import.meta.env.BASE_URL}datasets/config.json`;
      const response = await axios.get<DatasetConfigFileMap>(url);
      configCache = response.data;
    }

    const datasetConfig = configCache[datasetFile];
    if (!datasetConfig) {
      return null;
    }

    return mapConfigToState(datasetConfig.ml_config);
  } catch (err) {
    console.error("[datasetConfig] Failed to load config:", err);
    return null;
  }
}
