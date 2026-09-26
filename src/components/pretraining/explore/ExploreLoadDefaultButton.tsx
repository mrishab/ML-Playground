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
    <Button variant="outline" size="sm" onClick={onClick} disabled={isLoading}>
      <Download className="mr-2 h-4 w-4" />
      {isLoading ? "Loading..." : "Load Default"}
    </Button>
  );
}
