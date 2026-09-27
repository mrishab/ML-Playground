import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useUploadCSVModal } from "./useUploadCSVModal";
import { UploadCSVModalHeader } from "./UploadCSVModalHeader";
import { UploadCSVErrorAlert } from "./UploadCSVErrorAlert";
import { UploadCSVParsingIndicator } from "./UploadCSVParsingIndicator";
import { UploadCSVModalBody } from "./UploadCSVModalBody";
import { UploadCSVModalFooter } from "./UploadCSVModalFooter";

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
  const { parser, form, dropzone, handleClose, resetAll } = useUploadCSVModal({
    onOpenChange,
    onSuccess,
  });

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="w-[calc(100%-2rem)] max-w-2xl max-h-[90dvh] overflow-y-auto p-4 sm:p-6 rounded-xl">
        <UploadCSVModalHeader />
        <UploadCSVErrorAlert
          error={parser.error}
          onDismiss={() => parser.setError(null)}
        />
        {parser.isParsing ? (
          <UploadCSVParsingIndicator />
        ) : (
          <UploadCSVModalBody
            parsed={parser.parsed}
            dropzone={dropzone}
            form={form}
            onReset={resetAll}
          />
        )}
        <UploadCSVModalFooter
          hasParsed={Boolean(parser.parsed)}
          canImport={Boolean(form.datasetName.trim() && form.targetColumn)}
          onCancel={() => handleClose(false)}
          onImport={form.handleImport}
        />
      </DialogContent>
    </Dialog>
  );
}
