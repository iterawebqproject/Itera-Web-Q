import { Search } from "lucide-react";
import { useState, useMemo } from "react";
import Layout from "@/components/Layout";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  { q: "How do I reset my password?", a: "Go to Settings → Security → Change Password. You'll receive an email with a reset link. Follow the instructions to set a new password." },
  { q: "Can I invite team members to my workspace?", a: "Yes! Navigate to Settings → Team and click 'Invite Member.' Enter their email address and choose a role (Admin, Editor, or Viewer)." },
  { q: "How does billing work?", a: "We bill monthly or annually depending on your plan. Invoices are sent via email and can also be viewed under Settings → Billing → Invoice History." },
  { q: "What integrations are supported?", a: "SyncCenter supports Slack, Jira, GitHub, GitLab, Google Workspace, and many more. Visit Settings → Integrations to see the full list." },
  { q: "How do I enable two-factor authentication?", a: "Go to Settings → Security → Two-Factor Authentication and follow the setup wizard. We support authenticator apps and SMS codes." },
  { q: "Is my data encrypted?", a: "Absolutely. All data is encrypted at rest (AES-256) and in transit (TLS 1.3). We undergo annual SOC 2 audits." },
  { q: "How can I export my data?", a: "Navigate to Settings → Data Management → Export. You can download your data as a CSV or JSON file at any time." },
  { q: "What happens if I cancel my subscription?", a: "Your workspace remains accessible in read-only mode for 30 days after cancellation. After that, data is permanently deleted unless you reactivate." },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const FAQ = () => {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const term = search.toLowerCase();
    return faqs.filter(
      (f) =>
        f.q.toLowerCase().includes(term) ||
        f.a.toLowerCase().includes(term)
    );
  }, [search]);

  return (
    <Layout title="FAQ" description="Find answers to common questions about SyncCenter accounts, billing, security, and more.">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <section className="container py-16 max-w-2xl" aria-labelledby="faq-heading">
        <h1 id="faq-heading" className="text-3xl font-heading font-bold text-center mb-8">Frequently Asked Questions</h1>

        {/* Search */}
        <div className="relative mb-10">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" aria-hidden="true" />
          <label htmlFor="faq-search" className="sr-only">Search frequently asked questions</label>
          <input
            id="faq-search"
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search FAQ…"
            className="w-full rounded-md border bg-card pl-11 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        {/* Accordions — type="single" ensures only one open at a time */}
        <Accordion type="single" collapsible className="space-y-2">
          {filtered.map((f, i) => (
            <AccordionItem key={i} value={`faq-${i}`} className="border rounded-lg px-4">
              <AccordionTrigger className="text-left font-medium text-foreground hover:no-underline">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
          {filtered.length === 0 && (
            <p className="text-center text-muted-foreground py-8" role="status" aria-live="polite">No results found. Try a different search term.</p>
          )}
        </Accordion>
      </section>
    </Layout>
  );
};

export default FAQ;
