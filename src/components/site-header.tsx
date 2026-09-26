import { Fragment } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { ThemeToggle } from "@/components/shared/ThemeToggle";

const BREADCRUMB_MAP: Record<string, string> = {
  data: "Data Ingestion",
  select: "Select Dataset",
  transform: "Transform",
  pretrain: "Pretraining",
  explore: "Explore",
  visualize: "Visualize",
  train: "Training",
  linear: "Linear Regression",
  knn: "KNN",
  lda: "LDA",
  logistic: "Logistic Regression",
  comparison: "Comparison",
  classification: "Classification",
  regression: "Regression",
  clustering: "Clustering",
};

export function SiteHeader() {
  const location = useLocation();
  const segments = location.pathname.split("/").filter(Boolean);

  const crumbs = segments
    .map((segment) => ({
      key: segment,
      label: BREADCRUMB_MAP[segment] ?? segment,
    }))
    .filter((crumb) => crumb.label);

  return (
    <header className="sticky top-0 z-50 flex w-full items-center border-b bg-background">
      <div className="flex h-[--header-height] w-full items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb className="hidden sm:block">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/data/select">ML Playground</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            {crumbs.map((crumb) => (
              <Fragment key={crumb.key}>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <span className="text-muted-foreground">{crumb.label}</span>
                </BreadcrumbItem>
              </Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
