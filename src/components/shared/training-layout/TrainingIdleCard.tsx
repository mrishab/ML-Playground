import { Card, CardContent } from "@/components/ui/card";

export function TrainingIdleCard() {
  return (
    <Card className="border-dashed">
      <CardContent className="flex min-h-[120px] items-center justify-center py-8">
        <p className="text-center text-muted-foreground text-sm">
          Click "Run Training" to train model.
        </p>
      </CardContent>
    </Card>
  );
}
