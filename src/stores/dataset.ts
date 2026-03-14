import { create } from "zustand";
import type { DataFrame } from "danfojs";

type DatasetState = {
  selectedDataset: string;
  df: DataFrame | null;
  loading: boolean;
  error: string | null;
};

type DatasetActions = {
  setSelectedDataset: (name: string) => void;
  setDf: (df: DataFrame | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
};

const initialState: DatasetState = {
  selectedDataset: "",
  df: null,
  loading: false,
  error: null,
};

export const useDatasetStore = create<DatasetState & DatasetActions>()(
  (set) => ({
    ...initialState,
    setSelectedDataset: (name) => set({ selectedDataset: name }),
    setDf: (df) => set({ df }),
    setLoading: (loading) => set({ loading }),
    setError: (error) => set({ error }),
    reset: () => set(initialState),
  }),
);
