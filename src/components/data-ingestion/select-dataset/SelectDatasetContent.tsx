import { Loader2 } from "lucide-react";
import { DatasetViewerTabs } from "./DatasetViewerTabs";
import { DatasetPickerGrid } from "./DatasetPickerGrid";
import type { useSelectDatasetPage } from "./useSelectDatasetPage";

interface SelectDatasetContentProps {
  page: ReturnType<typeof useSelectDatasetPage>;
}

export function SelectDatasetContent({ page }: SelectDatasetContentProps) {
  if (page.loading) {
    return (
      <div className="flex flex-1 items-center justify-center p-12">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (page.error) {
    return (
      <div className="rounded-lg border border-destructive bg-destructive/10 p-4 text-destructive text-sm">
        {page.error}
      </div>
    );
  }

  if (page.isDatasetReady) {
    return (
      <DatasetViewerTabs
        selectedDataset={page.selectedDataset}
        rows={page.rows}
        columns={page.columns}
      />
    );
  }

  return (
    <DatasetPickerGrid
      pendingDataset={page.pendingDataset}
      onSelect={page.onSelect}
      onOpenUpload={() => page.setIsUploadModalOpen(true)}
      customDatasets={page.customDatasets}
      onDeleteCustom={page.onDeleteCustom}
    />
  );
}
