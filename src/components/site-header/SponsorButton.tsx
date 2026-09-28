import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SponsorButton() {
  return (
    <Button
      asChild
      variant="outline"
      size="sm"
      className="h-8 gap-1.5 px-2.5 text-xs font-medium border-rose-200/80 dark:border-rose-900/60 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 hover:text-rose-700 dark:hover:text-rose-300 hover:border-rose-300 dark:hover:border-rose-800 transition-colors duration-150 ease-out"
    >
      <a
        href="https://ko-fi.com/mrishab"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Sponsor project on Ko-fi"
        title="Sponsor this project on Ko-fi"
      >
        <Heart className="size-3.5 fill-rose-500 text-rose-500 shrink-0" />
        <span className="hidden sm:inline">Sponsor</span>
      </a>
    </Button>
  );
}
