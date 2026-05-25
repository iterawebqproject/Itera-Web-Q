import { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import SkipToContent from "@/components/SkipToContent";

const Index = lazy(() => import("./pages/Index"));
const ArtPage = lazy(() => import("./pages/ArtPage"));
const EventPage = lazy(() => import("./pages/EventPage"));
const ArtistPage = lazy(() => import("./pages/ArtistPage"));
const GalleryMuseumPage = lazy(() => import("./pages/GalleryMuseumPage"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SkipToContent />
        <Header />
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><p className="text-muted-foreground text-sm">Loading…</p></div>}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/art" element={<ArtPage />} />
            <Route path="/event" element={<EventPage />} />
            <Route path="/artist" element={<ArtistPage />} />
            <Route path="/gallery-museum" element={<GalleryMuseumPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
        <Footer />
        <ScrollToTop />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
