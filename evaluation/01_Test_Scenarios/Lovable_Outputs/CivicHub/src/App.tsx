import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import SkipToContent from "@/components/SkipToContent";
import { lazy, Suspense } from "react";

const Index = lazy(() => import("./pages/Index.tsx"));
const ServicesHub = lazy(() => import("./pages/ServicesHub.tsx"));
const GovernmentInfo = lazy(() => import("./pages/GovernmentInfo.tsx"));
const UserPortal = lazy(() => import("./pages/UserPortal.tsx"));
const ContactSupport = lazy(() => import("./pages/ContactSupport.tsx"));
const NotFound = lazy(() => import("./pages/NotFound.tsx"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="flex flex-col min-h-screen">
          <SkipToContent />
          <SiteHeader />
          <main id="main-content" className="flex-1">
            <Suspense fallback={<div className="flex-1 flex items-center justify-center p-12 text-muted-foreground">Loading…</div>}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/services-hub" element={<ServicesHub />} />
                <Route path="/government-info" element={<GovernmentInfo />} />
                <Route path="/user-portal" element={<UserPortal />} />
                <Route path="/contact-support" element={<ContactSupport />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </main>
          <SiteFooter />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
