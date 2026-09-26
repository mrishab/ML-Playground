import type { ProblemType, SelectedFeature } from "@/stores/mlConfig";

export type InteractionTerm = {
  term_1: string;
  term_2: string;
};

export type PolynomialTerm = {
  term: string;
  degree: number;
};

export type MLConfigJson = {
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

export type MappedConfig = {
  problemType: ProblemType;
  targetColumn: string;
  features: SelectedFeature[];
};
