import type { StateCreator } from "zustand";
import type { TrainingResultsStore } from "./types";
import { initialTrainingResultsState } from "./initialStates";
import { createRegressionActions } from "./regressionActions";
import { createClassificationActions } from "./classificationActions";
import { createKMeansActions } from "./kmeansActions";

export const createTrainingResultsActions: StateCreator<
  TrainingResultsStore,
  [],
  [],
  Omit<TrainingResultsStore, keyof typeof initialTrainingResultsState>
> = (set) => ({
  ...createRegressionActions(set),
  ...createClassificationActions(set),
  ...createKMeansActions(set),
  resetAll: () => set({ ...initialTrainingResultsState }),
});
