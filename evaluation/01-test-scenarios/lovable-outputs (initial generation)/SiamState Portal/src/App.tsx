import { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

const Index = lazy(() => import("./pages/Index"));
const EnvironmentHub = lazy(() => import("./pages/EnvironmentHub"));
const HealthServices = lazy(() => import("./pages/HealthServices"));
const EmploymentHub = lazy(() => import("./pages/EmploymentHub"));
const ContactSupport = lazy(() => import("./pages/ContactSupport"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[50vh]" role="status" aria-label="Loading page">
      <div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      <span className="sr-only">Loading…</span>
    </div>
  );
}

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/environment-hub" element={<EnvironmentHub />} />
              <Route path="/health-services" element={<HealthServices />} />
              <Route path="/employment-hub" element={<EmploymentHub />} />
              <Route path="/contact-support" element={<ContactSupport />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
