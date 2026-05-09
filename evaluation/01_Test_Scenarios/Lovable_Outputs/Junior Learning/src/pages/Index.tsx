import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import PageMeta from "@/components/PageMeta";
import { Button } from "@/components/ui/button";
import { Calculator, FlaskConical } from "lucide-react";

const subjectCards = [
  { title: "Mathematics", icon: Calculator, to: "/subjects/math" },
  { title: "Science", icon: FlaskConical, to: "/subjects/science" },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Junior Learning",
  url: "https://story-spark-edu.lovable.app",
  description: "A free online library providing expert-verified textbooks for primary school kids K-6.",
};

const Index = () => {
  return (
    <Layout>
      <PageMeta title="Home" description="Junior Learning – Free expert-verified textbooks and learning materials for primary school kids K-6." />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <section className="container py-20 md:py-32 text-center" aria-labelledby="hero-heading">
        <h1 id="hero-heading" className="text-4xl md:text-6xl font-bold leading-tight mb-6">
          Learn anything,<br />completely <span className="text-secondary">free</span>.
        </h1>
        <p className="text-lg text-muted-foreground max-w-md mx-auto mb-8">
          Expert-verified textbooks and fun materials for primary school kids K-6.
        </p>
        <Link to="/subjects">
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90 px-10 py-6 text-lg font-bold rounded-full shadow-lg">
            Find Your Subject
          </Button>
        </Link>
      </section>

      {/* Subject Grid */}
      <section className="container pb-20" aria-labelledby="subjects-heading">
        <h2 id="subjects-heading" className="sr-only">Subjects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          {subjectCards.map((s) => (
            <Link key={s.title} to={s.to} className="group" aria-label={`Browse ${s.title} books`}>
              <div className="rounded-2xl bg-card border border-border p-10 flex flex-col items-center gap-4 transition-transform hover:scale-105">
                <div className="rounded-full p-4 bg-accent">
                  <s.icon className="h-12 w-12 text-secondary" aria-hidden="true" />
                </div>
                <span className="text-2xl font-bold">{s.title}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default Index;
