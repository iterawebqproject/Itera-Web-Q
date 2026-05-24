import { CheckCircle, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useId } from "react";
import Layout from "@/components/Layout";
import useDocumentTitle from "@/hooks/useDocumentTitle";

const benefits = [
  { title: "Health & Wellness", points: ["Comprehensive medical, dental & vision", "Mental health support program", "Free gym membership"] },
  { title: "Growth & Learning", points: ["Annual learning stipend of $2,000", "Internal mentorship program", "Conference attendance budget"] },
  { title: "Work-Life Balance", points: ["Flexible remote work policy", "Unlimited PTO", "Paid sabbatical after 5 years"] },
  { title: "Sustainability Perks", points: ["Green commute subsidy", "Free monthly coffee subscription", "Volunteer time off (40 hrs/year)"] },
];

const openRoles = [
  { id: "barista-lead", title: "Lead Barista", location: "Portland, OR", type: "Full-Time" },
  { id: "sustainability-mgr", title: "Sustainability Manager", location: "Remote", type: "Full-Time" },
  { id: "brand-designer", title: "Brand Designer", location: "New York, NY", type: "Full-Time" },
  { id: "supply-chain", title: "Supply Chain Analyst", location: "Remote", type: "Contract" },
  { id: "retail-mgr", title: "Retail Store Manager", location: "Austin, TX", type: "Full-Time" },
];

const CareerBenefit = () => {
  const [search, setSearch] = useState("");
  const searchId = useId();
  const filtered = openRoles.filter((r) =>
    r.title.toLowerCase().includes(search.toLowerCase())
  );

  useDocumentTitle("Careers & Benefits", "Join Arbor Coffee & Co. — explore open positions, benefits, and build a career in sustainable coffee.");

  return (
    <Layout>
      <section className="py-20" aria-labelledby="careers-heading">
        <div className="container text-center max-w-2xl">
          <h1 id="careers-heading" className="font-display text-4xl md:text-5xl font-bold text-primary mb-4">Join Our Team</h1>
          <p className="text-muted-foreground">Build your career at a company that values people and planet equally.</p>
        </div>
      </section>

      {/* Benefits */}
      <section className="pb-16" aria-labelledby="benefits-heading">
        <h2 id="benefits-heading" className="sr-only">Employee Benefits</h2>
        <div className="container">
          <div className="grid md:grid-cols-2 gap-6">
            {benefits.map((b) => (
              <article key={b.title} className="bg-secondary/50 rounded-lg p-6">
                <h3 className="font-display text-lg font-bold text-primary mb-4">{b.title}</h3>
                <ul className="space-y-2">
                  {b.points.map((p) => (
                    <li key={p} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="w-4 h-4 text-success mt-0.5 flex-shrink-0" aria-hidden="true" />
                      {p}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Search & Roles */}
      <section className="py-16 border-t border-border" aria-labelledby="positions-heading">
        <div className="container max-w-2xl">
          <h2 id="positions-heading" className="font-display text-2xl font-bold text-primary mb-8 text-center">Open Positions</h2>
          <div className="relative mb-8">
            <label htmlFor={searchId} className="sr-only">Search Job Roles</label>
            <Search className="absolute left-0 bottom-3 w-5 h-5 text-muted-foreground" aria-hidden="true" />
            <input
              id={searchId}
              type="search"
              placeholder="Search Job Roles"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent border-b-2 border-border focus:border-primary outline-none pl-8 pb-3 text-sm text-foreground placeholder:text-muted-foreground transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            />
          </div>
          <div className="space-y-4" role="list" aria-label="Job listings" aria-live="polite">
            {filtered.map((role) => (
              <Link
                to={`/career-detail/${role.id}`}
                key={role.id}
                role="listitem"
                className="block border border-border rounded-lg p-5 hover:border-accent transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                <h3 className="font-display text-lg font-bold text-primary">{role.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{role.location} · {role.type}</p>
              </Link>
            ))}
            {filtered.length === 0 && (
              <p className="text-center text-muted-foreground text-sm py-8" role="status">No roles match your search.</p>
            )}
          </div>
        </div>
      </section>

      {/* JSON-LD for Job Postings */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Arbor Coffee & Co.",
            url: "https://arbor-green-greens.lovable.app",
            sameAs: [],
            jobPosting: openRoles.map((r) => ({
              "@type": "JobPosting",
              title: r.title,
              jobLocation: { "@type": "Place", address: r.location },
              employmentType: r.type === "Full-Time" ? "FULL_TIME" : "CONTRACTOR",
            })),
          }),
        }}
      />
    </Layout>
  );
};

export default CareerBenefit;
