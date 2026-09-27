import type { DataFrame } from "danfojs";
import type { ProblemType } from "@/stores/mlConfig";

export type CustomDataset = {
  name: string;
  fileName: string;
  fileSize: number;
  problemType?: ProblemType;
  targetColumn?: string;
  rowCount: number;
  columnCount: number;
  columns: string[];
  df: DataFrame;
  uploadedAt: number;
};

export type DatasetState = {
  selectedDataset: string;
  df: DataFrame | null;
  loading: boolean;
  error: string | null;
  customDatasets: CustomDataset[];
};

export type DatasetActions = {
  setSelectedDataset: (name: string) => void;
  setDf: (df: DataFrame | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  addCustomDataset: (dataset: CustomDataset) => void;
  removeCustomDataset: (name: string) => void;
  reset: () => void;
};
