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
  if (!prevStepRoute) return <div />;

  return (
    <Button asChild variant="ghost" size="sm" className="text-xs">
      <Link to={prevStepRoute}>
        <ArrowLeft className="mr-1.5 h-3.5 w-3.5" />
        Back: {prevStepLabel}
      </Link>
    </Button>
  );
}
