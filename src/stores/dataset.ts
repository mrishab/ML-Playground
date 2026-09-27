import { create } from "zustand";
import type {
  DatasetState,
  DatasetActions,
  CustomDataset,
} from "./dataset/types";

export type { CustomDataset };

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
