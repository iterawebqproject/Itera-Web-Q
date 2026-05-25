import { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import ErrorBoundary from "@/components/ErrorBoundary";

const Index = lazy(() => import("./pages/Index"));
const Budget2026 = lazy(() => import("./pages/Budget2026"));
const NationalDayRally2025 = lazy(() => import("./pages/NationalDayRally2025"));
const FactFeed = lazy(() => import("./pages/FactFeed"));
const FactDetail = lazy(() => import("./pages/FactDetail"));
const AboutUs = lazy(() => import("./pages/AboutUs"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen" role="status" aria-label="Loading page">
    <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <BrowserRouter>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/budget-2026" element={<Budget2026 />} />
              <Route path="/national-day-rally-2025" element={<NationalDayRally2025 />} />
              <Route path="/factually-checkpulse" element={<FactFeed title="Factually CheckPulse" />} />
              <Route path="/corrections-and-clarifications" element={<FactFeed title="Corrections & Clarifications" />} />
              <Route path="/fact-detail/:id" element={<FactDetail />} />
              <Route path="/about-us" element={<AboutUs />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
