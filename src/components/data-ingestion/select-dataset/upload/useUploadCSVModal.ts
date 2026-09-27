import { useCallback } from "react";
import { useUploadCSVParser } from "./useUploadCSVParser";
import { useUploadCSVForm } from "./useUploadCSVForm";
import { useCSVDropzone } from "./useCSVDropzone";

interface UploadModalParams {
  onOpenChange: (open: boolean) => void;
  onSuccess?: (datasetName: string) => void;
}

export function useUploadCSVModal({
  onOpenChange,
  onSuccess,
}: UploadModalParams) {
  const parser = useUploadCSVParser();

  const handleClose = useCallback(
    (isOpen: boolean) => {
      if (!isOpen) {
        parser.resetParser();
        dropzone.resetInput();
        form.resetForm();
      }
      onOpenChange(isOpen);
    },
    [onOpenChange, parser],
  );

  const form = useUploadCSVForm({
    parsed: parser.parsed,
    onClose: () => handleClose(false),
    onSuccess,
    setError: parser.setError,
  });

  const onFileSelected = useCallback(
    async (file: File) => {
      const res = await parser.processFile(file);
      if (res) form.initForm(res);
    },
    [parser, form],
  );

  const dropzone = useCSVDropzone(onFileSelected);

  const resetAll = useCallback(() => {
    parser.resetParser();
    dropzone.resetInput();
    form.resetForm();
  }, [parser, dropzone, form]);

  return { parser, form, dropzone, handleClose, resetAll };
}
