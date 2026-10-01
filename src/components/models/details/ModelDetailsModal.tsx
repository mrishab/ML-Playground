import { Download } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ModelDetailsTabs } from "./ModelDetailsTabs";
import type { SavedModel } from "@/types/savedModel";

interface ModalProps {
  model: SavedModel | null;
  onClose: () => void;
  onDownload: (model: SavedModel) => void;
}

export function ModelDetailsModal({ model, onClose, onDownload }: ModalProps) {
  if (!model) return null;

  return (
    <Dialog open={Boolean(model)} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader className="pb-2 border-b border-border/60">
          <DialogTitle className="text-base sm:text-lg">{model.name}</DialogTitle>
          <DialogDescription className="text-xs">
            {model.algorithmName} trained on {model.datasetName}
          </DialogDescription>
        </DialogHeader>

        <ModelDetailsTabs model={model} />

        <DialogFooter className="pt-2 border-t border-border/60 gap-2">
          <Button variant="outline" size="sm" onClick={() => onDownload(model)} className="active:scale-[0.98]">
            <Download className="mr-1.5 h-3.5 w-3.5" />
            Download Model JSON
          </Button>
          <Button variant="secondary" size="sm" onClick={onClose} className="active:scale-[0.98]">
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
