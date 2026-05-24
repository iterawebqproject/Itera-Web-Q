import { useState, useDeferredValue } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Search } from "lucide-react";

const jobs = [
  { id: 1, title: "Civil Engineer", industry: "Infrastructure", type: "Full-time" },
  { id: 2, title: "Public Health Nurse", industry: "Healthcare", type: "Full-time" },
  { id: 3, title: "Environmental Analyst", industry: "Environment", type: "Contract" },
  { id: 4, title: "IT Systems Administrator", industry: "Technology", type: "Full-time" },
  { id: 5, title: "Urban Planning Apprentice", industry: "Urban Development", type: "Apprenticeship" },
  { id: 6, title: "Social Worker", industry: "Community Services", type: "Full-time" },
];

export default function EmploymentHub() {
  const [search, setSearch] = useState("");
  const deferredSearch = useDeferredValue(search);

  const filtered = jobs.filter(
    (j) =>
      j.title.toLowerCase().includes(deferredSearch.toLowerCase()) ||
      j.industry.toLowerCase().includes(deferredSearch.toLowerCase())
  );

  return (
    <Layout
      title="Employment Hub — SiamState Portal"
      description="Find government job opportunities, apprenticeships, unemployment benefits, and employer services."
    >
      <section className="container py-12">
        <h1 className="text-4xl font-extrabold text-foreground mb-1">Employment Department</h1>
        <div className="h-1 w-24 bg-dept-employment rounded mb-10" aria-hidden="true" />

        {/* Search */}
        <div className="relative max-w-md mb-8">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" aria-hidden="true" />
          <label htmlFor="job-search" className="sr-only">Search jobs</label>
          <input
            id="job-search"
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search jobs..."
            className="w-full rounded-lg border bg-card pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-dept-employment transition-colors"
          />
        </div>

        {/* Opportunity Feed */}
        <div className="space-y-3 max-w-2xl mb-12" role="list" aria-live="polite" aria-label="Job listings">
          {filtered.length === 0 && (
            <p className="text-muted-foreground text-sm" role="status">No jobs match your search.</p>
          )}
          {filtered.map((job) => (
            <article
              key={job.id}
              role="listitem"
              className="flex items-center justify-between bg-card border rounded-lg p-5 hover:shadow-md transition-shadow"
            >
              <div>
                <h3 className="font-bold text-foreground">{job.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {job.industry} · {job.type}
                </p>
              </div>
              <button
                aria-label={`Apply for ${job.title}`}
                className="px-4 py-2 rounded-md bg-dept-employment text-secondary-foreground text-sm font-semibold hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              >
                Apply
              </button>
            </article>
          ))}
        </div>

        {/* Quick Links */}
        <nav className="border-t pt-8" aria-label="Employment quick links">
          <h2 className="text-lg font-bold text-foreground mb-4">Quick Links</h2>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/contact-support"
              className="px-4 py-2 rounded-md border-2 border-dept-employment text-dept-employment font-semibold text-sm hover:bg-dept-employment hover:text-secondary-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
              Unemployment Benefits
            </Link>
            <Link
              to="/contact-support"
              className="px-4 py-2 rounded-md border-2 border-dept-employment text-dept-employment font-semibold text-sm hover:bg-dept-employment hover:text-secondary-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
              Employer Services
            </Link>
          </div>
        </nav>
      </section>
    </Layout>
  );
}
