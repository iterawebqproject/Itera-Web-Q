import { Search, Book, Shield, CreditCard, Settings, Users, LifeBuoy } from "lucide-react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";

const categories = [
  { icon: Book, label: "Getting Started", to: "/starter" },
  { icon: Settings, label: "Account Settings", to: "/how-to" },
  { icon: CreditCard, label: "Billing & Plans", to: "/how-to" },
  { icon: Shield, label: "Security", to: "/how-to" },
  { icon: Users, label: "Team Management", to: "/how-to" },
  { icon: LifeBuoy, label: "Troubleshooting", to: "/faq" },
];

const popularArticles = [
  "How to reset your password",
  "Setting up two-factor authentication",
  "Inviting team members to your workspace",
  "Understanding your billing cycle",
  "Configuring API access tokens",
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "SyncCenter Help & Support",
  url: "https://portal-answers.lovable.app",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://portal-answers.lovable.app/faq?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

const Home = () => (
  <Layout title="Help & Support Portal" description="Find guides, FAQs, and support resources in the SyncCenter help hub.">
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />

    {/* Hero Search */}
    <section className="bg-primary py-20" aria-labelledby="hero-heading">
      <div className="container text-center">
        <h1 id="hero-heading" className="text-4xl md:text-5xl font-heading font-bold text-primary-foreground mb-4">
          How can we help?
        </h1>
        <p className="text-primary-foreground/70 mb-8 max-w-md mx-auto">
          Search our knowledge base for guides, tutorials, and answers.
        </p>
        <div className="max-w-xl mx-auto relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" aria-hidden="true" />
          <label htmlFor="hero-search" className="sr-only">Search articles</label>
          <input
            id="hero-search"
            type="search"
            placeholder="Search articles, guides, and more…"
            className="w-full rounded-lg border-0 bg-card pl-12 pr-4 py-3.5 text-foreground placeholder:text-muted-foreground shadow-lg focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      </div>
    </section>

    {/* Category Grid */}
    <section className="container py-16" aria-labelledby="categories-heading">
      <h2 id="categories-heading" className="text-2xl font-heading font-semibold text-center mb-10">Browse by Category</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <Link
            key={cat.label}
            to={cat.to}
            className="flex items-center gap-4 rounded-lg border bg-card p-5 hover:shadow-md hover:border-primary/30 transition-all group"
          >
            <div className="rounded-md bg-secondary p-3 group-hover:bg-primary/10 transition-colors">
              <cat.icon className="h-5 w-5 text-primary" aria-hidden="true" />
            </div>
            <span className="font-medium text-foreground">{cat.label}</span>
          </Link>
        ))}
      </div>
    </section>

    {/* Popular Articles */}
    <section className="bg-card border-t" aria-labelledby="popular-heading">
      <div className="container py-14">
        <h2 id="popular-heading" className="text-2xl font-heading font-semibold mb-6">Popular Articles</h2>
        <ul className="space-y-3" role="list">
          {popularArticles.map((title) => (
            <li key={title}>
              <Link
                to="/how-to"
                className="flex items-center gap-3 text-foreground hover:text-primary transition-colors group"
              >
                <Book className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" aria-hidden="true" />
                <span>{title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>

    {/* Quick Support */}
    <section className="container py-12 text-center">
      <p className="text-muted-foreground">
        Still need help?{" "}
        <Link to="/contact" className="text-primary font-medium hover:underline">
          Contact us
        </Link>
      </p>
    </section>
  </Layout>
);

export default Home;
