import type { TrainingResultsStore } from "./types";

export type StoreSet = (
  fn:
    | Partial<TrainingResultsStore>
    | ((prev: TrainingResultsStore) => Partial<TrainingResultsStore>),
) => void;
