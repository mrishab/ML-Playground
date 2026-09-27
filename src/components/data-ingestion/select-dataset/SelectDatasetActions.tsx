import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DatasetSelect } from "./DatasetSelect";

interface SelectDatasetActionsProps {
  onOpenUpload: () => void;
}

export function SelectDatasetActions({
  onOpenUpload,
}: SelectDatasetActionsProps) {
  return (
    <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
      <Button
        variant="outline"
        size="sm"
        onClick={onOpenUpload}
        className="h-9 gap-1.5 text-xs sm:text-sm font-medium"
      >
        <Upload className="h-4 w-4 text-primary" />
        <span>Upload CSV</span>
      </Button>
      <div className="w-full sm:w-52">
        <DatasetSelect onOpenUpload={onOpenUpload} />
      </div>
    </div>
  );
}
