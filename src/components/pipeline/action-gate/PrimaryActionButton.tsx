import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ActionGatePrimaryAction } from "./types";

export function PrimaryActionButton({
  action,
}: {
  action: ActionGatePrimaryAction;
}) {
  if (action.linkTo) {
    return (
      <Button
        asChild
        size="sm"
        variant={action.variant ?? "default"}
        disabled={action.disabled}
        className="group"
      >
        <Link to={action.linkTo}>
          {action.label}
          <ArrowRight className="ml-1.5 h-3.5 w-3.5 transition-transform duration-150 ease-out group-hover:translate-x-1" />
        </Link>
      </Button>
    );
  }
  return (
    <Button
      size="sm"
      variant={action.variant ?? "default"}
      disabled={action.disabled}
      onClick={action.onClick}
      className="group"
    >
      {action.label}
      <ArrowRight className="ml-1.5 h-3.5 w-3.5 transition-transform duration-150 ease-out group-hover:translate-x-1" />
    </Button>
  );
}
