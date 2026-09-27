import { FileSpreadsheet } from "lucide-react";
import {
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export function UploadCSVModalHeader() {
  return (
    <DialogHeader>
      <DialogTitle className="flex items-center gap-2 text-lg sm:text-xl">
        <FileSpreadsheet className="h-5 w-5 text-primary shrink-0" />
        Upload Custom Dataset
      </DialogTitle>
      <DialogDescription className="text-xs sm:text-sm">
        Import a CSV file from your device to train, evaluate, and compare ML
        models.
      </DialogDescription>
    </DialogHeader>
  );
}
