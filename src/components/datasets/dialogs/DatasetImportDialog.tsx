import { useState, useRef } from "react";
import { Upload } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ImportDialogProps {
  open: boolean;
  onClose: () => void;
  onImport: (json: string) => number;
}

export function DatasetImportDialog({ open, onClose, onImport }: ImportDialogProps) {
  const [error, setError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setError(null);
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        const count = onImport(text);
        if (count > 0) onClose();
        else setError("No valid dataset definitions found in file.");
      } catch {
        setError("Invalid JSON file format.");
      }
    };
    reader.readAsText(file);
  };

  return (
    <Dialog open={open} onOpenChange={(val) => !val && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Import Dataset</DialogTitle>
          <DialogDescription>
            Select a previously exported dataset JSON bundle to restore it to local storage.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center justify-center border-2 border-dashed border-border/80 rounded-lg p-6 hover:bg-muted/10 cursor-pointer" onClick={() => fileRef.current?.click()}>
          <Upload className="h-8 w-8 text-muted-foreground mb-2" />
          <p className="text-xs font-medium text-foreground">Click to upload JSON file</p>
          <input ref={fileRef} type="file" accept=".json" onChange={handleFileChange} className="hidden" />
        </div>
        {error && <p className="text-xs text-destructive">{error}</p>}
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
