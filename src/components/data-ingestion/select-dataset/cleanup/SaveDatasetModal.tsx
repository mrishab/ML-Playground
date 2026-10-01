import { Check, Database } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useSaveDatasetModal } from "./useSaveDatasetModal";

interface SaveDatasetModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SaveDatasetModal({ open, onOpenChange }: SaveDatasetModalProps) {
  const { name, setName, description, setDescription, isSaved, handleSave } = useSaveDatasetModal(() => onOpenChange(false));

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Database className="h-5 w-5 text-primary" />
            Save Dataset to Local Storage
          </DialogTitle>
          <DialogDescription>Store this cleaned dataset for future pipeline experiments</DialogDescription>
        </DialogHeader>
        <div className="space-y-3 py-2">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-foreground">Dataset Name</label>
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. iris_cleaned" />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-foreground">Notes / Description (Optional)</label>
            <Input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="e.g. Imputed null ages, dropped outliers" />
          </div>
        </div>
        <DialogFooter className="flex sm:justify-between items-center gap-2">
          <Button variant="ghost" size="sm" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button size="sm" onClick={handleSave} disabled={!name.trim() || isSaved} className="gap-2 transition-[transform,background-color,border-color,color] duration-150 ease-out active:scale-[0.98]">
            {isSaved ? <><Check className="h-4 w-4 text-emerald-500" /> Saved!</> : "Save Dataset"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
