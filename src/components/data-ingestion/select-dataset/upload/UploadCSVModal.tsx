import { useState, useRef, useCallback } from "react";
import {
  Upload,
  FileSpreadsheet,
  AlertCircle,
  Loader2,
  CheckCircle2,
  TrendingUp,
  Binary,
  ArrowRight,
  RotateCcw,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  parseCSVFile,
  formatFileSize,
  createDataFrameFromParsed,
  type ParsedCSVResult,
} from "@/lib/csvUpload";
import { useDatasetStore } from "@/stores/dataset";
import { useMLConfigStore, type ProblemType } from "@/stores/mlConfig";
import { usePipelineStore } from "@/stores/pipeline";

interface UploadCSVModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: (datasetName: string) => void;
}

export function UploadCSVModal({
  open,
  onOpenChange,
  onSuccess,
}: UploadCSVModalProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isParsing, setIsParsing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [parsed, setParsed] = useState<ParsedCSVResult | null>(null);

  // Form State
  const [datasetName, setDatasetName] = useState("");
  const [problemType, setProblemType] = useState<ProblemType>("classification");
  const [targetColumn, setTargetColumn] = useState("");

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const addCustomDataset = useDatasetStore((s) => s.addCustomDataset);
  const existingNames = useDatasetStore((s) =>
    s.customDatasets.map((d) => d.name.toLowerCase()),
  );
  const setStoreProblemType = useMLConfigStore((s) => s.setProblemType);
  const setStoreTargetColumn = useMLConfigStore((s) => s.setTargetColumn);
  const resetMLConfig = useMLConfigStore((s) => s.reset);
  const setPendingDataset = usePipelineStore((s) => s.setPendingDataset);

  const resetState = useCallback(() => {
    setIsDragging(false);
    setIsParsing(false);
    setError(null);
    setParsed(null);
    setDatasetName("");
    setTargetColumn("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, []);

  const handleClose = useCallback(
    (isOpen: boolean) => {
      if (!isOpen) {
        resetState();
      }
      onOpenChange(isOpen);
    },
    [onOpenChange, resetState],
  );

  const processFile = useCallback(async (file: File) => {
    if (!file) return;

    if (
      !file.name.toLowerCase().endsWith(".csv") &&
      file.type &&
      !file.type.includes("csv") &&
      !file.type.includes("text")
    ) {
      setError("Please select a valid CSV (.csv) file.");
      return;
    }

    setIsParsing(true);
    setError(null);

    try {
      const result = await parseCSVFile(file);
      setParsed(result);
      setDatasetName(result.suggestedName);
      setProblemType(result.suggestedProblemType);
      setTargetColumn(result.suggestedTarget);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to parse CSV file.",
      );
      setParsed(null);
    } finally {
      setIsParsing(false);
    }
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      const files = e.dataTransfer.files;
      if (files && files.length > 0) {
        processFile(files[0]);
      }
    },
    [processFile],
  );

  const handleFileInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files && files.length > 0) {
        processFile(files[0]);
      }
    },
    [processFile],
  );

  const handleImport = useCallback(() => {
    if (!parsed) return;

    const trimmedName = datasetName.trim();
    if (!trimmedName) {
      setError("Please provide a name for this dataset.");
      return;
    }

    if (!targetColumn) {
      setError("Please select a target column for this dataset.");
      return;
    }

    try {
      const df = createDataFrameFromParsed(parsed.rows, parsed.headers);

      addCustomDataset({
        name: trimmedName,
        fileName: parsed.fileName,
        fileSize: parsed.fileSize,
        problemType,
        targetColumn,
        rowCount: parsed.rowCount,
        columnCount: parsed.columnCount,
        columns: parsed.headers,
        df,
        uploadedAt: Date.now(),
      });

      resetMLConfig();
      setStoreProblemType(problemType);
      setStoreTargetColumn(targetColumn);
      setPendingDataset(null);

      handleClose(false);
      onSuccess?.(trimmedName);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to create DataFrame.",
      );
    }
  }, [
    parsed,
    datasetName,
    targetColumn,
    problemType,
    addCustomDataset,
    resetMLConfig,
    setStoreProblemType,
    setStoreTargetColumn,
    setPendingDataset,
    handleClose,
    onSuccess,
  ]);

  const nameCollision =
    parsed &&
    datasetName.trim().length > 0 &&
    existingNames.includes(datasetName.trim().toLowerCase());

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="w-[calc(100%-2rem)] max-w-2xl max-h-[90dvh] overflow-y-auto p-4 sm:p-6 rounded-xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-lg sm:text-xl">
            <FileSpreadsheet className="h-5 w-5 text-primary shrink-0" />
            Upload Custom Dataset
          </DialogTitle>
          <DialogDescription className="text-xs sm:text-sm">
            Import a CSV file from your device to train, evaluate, and compare
            ML models.
          </DialogDescription>
        </DialogHeader>

        {/* Error Display */}
        {error && (
          <div className="flex items-start gap-2 rounded-lg border border-destructive/40 bg-destructive/10 p-3 text-xs sm:text-sm text-destructive">
            <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <p className="font-medium">Upload Error</p>
              <p className="mt-0.5 opacity-90">{error}</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setError(null)}
              className="h-6 px-2 text-xs hover:bg-destructive/20"
            >
              Dismiss
            </Button>
          </div>
        )}

        {/* Parsing Indicator */}
        {isParsing && (
          <div className="flex flex-col items-center justify-center gap-3 py-12 text-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <div>
              <p className="text-sm font-medium">
                Parsing and validating CSV...
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Checking structure, headers, and inferred data types.
              </p>
            </div>
          </div>
        )}

        {/* Step 1: Dropzone (when no parsed data yet) */}
        {!parsed && !isParsing && (
          <div className="space-y-4 py-2">
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-6 sm:p-10 text-center cursor-pointer transition-[border-color,background-color,transform] duration-150 ease-out ${
                isDragging
                  ? "border-primary bg-primary/10 scale-[1.01]"
                  : "border-muted-foreground/30 hover:border-primary/60 hover:bg-muted/30"
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".csv,text/csv"
                onChange={handleFileInputChange}
                className="hidden"
              />
              <div className="rounded-full bg-primary/10 p-3 mb-3 text-primary">
                <Upload className="h-6 w-6" />
              </div>
              <p className="text-sm sm:text-base font-semibold">
                Drag and drop your CSV file here
              </p>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1 max-w-sm">
                or{" "}
                <span className="text-primary font-medium underline">
                  browse from your computer
                </span>
              </p>
              <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
                <Badge variant="secondary" className="text-[11px]">
                  Comma-Separated (.csv)
                </Badge>
                <Badge variant="secondary" className="text-[11px]">
                  Header Row Required
                </Badge>
                <Badge variant="secondary" className="text-[11px]">
                  Up to 50 MB
                </Badge>
              </div>
            </div>

            <div className="rounded-lg bg-muted/40 p-3 text-xs text-muted-foreground space-y-1">
              <p className="font-medium text-foreground">
                Dataset formatting tips:
              </p>
              <ul className="list-disc pl-4 space-y-0.5">
                <li>First row should contain unique column names.</li>
                <li>
                  At least one column will serve as your prediction target.
                </li>
                <li>
                  Numeric columns will automatically be available as features.
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* Step 2: Preview & Configuration (when file is parsed) */}
        {parsed && !isParsing && (
          <div className="space-y-4 py-2">
            {/* File Info Bar */}
            <div className="flex flex-wrap items-center justify-between gap-2 rounded-lg border bg-muted/30 p-3 text-xs sm:text-sm">
              <div className="flex items-center gap-2 min-w-0">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                <span className="font-semibold truncate">
                  {parsed.fileName}
                </span>
                <span className="text-muted-foreground text-xs">
                  ({formatFileSize(parsed.fileSize)})
                </span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Badge variant="outline" className="text-xs">
                  {parsed.rowCount.toLocaleString()} rows
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {parsed.columnCount} columns
                </Badge>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={resetState}
                  className="h-7 text-xs text-muted-foreground hover:text-foreground"
                >
                  <RotateCcw className="mr-1 h-3 w-3" />
                  Change File
                </Button>
              </div>
            </div>

            {/* Config Fields */}
            <div className="grid gap-3 sm:grid-cols-2">
              {/* Dataset Name */}
              <div className="space-y-1.5">
                <Label
                  htmlFor="custom-dataset-name"
                  className="text-xs sm:text-sm font-medium"
                >
                  Dataset Name
                </Label>
                <Input
                  id="custom-dataset-name"
                  value={datasetName}
                  onChange={(e) => setDatasetName(e.target.value)}
                  placeholder="e.g. Customer Churn"
                  className="h-9"
                />
                {nameCollision && (
                  <p className="text-[11px] text-amber-600 dark:text-amber-400">
                    A dataset with this name already exists and will be updated.
                  </p>
                )}
              </div>

              {/* Target Column */}
              <div className="space-y-1.5">
                <Label
                  htmlFor="custom-target-column"
                  className="text-xs sm:text-sm font-medium"
                >
                  Target Variable (Prediction Label)
                </Label>
                <Select value={targetColumn} onValueChange={setTargetColumn}>
                  <SelectTrigger id="custom-target-column" className="h-9">
                    <SelectValue placeholder="Select target column..." />
                  </SelectTrigger>
                  <SelectContent className="max-h-56">
                    {parsed.headers.map((col) => (
                      <SelectItem key={col} value={col}>
                        <div className="flex items-center justify-between gap-3 w-full">
                          <span>{col}</span>
                          <span className="text-[10px] text-muted-foreground uppercase">
                            {parsed.columnTypes[col] ?? "text"}
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Problem Type Selector */}
            <div className="space-y-1.5">
              <Label className="text-xs sm:text-sm font-medium">
                Problem Type
              </Label>
              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                <div
                  onClick={() => setProblemType("classification")}
                  className={`flex items-start gap-2.5 rounded-lg border p-3 cursor-pointer transition-[border-color,background-color,box-shadow,transform] duration-150 ease-out active:scale-[0.99] ${
                    problemType === "classification"
                      ? "border-primary bg-primary/5 ring-1 ring-primary"
                      : "hover:bg-muted/50 border-input"
                  }`}
                >
                  <Binary
                    className={`h-4 w-4 mt-0.5 shrink-0 ${
                      problemType === "classification"
                        ? "text-primary"
                        : "text-muted-foreground"
                    }`}
                  />
                  <div>
                    <p className="text-xs sm:text-sm font-semibold leading-tight">
                      Classification
                    </p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">
                      Categorical or discrete class labels (e.g. KNN, LDA,
                      Logistic)
                    </p>
                  </div>
                </div>

                <div
                  onClick={() => setProblemType("regression")}
                  className={`flex items-start gap-2.5 rounded-lg border p-3 cursor-pointer transition-[border-color,background-color,box-shadow,transform] duration-150 ease-out active:scale-[0.99] ${
                    problemType === "regression"
                      ? "border-primary bg-primary/5 ring-1 ring-primary"
                      : "hover:bg-muted/50 border-input"
                  }`}
                >
                  <TrendingUp
                    className={`h-4 w-4 mt-0.5 shrink-0 ${
                      problemType === "regression"
                        ? "text-primary"
                        : "text-muted-foreground"
                    }`}
                  />
                  <div>
                    <p className="text-xs sm:text-sm font-semibold leading-tight">
                      Regression
                    </p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">
                      Continuous numerical values (e.g. Linear Regression)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* First 5 Rows Preview Table */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span className="font-medium text-foreground">
                  Data Preview (First 5 Rows)
                </span>
                <span>{parsed.headers.length} columns detected</span>
              </div>
              <div className="overflow-x-auto rounded-lg border bg-card max-h-48 text-xs">
                <table className="w-full border-collapse">
                  <thead className="bg-muted/60 sticky top-0">
                    <tr>
                      {parsed.headers.map((h) => (
                        <th
                          key={h}
                          className="px-3 py-2 text-left font-semibold border-b whitespace-nowrap"
                        >
                          <div className="flex items-center gap-1.5">
                            <span>{h}</span>
                            {h === targetColumn && (
                              <Badge
                                variant="default"
                                className="text-[9px] px-1 py-0 h-4 bg-primary"
                              >
                                Target
                              </Badge>
                            )}
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {parsed.previewRows.map((row, idx) => (
                      <tr
                        key={idx}
                        className="border-b last:border-0 hover:bg-muted/30 transition-colors"
                      >
                        {parsed.headers.map((h) => (
                          <td
                            key={h}
                            className="px-3 py-1.5 whitespace-nowrap text-muted-foreground"
                          >
                            {row[h] === null || row[h] === undefined
                              ? "—"
                              : String(row[h])}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        <DialogFooter className="flex flex-col-reverse sm:flex-row gap-2 pt-2">
          <Button
            type="button"
            variant="ghost"
            onClick={() => handleClose(false)}
            size="sm"
            className="w-full sm:w-auto"
          >
            Cancel
          </Button>

          {parsed && (
            <Button
              type="button"
              onClick={handleImport}
              size="sm"
              disabled={!datasetName.trim() || !targetColumn}
              className="w-full sm:w-auto group"
            >
              Import & Load Dataset
              <ArrowRight className="ml-1.5 h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
