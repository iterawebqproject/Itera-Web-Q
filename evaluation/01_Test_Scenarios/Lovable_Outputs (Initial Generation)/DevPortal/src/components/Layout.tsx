import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Outlet } from "react-router-dom";
import SkipToContent from "@/components/SkipToContent";

export default function Layout() {
  return (
    <SidebarProvider>
      <SkipToContent />
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-14 flex items-center border-b bg-card px-4 shrink-0" role="banner">
            <SidebarTrigger className="mr-4" aria-label="Toggle sidebar navigation" />
            <span className="text-sm font-medium text-muted-foreground">
              Developer Documentation & Support
            </span>
          </header>
          <main id="main-content" className="flex-1 overflow-y-auto" role="main">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
