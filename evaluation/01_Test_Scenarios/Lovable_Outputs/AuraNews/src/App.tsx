import { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { SkipToContent } from "@/components/SkipToContent";

const Index = lazy(() => import("./pages/Index"));
const HealthCategory = lazy(() => import("./pages/HealthCategory"));
const HealthContent = lazy(() => import("./pages/HealthContent"));
const CultureCategory = lazy(() => import("./pages/CultureCategory"));
const CultureContent = lazy(() => import("./pages/CultureContent"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <SkipToContent />
          <Suspense fallback={<div className="flex min-h-screen items-center justify-center"><div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" role="status" aria-label="Loading page" /></div>}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/health" element={<HealthCategory />} />
              <Route path="/health/article" element={<HealthContent />} />
              <Route path="/culture" element={<CultureCategory />} />
              <Route path="/culture/article" element={<CultureContent />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
