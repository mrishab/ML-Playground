import { Outlet } from "react-router-dom";
import { SiteHeader } from "./components/site-header";
import { PipelineStepper } from "./components/pipeline/PipelineStepper";
import { PrerequisitesModal } from "./components/pipeline/PrerequisitesModal";

export function AppShell() {
  return (
    <div className="flex h-svh w-full flex-col overflow-hidden bg-background">
      <SiteHeader />
      <PipelineStepper />
      <main className="flex-1 overflow-y-auto bg-background flex flex-col">
        <Outlet />
      </main>
      <PrerequisitesModal />
    </div>
  );
}
