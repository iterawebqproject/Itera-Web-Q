import { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import ErrorBoundary from "@/components/ErrorBoundary";
import SkipToContent from "@/components/SkipToContent";
import Index from "./pages/Index.tsx";

const PeopleOfTheYear = lazy(() => import("./pages/PeopleOfTheYear.tsx"));
const WinnerProfileDetail = lazy(() => import("./pages/WinnerProfileDetail.tsx"));
const Olympics2026 = lazy(() => import("./pages/Olympics2026.tsx"));
const Author = lazy(() => import("./pages/Author.tsx"));
const AboutUs = lazy(() => import("./pages/AboutUs.tsx"));
const NotFound = lazy(() => import("./pages/NotFound.tsx"));

const queryClient = new QueryClient();

const PageLoader = () => (
  <div className="flex min-h-screen items-center justify-center bg-background">
    <p className="font-body text-sm text-muted-foreground animate-pulse">Loading…</p>
  </div>
);

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <ErrorBoundary>
          <BrowserRouter>
            <SkipToContent />
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/people-of-the-year" element={<PeopleOfTheYear />} />
                <Route path="/winner-profile-detail" element={<WinnerProfileDetail />} />
                <Route path="/olympics-2026" element={<Olympics2026 />} />
                <Route path="/author" element={<Author />} />
                <Route path="/about-us" element={<AboutUs />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </ErrorBoundary>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
