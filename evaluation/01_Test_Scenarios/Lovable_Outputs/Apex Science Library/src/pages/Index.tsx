import { Search, HelpCircle, Info, Headphones, Atom, Calculator, Leaf, FlaskConical, Monitor, Globe, Star, TreePine } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { subjects } from "@/data/mockData";
import { PageHead } from "@/components/PageHead";

const iconMap: Record<string, React.ElementType> = {
  Atom, Calculator, Leaf, FlaskConical, Monitor, Globe, Star, TreePine,
};

const Index = () => {
  const [search, setSearch] = useState("");

  const filteredSubjects = subjects.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <PageHead title="Home" description="A clean academic library for students to find high-quality science notes and study documents." />

      {/* Hero */}
      <section className="bg-primary py-20 px-6" aria-labelledby="hero-heading">
        <div className="max-w-3xl mx-auto text-center">
          <h1 id="hero-heading" className="font-heading text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
            Apex Science Library
          </h1>
          <p className="text-primary-foreground/80 font-body mb-8 text-lg">
            High-quality science notes and study materials for students.
          </p>
          <div className="relative max-w-xl mx-auto" role="search">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" aria-hidden="true" />
            <label htmlFor="search-input" className="sr-only">Search subjects, topics, or keywords</label>
            <input
              id="search-input"
              type="search"
              placeholder="Search subjects, topics, or keywords..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-full bg-card text-foreground font-body text-base shadow-lg border-0 outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
        </div>
      </section>

      {/* Subject Grid */}
      <section id="main-content" className="max-w-6xl mx-auto px-6 py-16" aria-labelledby="subjects-heading">
        <h2 id="subjects-heading" className="font-heading text-2xl font-bold text-foreground mb-8">Browse Subjects</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4" role="list">
          {filteredSubjects.map((subject) => {
            const Icon = iconMap[subject.icon] || Atom;
            return (
              <Link
                key={subject.id}
                to={`/subject/${subject.id}`}
                role="listitem"
                className="group flex items-center gap-3 rounded-full bg-card border border-border px-5 py-3.5 hover:bg-accent hover:border-primary/30 transition-all duration-200 animate-fade-in focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              >
                <Icon className="h-5 w-5 text-primary shrink-0" aria-hidden="true" />
                <span className="font-heading text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                  {subject.name}
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Quick Support */}
      <section className="max-w-6xl mx-auto px-6 pb-20" aria-labelledby="support-heading">
        <h2 id="support-heading" className="sr-only">Quick Support</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: HelpCircle, title: "Frequently Asked Questions", desc: "Find answers to common queries about our library." },
            { icon: Info, title: "About Us", desc: "Learn about our mission to support academic excellence." },
            { icon: Headphones, title: "Contact Support", desc: "Reach our team for help with any issue." },
          ].map((item) => (
            <div
              key={item.title}
              className="bg-card border border-border rounded-lg p-6 text-center hover:shadow-md transition-shadow"
            >
              <item.icon className="h-8 w-8 text-primary mx-auto mb-3" aria-hidden="true" />
              <h3 className="font-heading text-base font-bold text-foreground mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground font-body">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Index;
