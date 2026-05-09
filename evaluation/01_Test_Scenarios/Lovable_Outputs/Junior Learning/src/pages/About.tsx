import Layout from "@/components/Layout";
import PageMeta from "@/components/PageMeta";
import { ShieldCheck, Unlock } from "lucide-react";

const values = [
  { icon: ShieldCheck, title: "Verified by Experts", desc: "Every textbook is reviewed by certified educators." },
  { icon: Unlock, title: "Openly Licensed", desc: "All materials are free to use, share, and adapt." },
];

const About = () => {
  return (
    <Layout>
      <PageMeta title="About Us" description="Learn about Junior Learning's mission to make quality education free and accessible for every child." />
      <section className="container py-20 max-w-2xl mx-auto text-center" aria-labelledby="mission-heading">
        <h1 id="mission-heading" className="text-4xl md:text-5xl font-bold mb-6">Our Mission</h1>
        <p className="text-xl leading-relaxed text-muted-foreground mb-16">
          Junior Learning exists to make quality education accessible to every child on the planet. We believe that no textbook should cost money and no learner should be left behind. Our library is free, forever.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {values.map((v) => (
            <div key={v.title} className="rounded-2xl border border-border bg-card p-8 flex flex-col items-center gap-3">
              <div className="rounded-full p-4 bg-accent">
                <v.icon className="h-10 w-10 text-secondary" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-bold">{v.title}</h3>
              <p className="text-muted-foreground text-sm">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default About;
