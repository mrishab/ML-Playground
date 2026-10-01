import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { DatasetSortOption, DatasetSourceFilter } from "@/stores/savedDatasets";

interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  filterSource: DatasetSourceFilter;
  onFilterChange: (t: DatasetSourceFilter) => void;
  sortBy: DatasetSortOption;
  onSortChange: (s: DatasetSortOption) => void;
}

const SOURCE_OPTIONS: { label: string; value: DatasetSourceFilter }[] = [
  { label: "All", value: "all" },
  { label: "Cleaned", value: "cleaned" },
  { label: "Uploaded", value: "uploaded" },
  { label: "Custom", value: "custom" },
];

export function DatasetsFilterBar(p: FilterBarProps) {
  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
        <Input
          type="text"
          placeholder="Search datasets, columns, descriptions..."
          value={p.searchQuery}
          onChange={(e) => p.onSearchChange(e.target.value)}
          className="pl-9 h-9 text-xs sm:text-sm"
        />
      </div>

      <div className="flex rounded-lg border border-border/80 p-0.5 bg-muted/30">
        {SOURCE_OPTIONS.map((opt) => (
          <Button
            key={opt.value}
            variant={p.filterSource === opt.value ? "secondary" : "ghost"}
            size="sm"
            onClick={() => p.onFilterChange(opt.value)}
            className="h-7 text-xs px-2.5 transition-[background-color,color] duration-150"
          >
            {opt.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
