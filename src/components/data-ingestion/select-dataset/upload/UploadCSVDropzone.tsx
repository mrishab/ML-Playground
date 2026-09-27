import { Upload } from "lucide-react";
import { UploadCSVBadges } from "./UploadCSVBadges";

interface UploadCSVDropzoneProps {
  isDragging: boolean;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  onDragOver: (e: React.DragEvent) => void;
  onDragLeave: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent) => void;
  onFileInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function UploadCSVDropzone({
  isDragging,
  fileInputRef,
  onDragOver,
  onDragLeave,
  onDrop,
  onFileInputChange,
}: UploadCSVDropzoneProps) {
  return (
    <div className="space-y-4 py-2">
      <div
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`group flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-6 sm:p-10 text-center cursor-pointer transition-[border-color,background-color,transform] duration-150 ease-out active:scale-[0.99] ${
          isDragging
            ? "border-primary bg-primary/10 scale-[1.01]"
            : "border-muted-foreground/30 hover:border-primary/60 hover:bg-muted/30"
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".csv,text/csv"
          onChange={onFileInputChange}
          className="hidden"
        />
        <div className="rounded-full bg-primary/10 p-3 mb-3 text-primary transition-transform duration-150 ease-out group-hover:scale-105">
          <Upload className="h-6 w-6" />
        </div>
        <p className="text-sm sm:text-base font-semibold">
          Drag and drop your CSV file here
        </p>
        <p className="text-xs sm:text-sm text-muted-foreground mt-1 max-w-sm">
          or{" "}
          <span className="text-primary font-medium underline">
            browse from your computer
          </span>
        </p>
        <UploadCSVBadges />
      </div>
    </div>
  );
}
