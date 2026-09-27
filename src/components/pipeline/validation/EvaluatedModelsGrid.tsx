import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { EvaluatedModel } from "./types";

interface EvaluatedModelsGridProps {
  models: EvaluatedModel[];
}

export function EvaluatedModelsGrid({ models }: EvaluatedModelsGridProps) {
  return (
    <div className="space-y-3">
      <h4 className="text-sm font-semibold tracking-tight text-foreground">
        Model Leaderboard
      </h4>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {models.map((m, idx) => (
          <Card
            key={m.name}
            className="transition-[transform,box-shadow,border-color] duration-150 ease-out hover:shadow-md hover:-translate-y-0.5"
          >
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-semibold">
                  {m.name}
                </CardTitle>
                <Badge variant="secondary" className="text-[10px]">
                  Rank #{idx + 1}
                </Badge>
              </div>
              <CardDescription className="text-xs">
                Type: {m.type}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 pt-2">
              <div className="flex justify-between text-xs py-1 border-b">
                <span className="text-muted-foreground">Primary:</span>
                <span className="font-semibold text-foreground">
                  {m.primaryMetric}
                </span>
              </div>
              <div className="flex justify-between text-xs py-1">
                <span className="text-muted-foreground">Secondary:</span>
                <span className="font-medium text-foreground">
                  {m.secondaryMetric}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
