import { useState } from "react";
import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import { MessageSquare, Handshake, Camera } from "lucide-react";
import { toast } from "sonner";

const topicCards = [
  { icon: MessageSquare, title: "Recipe Help", desc: "Questions about a recipe? We're happy to help!" },
  { icon: Handshake, title: "Partnerships", desc: "Let's collaborate on something delicious." },
  { icon: Camera, title: "Media", desc: "Press inquiries and feature requests." },
];

const faqs = [
  { q: "Can I share your recipes on social media?", a: "Absolutely! Just link back to our page." },
  { q: "Do you offer vegan or gluten-free recipes?", a: "Yes! Use the category filters to find them." },
  { q: "How often do you post new recipes?", a: "We publish 2-3 new recipes every week." },
  { q: "Can I submit a recipe?", a: "We'd love that! Use the form below to reach out." },
];

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setForm({ name: "", email: "", subject: "", message: "" });
    toast.success("Message sent! We'll get back to you soon. 📧");
  };

  return (
    <Layout>
      <SEOHead
        title="Contact"
        description="Get in touch with the Yum Yum Yummy team for recipe help, partnerships, media inquiries, or just to say hi!"
        path="/contact"
      />
      <section className="container mx-auto px-4 py-16 max-w-3xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-3">
            Let's Talk Food!
          </h1>
          <p className="font-body text-muted-foreground">
            Got a question, idea, or just want to say hi? We'd love to hear from you.
          </p>
        </div>

        {/* Topic Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-16">
          {topicCards.map((card) => (
            <div
              key={card.title}
              className="bg-card border border-border rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow"
            >
              <card.icon className="mx-auto text-primary mb-3" size={28} aria-hidden="true" />
              <h3 className="font-heading text-sm font-bold text-card-foreground">{card.title}</h3>
              <p className="font-body text-xs text-muted-foreground mt-1">{card.desc}</p>
            </div>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 mb-16" aria-label="Contact form">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="contact-name" className="sr-only">Name</label>
              <input
                id="contact-name"
                type="text"
                placeholder="Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                autoComplete="name"
                className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground font-body text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label htmlFor="contact-email" className="sr-only">Email</label>
              <input
                id="contact-email"
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
                autoComplete="email"
                className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground font-body text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
          <div>
            <label htmlFor="contact-subject" className="sr-only">Subject</label>
            <input
              id="contact-subject"
              type="text"
              placeholder="Subject"
              value={form.subject}
              onChange={(e) => setForm({ ...form, subject: e.target.value })}
              required
              className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground font-body text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label htmlFor="contact-message" className="sr-only">Message</label>
            <textarea
              id="contact-message"
              placeholder="Message"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              rows={5}
              required
              className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground font-body text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            />
          </div>
          <button
            type="submit"
            className="px-8 py-3 bg-primary text-primary-foreground rounded-full font-body font-semibold text-sm hover:opacity-90 transition-opacity"
          >
            Send Message
          </button>
        </form>

        {/* FAQ */}
        <div>
          <h2 className="font-heading text-xl font-bold text-foreground mb-6 text-center">
            Quick FAQ
          </h2>
          <dl className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.q} className="bg-card border border-border rounded-lg p-4">
                <dt className="font-heading text-sm font-semibold text-card-foreground">{faq.q}</dt>
                <dd className="font-body text-sm text-muted-foreground mt-1">{faq.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
