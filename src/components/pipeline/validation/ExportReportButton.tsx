import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ExportReportButtonProps {
  onClick: () => void;
}

export function ExportReportButton({ onClick }: ExportReportButtonProps) {
  return (
    <Button variant="outline" size="sm" onClick={onClick} className="text-xs">
      <Download className="mr-1.5 h-3.5 w-3.5" />
      <span>
        Export <span className="hidden sm:inline">JSON </span>Report
      </span>
    </Button>
  );
}
