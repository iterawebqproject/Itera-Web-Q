import { useState, useId } from "react";
import { Search, ChevronDown, FileText, Headphones } from "lucide-react";
import SEOHead from "@/components/SEOHead";

const faqs = [
  { q: "What industries do ATech products serve?", a: "Our solutions are used across finance, healthcare, manufacturing, logistics, and government sectors. Each product is designed to meet strict enterprise compliance and performance standards." },
  { q: "How does the CyberShield platform differ from competitors?", a: "CyberShield combines real-time threat detection with automated incident response and ISO-certified encryption. Unlike point solutions, it provides a unified security dashboard across all enterprise endpoints." },
  { q: "Can I integrate ATech products with existing infrastructure?", a: "Yes. All ATech products are designed with open APIs and support integration with major enterprise platforms including AWS, Azure, GCP, Salesforce, and SAP." },
  { q: "What support tiers are available?", a: "We offer Standard (email support, 24h response), Premium (phone + email, 4h response), and Enterprise (dedicated account manager, 1h response with on-site options)." },
  { q: "How do I request a product demo?", a: "You can request a demo through the product page or by contacting our sales team at demos@atech-solutions.com. We typically schedule demos within 48 hours of request." },
  { q: "What is the pricing model for CloudStack Pro?", a: "CloudStack Pro uses a consumption-based pricing model with committed-use discounts available for annual contracts. Contact our sales team for a tailored quote." },
  { q: "Does ATech offer training and certification?", a: "Yes. ATech Academy provides self-paced and instructor-led courses for all products, with professional certifications recognized across the industry." },
];

const ProductFAQ = () => {
  const [search, setSearch] = useState("");
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const searchId = useId();

  const filtered = faqs.filter(
    (f) =>
      f.q.toLowerCase().includes(search.toLowerCase()) ||
      f.a.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <SEOHead title="FAQ" description="Find answers to frequently asked questions about ATech Solutions products and services." />

      {/* Search */}
      <section className="container pt-16 pb-8">
        <h1 className="text-3xl md:text-5xl font-bold mb-8">Product FAQ</h1>
        <div className="relative max-w-xl">
          <label htmlFor={searchId} className="sr-only">Search questions</label>
          <Search size={18} className="absolute left-0 top-3 text-muted-foreground" aria-hidden="true" />
          <input
            id={searchId}
            type="search"
            placeholder="Search questions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-7 pr-4 py-3 bg-transparent border-b-2 border-border focus:border-primary outline-none text-foreground placeholder:text-muted-foreground transition-colors"
          />
        </div>
      </section>

      {/* FAQ List */}
      <section className="container pb-20" aria-label="Frequently asked questions">
        <dl className="max-w-2xl divide-y">
          {filtered.map((f, i) => {
            const isOpen = openIndex === i;
            const answerId = `faq-answer-${i}`;
            return (
              <div key={f.q}>
                <dt>
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={answerId}
                    className="w-full flex items-center justify-between py-5 text-left focus-visible:outline-2 focus-visible:outline-primary"
                  >
                    <span className="font-medium pr-4">{f.q}</span>
                    <ChevronDown
                      size={18}
                      aria-hidden="true"
                      className={`shrink-0 text-muted-foreground transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                </dt>
                <dd
                  id={answerId}
                  role="region"
                  className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-60 pb-5" : "max-h-0"}`}
                >
                  <p className="text-sm text-muted-foreground leading-relaxed">{f.a}</p>
                </dd>
              </div>
            );
          })}
          {filtered.length === 0 && (
            <p className="py-8 text-muted-foreground" role="status">No results found. Try a different search term.</p>
          )}
        </dl>
      </section>

      {/* Support Footer */}
      <section className="bg-dust py-16" aria-label="Support options">
        <div className="container grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">
          <div className="bg-card p-8 border text-center">
            <FileText size={28} className="mx-auto mb-4 text-primary" aria-hidden="true" />
            <h2 className="font-bold mb-2">Technical Docs</h2>
            <p className="text-sm text-muted-foreground">Access comprehensive API references, guides, and integration documentation.</p>
          </div>
          <div className="bg-card p-8 border text-center">
            <Headphones size={28} className="mx-auto mb-4 text-primary" aria-hidden="true" />
            <h2 className="font-bold mb-2">Contact Support</h2>
            <p className="text-sm text-muted-foreground">Reach our dedicated support team for assistance with any product or service inquiry.</p>
          </div>
        </div>
      </section>

      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        }}
      />
    </div>
  );
};

export default ProductFAQ;
