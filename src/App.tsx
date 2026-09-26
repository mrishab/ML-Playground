import { ThemeProvider } from "next-themes";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { AppRoutes } from "./AppRoutes";

const basename = import.meta.env.BASE_URL;

function App() {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      storageKey="ml-playground-ui-theme"
    >
      <BrowserRouter basename={basename}>
        <AppRoutes />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
