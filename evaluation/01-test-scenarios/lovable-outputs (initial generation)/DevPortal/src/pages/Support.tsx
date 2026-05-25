import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Link } from "react-router-dom";
import { Search, Server, UserCog, Shield, CreditCard, ArrowRight } from "lucide-react";
import { useState } from "react";
import PageMeta from "@/components/PageMeta";

const categories = [
  { title: "Infrastructure", icon: Server, description: "Servers, deployments, uptime", articles: 24, slug: "infrastructure" },
  { title: "Account", icon: UserCog, description: "Users, permissions, SSO", articles: 18, slug: "account" },
  { title: "Security", icon: Shield, description: "Auth, encryption, compliance", articles: 16, slug: "security" },
  { title: "Billing", icon: CreditCard, description: "Plans, invoices, payments", articles: 12, slug: "billing" },
];

const faqs = [
  { q: "How do I reset my API key?", a: "Navigate to Settings → API Keys → Regenerate. Your old key will be invalidated immediately." },
  { q: "What are the rate limits?", a: "Free tier: 100 req/min. Pro: 1,000 req/min. Enterprise: Custom. See our API Reference for details." },
  { q: "How do I enable two-factor authentication?", a: "Go to Account → Security → Enable 2FA. We support TOTP apps and hardware keys." },
  { q: "Can I downgrade my plan?", a: "Yes, downgrades take effect at the end of your current billing cycle. No data is lost." },
];

const troubleshootingSteps = [
  { step: "Identify the error code from your logs or API response", link: "/api-reference" },
  { step: "Search our knowledge base for the specific error", link: "/support" },
  { step: "Follow the recommended resolution steps", link: "/support/getting-started" },
  { step: "If unresolved, submit a support ticket", link: "/contact" },
];

export default function SupportPage() {
  const [search, setSearch] = useState("");

  const filteredFaqs = faqs.filter(
    (f) =>
      f.q.toLowerCase().includes(search.toLowerCase()) ||
      f.a.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 lg:p-10 max-w-5xl mx-auto space-y-10 animate-fade-in">
      <PageMeta
        title="Support Center"
        description="Browse support categories, search FAQs, and follow guided troubleshooting on DevPortal."
        path="/support"
      />

      <section aria-labelledby="support-heading" className="space-y-2">
        <h1 id="support-heading" className="text-3xl font-bold tracking-tight">Support Center</h1>
        <p className="text-muted-foreground">
          Browse categories, search FAQs, or follow our troubleshooting guide.
        </p>
      </section>

      {/* Category Grid */}
      <section aria-labelledby="categories-heading" className="space-y-4">
        <h2 id="categories-heading" className="text-xl font-semibold">Categories</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((cat) => (
            <Link key={cat.slug} to={`/support/${cat.slug}`}>
              <Card className="h-full hover:border-primary/30 hover:shadow-md transition-all cursor-pointer group">
                <CardHeader className="pb-2">
                  <cat.icon className="h-6 w-6 text-primary mb-2" aria-hidden="true" />
                  <CardTitle className="text-base">{cat.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{cat.description}</p>
                  <p className="text-xs text-muted-foreground mt-2">{cat.articles} articles</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Search + FAQ */}
      <section aria-labelledby="faq-heading" className="space-y-4">
        <h2 id="faq-heading" className="text-xl font-semibold">Frequently Asked Questions</h2>
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" aria-hidden="true" />
          <label htmlFor="faq-search" className="sr-only">Search frequently asked questions</label>
          <Input
            id="faq-search"
            placeholder="Search FAQs..."
            className="pl-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Accordion type="multiple" className="space-y-2">
          {filteredFaqs.map((faq, i) => (
            <AccordionItem key={i} value={`faq-${i}`} className="border rounded-lg px-4">
              <AccordionTrigger className="text-sm font-medium hover:no-underline">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
          {filteredFaqs.length === 0 && (
            <p className="text-sm text-muted-foreground py-4" role="status">No matching FAQs found.</p>
          )}
        </Accordion>
      </section>

      {/* Guided Troubleshooting */}
      <section aria-labelledby="troubleshoot-heading" className="space-y-4">
        <h2 id="troubleshoot-heading" className="text-xl font-semibold">Guided Troubleshooting</h2>
        <ol className="space-y-3">
          {troubleshootingSteps.map((item, i) => (
            <li key={i}>
              <Link to={item.link}>
                <div className="flex items-center gap-4 rounded-lg border bg-card p-4 hover:border-primary/20 transition-colors group">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold" aria-hidden="true">
                    {i + 1}
                  </span>
                  <p className="text-sm flex-1">{item.step}</p>
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" aria-hidden="true" />
                </div>
              </Link>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
