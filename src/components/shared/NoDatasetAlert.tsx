import { AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

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
    <Alert
      variant="destructive"
      className="border-amber-500/30 bg-amber-500/5 text-amber-900 dark:text-amber-100"
    >
      <AlertCircle className="h-4 w-4 !text-amber-500" />
      <AlertTitle className="text-amber-700 dark:text-amber-300">
        {title}
      </AlertTitle>
      <AlertDescription>
        {description}
        {linkTo && (
          <>
            {" "}
            <Link to={linkTo} className="font-medium text-primary underline">
              {linkText}
            </Link>
          </>
        )}
      </AlertDescription>
    </Alert>
  );
}
