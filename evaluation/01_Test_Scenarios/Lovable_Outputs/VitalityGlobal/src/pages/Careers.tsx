import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { FileText, Users, Send } from "lucide-react";

const cultureItems = [
  { value: "benefits", title: "Benefits", content: "Competitive compensation, equity participation, comprehensive health coverage, 401(k) matching, flexible work arrangements, and generous PTO. We also offer sabbatical programs for tenured employees and education reimbursement up to $10,000/year." },
  { value: "diversity", title: "Diversity & Inclusion", content: "VitalityGlobal is committed to building a workforce that reflects the communities we serve. Our D&I council drives initiatives including mentorship programs, employee resource groups, unconscious bias training, and equitable hiring practices across all regions." },
  { value: "wellbeing", title: "Wellbeing", content: "Mental health support through our EAP program, on-site fitness facilities, mindfulness sessions, and flexible schedules. We believe healthy employees drive healthy businesses — that's why wellness is embedded in our culture, not an afterthought." },
];

const jobs = [
  { title: "Senior Sustainability Analyst", location: "Geneva, CH", dept: "Sustainability" },
  { title: "Product Manager — EcoNova", location: "London, UK", dept: "Brand Management" },
  { title: "Data Engineer", location: "New York, US", dept: "Technology" },
  { title: "Supply Chain Director", location: "Singapore, SG", dept: "Operations" },
  { title: "UX Designer", location: "Remote", dept: "Digital" },
];

const steps = [
  { icon: FileText, step: "1", title: "Apply", desc: "Submit your resume and cover letter through our portal." },
  { icon: Users, step: "2", title: "Interview", desc: "Meet our team through a structured multi-round process." },
  { icon: Send, step: "3", title: "Onboard", desc: "Welcome aboard — your growth journey begins here." },
];

const Careers = () => (
  <Layout>
    <SEOHead
      title="Careers"
      description="Join VitalityGlobal — explore open positions, company culture, benefits, and our hiring process."
      path="/careers"
    />

    {/* Hero */}
    <section className="container py-20" aria-labelledby="careers-heading">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 id="careers-heading" className="text-4xl md:text-5xl font-bold mb-6">Join Our Team</h1>
        <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
          Build your career with purpose. At VitalityGlobal, every role contributes to a more
          sustainable and ethical future.
        </p>
      </motion.div>
    </section>

    {/* Culture Accordion */}
    <section className="bg-muted py-16" aria-labelledby="culture-heading">
      <div className="container max-w-3xl">
        <h2 id="culture-heading" className="text-3xl font-bold mb-8">Our Culture</h2>
        <Accordion type="single" collapsible className="space-y-3">
          {cultureItems.map((item) => (
            <AccordionItem key={item.value} value={item.value} className="bg-card border rounded-lg px-6">
              <AccordionTrigger className="text-lg font-semibold">{item.title}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                {item.content}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>

    {/* Job Portal */}
    <section className="container py-20" aria-labelledby="jobs-heading">
      <h2 id="jobs-heading" className="text-3xl font-bold mb-8">Open Positions</h2>
      <div className="space-y-4" role="list" aria-label="Job openings">
        {jobs.map((job, i) => (
          <motion.div
            key={job.title}
            role="listitem"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="bg-card border rounded-lg p-5 flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div className="flex-1">
              <h3 className="font-bold">{job.title}</h3>
              <p className="text-sm text-muted-foreground">{job.location} · {job.dept}</p>
            </div>
            <Button className="bg-deep-blue text-deep-blue-foreground hover:bg-deep-blue/90 w-full md:w-auto">
              View Details
            </Button>
          </motion.div>
        ))}
      </div>
    </section>

    {/* Application Path */}
    <section className="bg-muted py-20" aria-labelledby="process-heading">
      <div className="container">
        <h2 id="process-heading" className="text-3xl font-bold text-center mb-12">How to Join</h2>
        <ol className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto" aria-label="Hiring process steps">
          {steps.map((s, i) => (
            <motion.li
              key={s.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="text-center"
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4" aria-hidden="true">
                <s.icon className="text-primary" size={28} />
              </div>
              <div className="text-2xl font-bold text-primary mb-2">Step {s.step}</div>
              <h3 className="font-bold mb-1">{s.title}</h3>
              <p className="text-sm text-muted-foreground">{s.desc}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  </Layout>
);

export default Careers;
