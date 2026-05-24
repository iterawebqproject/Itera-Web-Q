import { useState } from "react";
import { Mail, Phone, MapPin, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import { toast } from "sonner";

const contactInfo = [
  { icon: Mail, label: "Email", value: "members@eliteaccess.com" },
  { icon: Phone, label: "Direct Line", value: "+1 (800) 555-0199" },
  { icon: MapPin, label: "Headquarters", value: "200 Park Avenue, New York, NY 10166" },
];

const offices = [
  { city: "New York", address: "200 Park Avenue, NY 10166" },
  { city: "London", address: "1 Canada Square, Canary Wharf, E14 5AB" },
  { city: "Singapore", address: "1 Raffles Place, #30-01, 048616" },
];

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const Contact = () => {
  const [form, setForm] = useState<ContactForm>({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Partial<Record<keyof ContactForm, string>>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Partial<Record<keyof ContactForm, string>> = {};
    if (!form.name.trim()) errs.name = "Required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) errs.email = "Valid email required";
    if (!form.subject.trim()) errs.subject = "Required";
    if (!form.message.trim()) errs.message = "Required";
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    toast.success("Inquiry submitted! We'll respond within 24 hours.");
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  const update = (field: keyof ContactForm, value: string) => {
    setForm((p) => ({ ...p, [field]: value }));
    setErrors((p) => ({ ...p, [field]: "" }));
  };

  const Field = ({ label, field, type = "text", placeholder = "" }: { label: string; field: keyof ContactForm; type?: string; placeholder?: string }) => {
    const id = `contact-${field}`;
    return (
      <div>
        <label htmlFor={id} className="mb-1 block text-sm font-medium text-foreground">{label}</label>
        {type === "textarea" ? (
          <textarea
            id={id}
            value={form[field]}
            onChange={(e) => update(field, e.target.value)}
            rows={4}
            placeholder={placeholder}
            aria-invalid={!!errors[field]}
            aria-describedby={errors[field] ? `${id}-error` : undefined}
            maxLength={1000}
            className={`w-full rounded-md border px-3 py-2.5 text-sm text-foreground bg-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring ${errors[field] ? "border-destructive" : "border-input"}`}
          />
        ) : (
          <input
            id={id}
            type={type}
            value={form[field]}
            onChange={(e) => update(field, e.target.value)}
            placeholder={placeholder}
            aria-invalid={!!errors[field]}
            aria-describedby={errors[field] ? `${id}-error` : undefined}
            maxLength={255}
            className={`w-full rounded-md border px-3 py-2.5 text-sm text-foreground bg-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring ${errors[field] ? "border-destructive" : "border-input"}`}
          />
        )}
        {errors[field] && <p id={`${id}-error`} className="mt-1 text-xs text-destructive" role="alert">{errors[field]}</p>}
      </div>
    );
  };

  return (
    <Layout>
      <SEOHead title="Contact Us" description="Get in touch with the EliteAccess team. Professional inquiry form, office locations, and support." />
      <section className="section-padding">
        <div className="container-narrow">
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold text-foreground">Get in Touch</h1>
            <p className="mt-2 text-muted-foreground">Our team is ready to assist you</p>
          </div>

          {/* Contact Info Cards */}
          <div className="mb-12 grid gap-4 sm:grid-cols-3">
            {contactInfo.map((c, i) => (
              <div key={i} className="flex items-start gap-4 rounded-xl border border-border bg-card p-6">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary" aria-hidden="true">
                  <c.icon size={18} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{c.label}</p>
                  <p className="text-sm text-muted-foreground">{c.value}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="grid gap-10 lg:grid-cols-2">
            {/* Form */}
            <div className="rounded-2xl border border-border bg-card p-8">
              <h2 className="mb-6 text-xl font-bold text-foreground">Professional Inquiry</h2>
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Name" field="name" placeholder="Your name" />
                  <Field label="Email" field="email" type="email" placeholder="you@email.com" />
                </div>
                <Field label="Subject" field="subject" placeholder="How can we help?" />
                <Field label="Message" field="message" type="textarea" placeholder="Tell us more..." />
                <Button type="submit" className="w-full">Submit</Button>
              </form>
            </div>

            {/* Offices & Support */}
            <div className="space-y-6">
              <div className="rounded-2xl border border-border bg-card p-8">
                <h2 className="mb-6 text-xl font-bold text-foreground">Office Locations</h2>
                <address className="not-italic space-y-4">
                  {offices.map((o) => (
                    <div key={o.city} className="flex items-start gap-3">
                      <MapPin size={16} className="mt-0.5 shrink-0 text-primary" aria-hidden="true" />
                      <div>
                        <p className="text-sm font-semibold text-foreground">{o.city}</p>
                        <p className="text-sm text-muted-foreground">{o.address}</p>
                      </div>
                    </div>
                  ))}
                </address>
              </div>

              <div className="rounded-2xl border border-border bg-card p-8">
                <h2 className="mb-3 text-xl font-bold text-foreground">Support Ticket</h2>
                <p className="mb-4 text-sm text-muted-foreground">Already a member? Check your support ticket status.</p>
                <Button variant="outline" className="gap-2">
                  <ExternalLink size={14} aria-hidden="true" />
                  View Ticket Status
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
