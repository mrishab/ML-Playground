import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface UploadCSVErrorAlertProps {
  error: string | null;
  onDismiss: () => void;
}

export function UploadCSVErrorAlert({
  error,
  onDismiss,
}: UploadCSVErrorAlertProps) {
  if (!error) return null;

  return (
    <div className="flex items-start gap-2 rounded-lg border border-destructive/40 bg-destructive/10 p-3 text-xs sm:text-sm text-destructive">
      <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
      <div className="flex-1 min-w-0">
        <p className="font-medium">Upload Error</p>
        <p className="mt-0.5 opacity-90">{error}</p>
      </div>
      <Button
        variant="ghost"
        size="sm"
        onClick={onDismiss}
        className="h-6 px-2 text-xs hover:bg-destructive/20"
      >
        Dismiss
      </Button>
    </div>
  );
}
