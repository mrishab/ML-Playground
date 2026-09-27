import { Link } from "react-router-dom";
import { Logo } from "@/components/shared/Logo";
import { Separator } from "@/components/ui/separator";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { HeaderBreadcrumbs } from "./site-header/HeaderBreadcrumbs";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 flex w-full flex-col border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 pt-[env(safe-area-inset-top,0px)]">
      <div className="flex h-14 w-full items-center gap-2.5 px-3 sm:gap-3 sm:px-6">
        <Link
          to="/data/select"
          className="flex items-center gap-2.5 font-semibold transition-[transform,opacity] duration-150 ease-out active:scale-[0.98] hover:opacity-85 shrink-0"
        >
          <Logo className="size-8 rounded-lg shadow-sm" size={32} />
          <span className="text-sm font-semibold tracking-tight">
            ML Playground
          </span>
        </Link>
        <Separator orientation="vertical" className="hidden h-4 sm:block" />
        <HeaderBreadcrumbs />
        <div className="ml-auto flex items-center gap-2 shrink-0">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
