import { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ErrorBoundary from "./components/ErrorBoundary";
import SkipToContent from "./components/SkipToContent";
import Index from "./pages/Index";

const AllProducts = lazy(() => import("./pages/AllProducts"));
const HowToUse = lazy(() => import("./pages/HowToUse"));
const Recipes = lazy(() => import("./pages/Recipes"));
const OurStory = lazy(() => import("./pages/OurStory"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[50vh]">
    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" role="status">
      <span className="sr-only">Loading page…</span>
    </div>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ErrorBoundary>
          <SkipToContent />
          <div className="flex flex-col min-h-screen">
            <Header />
            <main id="main-content" className="flex-1">
              <Suspense fallback={<PageLoader />}>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/all-products" element={<AllProducts />} />
                  <Route path="/how-to-use" element={<HowToUse />} />
                  <Route path="/recipes" element={<Recipes />} />
                  <Route path="/our-story" element={<OurStory />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </main>
            <Footer />
          </div>
        </ErrorBoundary>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
