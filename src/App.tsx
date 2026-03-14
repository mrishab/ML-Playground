import { ThemeProvider } from "next-themes";
import "./index.css";
import { AppShell } from "./AppShell";

function App() {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      storageKey="comp-381-ui-theme"
    >
      <AppShell />
    </ThemeProvider>
  );
}

export default App;
