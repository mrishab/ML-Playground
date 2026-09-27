import { Check, FileSpreadsheet } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import type { DatasetOption } from "./datasetTypes";

interface CustomDatasetMenuItemsProps {
  customDatasets: DatasetOption[];
  selectedDataset: string | null;
  onSelect: (name: string) => void;
}

export function CustomDatasetMenuItems({
  customDatasets,
  selectedDataset,
  onSelect,
}: CustomDatasetMenuItemsProps) {
  if (customDatasets.length === 0) return null;

  return (
    <>
      <DropdownMenuLabel className="text-[10px] text-muted-foreground">
        Uploaded Datasets
      </DropdownMenuLabel>
      {customDatasets.map((dataset) => (
        <DropdownMenuItem
          key={dataset.name}
          onClick={() => onSelect(dataset.name)}
          className="flex items-center justify-between text-xs sm:text-sm"
        >
          <div className="flex items-center gap-2 truncate">
            <FileSpreadsheet className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
            <span className="truncate">{dataset.name}</span>
          </div>
          <div className="flex items-center gap-1.5 shrink-0 ml-2">
            <Badge
              variant="secondary"
              className="text-[9px] px-1 py-0 uppercase bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
            >
              Custom
            </Badge>
            {selectedDataset === dataset.name && (
              <Check className="h-3.5 w-3.5 text-primary" />
            )}
          </div>
        </DropdownMenuItem>
      ))}
      <DropdownMenuSeparator />
    </>
  );
}
