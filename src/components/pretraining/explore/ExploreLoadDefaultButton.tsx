import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ExploreLoadDefaultButtonProps {
  isLoading: boolean;
  onClick: () => void;
}

export function ExploreLoadDefaultButton({
  isLoading,
  onClick,
}: ExploreLoadDefaultButtonProps) {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={onClick}
      disabled={isLoading}
      className="text-xs sm:text-sm h-8"
    >
      <Download className="mr-1.5 h-3.5 w-3.5 sm:mr-2 sm:h-4 sm:w-4" />
      {isLoading ? "Loading..." : "Load Default"}
    </Button>
  );
}
