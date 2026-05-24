import { Sprout, Award, Globe, Coffee, Leaf, Heart } from "lucide-react";
import Layout from "@/components/Layout";
import useDocumentTitle from "@/hooks/useDocumentTitle";

const milestones = [
  { year: "2008", title: "The First Roast", desc: "Founded in Portland with a single roaster and a dream for ethically sourced coffee.", icon: Coffee },
  { year: "2012", title: "Going Direct-Trade", desc: "Established direct partnerships with 12 farming cooperatives across Central America.", icon: Heart },
  { year: "2016", title: "Carbon-Neutral Operations", desc: "Achieved full carbon neutrality across all roasting and distribution facilities.", icon: Leaf },
  { year: "2019", title: "Global Expansion", desc: "Expanded to 15 countries, bringing our sustainable philosophy to new markets.", icon: Globe },
  { year: "2022", title: "B Corp Certification", desc: "Recognized as a Certified B Corporation for meeting the highest standards of social impact.", icon: Award },
  { year: "2025", title: "Regenerative Farming Initiative", desc: "Launched our regenerative agriculture program supporting 52 sustainable farms worldwide.", icon: Sprout },
];

const values = [
  { title: "Craft", desc: "We obsess over every detail, from sourcing to the final pour.", icon: Coffee },
  { title: "Courage", desc: "We take bold steps toward a sustainable future, even when it's hard.", icon: Heart },
  { title: "Results", desc: "We measure success by impact — on communities, planet, and flavor.", icon: Award },
];

const CompanyHistory = () => {
  useDocumentTitle("Our Company & History", "Discover Arbor Coffee & Co.'s journey from a Portland roastery to a global B Corp-certified sustainable coffee company.");

  return (
    <Layout>
      <section className="py-20" aria-labelledby="story-heading">
        <div className="container max-w-3xl text-center">
          <h1 id="story-heading" className="font-display text-4xl md:text-5xl font-bold text-primary mb-6">Our Story</h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            From a small roastery in Portland to a global force for sustainable coffee — our journey has been guided by a simple belief: great coffee should do good.
          </p>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16" aria-labelledby="timeline-heading">
        <h2 id="timeline-heading" className="sr-only">Company Timeline</h2>
        <div className="container max-w-2xl">
          <ol className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-px bg-border" aria-hidden="true" />
            <div className="space-y-12">
              {milestones.map((m) => {
                const Icon = m.icon;
                return (
                  <li key={m.year} className="relative pl-16">
                    <div className="absolute left-0 w-12 h-12 rounded-full bg-secondary flex items-center justify-center" aria-hidden="true">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <time className="text-sm text-accent font-semibold tracking-wider mb-1 block">{m.year}</time>
                    <h3 className="font-display text-xl font-bold text-primary mb-1">{m.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{m.desc}</p>
                  </li>
                );
              })}
            </div>
          </ol>
        </div>
      </section>

      {/* Values Grid */}
      <section className="py-16 border-t border-border" aria-labelledby="values-heading">
        <div className="container">
          <h2 id="values-heading" className="font-display text-3xl font-bold text-primary text-center mb-12">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((v) => {
              const Icon = v.icon;
              return (
                <article key={v.title} className="bg-secondary/50 rounded-lg p-8 text-center">
                  <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4" aria-hidden="true">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-primary mb-2">{v.title}</h3>
                  <p className="text-sm text-muted-foreground">{v.desc}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default CompanyHistory;
