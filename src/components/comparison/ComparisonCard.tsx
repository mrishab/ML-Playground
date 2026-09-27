import type { ReactNode } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type ComparisonCardProps = {
  title: string;
  subtitle?: string;
  trained: boolean;
  children: ReactNode;
};

export function ComparisonCard({
  title,
  subtitle,
  trained,
  children,
}: ComparisonCardProps) {
  if (!trained) {
    return (
      <Card className="border-dashed">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">{title}</CardTitle>
          {subtitle && <CardDescription>{subtitle}</CardDescription>}
        </CardHeader>
        <CardContent className="flex min-h-[150px] items-center justify-center">
          <p className="text-sm text-muted-foreground">Not trained yet</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">{title}</CardTitle>
        {subtitle && <CardDescription>{subtitle}</CardDescription>}
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
