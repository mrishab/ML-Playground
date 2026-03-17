import { useMemo } from "react";
import {
  Search,
  AlertCircle,
  Shuffle as ShuffleIcon,
  Download,
} from "lucide-react";
import type { ColumnDef } from "@tanstack/react-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DataTable, SortableHeader } from "@/components/ui/data-table";
import { FeatureSelector } from "@/components/FeatureSelector";
import { SplitResults } from "@/components/SplitResults";
import { NoDatasetAlert } from "@/components/NoDatasetAlert";
import { PageHeader } from "@/components/PageHeader";
import { useExplorePage } from "./useExplorePage";
import type { ProblemType } from "@/stores/mlConfig";

const PROBLEM_TYPES: { value: ProblemType; label: string }[] = [
  { value: "regression", label: "Regression" },
  { value: "classification", label: "Classification" },
  { value: "clustering", label: "Clustering" },
  { value: "dimensionality_reduction", label: "Dimensionality Reduction" },
];

export function ExplorePage() {
  const {
    df,
    selectedDataset,
    columns,
    numericColumns,
    availableInteractionColumns,
    problemType,
    shuffle,
    testSplitPercent,
    targetColumn,
    selectedFeatures,
    splitStats,
    canSplit,
    previewData,
    previewColumns,
    isLoadingConfig,
    setProblemType,
    setShuffle,
    setTestSplitPercent,
    setTargetColumn,
    addFeature,
    removeFeature,
    updateFeatureTransformation,
    clearFeatures,
    performSplit,
    loadDefaultConfig,
  } = useExplorePage();

  // Build table columns dynamically from previewColumns
  const tableColumns: ColumnDef<Record<string, number>>[] = useMemo(() => {
    return previewColumns.map((col) => ({
      id: col,
      accessorKey: col,
      header: ({ column }) => <SortableHeader column={column} title={col} />,
      cell: ({ getValue }) => {
        const value = getValue() as number;
        return typeof value === "number" ? value.toFixed(4) : value;
      },
    }));
  }, [previewColumns]);

  // No dataset loaded state
  if (!df) {
    return (
      <div className="flex flex-1 flex-col gap-4 p-4">
        <PageHeader
          icon={Search}
          title="Explore"
          subtitle="Configure ML parameters and create train/test split"
        />
        <NoDatasetAlert
          description="Please select a dataset first to configure ML parameters."
          linkTo="/data/select"
        />
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      {/* Header */}
      <PageHeader
        icon={Search}
        title="Explore"
        subtitle={`Configure ML parameters for ${selectedDataset}`}
      />

      {/* Main Content */}
      <div className="grid flex-1 gap-4 lg:grid-cols-2">
        {/* Left Column - Configuration */}
        <div className="space-y-4">
          {/* Data Split Settings */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <CardTitle className="text-base">Data Split Settings</CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={loadDefaultConfig}
                disabled={isLoadingConfig}
              >
                <Download className="mr-2 h-4 w-4" />
                {isLoadingConfig ? "Loading..." : "Load Default"}
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Problem Type */}
              <div className="space-y-2">
                <Label>Problem Type</Label>
                <Select
                  value={problemType}
                  onValueChange={(v) => setProblemType(v as ProblemType)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select problem type..." />
                  </SelectTrigger>
                  <SelectContent>
                    {PROBLEM_TYPES.map((pt) => (
                      <SelectItem key={pt.value} value={pt.value}>
                        {pt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Shuffle Toggle */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShuffleIcon className="h-4 w-4 text-muted-foreground" />
                  <Label htmlFor="shuffle">Shuffle data</Label>
                </div>
                <Switch
                  id="shuffle"
                  checked={shuffle}
                  onCheckedChange={setShuffle}
                />
              </div>

              {/* Test Split Percentage */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Test split percentage</Label>
                  <span className="text-sm font-medium">
                    {testSplitPercent}%
                  </span>
                </div>
                <Slider
                  value={[testSplitPercent]}
                  onValueChange={([value]) => setTestSplitPercent(value)}
                  min={5}
                  max={50}
                  step={5}
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>5%</span>
                  <span>
                    Train: {100 - testSplitPercent}% / Test: {testSplitPercent}%
                  </span>
                  <span>50%</span>
                </div>
              </div>

              {/* Target Column */}
              <div className="space-y-2">
                <Label>Target Variable (Y)</Label>
                <Select value={targetColumn} onValueChange={setTargetColumn}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select target column..." />
                  </SelectTrigger>
                  <SelectContent>
                    {columns.map((col) => (
                      <SelectItem key={col} value={col}>
                        {col}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Feature Selection */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Feature Selection</CardTitle>
            </CardHeader>
            <CardContent>
              <FeatureSelector
                numericColumns={numericColumns}
                selectedFeatures={selectedFeatures}
                availableInteractionColumns={availableInteractionColumns}
                addFeature={addFeature}
                removeFeature={removeFeature}
                updateFeatureTransformation={updateFeatureTransformation}
                clearFeatures={clearFeatures}
              />
            </CardContent>
          </Card>

          {/* Split Button */}
          <Button
            onClick={performSplit}
            disabled={!canSplit}
            className="w-full"
            size="lg"
          >
            Create Train/Test Split
          </Button>

          {/* Validation Messages */}
          {!canSplit && targetColumn && selectedFeatures.length > 0 && (
            <Card className="border-red-500/30 bg-red-500/5">
              <CardContent className="flex items-center gap-3 p-3">
                <AlertCircle className="h-4 w-4 text-red-500" />
                <p className="text-sm">
                  Target column cannot be used as a feature
                </p>
              </CardContent>
            </Card>
          )}

          {!targetColumn && (
            <Card className="border-amber-500/30 bg-amber-500/5">
              <CardContent className="flex items-center gap-3 p-3">
                <AlertCircle className="h-4 w-4 text-amber-500" />
                <p className="text-sm">Select a target variable (Y)</p>
              </CardContent>
            </Card>
          )}

          {targetColumn && selectedFeatures.length === 0 && (
            <Card className="border-amber-500/30 bg-amber-500/5">
              <CardContent className="flex items-center gap-3 p-3">
                <AlertCircle className="h-4 w-4 text-amber-500" />
                <p className="text-sm">Add at least one feature (X)</p>
              </CardContent>
            </Card>
          )}

          {/* Split Results */}
          <SplitResults stats={splitStats} targetColumn={targetColumn} />
        </div>

        {/* Right Column - Data Preview */}
        <div className="space-y-4">
          {previewColumns.length > 0 ? (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Feature Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <DataTable columns={tableColumns} data={previewData} />
              </CardContent>
            </Card>
          ) : (
            <Card className="border-dashed">
              <CardContent className="flex h-[400px] items-center justify-center">
                <p className="text-sm text-muted-foreground">
                  Select features to preview data
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
