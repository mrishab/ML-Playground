import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type NextStepBannerProps = {
  message: string;
  linkTo: string;
  linkText: string;
};

export function NextStepBanner({
  message,
  linkTo,
  linkText,
}: NextStepBannerProps) {
  return (
    <Card className="border-primary/30 bg-primary/5">
      <CardContent className="flex items-center justify-between p-4">
        <p className="text-sm font-medium">{message}</p>
        <Button asChild size="sm" className="group">
          <Link to={linkTo}>
            {linkText}
            <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
