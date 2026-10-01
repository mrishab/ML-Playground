import { Link } from "react-router-dom";
import { FolderKanban } from "lucide-react";

export function DatasetPickerHeader() {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2">
      <div>
        <p className="text-sm font-medium text-foreground">
          Select, Upload, or Manage Datasets
        </p>
        <p className="text-xs text-muted-foreground mt-0.5">
          Choose a benchmark dataset, upload custom CSVs, or manage saved versions:
        </p>
      </div>
      <Link
        to="/data/manage"
        className="inline-flex items-center gap-1.5 text-xs text-primary hover:underline font-medium"
      >
        <FolderKanban className="h-3.5 w-3.5" />
        Manage Saved Datasets
      </Link>
    </div>
  );
}
