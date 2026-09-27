import { Badge } from "@/components/ui/badge";

export function UploadCSVBadges() {
  return (
    <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
      <Badge variant="secondary" className="text-[11px]">
        Comma-Separated (.csv)
      </Badge>
      <Badge variant="secondary" className="text-[11px]">
        Header Row Required
      </Badge>
      <Badge variant="secondary" className="text-[11px]">
        Up to 50 MB
      </Badge>
    </div>
  );
}
