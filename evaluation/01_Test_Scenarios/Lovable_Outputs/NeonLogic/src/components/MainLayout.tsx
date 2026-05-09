import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <header
            className="h-12 flex items-center border-b border-border px-4 sticky top-0 z-50 bg-background/80 backdrop-blur-md"
            role="banner"
          >
            <SidebarTrigger
              className="text-muted-foreground hover:text-primary"
              aria-label="Toggle navigation sidebar"
            />
            <span className="ml-4 text-xs text-muted-foreground uppercase tracking-widest" aria-hidden="true">
              NeonLogic // Live
            </span>
            <div className="ml-auto flex items-center gap-2" aria-live="polite">
              <span className="h-2 w-2 rounded-full bg-accent animate-pulse-glow" aria-hidden="true" />
              <span className="text-xs text-muted-foreground">Online</span>
            </div>
          </header>
          <main id="main-content" className="flex-1 overflow-y-auto" role="main">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
