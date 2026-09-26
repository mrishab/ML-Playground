import { Card, CardContent } from "@/components/ui/card";

export function TrainingIdleCard() {
  return (
    <Card className="border-dashed transition-all duration-200">
      <CardContent className="flex h-[200px] items-center justify-center">
        <p className="text-center text-muted-foreground text-sm">
          Click "Run Training" to train model.
        </p>
      </CardContent>
    </Card>
  );
}
