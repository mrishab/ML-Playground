import type { LossTelemetry } from "@/types/loss";
import { createTelemetryUpdater } from "@/components/training/shared/createTelemetryUpdater";

export function createKMeansTelemetry(
  setTelemetry: (t: LossTelemetry | null) => void,
) {
  return createTelemetryUpdater(
    "clustering",
    "Within-Cluster Sum of Squares (Inertia)",
    "Inertia",
    setTelemetry,
    "Centroid Shift (Δμ)",
    "",
    25,
  );
}
