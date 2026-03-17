import { Shuffle } from "lucide-react";

export function TransformPage() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="flex items-center gap-3">
        <Shuffle className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-2xl font-semibold">Transform</h1>
          <p className="text-sm text-muted-foreground">
            Run custom transformations on your data
          </p>
        </div>
      </div>
      <div className="flex-1 rounded-xl border border-dashed border-border bg-muted/30 p-8">
        <p className="text-center text-muted-foreground">
          Data transformation interface will be implemented here
        </p>
      </div>
    </div>
  );
}
