import { AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";

type NoDatasetAlertProps = {
  title?: string;
  description?: string;
  linkTo?: string;
  linkText?: string;
};

export function NoDatasetAlert({
  title = "No dataset loaded",
  description = "Please select a dataset first to continue.",
  linkTo,
  linkText = "Select a dataset",
}: NoDatasetAlertProps) {
  return (
    <Card className="border-amber-500/30 bg-amber-500/5">
      <CardContent className="flex items-center gap-3 p-4">
        <AlertCircle className="h-5 w-5 text-amber-500" />
        <div>
          <p className="font-medium">{title}</p>
          <p className="text-sm text-muted-foreground">
            {description}
            {linkTo && (
              <>
                {" "}
                <Link to={linkTo} className="text-primary underline">
                  {linkText}
                </Link>
              </>
            )}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
