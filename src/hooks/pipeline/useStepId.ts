import { useLocation } from "react-router-dom";
import type { StepId } from "@/stores/pipeline";

export function useStepId(): StepId {
  const { pathname } = useLocation();
  if (pathname.startsWith("/data")) return 1;
  if (pathname.startsWith("/pretrain")) return 2;
  if (pathname.startsWith("/analyze") || pathname.startsWith("/visualize")) {
    return 3;
  }
  if (pathname.startsWith("/train")) return 4;
  if (pathname.startsWith("/models")) return 5;
  return 1;
}
