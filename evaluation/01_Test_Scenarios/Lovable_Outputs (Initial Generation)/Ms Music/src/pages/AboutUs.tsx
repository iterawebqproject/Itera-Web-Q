import { motion } from "framer-motion";
import { Mail, MapPin, Download } from "lucide-react";
import Layout from "@/components/Layout";
import useDocumentHead from "@/hooks/useDocumentHead";
import teamImg from "@/assets/team-editorial.jpg";
import artist2 from "@/assets/artist-2.jpg";
import artist3 from "@/assets/artist-3.jpg";
import artist4 from "@/assets/artist-4.jpg";
import artistFeatured from "@/assets/artist-featured.jpg";

const team = [
  { id: "sasha", name: "Sasha Chen", role: "Editor-in-Chief", image: artist4 },
  { id: "marcus", name: "Marcus Dean", role: "Music Director", image: artistFeatured },
  { id: "priya", name: "Priya Malhotra", role: "Senior Writer", image: artist2 },
  { id: "jordan", name: "Jordan Blake", role: "Visual Editor", image: artist3 },
];

const AboutUs = () => {
  useDocumentHead({
    title: "About Us",
    description: "Learn about Ms Music — our vision, editorial team, and how to get in touch.",
  });

  return (
    <Layout>
      {/* Vision Statement */}
      <section className="pt-32 pb-20" aria-label="Brand vision">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl">
            <span className="score-badge score-badge-high mb-6 inline-block">About Ms Music</span>
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-none">
              We Don't Follow<br />
              <span className="editorial-gradient-text">The Sound.</span><br />
              We Define It.
            </h1>
            <p className="mt-8 text-xl text-muted-foreground leading-relaxed max-w-2xl">
              Ms Music is more than a magazine — it's a movement. Founded in 2020, we've built a platform that celebrates the raw, the bold, and the unapologetically authentic in music. From underground scenes to arena headliners, we're the lens through which culture discovers its next obsession.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Editorial Team */}
      <section className="bg-secondary py-20" aria-label="Editorial team">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center mb-16">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-primary mb-2">Our Team</h2>
              <p className="text-3xl md:text-5xl font-black tracking-tighter text-secondary-foreground">
                The Voices Behind the Voice
              </p>
              <p className="mt-6 text-lg text-secondary-foreground/70 leading-relaxed">
                A collective of writers, photographers, and music obsessives who live and breathe sound. Every review is earned, every interview is real.
              </p>
            </div>
            <div className="aspect-video overflow-hidden">
              <img src={teamImg} alt="Ms Music editorial team collaborating in the office" className="w-full h-full object-cover" loading="lazy" width={1200} height={800} />
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {team.map((member, i) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="aspect-[3/4] overflow-hidden">
                  <img src={member.image} alt={`${member.name}, ${member.role}`} className="hover-bw-to-color w-full h-full object-cover" loading="lazy" />
                </div>
                <h3 className="font-bold mt-3 text-secondary-foreground">{member.name}</h3>
                <p className="text-sm text-primary">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact & Press Kit */}
      <section className="py-20" aria-label="Contact information and press kit">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-primary mb-2">Get In Touch</h2>
              <p className="text-3xl font-black tracking-tighter mb-8">Contact & Booking</p>
              <address className="space-y-6 not-italic">
                <div className="flex items-start gap-4">
                  <Mail className="text-primary mt-1" size={20} aria-hidden="true" />
                  <div>
                    <h4 className="font-bold">General Inquiries</h4>
                    <a href="mailto:hello@msmusic.com" className="text-muted-foreground hover:text-primary transition-colors">hello@msmusic.com</a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Mail className="text-primary mt-1" size={20} aria-hidden="true" />
                  <div>
                    <h4 className="font-bold">Press & Partnerships</h4>
                    <a href="mailto:press@msmusic.com" className="text-muted-foreground hover:text-primary transition-colors">press@msmusic.com</a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <MapPin className="text-primary mt-1" size={20} aria-hidden="true" />
                  <div>
                    <h4 className="font-bold">Headquarters</h4>
                    <p className="text-muted-foreground">Brooklyn, New York</p>
                  </div>
                </div>
              </address>
            </div>
            <div>
              <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-primary mb-2">Press Kit</h2>
              <p className="text-3xl font-black tracking-tighter mb-8">For Media</p>
              <p className="text-muted-foreground mb-8">
                Download our press kit for logos, brand guidelines, editorial samples, and high-res photography assets.
              </p>
              <button
                className="inline-flex items-center gap-3 editorial-gradient-bg text-primary-foreground px-8 py-4 font-bold uppercase text-sm tracking-widest hover:opacity-90 transition-opacity focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                aria-label="Download press kit (PDF)"
              >
                <Download size={18} aria-hidden="true" /> Download Press Kit
              </button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AboutUs;
