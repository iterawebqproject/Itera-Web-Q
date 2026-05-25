import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { ReactNode } from "react";

export function SidebarLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-12 flex items-center border-b border-border bg-card px-4 sticky top-0 z-30" role="banner">
            <SidebarTrigger className="mr-3" aria-label="Toggle sidebar navigation" />
            <span className="font-heading text-sm font-bold text-primary">Apex Science Library</span>
          </header>
          <main className="flex-1 overflow-auto" role="main">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
