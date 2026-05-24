import { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import ErrorBoundary from "@/components/ErrorBoundary";

const Index = lazy(() => import("./pages/Index"));
const HistoryOfMatcha = lazy(() => import("./pages/HistoryOfMatcha"));
const OriginRegionsJapan = lazy(() => import("./pages/OriginRegionsJapan"));
const MatchaTypesAndAroma = lazy(() => import("./pages/MatchaTypesAndAroma"));
const BrewingMethods = lazy(() => import("./pages/BrewingMethods"));
const RecipesIndex = lazy(() => import("./pages/RecipesIndex"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const Loading = () => (
  <div className="flex min-h-screen items-center justify-center">
    <div className="font-body text-muted-foreground animate-pulse">Loading…</div>
  </div>
);

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ErrorBoundary>
            <Suspense fallback={<Loading />}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/history-of-matcha" element={<HistoryOfMatcha />} />
                <Route path="/origin-regions-japan" element={<OriginRegionsJapan />} />
                <Route path="/matcha-types-and-aroma" element={<MatchaTypesAndAroma />} />
                <Route path="/brewing-methods" element={<BrewingMethods />} />
                <Route path="/recipes-index" element={<RecipesIndex />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </ErrorBoundary>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
