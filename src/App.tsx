import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import "./index.css";
import { Toaster } from "sonner";

function App() {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      storageKey="comp-381-ui-theme"
    >
      <Router>
        <div>Hello world</div>
        <Toaster richColors position="top-right" />
      </Router>
    </ThemeProvider>
  );
}

export default App;
