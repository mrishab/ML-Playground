import { Route, Routes } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";


export function AppShell() {
  return (
    <>
      <header>Header</header>
      <div>Sidebar</div>
      <main>
      <Router>
        <Routes>
          <Route path="/" element={<div>Home</div>} />
        </Routes>
        </Router>
      </main>
    </>
  );
}
