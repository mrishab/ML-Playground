import { Check, FileSpreadsheet } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenuItem,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import type { DatasetOption } from "./datasetTypes";

interface StandardDatasetMenuItemsProps {
  standardDatasets: DatasetOption[];
  selectedDataset: string | null;
  onSelect: (name: string) => void;
}

export function StandardDatasetMenuItems({
  standardDatasets,
  selectedDataset,
  onSelect,
}: StandardDatasetMenuItemsProps) {
  return (
    <>
      <DropdownMenuLabel className="text-[10px] text-muted-foreground">
        Standard Datasets
      </DropdownMenuLabel>
      {standardDatasets.map((dataset) => (
        <DropdownMenuItem
          key={dataset.name}
          onClick={() => onSelect(dataset.name)}
          className="flex items-center justify-between text-xs sm:text-sm"
        >
          <div className="flex items-center gap-2 truncate">
            <FileSpreadsheet className="h-3.5 w-3.5 text-primary/70 shrink-0" />
            <span className="truncate">{dataset.name}</span>
          </div>
          <div className="flex items-center gap-1.5 shrink-0 ml-2">
            {dataset.problemType && (
              <Badge
                variant="outline"
                className="text-[9px] px-1 py-0 uppercase"
              >
                {dataset.problemType}
              </Badge>
            )}
            {selectedDataset === dataset.name && (
              <Check className="h-3.5 w-3.5 text-primary" />
            )}
          </div>
        </DropdownMenuItem>
      ))}
    </>
  );
}
