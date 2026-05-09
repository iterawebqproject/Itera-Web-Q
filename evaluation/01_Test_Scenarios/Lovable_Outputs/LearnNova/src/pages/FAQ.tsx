import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { faqData } from "@/data/courses";

const FAQ = () => {
  const [search, setSearch] = useState("");

  const filtered = useMemo(
    () => faqData.filter((f) => !search || f.q.toLowerCase().includes(search.toLowerCase()) || f.a.toLowerCase().includes(search.toLowerCase())),
    [search]
  );

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1 container py-10 max-w-2xl mx-auto" id="main-content">
        <h1 className="font-heading text-3xl font-bold text-center mb-2">Frequently Asked Questions</h1>
        <p className="text-muted-foreground text-center mb-8">Find answers to common questions about LearnNova.</p>

        {/* Search */}
        <div className="relative mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" aria-hidden="true" />
          <label htmlFor="faq-search" className="sr-only">Search questions</label>
          <input
            id="faq-search"
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search questions..."
            className="w-full pl-12 pr-4 py-3 rounded-lg border bg-card text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        {filtered.length === 0 && (
          <p className="text-muted-foreground text-sm text-center py-8" role="status">No questions match your search.</p>
        )}

        <Accordion type="single" collapsible className="space-y-2">
          {filtered.map((item, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border border-border rounded-lg px-4">
              <AccordionTrigger className="text-left font-medium text-foreground hover:no-underline">{item.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-sm">{item.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </main>
      <SiteFooter />
    </div>
  );
};

export default FAQ;
