import { HeartPulse, Car, GraduationCap, HandCoins } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { usePageTitle } from "@/hooks/usePageTitle";

const categories = [
  { icon: HeartPulse, label: "Health", desc: "Insurance, prescriptions, health ID", color: "text-civic-success" },
  { icon: Car, label: "Transport", desc: "Licenses, registration, permits", color: "text-civic-info" },
  { icon: GraduationCap, label: "Education", desc: "Schools, grants, certifications", color: "text-civic-warning" },
  { icon: HandCoins, label: "Benefits", desc: "Social support & financial aid", color: "text-primary" },
];

const programs = [
  { name: "Family Assistance Program", desc: "Monthly support for families with children under 18.", eligible: "Income below $40,000/year" },
  { name: "Housing Subsidy Scheme", desc: "Rental assistance for low-income households.", eligible: "Resident for 2+ years" },
  { name: "Senior Care Allowance", desc: "Monthly allowance for citizens aged 65+.", eligible: "Age 65 or older" },
  { name: "Student Tuition Grant", desc: "Covers up to 80% of tuition for public universities.", eligible: "Enrolled full-time student" },
  { name: "Small Business Relief Fund", desc: "Emergency grants for businesses with under 50 employees.", eligible: "Registered business" },
];

const eligibilityFAQ = [
  { q: "How do I know if I qualify for social support?", a: "Eligibility depends on income, residency, and household size. Use our eligibility checker or visit your nearest service center." },
  { q: "Can expatriates apply for benefits?", a: "Yes, expatriates with valid work permits of 2+ years may apply for select programs including Housing Subsidy and Student Grants." },
  { q: "What documents do I need?", a: "Typically: national ID or passport, proof of income (last 3 months), proof of residency, and a completed application form." },
];

const ServicesHub = () => {
  usePageTitle("Services Hub — CivicHub");

  return (
    <div>
      <section className="civic-section" aria-label="Service categories">
        <div className="civic-container">
          <h1 className="text-3xl font-bold text-foreground mb-2 text-center">Services Hub</h1>
          <p className="text-muted-foreground text-center mb-10">Browse services by category or search for what you need.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat) => (
              <div key={cat.label} className="civic-card flex flex-col items-center text-center gap-3" role="article">
                <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center">
                  <cat.icon size={32} className={cat.color} aria-hidden="true" />
                </div>
                <h3 className="font-bold text-foreground text-lg">{cat.label}</h3>
                <p className="text-sm text-muted-foreground">{cat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-secondary py-16" aria-label="Eligibility information">
        <div className="civic-container max-w-3xl">
          <h2 className="text-2xl font-bold text-secondary-foreground mb-6 text-center">Can I Apply?</h2>
          <Accordion type="single" collapsible className="space-y-3">
            {eligibilityFAQ.map((item, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="bg-card rounded-lg border border-border px-6">
                <AccordionTrigger className="text-foreground font-medium text-left">{item.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section className="civic-section" aria-label="Available programs">
        <div className="civic-container max-w-3xl">
          <h2 className="text-2xl font-bold text-foreground mb-8 text-center">Available Programs</h2>
          <div className="space-y-4">
            {programs.map((prog) => (
              <div key={prog.name} className="bg-card border border-border rounded-xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-bold text-foreground">{prog.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{prog.desc}</p>
                  <span className="text-xs text-civic-info mt-2 inline-block">Eligibility: {prog.eligible}</span>
                </div>
                <button className="bg-primary text-primary-foreground px-6 py-2.5 rounded-lg font-semibold text-sm hover-scale whitespace-nowrap" aria-label={`Apply now for ${prog.name}`}>
                  Apply Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesHub;
