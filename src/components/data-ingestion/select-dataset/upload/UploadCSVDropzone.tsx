import { UploadCSVBadges } from "./UploadCSVBadges";
import { UploadCSVDropzonePrompt } from "./UploadCSVDropzonePrompt";
import type { UploadCSVDropzoneProps } from "./dropzoneTypes";

export type { UploadCSVDropzoneProps };

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
        role="button"
        tabIndex={0}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        onClick={() => fileInputRef.current?.click()}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            fileInputRef.current?.click();
          }
        }}
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
        <UploadCSVDropzonePrompt />
        <UploadCSVBadges />
      </div>
    </div>
  );
}
