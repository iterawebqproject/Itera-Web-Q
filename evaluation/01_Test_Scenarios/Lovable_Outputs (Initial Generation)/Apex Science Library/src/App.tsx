import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { SkipToContent } from "@/components/SkipToContent";
import { lazy, Suspense } from "react";

const Index = lazy(() => import("./pages/Index"));
const SubjectPage = lazy(() => import("./pages/SubjectPage"));
const TopicPage = lazy(() => import("./pages/TopicPage"));
const TopicOutlinePage = lazy(() => import("./pages/TopicOutlinePage"));
const TopicContentPage = lazy(() => import("./pages/TopicContentPage"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-background" role="status" aria-label="Loading page">
    <div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
    <span className="sr-only">Loading…</span>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ErrorBoundary>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <SkipToContent />
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/subject/:subjectId" element={<SubjectPage />} />
              <Route path="/topic/:topicId" element={<TopicPage />} />
              <Route path="/topic-outline/:topicId" element={<TopicOutlinePage />} />
              <Route path="/topic-content/:topicId/:sessionId" element={<TopicContentPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </ErrorBoundary>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
