import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { ModelSortOption, ModelTypeFilter } from "@/stores/savedModels";

interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  filterType: ModelTypeFilter;
  onFilterChange: (t: ModelTypeFilter) => void;
  sortBy: ModelSortOption;
  onSortChange: (s: ModelSortOption) => void;
}

const FILTER_OPTIONS: { label: string; value: ModelTypeFilter }[] = [
  { label: "All", value: "all" },
  { label: "Regression", value: "regression" },
  { label: "Classification", value: "classification" },
  { label: "Clustering", value: "clustering" },
];

export function ModelsFilterBar(p: FilterBarProps) {
  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
        <Input
          type="text"
          placeholder="Search models, datasets, features..."
          value={p.searchQuery}
          onChange={(e) => p.onSearchChange(e.target.value)}
          className="pl-9 h-9 text-xs sm:text-sm"
        />
      </div>

      <div className="flex flex-wrap items-center gap-1.5">
        <div className="flex rounded-lg border border-border/80 p-0.5 bg-muted/30">
          {FILTER_OPTIONS.map((opt) => (
            <Button
              key={opt.value}
              variant={p.filterType === opt.value ? "secondary" : "ghost"}
              size="sm"
              onClick={() => p.onFilterChange(opt.value)}
              className="h-7 text-xs px-2.5 transition-[background-color,color] duration-150"
            >
              {opt.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
