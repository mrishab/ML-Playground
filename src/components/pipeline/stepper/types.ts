import type { LucideIcon } from "lucide-react";
import type { PipelineStepInfo } from "@/stores/pipeline";

export interface PipelineStepButtonProps {
  step: PipelineStepInfo;
  icon: LucideIcon;
  isActive: boolean;
  onClick: () => void;
}
