import { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { HelmetProvider } from "react-helmet-async";

const Index = lazy(() => import("./pages/Index"));
const Topics = lazy(() => import("./pages/Topics"));
const ArticlePage = lazy(() => import("./pages/ArticlePage"));
const About = lazy(() => import("./pages/About"));
const Archive = lazy(() => import("./pages/Archive"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <p className="font-body text-muted-foreground animate-pulse">Loading doodle…</p>
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
              <Route path="/topics" element={<Topics />} />
              <Route path="/article/:id" element={<ArticlePage />} />
              <Route path="/about" element={<About />} />
              <Route path="/archive" element={<Archive />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
