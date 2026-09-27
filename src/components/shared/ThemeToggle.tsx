import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      className="h-8 w-8 rounded-md transition-[color,background-color,border-color,box-shadow,transform] duration-150 ease-out active:scale-90 hover:bg-accent"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      title={`Switch to ${resolvedTheme === "dark" ? "light" : "dark"} mode`}
      aria-label="Toggle theme"
    >
      <Sun className="h-4 w-4 rotate-0 scale-100 transition-transform duration-200 ease-out dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-transform duration-200 ease-out dark:rotate-0 dark:scale-100" />
    </Button>
  );
}
