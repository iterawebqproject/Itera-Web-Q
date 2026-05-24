import { useState } from "react";
import { Target, Heart, Globe } from "lucide-react";
import LeaderModal from "@/components/LeaderModal";
import PageMeta from "@/components/PageMeta";
import leader1 from "@/assets/leader-1.jpg";
import leader2 from "@/assets/leader-2.jpg";
import leader3 from "@/assets/leader-3.jpg";
import leader4 from "@/assets/leader-4.jpg";

const timeline = [
  { year: "1985", event: "Founded as a small family business in New York" },
  { year: "1996", event: "Expanded operations to 10 countries" },
  { year: "2005", event: "Launched first sustainability initiative" },
  { year: "2012", event: "Reached 50 million consumers globally" },
  { year: "2020", event: "Committed to net-zero carbon by 2035" },
  { year: "2026", event: "Operating in 50+ countries with 20 brands" },
];

const leaders = [
  { name: "James Mitchell", role: "Chief Executive Officer", image: leader1, bio: "James has led A Company for over 15 years, driving strategic growth and sustainability initiatives. Under his leadership, the company has expanded to 50+ markets while reducing its carbon footprint by 30%. He holds an MBA from Harvard Business School." },
  { name: "Sarah Chen", role: "Chief Financial Officer", image: leader2, bio: "Sarah oversees all financial operations and investor relations. With 20 years of experience in corporate finance, she has been instrumental in driving profitability while investing in sustainable growth." },
  { name: "David Larsson", role: "Chief Operating Officer", image: leader3, bio: "David manages global operations across 50+ countries. His expertise in supply chain optimization has helped reduce costs by 18% while improving delivery times." },
  { name: "Maria Rodriguez", role: "Chief Technology Officer", image: leader4, bio: "Maria leads digital transformation and innovation strategy. She has pioneered the company's AI-driven consumer insights platform and oversees a team of 200+ engineers." },
];

const values = [
  { icon: Target, title: "Excellence", desc: "We pursue the highest standards in everything we do, from product quality to customer service." },
  { icon: Heart, title: "Integrity", desc: "We act with honesty and transparency, building trust with our stakeholders every day." },
  { icon: Globe, title: "Sustainability", desc: "We are committed to protecting our planet for future generations through responsible business practices." },
];

const Corporate = () => {
  const [selectedLeader, setSelectedLeader] = useState<typeof leaders[0] | null>(null);

  return (
    <main id="main-content" className="pt-20">
      <PageMeta
        title="Corporate"
        description="Learn about A Company's history, leadership team, and core values. Four decades of building brands that enrich lives."
        canonical="https://vision-spotlight-72.lovable.app/corporate"
      />

      {/* Vision */}
      <section className="section-padding bg-secondary text-secondary-foreground" aria-labelledby="corp-heading">
        <div className="max-w-4xl mx-auto text-center">
          <h1 id="corp-heading" className="text-4xl md:text-5xl font-black text-primary-foreground mb-6">Our Corporate Identity</h1>
          <p className="text-lg text-primary-foreground/70 leading-relaxed">
            For over four decades, A Company has been building brands that enrich lives. Our vision is to be the world's most trusted consumer goods company.
          </p>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding" aria-labelledby="history-heading">
        <div className="max-w-3xl mx-auto">
          <h2 id="history-heading" className="section-title text-center mb-12">Our History</h2>
          <ol className="relative border-l-2 border-primary/30 pl-8 space-y-10">
            {timeline.map((t) => (
              <li key={t.year} className="relative">
                <div className="absolute -left-[41px] top-1 w-4 h-4 rounded-full bg-primary" aria-hidden="true" />
                <p className="text-sm font-bold text-primary uppercase tracking-wider">{t.year}</p>
                <p className="text-foreground mt-1">{t.event}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Leadership */}
      <section className="section-padding bg-muted" aria-labelledby="leadership-heading">
        <div className="max-w-4xl mx-auto">
          <h2 id="leadership-heading" className="section-title text-center mb-12">Leadership Team</h2>
          <div className="space-y-6">
            {leaders.map((leader) => (
              <button
                key={leader.name}
                onClick={() => setSelectedLeader(leader)}
                className="w-full flex items-center gap-6 bg-card rounded-lg p-4 card-hover text-left cursor-pointer"
                aria-label={`View biography of ${leader.name}, ${leader.role}`}
              >
                <img src={leader.image} alt="" className="w-20 h-20 rounded-full object-cover" loading="lazy" width={80} height={80} />
                <div>
                  <h3 className="text-lg font-bold text-secondary">{leader.name}</h3>
                  <p className="text-sm text-primary font-medium">{leader.role}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <LeaderModal leader={selectedLeader} open={!!selectedLeader} onOpenChange={(open) => !open && setSelectedLeader(null)} />

      {/* Values */}
      <section className="section-padding" aria-labelledby="values-heading">
        <div className="max-w-5xl mx-auto">
          <h2 id="values-heading" className="section-title text-center mb-12">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((v) => (
              <div key={v.title} className="text-center p-8 rounded-lg border border-border card-hover">
                <v.icon className="w-10 h-10 text-primary mx-auto mb-4" aria-hidden="true" />
                <h3 className="text-xl font-bold text-secondary mb-3">{v.title}</h3>
                <p className="text-sm text-muted-foreground">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Corporate;
