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
import { FeatureSelector } from "./FeatureSelector";
import { OutlierVisualizer } from "./OutlierVisualizer";
import { SplitResults } from "./SplitResults";
import { NoDatasetAlert } from "@/components/shared/NoDatasetAlert";
import type { FeatureRowData } from "@/types/dataset";
import { PageLayout } from "@/components/shared/PageLayout";
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
    isSplit,
    previewData,
    previewColumns,
    numericColumnData,
    totalOutlierValues,
    removedRowsAfterOutlierDrop,
    iqrMultiplier,
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
    dropOutliers,
    setIqrMultiplier,
  } = useExplorePage();

  const tableColumns: ColumnDef<FeatureRowData>[] = useMemo(() => {
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

  if (!df) {
    return (
      <PageLayout
        icon={Search}
        title="Explore"
        subtitle="Configure ML parameters and create train/test split"
      >
        <NoDatasetAlert
          description="Please select a dataset first to configure ML parameters."
          linkTo="/data/select"
        />
      </PageLayout>
    );
  }

  return (
    <PageLayout
      icon={Search}
      title="Explore"
      subtitle={`Configure ML parameters for ${selectedDataset}`}
      actions={
        <Button
          variant="outline"
          size="sm"
          onClick={loadDefaultConfig}
          disabled={isLoadingConfig}
        >
          <Download className="mr-2 h-4 w-4" />
          {isLoadingConfig ? "Loading..." : "Load Default"}
        </Button>
      }
      nextStep={
        isSplit
          ? {
              message: "Data split complete. Visualize or start training.",
              linkTo: "/pretrain/visualize",
              linkText: "Go to Visualize",
            }
          : undefined
      }
    >
      <div className="grid flex-1 gap-4 lg:grid-cols-2">
        {/* Left Column - Configuration */}
        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Data Split Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
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
              </div>

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

          <Button
            onClick={performSplit}
            disabled={!canSplit}
            className="w-full"
            size="lg"
          >
            Create Train/Test Split
          </Button>

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

          <SplitResults stats={splitStats} targetColumn={targetColumn} />
        </div>

        {/* Right Column - Data Preview */}
        <div className="space-y-4">
          {numericColumnData.length > 0 && (
            <OutlierVisualizer
              numericColumnData={numericColumnData}
              totalOutlierValues={totalOutlierValues}
              removedRowsAfterOutlierDrop={removedRowsAfterOutlierDrop}
              iqrMultiplier={iqrMultiplier}
              setIqrMultiplier={setIqrMultiplier}
              dropOutliers={dropOutliers}
            />
          )}

          <Card className={previewColumns.length === 0 ? "border-dashed" : ""}>
            {previewColumns.length > 0 && (
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Feature Preview</CardTitle>
              </CardHeader>
            )}
            <CardContent>
              {previewColumns.length > 0 ? (
                <DataTable columns={tableColumns} data={previewData} />
              ) : (
                <div className="flex h-[400px] items-center justify-center text-sm text-muted-foreground">
                  Select features to preview data
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
}
