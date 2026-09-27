import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";

interface UploadCSVModalFooterProps {
  hasParsed: boolean;
  canImport: boolean;
  onCancel: () => void;
  onImport: () => void;
}

export function UploadCSVModalFooter({
  hasParsed,
  canImport,
  onCancel,
  onImport,
}: UploadCSVModalFooterProps) {
  return (
    <DialogFooter className="flex flex-col-reverse sm:flex-row gap-2 pt-2">
      <Button
        type="button"
        variant="ghost"
        onClick={onCancel}
        size="sm"
        className="w-full sm:w-auto"
      >
        Cancel
      </Button>

      {hasParsed && (
        <Button
          type="button"
          onClick={onImport}
          size="sm"
          disabled={!canImport}
          className="w-full sm:w-auto group"
        >
          Import & Load Dataset
          <ArrowRight className="ml-1.5 h-3.5 w-3.5 transition-transform duration-150 ease-out group-hover:translate-x-1" />
        </Button>
      )}
    </DialogFooter>
  );
}
