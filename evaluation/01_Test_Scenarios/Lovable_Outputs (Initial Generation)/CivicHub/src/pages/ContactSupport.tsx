import { Phone, MessageCircle, MapPin, Send } from "lucide-react";
import { useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { usePageTitle } from "@/hooks/usePageTitle";

const supportCards = [
  { icon: Phone, label: "Call Us", desc: "Mon–Fri, 8am–6pm", detail: "+1 (555) 100-2000", color: "text-civic-success" },
  { icon: MessageCircle, label: "Live Chat", desc: "Available 24/7", detail: "Start a conversation", color: "text-civic-info" },
  { icon: MapPin, label: "Office Locations", desc: "Visit in person", detail: "Find nearest office", color: "text-civic-warning" },
];

const faqs = [
  { q: "How do I reset my CivicHub password?", a: "Go to the login page and click 'Forgot Password.' Enter your registered email to receive a reset link." },
  { q: "How long does an application take to process?", a: "Most applications are processed within 5–10 business days. Complex cases may take up to 30 days." },
  { q: "Can I track my application status online?", a: "Yes! Log in to your User Portal and check the 'Application Status' section for real-time updates." },
  { q: "What do I do if my document upload fails?", a: "Ensure your file is under 10MB and in PDF, JPG, or PNG format. Clear your browser cache and retry." },
  { q: "How do I update my personal information?", a: "Visit your User Portal settings or contact support with valid identification documents." },
];

const ContactSupport = () => {
  const [form, setForm] = useState({ name: "", email: "", topic: "", message: "" });
  usePageTitle("Contact & Support — CivicHub");

  return (
    <div>
      <section className="civic-section" aria-label="Support channels">
        <div className="civic-container">
          <h1 className="text-3xl font-bold text-foreground mb-2 text-center">Contact & Support</h1>
          <p className="text-muted-foreground text-center mb-10">We're here to help. Choose how you'd like to reach us.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {supportCards.map((card) => (
              <article key={card.label} className="civic-card flex flex-col items-center text-center gap-3">
                <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center">
                  <card.icon size={28} className={card.color} aria-hidden="true" />
                </div>
                <h3 className="font-bold text-foreground text-lg">{card.label}</h3>
                <p className="text-sm text-muted-foreground">{card.desc}</p>
                <span className="text-sm font-medium text-primary">{card.detail}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-secondary py-16" aria-label="Send an inquiry">
        <div className="civic-container max-w-2xl">
          <h2 className="text-2xl font-bold text-secondary-foreground mb-8 text-center">Send Us a Message</h2>
          <form className="bg-card border border-border rounded-2xl p-8 space-y-5" onSubmit={(e) => e.preventDefault()} noValidate>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="contact-name" className="block text-sm font-medium text-foreground mb-1.5">Name</label>
                <input
                  id="contact-name"
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Your full name"
                  autoComplete="name"
                  required
                />
              </div>
              <div>
                <label htmlFor="contact-email" className="block text-sm font-medium text-foreground mb-1.5">Email</label>
                <input
                  id="contact-email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm outline-none focus:ring-2 focus:ring-primary"
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                />
              </div>
            </div>
            <div>
              <label htmlFor="contact-topic" className="block text-sm font-medium text-foreground mb-1.5">Topic</label>
              <select
                id="contact-topic"
                value={form.topic}
                onChange={(e) => setForm({ ...form, topic: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm outline-none focus:ring-2 focus:ring-primary"
                required
              >
                <option value="">Select a topic</option>
                <option value="application">Application Status</option>
                <option value="documents">Documents</option>
                <option value="account">Account Issue</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label htmlFor="contact-message" className="block text-sm font-medium text-foreground mb-1.5">Message</label>
              <textarea
                id="contact-message"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                rows={4}
                className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm outline-none focus:ring-2 focus:ring-primary resize-none"
                placeholder="How can we help you?"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover-scale flex items-center justify-center gap-2"
            >
              <Send size={16} aria-hidden="true" /> Submit Inquiry
            </button>
          </form>
        </div>
      </section>

      <section className="civic-section" aria-label="Frequently asked questions">
        <div className="civic-container max-w-3xl">
          <h2 className="text-2xl font-bold text-foreground mb-8 text-center">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="bg-card rounded-lg border border-border px-6">
                <AccordionTrigger className="text-foreground font-medium text-left">{faq.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </div>
  );
};

export default ContactSupport;
