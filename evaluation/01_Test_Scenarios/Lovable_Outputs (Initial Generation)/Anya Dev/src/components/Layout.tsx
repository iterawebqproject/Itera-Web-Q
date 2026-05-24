import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <header className="h-12 flex items-center border-b border-border px-4 md:hidden">
            <SidebarTrigger aria-label="Toggle navigation menu" />
          </header>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:top-2 focus:left-2 focus:px-4 focus:py-2 focus:bg-secondary focus:text-secondary-foreground focus:rounded-md"
          >
            Skip to main content
          </a>
          <main id="main-content" className="flex-1 overflow-y-auto" role="main">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
