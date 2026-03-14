import { X, Plus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import {
  useFeatureSelector,
  type UseFeatureSelectorProps,
} from "./useFeatureSelector";
import type { TransformationType } from "@/stores/mlConfig";

type FeatureSelectorProps = UseFeatureSelectorProps;

export function FeatureSelector(props: FeatureSelectorProps) {
  const {
    numericColumns,
    selectedFeatures,
    availableInteractionColumns,
    handleAddFeature,
    handleRemoveFeature,
    handleTransformationChange,
    handlePolynomialDegreeChange,
    handleInteractionColumnChange,
    clearFeatures,
  } = useFeatureSelector(props);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label>Independent Variables (X)</Label>
        {selectedFeatures.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFeatures}
            className="h-7 text-xs text-muted-foreground"
          >
            Clear all
          </Button>
        )}
      </div>

      {/* Add Feature Dropdown */}
      <Select onValueChange={handleAddFeature} value="">
        <SelectTrigger>
          <SelectValue placeholder="Add a feature column..." />
        </SelectTrigger>
        <SelectContent>
          {numericColumns.map((col) => (
            <SelectItem key={col} value={col}>
              <div className="flex items-center gap-2">
                <Plus className="h-3 w-3" />
                {col}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Selected Features List */}
      {selectedFeatures.length > 0 && (
        <ScrollArea className="h-[280px] rounded-md border p-3">
          <div className="space-y-3">
            {selectedFeatures.map((feature) => (
              <div
                key={feature.id}
                className="flex flex-col gap-2 rounded-lg border bg-muted/30 p-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">{feature.column}</Badge>
                    {feature.transformation !== "none" && (
                      <Badge variant="outline" className="text-xs">
                        {feature.transformation === "polynomial"
                          ? `^${feature.polynomialDegree ?? 2}`
                          : `× ${feature.interactionWith ?? "?"}`}
                      </Badge>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => handleRemoveFeature(feature.id)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>

                {/* Transformation Options */}
                <div className="flex flex-wrap items-center gap-2">
                  <Select
                    value={feature.transformation}
                    onValueChange={(value: TransformationType) =>
                      handleTransformationChange(feature.id, value)
                    }
                  >
                    <SelectTrigger className="h-7 w-[130px] text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">No transform</SelectItem>
                      <SelectItem value="polynomial">Polynomial</SelectItem>
                      <SelectItem value="interaction">Interaction</SelectItem>
                    </SelectContent>
                  </Select>

                  {/* Polynomial Degree */}
                  {feature.transformation === "polynomial" && (
                    <Select
                      value={String(feature.polynomialDegree ?? 2)}
                      onValueChange={(value) =>
                        handlePolynomialDegreeChange(
                          feature.id,
                          parseInt(value),
                        )
                      }
                    >
                      <SelectTrigger className="h-7 w-[80px] text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2">^2</SelectItem>
                        <SelectItem value="3">^3</SelectItem>
                        <SelectItem value="4">^4</SelectItem>
                        <SelectItem value="5">^5</SelectItem>
                      </SelectContent>
                    </Select>
                  )}

                  {/* Interaction Column */}
                  {feature.transformation === "interaction" && (
                    <Select
                      value={feature.interactionWith ?? ""}
                      onValueChange={(value) =>
                        handleInteractionColumnChange(feature.id, value)
                      }
                    >
                      <SelectTrigger className="h-7 w-[120px] text-xs">
                        <SelectValue placeholder="Select..." />
                      </SelectTrigger>
                      <SelectContent>
                        {availableInteractionColumns
                          .filter((col) => col !== feature.column)
                          .map((col) => (
                            <SelectItem key={col} value={col}>
                              × {col}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  )}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      )}

      {selectedFeatures.length === 0 && (
        <div className="flex h-[100px] items-center justify-center rounded-md border border-dashed text-sm text-muted-foreground">
          No features selected
        </div>
      )}
    </div>
  );
}
