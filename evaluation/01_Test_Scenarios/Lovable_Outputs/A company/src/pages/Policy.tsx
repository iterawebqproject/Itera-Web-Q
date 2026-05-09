import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import PageMeta from "@/components/PageMeta";

const faqs = [
  { q: "What personal data do you collect?", a: "We collect information you provide directly, such as your name, email, and contact details when you create an account, subscribe to newsletters, or apply for positions. We also collect usage data through cookies and analytics tools." },
  { q: "How do you use my data?", a: "Your data is used to provide and improve our services, personalize your experience, send relevant communications, and comply with legal obligations. We never sell your personal data to third parties." },
  { q: "How long do you retain my data?", a: "We retain your personal data for as long as necessary to fulfill the purposes for which it was collected, typically no longer than 3 years after your last interaction with us, unless longer retention is required by law." },
  { q: "Can I request deletion of my data?", a: "Yes, you have the right to request deletion of your personal data at any time by contacting our privacy team at privacy@acompany.com. We will process your request within 30 days." },
  { q: "Do you share data with third parties?", a: "We share data only with trusted service providers who help us operate our business (e.g., hosting, analytics). All third parties are bound by strict data processing agreements." },
  { q: "How do you protect my data?", a: "We implement industry-standard security measures including encryption, access controls, and regular security audits to protect your personal information from unauthorized access or disclosure." },
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

const Policy = () => (
  <main id="main-content" className="pt-20">
    <PageMeta
      title="Privacy & Policy"
      description="Read A Company's privacy policy, terms of use, and answers to frequently asked questions about data protection."
      canonical="https://vision-spotlight-72.lovable.app/policy"
    />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

    <section className="section-padding bg-secondary text-secondary-foreground">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-black text-primary-foreground mb-4">Privacy & Policy</h1>
        <p className="text-primary-foreground/70"><time dateTime="2026-04-01">Last updated: April 1, 2026</time></p>
      </div>
    </section>

    <section className="section-padding" aria-labelledby="privacy-heading">
      <div className="max-w-3xl mx-auto prose prose-lg">
        <h2 id="privacy-heading" className="section-title text-2xl">Privacy Policy</h2>
        <p className="text-muted-foreground leading-relaxed mb-6">
          At A Company, we are committed to protecting your privacy and ensuring the security of your personal information. This policy outlines how we collect, use, store, and protect your data when you interact with our websites, products, and services.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-6">
          We adhere to all applicable data protection laws, including the General Data Protection Regulation (GDPR) and the California Consumer Privacy Act (CCPA). Your trust is paramount to us, and we continuously review our practices to ensure the highest standards of data protection.
        </p>

        <h2 id="terms-heading" className="section-title text-2xl mt-12">Terms of Use</h2>
        <p className="text-muted-foreground leading-relaxed mb-6">
          By accessing and using our websites and services, you agree to be bound by these terms. All content on our platforms is protected by intellectual property laws and may not be reproduced without prior written consent.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-6">
          We reserve the right to modify these terms at any time. Continued use of our services after changes constitutes acceptance of the updated terms. For questions about these terms, please contact our legal team at legal@acompany.com.
        </p>
      </div>
    </section>

    <section className="section-padding bg-muted" aria-labelledby="faq-heading">
      <div className="max-w-3xl mx-auto">
        <h2 id="faq-heading" className="section-title text-2xl mb-8">Frequently Asked Questions</h2>
        <Accordion type="single" collapsible className="space-y-2">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`faq-${i}`} className="bg-card rounded-lg px-6 border border-border">
              <AccordionTrigger className="text-secondary font-bold text-left hover:no-underline">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  </main>
);

export default Policy;
