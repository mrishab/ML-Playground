import { create } from "zustand";
import {
  createPipelineSlice,
  type PipelineStore,
} from "./pipeline/createPipelineSlice";

export type {
  StepId,
  StepStatus,
  StepRequirement,
  PipelineStepRequirement,
  PipelineStepInfo,
  LastSplitConfig,
  PipelineState,
  PipelineActions,
} from "./pipeline/types";
export { areExploreSettingsDirty } from "./pipeline/dirty";

export const usePipelineStore = create<PipelineStore>()((...a) => ({
  ...createPipelineSlice(...a),
}));
