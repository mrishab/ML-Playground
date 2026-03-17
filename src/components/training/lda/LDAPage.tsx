import { Layers } from "lucide-react";

export function LDAPage() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="flex items-center gap-3">
        <Layers className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-2xl font-semibold">
            Linear Discriminant Analysis
          </h1>
          <p className="text-sm text-muted-foreground">
            Configure LDA classifier parameters
          </p>
        </div>
      </div>
      <div className="flex-1 rounded-xl border border-dashed border-border bg-muted/30 p-8">
        <p className="text-center text-muted-foreground">
          LDA configuration will be implemented here
        </p>
      </div>
    </div>
  );
}
