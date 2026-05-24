import { useParams } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useState, useId } from "react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import useDocumentTitle from "@/hooks/useDocumentTitle";

const roleData: Record<string, { title: string; location: string; type: string; responsibilities: string[]; qualifications: string[] }> = {
  "barista-lead": {
    title: "Lead Barista",
    location: "Portland, OR",
    type: "Full-Time",
    responsibilities: [
      "Lead and mentor a team of 6+ baristas",
      "Maintain quality standards for all beverages",
      "Train staff on new seasonal offerings",
      "Manage daily operations and opening/closing procedures",
      "Ensure compliance with food safety regulations",
      "Drive customer satisfaction and resolve issues",
    ],
    qualifications: [
      "3+ years of specialty coffee experience",
      "Previous leadership or supervisory role",
      "SCA certification preferred",
      "Strong communication skills",
      "Passion for sustainable sourcing",
      "Flexible schedule availability",
    ],
  },
  "sustainability-mgr": {
    title: "Sustainability Manager",
    location: "Remote",
    type: "Full-Time",
    responsibilities: [
      "Develop and execute sustainability strategy",
      "Monitor carbon footprint across operations",
      "Build partnerships with sustainable farms",
      "Report ESG metrics to stakeholders",
      "Lead internal green initiatives",
      "Collaborate with supply chain teams",
    ],
    qualifications: [
      "5+ years in sustainability or ESG roles",
      "Experience with B Corp certification",
      "Strong analytical and reporting skills",
      "Knowledge of regenerative agriculture",
      "Excellent stakeholder management",
      "Degree in environmental science or related field",
    ],
  },
};

const defaultRole = {
  title: "Open Position",
  location: "Various Locations",
  type: "Full-Time",
  responsibilities: [
    "Contribute to team goals and company mission",
    "Collaborate across departments",
    "Uphold quality and sustainability standards",
    "Participate in continuous improvement",
    "Support company culture initiatives",
    "Deliver exceptional results",
  ],
  qualifications: [
    "Relevant industry experience",
    "Strong communication skills",
    "Alignment with our values",
    "Growth mindset",
    "Team-oriented approach",
    "Passion for sustainability",
  ],
};

const CareerDetail = () => {
  const { id } = useParams();
  const role = roleData[id || ""] || defaultRole;
  const formId = useId();

  useDocumentTitle(`${role.title} — Career`, `Apply for ${role.title} at Arbor Coffee & Co. in ${role.location}. ${role.type} position.`);

  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitted, setSubmitted] = useState(false);

  const isValid = (field: string) => {
    if (field === "name") return form.name.trim().length > 1;
    if (field === "email") return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
    if (field === "message") return form.message.trim().length > 10;
    return true;
  };

  const borderClass = (field: string) => {
    if (!touched[field]) return "border-border";
    return isValid(field) ? "border-success" : "border-destructive";
  };

  const errorMsg = (field: string) => {
    if (!touched[field] || isValid(field)) return null;
    if (field === "name") return "Name must be at least 2 characters.";
    if (field === "email") return "Please enter a valid email address.";
    if (field === "message") return "Message must be at least 11 characters.";
    return null;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, email: true, message: true });
    if (isValid("name") && isValid("email") && isValid("message")) {
      setSubmitted(true);
    }
  };

  return (
    <Layout>
      <section className="py-20" aria-labelledby="role-heading">
        <div className="container max-w-3xl">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
            <div>
              <h1 id="role-heading" className="font-display text-3xl md:text-4xl font-bold text-primary">{role.title}</h1>
              <p className="text-muted-foreground mt-1">{role.location} · {role.type}</p>
            </div>
            <Button size="lg" className="gap-2 self-start" onClick={() => document.getElementById("apply-form")?.scrollIntoView({ behavior: "smooth" })}>
              Apply Now <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </section>

      {/* Responsibilities */}
      <section className="pb-16" aria-labelledby="resp-heading">
        <div className="container max-w-3xl">
          <h2 id="resp-heading" className="font-display text-2xl font-bold text-primary mb-6">Responsibilities</h2>
          <ul className="grid md:grid-cols-2 gap-x-8 gap-y-3">
            {role.responsibilities.map((r, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                <ArrowRight className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" aria-hidden="true" />
                {r}
              </li>
            ))}
          </ul>

          <h2 id="qual-heading" className="font-display text-2xl font-bold text-primary mb-6 mt-12">Qualifications</h2>
          <ul className="grid md:grid-cols-2 gap-x-8 gap-y-3" aria-labelledby="qual-heading">
            {role.qualifications.map((q, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                <ArrowRight className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" aria-hidden="true" />
                {q}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-16 border-t border-border" id="apply-form" aria-labelledby="apply-heading">
        <div className="container max-w-xl">
          <h2 id="apply-heading" className="font-display text-2xl font-bold text-primary mb-8 text-center">Apply for this Role</h2>
          {submitted ? (
            <div className="text-center py-12" role="status" aria-live="polite">
              <p className="font-display text-xl text-primary font-bold mb-2">Thank you!</p>
              <p className="text-muted-foreground text-sm">Your application has been received. We'll be in touch soon.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              <div>
                <label htmlFor={`${formId}-name`} className="text-sm font-medium text-primary mb-1.5 block">Full Name</label>
                <input
                  id={`${formId}-name`}
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  onBlur={() => setTouched({ ...touched, name: true })}
                  aria-invalid={touched.name && !isValid("name") ? "true" : undefined}
                  aria-describedby={errorMsg("name") ? `${formId}-name-error` : undefined}
                  className={`w-full bg-transparent border-2 rounded-md px-4 py-3 text-sm outline-none transition-colors ${borderClass("name")} focus:border-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary`}
                  placeholder="Jane Doe"
                  autoComplete="name"
                />
                {errorMsg("name") && <p id={`${formId}-name-error`} className="text-destructive text-xs mt-1" role="alert">{errorMsg("name")}</p>}
              </div>
              <div>
                <label htmlFor={`${formId}-email`} className="text-sm font-medium text-primary mb-1.5 block">Email</label>
                <input
                  id={`${formId}-email`}
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  onBlur={() => setTouched({ ...touched, email: true })}
                  aria-invalid={touched.email && !isValid("email") ? "true" : undefined}
                  aria-describedby={errorMsg("email") ? `${formId}-email-error` : undefined}
                  className={`w-full bg-transparent border-2 rounded-md px-4 py-3 text-sm outline-none transition-colors ${borderClass("email")} focus:border-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary`}
                  placeholder="jane@example.com"
                  autoComplete="email"
                />
                {errorMsg("email") && <p id={`${formId}-email-error`} className="text-destructive text-xs mt-1" role="alert">{errorMsg("email")}</p>}
              </div>
              <div>
                <label htmlFor={`${formId}-msg`} className="text-sm font-medium text-primary mb-1.5 block">Why Arbor?</label>
                <textarea
                  id={`${formId}-msg`}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  onBlur={() => setTouched({ ...touched, message: true })}
                  rows={4}
                  aria-invalid={touched.message && !isValid("message") ? "true" : undefined}
                  aria-describedby={errorMsg("message") ? `${formId}-msg-error` : undefined}
                  className={`w-full bg-transparent border-2 rounded-md px-4 py-3 text-sm outline-none transition-colors resize-none ${borderClass("message")} focus:border-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary`}
                  placeholder="Tell us what excites you about joining Arbor Coffee & Co."
                />
                {errorMsg("message") && <p id={`${formId}-msg-error`} className="text-destructive text-xs mt-1" role="alert">{errorMsg("message")}</p>}
              </div>
              <Button type="submit" size="lg" className="w-full">Submit Application</Button>
            </form>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default CareerDetail;
