import { useState } from "react";
import { Search, MapPin, Briefcase, Users, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageMeta from "@/components/PageMeta";

const jobs = [
  { id: 1, title: "Senior Brand Manager", location: "New York, NY", department: "Marketing", type: "Full-time", duties: ["Lead brand strategy for the Luxe portfolio", "Manage a team of 5 marketing professionals", "Drive consumer research and market analysis", "Develop and execute integrated marketing campaigns"], requirements: ["7+ years in brand management", "MBA preferred", "Experience in consumer goods", "Strong leadership and communication skills"] },
  { id: 2, title: "Supply Chain Analyst", location: "Chicago, IL", department: "Operations", type: "Full-time", duties: ["Analyze supply chain performance metrics", "Identify cost optimization opportunities", "Coordinate with global logistics partners", "Build forecasting models for demand planning"], requirements: ["3+ years in supply chain analytics", "Proficiency in SQL and Excel", "Bachelor's in Business or Engineering", "Experience with ERP systems"] },
  { id: 3, title: "Sustainability Coordinator", location: "London, UK", department: "ESG", type: "Full-time", duties: ["Track and report on sustainability KPIs", "Coordinate with suppliers on ESG compliance", "Support development of annual sustainability report", "Research emerging sustainability regulations"], requirements: ["2+ years in sustainability or CSR", "Knowledge of GRI and SASB frameworks", "Strong analytical skills", "Passion for environmental issues"] },
  { id: 4, title: "UX Designer", location: "Remote", department: "Digital", type: "Full-time", duties: ["Design intuitive user experiences for digital products", "Conduct user research and usability testing", "Create wireframes, prototypes, and design specs", "Collaborate with engineering and product teams"], requirements: ["5+ years in UX design", "Proficiency in Figma", "Portfolio demonstrating UX process", "Experience with design systems"] },
];

const benefits = [
  { icon: Briefcase, title: "Flexible Work", desc: "Hybrid and remote options to fit your lifestyle." },
  { icon: Users, title: "Inclusive Culture", desc: "A diverse, welcoming environment where everyone belongs." },
  { icon: TrendingUp, title: "Growth & Learning", desc: "Continuous development with mentorship and training programs." },
];

const jobPostingJsonLd = (job: typeof jobs[0]) => ({
  "@context": "https://schema.org",
  "@type": "JobPosting",
  title: job.title,
  hiringOrganization: { "@type": "Organization", name: "A Company" },
  jobLocation: { "@type": "Place", address: job.location },
  employmentType: job.type.toUpperCase().replace("-", "_"),
  description: job.duties.join(". "),
});

const Careers = () => {
  const [search, setSearch] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [selectedJob, setSelectedJob] = useState<typeof jobs[0] | null>(null);

  const filtered = jobs.filter(
    (j) =>
      j.title.toLowerCase().includes(search.toLowerCase()) &&
      j.location.toLowerCase().includes(locationFilter.toLowerCase())
  );

  if (selectedJob) {
    return (
      <main id="main-content" className="pt-20">
        <PageMeta title={selectedJob.title} description={`Apply for ${selectedJob.title} at A Company. ${selectedJob.location}.`} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jobPostingJsonLd(selectedJob)) }} />
        <section className="bg-secondary section-padding">
          <div className="max-w-4xl mx-auto">
            <button onClick={() => setSelectedJob(null)} className="text-primary-foreground/70 hover:text-primary-foreground text-sm mb-4 inline-block" aria-label="Back to job listings">
              ← Back to listings
            </button>
            <h1 className="text-3xl md:text-4xl font-black text-primary-foreground">{selectedJob.title}</h1>
            <p className="text-primary-foreground/70 mt-2">{selectedJob.location} · {selectedJob.department} · {selectedJob.type}</p>
          </div>
        </section>
        <section className="section-padding" aria-label="Job details">
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-xl font-bold text-secondary mb-4">Key Duties</h2>
              <ul className="space-y-3" role="list">
                {selectedJob.duties.map((d, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" aria-hidden="true" />
                    {d}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-xl font-bold text-secondary mb-4">Requirements</h2>
              <ul className="space-y-3" role="list">
                {selectedJob.requirements.map((r, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" aria-hidden="true" />
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
        <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4" role="complementary" aria-label="Apply for this position">
          <div className="max-w-4xl mx-auto flex justify-between items-center">
            <span className="font-bold text-secondary">{selectedJob.title}</span>
            <Button variant="hero">Apply Now</Button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main id="main-content" className="pt-20">
      <PageMeta
        title="Careers"
        description="Find and apply for jobs at A Company. Explore open positions in marketing, operations, sustainability, and technology."
        canonical="https://vision-spotlight-72.lovable.app/careers"
      />

      {/* Search */}
      <section className="bg-secondary section-padding" aria-labelledby="careers-heading">
        <div className="max-w-3xl mx-auto text-center">
          <h1 id="careers-heading" className="text-4xl md:text-5xl font-black text-primary-foreground mb-8">Join Our Team</h1>
          <form className="flex flex-col sm:flex-row gap-3" role="search" aria-label="Job search" onSubmit={(e) => e.preventDefault()}>
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" aria-hidden="true" />
              <label htmlFor="job-search" className="sr-only">Search by job title</label>
              <input
                id="job-search"
                type="search"
                placeholder="Job title..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-card text-foreground border-0 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div className="flex-1 relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" aria-hidden="true" />
              <label htmlFor="location-search" className="sr-only">Search by location</label>
              <input
                id="location-search"
                type="search"
                placeholder="Location..."
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-card text-foreground border-0 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </form>
        </div>
      </section>

      {/* Listings */}
      <section className="section-padding" aria-label="Job listings">
        <div className="max-w-3xl mx-auto space-y-4">
          <p className="sr-only" aria-live="polite">{filtered.length} positions found</p>
          {filtered.map((job) => (
            <article key={job.id} className="bg-card rounded-lg p-6 border border-border card-hover">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg font-bold text-secondary">{job.title}</h2>
                  <p className="text-sm text-muted-foreground">{job.location} · {job.department} · {job.type}</p>
                </div>
                <Button variant="hero" size="sm" onClick={() => setSelectedJob(job)} aria-label={`View details for ${job.title}`}>
                  View Job
                </Button>
              </div>
            </article>
          ))}
          {filtered.length === 0 && (
            <p className="text-center text-muted-foreground py-12">No positions match your search.</p>
          )}
        </div>
      </section>

      {/* Why Join Us */}
      <section className="section-padding bg-muted" aria-labelledby="benefits-heading">
        <div className="max-w-5xl mx-auto">
          <h2 id="benefits-heading" className="section-title text-center mb-12">Why Join Us</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((b) => (
              <div key={b.title} className="text-center p-8 bg-card rounded-lg card-hover">
                <b.icon className="w-10 h-10 text-primary mx-auto mb-4" aria-hidden="true" />
                <h3 className="text-xl font-bold text-secondary mb-2">{b.title}</h3>
                <p className="text-sm text-muted-foreground">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Careers;
