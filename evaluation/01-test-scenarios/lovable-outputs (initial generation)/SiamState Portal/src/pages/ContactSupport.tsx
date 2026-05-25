import { useState, useId } from "react";
import Layout from "@/components/Layout";
import { Mail, MapPin, Send } from "lucide-react";

const emergencyContacts = [
  { service: "Police", number: "911", available: "24/7" },
  { service: "Fire Department", number: "912", available: "24/7" },
  { service: "Medical Emergency", number: "913", available: "24/7" },
  { service: "Environmental Hazard", number: "914", available: "Mon–Fri 8am–6pm" },
];

export default function ContactSupport() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const nameId = useId();
  const emailId = useId();
  const msgId = useId();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <Layout
      title="Contact & Support — SiamState Portal"
      description="Get in touch with SiamState government services. Find emergency contact numbers and submit inquiries."
    >
      <section className="container py-12 max-w-3xl">
        <h1 className="text-4xl font-extrabold text-foreground mb-1">Contact &amp; Support</h1>
        <div className="h-1 w-24 bg-secondary rounded mb-10" aria-hidden="true" />

        {/* Inquiry Form */}
        <div className="bg-card border rounded-lg p-8 mb-10">
          <h2 className="text-xl font-bold text-foreground mb-6">Send an Inquiry</h2>
          {submitted ? (
            <p className="text-dept-environment font-semibold" role="status">Thank you! Your inquiry has been submitted.</p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <div>
                <label htmlFor={nameId} className="block text-sm font-semibold text-foreground mb-1">Name</label>
                <input
                  id={nameId}
                  required
                  maxLength={100}
                  autoComplete="name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full rounded-md border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-primary"
                />
              </div>
              <div>
                <label htmlFor={emailId} className="block text-sm font-semibold text-foreground mb-1">Email</label>
                <input
                  id={emailId}
                  required
                  type="email"
                  maxLength={255}
                  autoComplete="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full rounded-md border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-primary"
                />
              </div>
              <div>
                <label htmlFor={msgId} className="block text-sm font-semibold text-foreground mb-1">Message</label>
                <textarea
                  id={msgId}
                  required
                  maxLength={1000}
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full rounded-md border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-primary resize-none"
                />
              </div>
              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-2.5 rounded-md bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              >
                <Send className="h-4 w-4" aria-hidden="true" /> Submit
              </button>
            </form>
          )}
        </div>

        {/* Emergency Table */}
        <div className="mb-10">
          <h2 className="text-xl font-bold text-foreground mb-4">Emergency Contacts</h2>
          <div className="overflow-x-auto rounded-lg border">
            <table className="w-full text-sm" aria-label="Emergency contact numbers">
              <thead>
                <tr className="bg-primary text-primary-foreground">
                  <th scope="col" className="text-left px-4 py-3 font-semibold">Service</th>
                  <th scope="col" className="text-left px-4 py-3 font-semibold">Number</th>
                  <th scope="col" className="text-left px-4 py-3 font-semibold">Availability</th>
                </tr>
              </thead>
              <tbody>
                {emergencyContacts.map((c, i) => (
                  <tr key={c.service} className={i % 2 === 0 ? "bg-card" : "bg-muted"}>
                    <td className="px-4 py-3 font-medium text-foreground">{c.service}</td>
                    <td className="px-4 py-3 font-bold text-foreground">
                      <a href={`tel:${c.number}`} className="underline hover:text-primary focus:outline-none focus:ring-2 focus:ring-ring rounded">
                        {c.number}
                      </a>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{c.available}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Support Info */}
        <address className="space-y-3 text-sm text-muted-foreground not-italic">
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4" aria-hidden="true" />
            <a href="mailto:support@siamstate.gov" className="underline hover:text-primary focus:outline-none focus:ring-2 focus:ring-ring rounded">support@siamstate.gov</a>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" aria-hidden="true" />
            <span>100 Government Plaza, SiamState Capital, SC 10100</span>
          </div>
        </address>
      </section>
    </Layout>
  );
}
