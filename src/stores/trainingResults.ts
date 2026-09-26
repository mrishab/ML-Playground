import { create } from "zustand";
import type { TrainingResultsStore } from "./trainingResults/types";
import { initialTrainingResultsState } from "./trainingResults/initialStates";
import { createTrainingResultsActions } from "./trainingResults/actions";

export type { TrainingResultsStore };

export const useTrainingResultsStore = create<TrainingResultsStore>()(
  (set, get, api) => ({
    ...initialTrainingResultsState,
    ...createTrainingResultsActions(set, get, api),
  }),
);
