import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDatasetSelect } from "./useDatasetSelect";
import { CustomDatasetMenuItems } from "./CustomDatasetMenuItems";
import { StandardDatasetMenuItems } from "./StandardDatasetMenuItems";
import { UploadCSVMenuItem } from "./UploadCSVMenuItem";

interface DatasetSelectProps {
  onOpenUpload?: () => void;
}

export function DatasetSelect({ onOpenUpload }: DatasetSelectProps) {
  const { customDatasets, standardDatasets, selectedDataset, onSelect } =
    useDatasetSelect();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="w-full justify-between h-9 text-xs sm:text-sm"
        >
          <span className="truncate">
            {selectedDataset || "Select a dataset..."}
          </span>
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64 max-h-80 overflow-y-auto">
        <CustomDatasetMenuItems
          customDatasets={customDatasets}
          selectedDataset={selectedDataset}
          onSelect={onSelect}
        />
        <StandardDatasetMenuItems
          standardDatasets={standardDatasets}
          selectedDataset={selectedDataset}
          onSelect={onSelect}
        />
        <UploadCSVMenuItem onOpenUpload={onOpenUpload} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
