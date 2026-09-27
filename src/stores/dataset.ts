import { create } from "zustand";
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

type DatasetState = {
  selectedDataset: string;
  df: DataFrame | null;
  loading: boolean;
  error: string | null;
  customDatasets: CustomDataset[];
};

type DatasetActions = {
  setSelectedDataset: (name: string) => void;
  setDf: (df: DataFrame | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  addCustomDataset: (dataset: CustomDataset) => void;
  removeCustomDataset: (name: string) => void;
  reset: () => void;
};

const initialState: DatasetState = {
  selectedDataset: "",
  df: null,
  loading: false,
  error: null,
  customDatasets: [],
};

export const useDatasetStore = create<DatasetState & DatasetActions>()(
  (set) => ({
    ...initialState,
    setSelectedDataset: (name) => set({ selectedDataset: name }),
    setDf: (df) => set({ df }),
    setLoading: (loading) => set({ loading }),
    setError: (error) => set({ error }),
    addCustomDataset: (dataset) =>
      set((state) => {
        const filtered = state.customDatasets.filter(
          (d) => d.name !== dataset.name,
        );
        return {
          customDatasets: [dataset, ...filtered],
          selectedDataset: dataset.name,
          df: dataset.df,
          error: null,
        };
      }),
    removeCustomDataset: (name) =>
      set((state) => {
        const filtered = state.customDatasets.filter((d) => d.name !== name);
        const isCurrentSelected = state.selectedDataset === name;
        return {
          customDatasets: filtered,
          selectedDataset: isCurrentSelected ? "" : state.selectedDataset,
          df: isCurrentSelected ? null : state.df,
        };
      }),
    reset: () =>
      set((state) => ({
        ...initialState,
        customDatasets: state.customDatasets,
      })),
  }),
);
