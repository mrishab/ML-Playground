import { Link } from "react-router-dom";
import { Database, Play, RotateCcw } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  isFiltered: boolean;
  onResetFilters: () => void;
}

export function DatasetsEmptyState({ isFiltered, onResetFilters }: EmptyStateProps) {
  return (
    <Card className="border-dashed border-border/80 bg-muted/10 py-12">
      <CardContent className="flex flex-col items-center justify-center text-center p-6">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted text-muted-foreground mb-4">
          <Database className="h-6 w-6" />
        </div>
        <h3 className="text-base font-semibold text-foreground">
          {isFiltered ? "No matching datasets" : "No saved datasets yet"}
        </h3>
        <p className="text-xs text-muted-foreground max-w-sm mt-1 mb-5">
          {isFiltered
            ? "Try adjusting your search query or filter criteria."
            : "Clean and transform datasets in the Data Select stage, then save them here for offline access and reuse."}
        </p>
        {isFiltered ? (
          <Button variant="outline" size="sm" onClick={onResetFilters} className="active:scale-[0.98] transition-[transform,background-color,border-color,color] duration-150 ease-out">
            <RotateCcw className="mr-1.5 h-3.5 w-3.5" />
            Reset Filters
          </Button>
        ) : (
          <Button asChild size="sm" className="active:scale-[0.98] transition-[transform,background-color,border-color,color] duration-150 ease-out">
            <Link to="/data/select">
              <Play className="mr-1.5 h-3.5 w-3.5" />
              Explore &amp; Clean Datasets
            </Link>
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
