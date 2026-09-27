import { FileSpreadsheet } from "lucide-react";
import { PageLayout } from "@/components/shared/PageLayout";
import { useSelectDatasetPage } from "./useSelectDatasetPage";
import { DatasetPendingBanner } from "./DatasetPendingBanner";
import { UploadCSVModal } from "./upload/UploadCSVModal";
import { SelectDatasetActions } from "./SelectDatasetActions";
import { SelectDatasetContent } from "./SelectDatasetContent";

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
        <SelectDatasetActions
          onOpenUpload={() => page.setIsUploadModalOpen(true)}
        />
      }
      primaryAction={primaryAction}
    >
      <DatasetPendingBanner
        pendingDataset={page.pendingDataset}
        selectedDataset={page.selectedDataset}
        revertDatasetChange={page.revertDatasetChange}
        handleApplyPendingDataset={page.handleApplyPendingDataset}
      />
      <SelectDatasetContent page={page} />
      <UploadCSVModal
        open={page.isUploadModalOpen}
        onOpenChange={page.setIsUploadModalOpen}
      />
    </PageLayout>
  );
}
