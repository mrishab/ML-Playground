import { FileSpreadsheet, Loader2, Upload } from "lucide-react";
import { DatasetSelect } from "./DatasetSelect";
import { PageLayout } from "@/components/shared/PageLayout";
import { useSelectDatasetPage } from "./useSelectDatasetPage";
import { DatasetViewerTabs } from "./DatasetViewerTabs";
import { DatasetPickerGrid } from "./DatasetPickerGrid";
import { DatasetPendingBanner } from "./DatasetPendingBanner";
import { UploadCSVModal } from "./upload/UploadCSVModal";
import { Button } from "@/components/ui/button";

export function SelectDatasetPage() {
  const page = useSelectDatasetPage();

  const primaryAction = page.isDatasetReady
    ? { label: "Explore & Split", linkTo: "/pretrain/explore" }
    : { label: "Select a Dataset", disabled: true };

  return (
    <PageLayout
      icon={<FileSpreadsheet className="h-8 w-8 text-primary" />}
      title="Select Dataset"
      subtitle="Choose a benchmark dataset or upload your own CSV"
      actions={
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          <Button
            variant="outline"
            size="sm"
            onClick={() => page.setIsUploadModalOpen(true)}
            className="h-9 gap-1.5 text-xs sm:text-sm font-medium"
          >
            <Upload className="h-4 w-4 text-primary" />
            <span>Upload CSV</span>
          </Button>
          <div className="w-full sm:w-52">
            <DatasetSelect
              onOpenUpload={() => page.setIsUploadModalOpen(true)}
            />
          </div>
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
          onOpenUpload={() => page.setIsUploadModalOpen(true)}
          customDatasets={page.customDatasets}
          onDeleteCustom={page.onDeleteCustom}
        />
      )}

      {/* Upload CSV Modal */}
      <UploadCSVModal
        open={page.isUploadModalOpen}
        onOpenChange={page.setIsUploadModalOpen}
      />
    </PageLayout>
  );
}
