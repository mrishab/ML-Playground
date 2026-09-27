import { UploadCSVDropzone } from "./UploadCSVDropzone";
import { UploadCSVFileInfo } from "./UploadCSVFileInfo";
import { UploadCSVConfigFields } from "./UploadCSVConfigFields";
import { UploadCSVProblemType } from "./UploadCSVProblemType";
import { UploadCSVPreviewTable } from "./UploadCSVPreviewTable";
import type { ParsedCSVResult } from "@/lib/csvUpload";
import type { useUploadCSVForm } from "./useUploadCSVForm";
import type { useCSVDropzone } from "./useCSVDropzone";

interface UploadCSVModalBodyProps {
  parsed: ParsedCSVResult | null;
  dropzone: ReturnType<typeof useCSVDropzone>;
  form: ReturnType<typeof useUploadCSVForm>;
  onReset: () => void;
}

export function UploadCSVModalBody({
  parsed,
  dropzone,
  form,
  onReset,
}: UploadCSVModalBodyProps) {
  if (!parsed) {
    return (
      <UploadCSVDropzone
        isDragging={dropzone.isDragging}
        fileInputRef={dropzone.fileInputRef}
        onDragOver={dropzone.handleDragOver}
        onDragLeave={dropzone.handleDragLeave}
        onDrop={dropzone.handleDrop}
        onFileInputChange={dropzone.handleFileInputChange}
      />
    );
  }

  return (
    <div className="space-y-4 py-2">
      <UploadCSVFileInfo parsed={parsed} onReset={onReset} />
      <UploadCSVConfigFields
        datasetName={form.datasetName}
        setDatasetName={form.setDatasetName}
        targetColumn={form.targetColumn}
        setTargetColumn={form.setTargetColumn}
        parsed={parsed}
        nameCollision={form.nameCollision}
      />
      <UploadCSVProblemType
        problemType={form.problemType}
        setProblemType={form.setProblemType}
      />
      <UploadCSVPreviewTable parsed={parsed} targetColumn={form.targetColumn} />
    </div>
  );
}
