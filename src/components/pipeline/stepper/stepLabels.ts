import type { PipelineStepInfo } from "@/stores/pipeline";

export function getStepTooltip(step: PipelineStepInfo) {
  if (step.status === "locked") return `${step.title} (Locked)`;
  if (step.status === "stale") return `${step.title} (Stale)`;
  return step.title;
}

export function getStepSubtitle(step: PipelineStepInfo, isActive: boolean) {
  if (step.status === "locked") return "Locked";
  if (step.status === "stale") return "Stale";
  if (isActive) return "Current";
  return step.artifactDescription || "Ready";
}
