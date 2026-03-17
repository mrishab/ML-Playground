import { ChevronDown, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDatasetSelect } from "./useDatasetSelect";

export function DatasetSelect() {
  const { datasets, selectedDataset, onSelect } = useDatasetSelect();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-full justify-between">
          {selectedDataset || "Select a dataset..."}
          <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        {datasets.map((dataset) => (
          <DropdownMenuItem
            key={dataset.name}
            onClick={() => onSelect(dataset.name)}
            className="flex items-center justify-between"
          >
            {dataset.name}
            {selectedDataset === dataset.name && <Check className="h-4 w-4" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
