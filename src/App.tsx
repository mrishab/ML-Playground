import { ThemeProvider } from "next-themes";
import "./index.css";
import { Toaster } from "sonner";
import { AppShell } from "./AppShell";

function App() {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      storageKey="comp-381-ui-theme"
    >
        <AppShell />
        <Toaster richColors position="top-right" />
    </ThemeProvider>
  );
}

export default App;
