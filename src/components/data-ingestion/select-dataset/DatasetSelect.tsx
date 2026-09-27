import { ChevronDown, Check, Upload, FileSpreadsheet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDatasetSelect } from "./useDatasetSelect";

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
        {/* Custom Datasets Section */}
        {customDatasets.length > 0 && (
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
        )}

        {/* Standard Datasets Section */}
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

        {/* Upload Action */}
        {onOpenUpload && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={onOpenUpload}
              className="flex items-center gap-2 text-primary font-medium focus:text-primary"
            >
              <Upload className="h-4 w-4 shrink-0" />
              <span>Upload CSV...</span>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
