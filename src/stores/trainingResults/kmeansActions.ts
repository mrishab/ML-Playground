import type { StoreSet } from "./storeSetType";
import type { TrainingState } from "@/types/training";
import type { LossTelemetry } from "@/types/loss";
import type { KMeansMetrics } from "@/types/kmeans";
import { initialKMeans } from "./initialStates";

export const createKMeansActions = (set: StoreSet) => ({
  setKMeansState: (trainingState: TrainingState) =>
    set((s) => ({ kmeans: { ...s.kmeans, trainingState } })),
  setKMeansMetrics: (metrics: KMeansMetrics | null) =>
    set((s) => ({ kmeans: { ...s.kmeans, metrics } })),
  setKMeansError: (error: string | null) =>
    set((s) => ({ kmeans: { ...s.kmeans, error } })),
  setKMeansK: (k: number) => set((s) => ({ kmeans: { ...s.kmeans, k } })),
  setKMeansTelemetry: (lossTelemetry: LossTelemetry | null) =>
    set((s) => ({ kmeans: { ...s.kmeans, lossTelemetry } })),
  resetKMeans: () => set({ kmeans: { ...initialKMeans } }),
});
