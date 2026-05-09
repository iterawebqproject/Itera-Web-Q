import { Mail } from "lucide-react";
import { useState } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const socials = [
  { label: "Instagram", href: "#" },
  { label: "LinkedIn", href: "#" },
  { label: "Pinterest", href: "#" },
];

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Message sent", description: "Thank you for reaching out! Alice will be in touch soon." });
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <main id="main-content" className="pt-24 pb-16">
      <SEOHead title="Contact" description="Get in touch with Alice — let's grow together through coaching, wellness, and self-love." />
      <div className="container max-w-xl px-6">
        <ScrollReveal>
          <div className="text-center mb-16">
            <Mail className="w-10 h-10 text-primary mx-auto mb-4" strokeWidth={1.2} aria-hidden="true" />
            <h1 className="font-heading text-4xl md:text-5xl mb-3">Let's Grow Together</h1>
            <p className="text-muted-foreground">I'd love to hear from you.</p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <form onSubmit={handleSubmit} className="space-y-8" aria-label="Contact form">
            {(["name", "email", "message"] as const).map((field) => (
              <div key={field}>
                <label htmlFor={`contact-${field}`} className="text-xs tracking-widest uppercase text-muted-foreground block mb-2">
                  {field}
                </label>
                {field === "message" ? (
                  <textarea
                    id={`contact-${field}`}
                    value={form[field]}
                    onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                    required
                    rows={4}
                    className="w-full bg-transparent border-b border-border focus:border-primary outline-none text-foreground py-2 resize-none transition-colors"
                  />
                ) : (
                  <input
                    id={`contact-${field}`}
                    type={field === "email" ? "email" : "text"}
                    value={form[field]}
                    onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                    required
                    className="w-full bg-transparent border-b border-border focus:border-primary outline-none text-foreground py-2 transition-colors"
                  />
                )}
              </div>
            ))}
            <Button type="submit" className="w-full tracking-widest uppercase text-xs py-6">
              Send Message
            </Button>
          </form>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <nav className="flex items-center justify-center gap-8 mt-16" aria-label="Social media links">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm tracking-widest text-muted-foreground hover:text-primary transition-colors relative pb-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-primary after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100"
              >
                {s.label}
              </a>
            ))}
          </nav>
        </ScrollReveal>
      </div>
    </main>
  );
};

export default Contact;
