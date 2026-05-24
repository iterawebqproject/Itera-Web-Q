import { useState, useDeferredValue } from "react";
import { Link } from "react-router-dom";
import { Search, Leaf, Heart, Briefcase } from "lucide-react";
import Layout from "@/components/Layout";

const agencies = [
  {
    title: "Environment",
    description: "Air quality monitoring, land management, water resources, and waste disposal services.",
    icon: Leaf,
    to: "/environment-hub",
    borderColor: "border-dept-environment",
    iconColor: "text-dept-environment",
  },
  {
    title: "Health Services",
    description: "Public health records, immunization tracking, birth certificates, and health permits.",
    icon: Heart,
    to: "/health-services",
    borderColor: "border-primary",
    iconColor: "text-primary",
  },
  {
    title: "Employment",
    description: "Job opportunities, apprenticeships, unemployment benefits, and employer services.",
    icon: Briefcase,
    to: "/employment-hub",
    borderColor: "border-dept-employment",
    iconColor: "text-dept-employment",
  },
];

export default function Index() {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);

  const filtered = agencies.filter(
    (a) =>
      !deferredQuery ||
      a.title.toLowerCase().includes(deferredQuery.toLowerCase()) ||
      a.description.toLowerCase().includes(deferredQuery.toLowerCase())
  );

  return (
    <Layout>
      {/* Hero Search */}
      <section className="bg-card py-20" aria-labelledby="hero-heading">
        <div className="container max-w-2xl text-center">
          <h1 id="hero-heading" className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground mb-4">
            SiamState Portal
          </h1>
          <p className="text-muted-foreground mb-8 text-lg">
            Access government services, records, and resources — all in one place.
          </p>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" aria-hidden="true" />
            <label htmlFor="home-search" className="sr-only">Search government services</label>
            <input
              id="home-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="What service do you need today?"
              className="w-full rounded-lg border-2 border-border bg-background pl-12 pr-4 py-4 text-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-primary transition-colors"
            />
          </div>
        </div>
      </section>

      {/* Agency Grid */}
      <section className="container py-16" aria-labelledby="departments-heading">
        <h2 id="departments-heading" className="text-2xl font-bold text-foreground mb-8 text-center">
          Explore Departments
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6" role="list" aria-live="polite">
          {filtered.length === 0 && (
            <p className="text-muted-foreground text-sm col-span-full text-center" role="status">
              No departments match your search.
            </p>
          )}
          {filtered.map((agency) => (
            <Link
              key={agency.title}
              to={agency.to}
              role="listitem"
              className={`group bg-card rounded-lg border-2 ${agency.borderColor} p-6 hover:shadow-lg transition-shadow focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2`}
            >
              <agency.icon className={`h-10 w-10 ${agency.iconColor} mb-4`} aria-hidden="true" />
              <h3 className="text-xl font-bold text-card-foreground mb-2">
                {agency.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {agency.description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "GovernmentOrganization",
        "name": "SiamState Portal",
        "url": "https://siamstate-connect.lovable.app",
        "description": "Central government hub for public services including health, environment, and employment.",
        "department": [
          { "@type": "GovernmentOrganization", "name": "Environment Department" },
          { "@type": "GovernmentOrganization", "name": "Health Services Department" },
          { "@type": "GovernmentOrganization", "name": "Employment Department" }
        ]
      })}} />
    </Layout>
  );
}
