import { useState } from "react";
import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import { motion } from "framer-motion";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";

const leaders = [
  { name: "Dr. Elena Vasquez", title: "Chief Executive Officer", bio: "Dr. Vasquez has led VitalityGlobal since 2019, driving a 45% increase in sustainable revenue. With a Ph.D. in Environmental Economics from MIT, she brings deep expertise in ESG strategy and stakeholder governance. Under her leadership, the company achieved its highest-ever ethical governance ratings.", initials: "EV", color: "bg-primary" },
  { name: "Marcus Chen", title: "Chief Financial Officer", bio: "Marcus oversees all financial operations with a focus on sustainable investment strategies. Previously a Managing Director at Goldman Sachs, he has spearheaded VitalityGlobal's green bond program, raising over $4B for renewable energy projects.", initials: "MC", color: "bg-secondary" },
  { name: "Amara Okonkwo", title: "Chief Sustainability Officer", bio: "Amara leads the company's Net Zero 2040 initiative and circular economy programs. A former UN Climate Advisor, she designed VitalityGlobal's award-winning plastic reduction framework that reduced single-use plastics by 40%.", initials: "AO", color: "bg-primary" },
  { name: "James Harrington", title: "Chief Operating Officer", bio: "James manages global operations across 42 countries, ensuring efficiency and ethical supply chain practices. His 20+ years in logistics and operations have been instrumental in the company's expansion into emerging markets.", initials: "JH", color: "bg-deep-blue" },
  { name: "Dr. Priya Sharma", title: "Chief Innovation Officer", bio: "Dr. Sharma leads R&D across health sciences and renewable technologies. She holds 14 patents in biotech and has published extensively on sustainable materials. Her lab has developed breakthrough biodegradable packaging adopted by three of our brands.", initials: "PS", color: "bg-secondary" },
  { name: "Robert Lindqvist", title: "Chief People Officer", bio: "Robert champions VitalityGlobal's inclusive culture and talent development programs. He implemented the company's industry-leading parental leave policy and launched the Global Leadership Academy, which has trained over 5,000 emerging leaders.", initials: "RL", color: "bg-primary" },
];

const Leadership = () => {
  const [selected, setSelected] = useState<typeof leaders[0] | null>(null);

  return (
    <Layout>
      <SEOHead
        title="Leadership"
        description="Meet the experienced professionals steering VitalityGlobal toward a sustainable and ethical future."
        path="/leadership"
      />

      <section className="container py-20" aria-labelledby="leadership-heading">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 id="leadership-heading" className="text-4xl md:text-5xl font-bold mb-4">Our Leadership</h1>
          <p className="text-muted-foreground text-lg mb-12 max-w-2xl">
            Meet the experienced professionals steering VitalityGlobal toward a sustainable and ethical future.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-8" role="list" aria-label="Leadership team">
          {leaders.map((leader, i) => (
            <motion.button
              key={leader.name}
              role="listitem"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              onClick={() => setSelected(leader)}
              aria-label={`View biography of ${leader.name}, ${leader.title}`}
              className="bg-card border rounded-lg p-6 text-center hover:shadow-lg transition-all group cursor-pointer focus-visible:outline-2 focus-visible:outline-primary"
            >
              <div className={`w-20 h-20 rounded-full ${leader.color} flex items-center justify-center mx-auto mb-4 text-white text-xl font-bold group-hover:scale-105 transition-transform`} aria-hidden="true">
                {leader.initials}
              </div>
              <h3 className="font-bold">{leader.name}</h3>
              <p className="text-sm text-muted-foreground">{leader.title}</p>
            </motion.button>
          ))}
        </div>
      </section>

      {/* Bio Modal */}
      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="max-w-lg">
          {selected && (
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className={`w-16 h-16 rounded-full ${selected.color} flex items-center justify-center text-white text-lg font-bold`} aria-hidden="true">
                  {selected.initials}
                </div>
                <div>
                  <DialogTitle className="text-xl font-bold">{selected.name}</DialogTitle>
                  <DialogDescription className="text-sm text-muted-foreground">{selected.title}</DialogDescription>
                </div>
              </div>
              <p className="text-foreground leading-relaxed">{selected.bio}</p>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Governance */}
      <section className="bg-muted py-20" aria-labelledby="governance-heading">
        <div className="container max-w-3xl">
          <h2 id="governance-heading" className="text-3xl font-bold mb-6">Corporate Governance</h2>
          <p className="text-foreground leading-relaxed mb-4">
            At VitalityGlobal, governance is not merely a compliance exercise—it is the bedrock of our
            corporate identity. Our Board of Directors operates with full independence, guided by a
            commitment to transparency, accountability, and long-term stakeholder value.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            We adhere to the highest standards of ethical conduct, with robust anti-corruption policies,
            comprehensive whistleblower protections, and regular third-party audits. Our governance
            framework ensures that every decision reflects our commitment to people, planet, and
            responsible profit.
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default Leadership;
