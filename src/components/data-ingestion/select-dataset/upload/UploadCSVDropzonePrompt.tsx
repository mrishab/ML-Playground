import { Upload } from "lucide-react";

export function UploadCSVDropzonePrompt() {
  return (
    <>
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
    </>
  );
}
