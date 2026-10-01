import { Link } from "react-router-dom";
import { HardDrive, Play, RotateCcw } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  isFiltered: boolean;
  onResetFilters: () => void;
}

export function ModelsEmptyState({ isFiltered, onResetFilters }: EmptyStateProps) {
  return (
    <Card className="border-dashed border-border/80 bg-muted/10 py-12">
      <CardContent className="flex flex-col items-center justify-center text-center p-6">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted text-muted-foreground mb-4">
          <HardDrive className="h-6 w-6" />
        </div>
        <h3 className="text-base font-semibold text-foreground">
          {isFiltered ? "No matching models" : "No saved models yet"}
        </h3>
        <p className="text-xs text-muted-foreground max-w-sm mt-1 mb-5">
          {isFiltered
            ? "Try adjusting your search query or filter criteria to find models."
            : "Complete a training run in the pipeline to automatically save models to local storage."}
        </p>

        {isFiltered ? (
          <Button variant="outline" size="sm" onClick={onResetFilters} className="active:scale-[0.98]">
            <RotateCcw className="mr-1.5 h-3.5 w-3.5" />
            Reset Filters
          </Button>
        ) : (
          <Button asChild size="sm" className="active:scale-[0.98]">
            <Link to="/data/select">
              <Play className="mr-1.5 h-3.5 w-3.5" />
              Start New Pipeline
            </Link>
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
