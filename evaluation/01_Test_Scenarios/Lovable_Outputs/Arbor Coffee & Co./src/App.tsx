import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { lazy, Suspense } from "react";

const Index = lazy(() => import("./pages/Index"));
const CompanyHistory = lazy(() => import("./pages/CompanyHistory"));
const MenuPage = lazy(() => import("./pages/MenuPage"));
const CareerBenefit = lazy(() => import("./pages/CareerBenefit"));
const CareerDetail = lazy(() => import("./pages/CareerDetail"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><p className="text-muted-foreground text-sm">Loading…</p></div>}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/our-company-and-history" element={<CompanyHistory />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/career-and-benefit" element={<CareerBenefit />} />
            <Route path="/career-detail/:id" element={<CareerDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
