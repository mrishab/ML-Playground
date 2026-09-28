import { Github } from "lucide-react";

export function AuthorLink() {
  return (
    <a
      href="https://github.com/mrishab"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium text-muted-foreground transition-colors duration-150 ease-out hover:bg-muted/70 hover:text-foreground"
      title="Rishab Manocha on GitHub"
      aria-label="Rishab Manocha on GitHub"
    >
      <Github className="size-3.5 shrink-0" />
      <span className="hidden md:inline">Rishab Manocha</span>
    </a>
  );
}
