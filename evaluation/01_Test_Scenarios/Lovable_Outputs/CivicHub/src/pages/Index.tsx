import { Search, CreditCard, HeartPulse, Car, FileText } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import LiveNewsBar from "@/components/LiveNewsBar";
import { usePageTitle } from "@/hooks/usePageTitle";

const quickLinks = [
  { icon: CreditCard, label: "Pay Taxes", desc: "File & pay online", path: "/services-hub" },
  { icon: HeartPulse, label: "Health ID", desc: "Apply for your card", path: "/services-hub" },
  { icon: Car, label: "Renew License", desc: "Quick renewal", path: "/services-hub" },
  { icon: FileText, label: "Business Permit", desc: "Register a business", path: "/services-hub" },
];

const Index = () => {
  const [search, setSearch] = useState("");
  usePageTitle("Home — CivicHub");

  return (
    <div>
      <LiveNewsBar />

      {/* Search Hero */}
      <section className="bg-primary py-24 md:py-32" aria-label="Search for government services">
        <div className="civic-container text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-4 animate-fade-in">
            How can we help you today?
          </h1>
          <p className="text-primary-foreground/70 mb-8 text-lg animate-fade-in" style={{ animationDelay: "0.1s" }}>
            Access government services, legal information, and social benefits — all in one place.
          </p>
          <div className="max-w-2xl mx-auto relative animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <label htmlFor="hero-search" className="sr-only">Find a government service</label>
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" aria-hidden="true" size={20} />
            <input
              id="hero-search"
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Find a government service..."
              className="w-full pl-12 pr-6 py-4 rounded-xl text-foreground bg-card shadow-xl border-0 outline-none focus:ring-2 focus:ring-accent text-base"
            />
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="civic-section" aria-label="Popular services">
        <div className="civic-container">
          <h2 className="text-2xl font-bold text-foreground mb-8 text-center">Popular Services</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickLinks.map((item) => (
              <Link key={item.label} to={item.path} className="civic-card flex flex-col items-center text-center gap-3">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <item.icon size={28} className="text-primary" aria-hidden="true" />
                </div>
                <h3 className="font-bold text-foreground">{item.label}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-secondary py-16" aria-label="Get started with CivicHub">
        <div className="civic-container text-center">
          <h2 className="text-2xl font-bold text-secondary-foreground mb-4">New to CivicHub?</h2>
          <p className="text-muted-foreground mb-6 max-w-lg mx-auto">Create your free account to track applications, save documents, and get personalized notifications.</p>
          <Link to="/user-portal" className="inline-block bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover-scale">
            Get Started
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Index;
