import { Loader2 } from "lucide-react";

export function UploadCSVParsingIndicator() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-12 text-center">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
      <div>
        <p className="text-sm font-medium">Parsing and validating CSV...</p>
        <p className="text-xs text-muted-foreground mt-1">
          Checking structure, headers, and inferred data types.
        </p>
      </div>
    </div>
  );
}
