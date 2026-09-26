import { Link } from "react-router-dom";
import { Brain } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { HeaderBreadcrumbs } from "./site-header/HeaderBreadcrumbs";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 flex w-full items-center border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 w-full items-center gap-3 px-4 md:px-6">
        <Link
          to="/data/select"
          className="flex items-center gap-2 font-semibold transition-opacity duration-200 hover:opacity-80"
        >
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
            <Brain className="size-4" />
          </div>
          <span className="text-sm font-semibold tracking-tight">
            ML Playground
          </span>
        </Link>
        <Separator orientation="vertical" className="h-4" />
        <HeaderBreadcrumbs />
        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
