import { TrendingUp } from "lucide-react";

export function LinearRegressionPage() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="flex items-center gap-3">
        <TrendingUp className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-2xl font-semibold">Linear Regression</h1>
          <p className="text-sm text-muted-foreground">
            Configure interaction terms and polynomial features
          </p>
        </div>
      </div>
      <div className="flex-1 rounded-xl border border-dashed border-border bg-muted/30 p-8">
        <p className="text-center text-muted-foreground">
          Linear regression configuration will be implemented here
        </p>
      </div>
    </div>
  );
}
