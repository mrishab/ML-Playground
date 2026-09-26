import { Outlet } from "react-router-dom";
import { AppSidebar } from "./components/app-sidebar";
import { SiteHeader } from "./components/site-header";
import { SidebarProvider } from "./components/ui/sidebar";
import { PipelineStepper } from "./components/pipeline/PipelineStepper";
import { PrerequisitesModal } from "./components/pipeline/PrerequisitesModal";

export function AppShell() {
  return (
    <SidebarProvider
      className="h-svh w-full overflow-hidden"
      style={
        {
          "--header-height": "calc(--spacing(14))",
        } as React.CSSProperties
      }
    >
      <div className="grid h-full w-full md:grid-cols-[auto_1fr]">
        <AppSidebar
          style={{ "--header-height": "0px" } as React.CSSProperties}
        />
        <div className="flex flex-col min-w-0 overflow-hidden">
          <SiteHeader />
          <PipelineStepper />
          <main className="flex-1 overflow-y-auto bg-background flex flex-col">
            <Outlet />
          </main>
          <PrerequisitesModal />
        </div>
      </div>
    </SidebarProvider>
  );
}
