import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Twitter, Instagram, Music, Globe, ArrowLeft } from "lucide-react";
import Layout from "@/components/Layout";
import ReviewBadge from "@/components/ReviewBadge";
import useDocumentHead from "@/hooks/useDocumentHead";
import profileHero from "@/assets/singer-profile-hero.jpg";
import album1 from "@/assets/album-1.jpg";
import album2 from "@/assets/album-2.jpg";
import album3 from "@/assets/album-3.jpg";
import artist2 from "@/assets/artist-2.jpg";
import artist3 from "@/assets/artist-3.jpg";
import artistFeatured from "@/assets/artist-featured.jpg";

const discography = [
  { id: "midnight-frequencies", title: "Midnight Frequencies", year: "2026", image: album1, score: 9 },
  { id: "soft-echoes", title: "Soft Echoes", year: "2024", image: album2, score: 7 },
  { id: "first-light", title: "First Light", year: "2022", image: album3, score: 8 },
];

const relatedArtists = [
  { name: "Ari Nova", genre: "Pop", image: artist2, slug: "ari-nova" },
  { name: "DRAKO", genre: "Hip-Hop", image: artist3, slug: "drako" },
  { name: "Jake Rivers", genre: "Rock", image: artistFeatured, slug: "jake-rivers" },
];

const socialLinks = [
  { icon: Twitter, label: "Twitter" },
  { icon: Instagram, label: "Instagram" },
  { icon: Music, label: "Spotify" },
  { icon: Globe, label: "Website" },
];

const SingerProfile = () => {
  useDocumentHead({
    title: "Luna Vex — Artist Profile",
    description: "Explore Luna Vex's biography, discography, and exclusive interview on Ms Music.",
  });

  return (
    <Layout>
      {/* JSON-LD Person schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Luna Vex",
            jobTitle: "Musician",
            genre: "Indie Pop",
            url: "https://ms-music-vibe.lovable.app/singer/luna-vex",
          }),
        }}
      />

      {/* Full-bleed Portrait */}
      <section className="relative h-[80vh] overflow-hidden" aria-label="Artist portrait">
        <img src={profileHero} alt="Luna Vex editorial portrait" className="absolute inset-0 w-full h-full object-cover object-top" width={1920} height={1080} fetchPriority="high" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" aria-hidden="true" />
        <div className="absolute bottom-0 left-0 right-0 container mx-auto px-4 pb-12 z-10">
          <nav aria-label="Breadcrumb" className="mb-4">
            <Link to="/singer" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
              <ArrowLeft size={14} aria-hidden="true" /> Back to Artists
            </Link>
          </nav>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-9xl font-black tracking-tighter leading-none"
          >
            Luna <span className="editorial-gradient-text">Vex</span>
          </motion.h1>
          <div className="flex items-center gap-3 mt-4">
            <ReviewBadge score={0} label="Indie Pop" />
            <ReviewBadge score={0} label="Vocalist" />
          </div>
        </div>
      </section>

      {/* Bio & Interview */}
      <section className="py-20" aria-label="Biography and interview">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-16">
            <div className="md:col-span-2">
              <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-primary mb-4">The Interview</h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-xl leading-relaxed text-foreground">
                  Luna Vex didn't plan on becoming a musician. Growing up in a small coastal town, she spent her evenings recording whispered melodies into her phone. Those raw, unpolished demos found their way online, and the rest is history.
                </p>
                <blockquote className="text-3xl font-black tracking-tight border-l-4 border-primary pl-6 my-10 not-italic text-foreground">
                  "I write songs in the dark — literally. No lights, no screens, just me and the piano."
                </blockquote>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Her debut album "First Light" was recorded entirely in her bedroom using a second-hand interface and a borrowed microphone. Critics called it "achingly beautiful" and "a masterclass in vulnerability." By 2024, she had signed with an independent label and released "Soft Echoes," a more expansive sophomore effort that explored themes of distance, memory, and longing.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed mt-6">
                  Now, with "Midnight Frequencies," Luna has cemented her place as one of the most compelling voices of her generation. The album is dense, layered, and deeply personal — a sonic tapestry that rewards repeated listens.
                </p>
              </div>
            </div>
            <aside>
              <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-primary mb-4">Quick Facts</h3>
              <dl className="space-y-4">
                {[
                  ["Origin", "Portland, Oregon"],
                  ["Genre", "Indie Pop / Dream Pop"],
                  ["Active Since", "2021"],
                  ["Label", "Velvet Records"],
                  ["Albums", "3"],
                ].map(([label, value]) => (
                  <div key={label} className="border-b border-border pb-3">
                    <dt className="text-xs text-muted-foreground uppercase tracking-widest">{label}</dt>
                    <dd className="font-bold mt-1">{value}</dd>
                  </div>
                ))}
              </dl>

              <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-primary mt-10 mb-4">Connect</h3>
              <div className="flex gap-3">
                {socialLinks.map((s) => (
                  <a
                    key={s.label}
                    href="#"
                    aria-label={`Visit Luna Vex on ${s.label}`}
                    className="w-10 h-10 border border-border flex items-center justify-center hover:border-primary hover:text-primary transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  >
                    <s.icon size={18} aria-hidden="true" />
                  </a>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Discography */}
      <section className="bg-secondary py-20" aria-label="Discography">
        <div className="container mx-auto px-4">
          <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-primary mb-2">Discography</h2>
          <p className="text-3xl md:text-5xl font-black tracking-tighter text-secondary-foreground mb-12">The Records</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {discography.map((d, i) => (
              <motion.article
                key={d.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group"
              >
                <div className="relative aspect-square overflow-hidden">
                  <img src={d.image} alt={`Album cover: ${d.title}`} className="hover-bw-to-color w-full h-full object-cover" loading="lazy" />
                  <div className="absolute top-3 right-3">
                    <ReviewBadge score={d.score} />
                  </div>
                </div>
                <h3 className="text-xl font-black mt-4 text-secondary-foreground">{d.title}</h3>
                <span className="text-sm text-muted-foreground">{d.year}</span>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Related Artists */}
      <section className="py-20" aria-label="Related artists">
        <div className="container mx-auto px-4">
          <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-primary mb-2">You Might Also Like</h2>
          <p className="text-3xl font-black tracking-tighter mb-10">Related Artists</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {relatedArtists.map((a) => (
              <Link to={`/singer/${a.slug}`} key={a.slug} className="group focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img src={a.image} alt={`Portrait of ${a.name}`} className="hover-bw-to-color w-full h-full object-cover" loading="lazy" />
                </div>
                <h3 className="text-xl font-black mt-4 group-hover:text-primary transition-colors">{a.name}</h3>
                <span className="text-sm text-muted-foreground">{a.genre}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default SingerProfile;
