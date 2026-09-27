import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ActionGateBackButtonProps {
  prevStepRoute?: string | null;
  prevStepLabel?: string | null;
}

export function ActionGateBackButton({
  prevStepRoute,
  prevStepLabel,
}: ActionGateBackButtonProps) {
  if (!prevStepRoute) return null;

  return (
    <Button asChild variant="ghost" size="sm" className="text-xs px-2 sm:px-3">
      <Link to={prevStepRoute}>
        <ArrowLeft className="mr-1 h-3.5 w-3.5 sm:mr-1.5" />
        <span className="hidden sm:inline">Back: </span>
        <span className="truncate max-w-[80px] sm:max-w-none">
          {prevStepLabel || "Back"}
        </span>
      </Link>
    </Button>
  );
}
