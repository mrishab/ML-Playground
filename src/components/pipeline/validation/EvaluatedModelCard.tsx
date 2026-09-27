import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { EvaluatedModel } from "./types";

interface EvaluatedModelCardProps {
  model: EvaluatedModel;
  rank: number;
}

export function EvaluatedModelCard({ model, rank }: EvaluatedModelCardProps) {
  return (
    <Card className="transition-[transform,box-shadow,border-color] duration-150 ease-out hover:shadow-md hover:-translate-y-0.5">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold">
            {model.name}
          </CardTitle>
          <Badge variant="secondary" className="text-[10px]">
            Rank #{rank}
          </Badge>
        </div>
        <CardDescription className="text-xs">
          Type: {model.type}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2 pt-2">
        <div className="flex justify-between text-xs py-1 border-b">
          <span className="text-muted-foreground">Primary:</span>
          <span className="font-semibold text-foreground">
            {model.primaryMetric}
          </span>
        </div>
        <div className="flex justify-between text-xs py-1">
          <span className="text-muted-foreground">Secondary:</span>
          <span className="font-medium text-foreground">
            {model.secondaryMetric}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
