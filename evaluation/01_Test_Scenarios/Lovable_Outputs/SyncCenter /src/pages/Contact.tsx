import { Mail, MessageCircle, Phone } from "lucide-react";
import { useState } from "react";
import Layout from "@/components/Layout";

const supportOptions = [
  { icon: Mail, title: "Email Support", description: "Get a response within 24 hours.", action: "support@synccenter.com" },
  { icon: MessageCircle, title: "Live Chat", description: "Chat with us during business hours.", action: "Start Chat" },
  { icon: Phone, title: "Phone Call", description: "Speak directly with our team.", action: "+1 (800) 555-0199" },
];

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  return (
    <Layout title="Contact Support" description="Reach out to the SyncCenter support team via email, chat, or phone.">
      <section className="container py-16" aria-labelledby="contact-heading">
        <h1 id="contact-heading" className="text-3xl font-heading font-bold text-center mb-10">Get in Touch</h1>

        {/* Support Options */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16" role="list" aria-label="Support channels">
          {supportOptions.map((opt) => (
            <div key={opt.title} className="rounded-lg border bg-card p-6 text-center" role="listitem">
              <div className="mx-auto mb-4 w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
                <opt.icon className="h-5 w-5 text-primary" aria-hidden="true" />
              </div>
              <h3 className="font-heading font-semibold mb-1">{opt.title}</h3>
              <p className="text-sm text-muted-foreground mb-3">{opt.description}</p>
              <span className="text-sm font-medium text-primary">{opt.action}</span>
            </div>
          ))}
        </div>

        {/* Contact Form */}
        <div className="max-w-lg mx-auto">
          <h2 className="text-2xl font-heading font-semibold mb-6 text-center">Send Us a Message</h2>
          {submitted ? (
            <div className="rounded-lg bg-secondary p-8 text-center" role="status" aria-live="polite">
              <p className="font-medium text-foreground">Thank you! We'll get back to you soon.</p>
            </div>
          ) : (
            <form
              onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
              className="space-y-4"
              noValidate
            >
              <div>
                <label htmlFor="contact-name" className="sr-only">Name</label>
                <input
                  id="contact-name"
                  required
                  type="text"
                  placeholder="Name"
                  autoComplete="name"
                  className="w-full rounded-md border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div>
                <label htmlFor="contact-email" className="sr-only">Email</label>
                <input
                  id="contact-email"
                  required
                  type="email"
                  placeholder="Email"
                  autoComplete="email"
                  className="w-full rounded-md border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div>
                <label htmlFor="contact-topic" className="sr-only">Topic</label>
                <select
                  id="contact-topic"
                  required
                  className="w-full rounded-md border bg-card px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  defaultValue=""
                >
                  <option value="" disabled>Select a topic</option>
                  <option>Account</option>
                  <option>Billing</option>
                  <option>Technical Issue</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label htmlFor="contact-message" className="sr-only">Message</label>
                <textarea
                  id="contact-message"
                  required
                  placeholder="Message"
                  rows={4}
                  className="w-full rounded-md border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-md bg-primary text-primary-foreground py-3 font-semibold hover:bg-primary/90 transition-colors"
              >
                Send Message
              </button>
            </form>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
