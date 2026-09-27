import { Card, CardContent } from "@/components/ui/card";
import type { LossTelemetry } from "@/types/loss";
import { LossPlotHeader } from "./LossPlotHeader";
import { LossPlotStats } from "./LossPlotStats";
import { LossPlotChart } from "./LossPlotChart";

export function TrainingLossCard({
  telemetry,
}: {
  telemetry: LossTelemetry | null | undefined;
}) {
  if (!telemetry || telemetry.history.length === 0) return null;

  return (
    <Card className="w-full overflow-hidden transition-[opacity,transform] duration-200 ease-out">
      <CardContent className="space-y-4 p-4">
        <LossPlotHeader telemetry={telemetry} />
        <LossPlotStats telemetry={telemetry} />
        <LossPlotChart telemetry={telemetry} />
      </CardContent>
    </Card>
  );
}
