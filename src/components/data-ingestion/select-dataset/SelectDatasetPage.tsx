import { FileSpreadsheet, Loader2 } from "lucide-react";
import { DatasetSelect } from "./DatasetSelect";
import { PageLayout } from "@/components/shared/PageLayout";
import { useSelectDatasetPage } from "./useSelectDatasetPage";
import { DatasetViewerTabs } from "./DatasetViewerTabs";
import { DatasetPickerGrid } from "./DatasetPickerGrid";
import { DatasetPendingBanner } from "./DatasetPendingBanner";

export function SelectDatasetPage() {
  const page = useSelectDatasetPage();

  const primaryAction = page.isDatasetReady
    ? { label: "Explore & Split", linkTo: "/pretrain/explore" }
    : { label: "Select a Dataset", disabled: true };

  return (
    <PageLayout
      icon={<FileSpreadsheet className="h-8 w-8 text-primary" />}
      title="Select Dataset"
      subtitle="Choose a dataset to begin the pipeline"
      actions={
        <div className="w-full sm:w-48">
          <DatasetSelect />
        </div>
      }
      primaryAction={primaryAction}
    >
      <DatasetPendingBanner
        pendingDataset={page.pendingDataset}
        selectedDataset={page.selectedDataset}
        revertDatasetChange={page.revertDatasetChange}
        handleApplyPendingDataset={page.handleApplyPendingDataset}
      />
      {page.loading && (
        <div className="flex flex-1 items-center justify-center p-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      )}
      {page.error && (
        <div className="rounded-lg border border-destructive bg-destructive/10 p-4 text-destructive text-sm">
          {page.error}
        </div>
      )}
      {page.isDatasetReady && (
        <DatasetViewerTabs
          selectedDataset={page.selectedDataset}
          rows={page.rows}
          columns={page.columns}
        />
      )}
      {!page.selectedDataset && !page.loading && (
        <DatasetPickerGrid
          pendingDataset={page.pendingDataset}
          onSelect={page.onSelect}
        />
      )}
    </PageLayout>
  );
}
