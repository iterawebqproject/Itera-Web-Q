import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import { Link } from "react-router-dom";
import { ArrowRight, Film, Calendar, Building2 } from "lucide-react";
import heroBanner from "@/assets/hero-banner.jpg";

const episodes = [
  { num: 1, title: "Operation Strix", desc: "Agent Twilight is given his most difficult mission yet — create a fake family." },
  { num: 2, title: "Secure a Wife", desc: "Loid encounters Yor Briar and proposes a marriage of convenience." },
  { num: 3, title: "Prepare for the Interview", desc: "The Forger family prepares Anya for Eden Academy's entrance exam." },
  { num: 4, title: "The Prestigious School", desc: "Anya faces the grueling admission interview at Eden Academy." },
  { num: 5, title: "Will They Pass or Fail", desc: "Results day arrives with unexpected complications for the family." },
  { num: 6, title: "The Friendship Scheme", desc: "Anya must befriend Damian Desmond to get close to his father." },
];

const SynopsisPage = () => (
  <div className="min-h-screen flex flex-col">
    <PageMeta
      title="Synopsis"
      description="Read the classified mission dossier for Spy x Family Season 1, including episode briefings and production details."
      path="/synopsis"
    />
    <Navbar />

    <main id="main-content" className="flex-1">
      {/* Hero Banner */}
      <section className="relative h-[50vh] flex items-end">
        <img src={heroBanner} alt="Synopsis banner — Spy x Family key art" className="absolute inset-0 w-full h-full object-cover" width={1920} height={768} loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        <div className="relative container mx-auto px-4 pb-12">
          <h1 className="font-display font-bold text-5xl text-foreground">Mission Dossier</h1>
          <p className="text-muted-foreground mt-2 text-lg">Season 1 — Classified Synopsis</p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* Production Info */}
        <section aria-labelledby="prod-info" className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          <h2 id="prod-info" className="sr-only">Production Information</h2>
          {[
            { icon: Building2, label: "Studio", value: "WIT Studio × CloverWorks" },
            { icon: Calendar, label: "Aired", value: "April 2022 — December 2022" },
            { icon: Film, label: "Episodes", value: "25 Episodes" },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="glass rounded-xl p-5 flex items-center gap-4">
              <div className="p-3 rounded-lg bg-primary/15" aria-hidden="true">
                <Icon size={20} className="text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{label}</p>
                <p className="font-semibold text-foreground text-sm">{value}</p>
              </div>
            </div>
          ))}
        </section>

        {/* Episode Overview */}
        <section aria-labelledby="ep-briefings">
          <h2 id="ep-briefings" className="font-display font-bold text-2xl text-foreground mb-6">Episode Briefings</h2>
          <ol className="space-y-3 mb-12 list-none p-0">
            {episodes.map((ep) => (
              <li key={ep.num} className="glass rounded-xl p-5 flex gap-4 items-start">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center font-bold text-primary text-sm" aria-hidden="true">
                  {String(ep.num).padStart(2, "0")}
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Ep {ep.num}: {ep.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{ep.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <Link
          to="/characters"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold transition-all hover:opacity-90 focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
        >
          View Character Profiles <ArrowRight size={18} aria-hidden="true" />
        </Link>
      </div>
    </main>

    <Footer />
  </div>
);

export default SynopsisPage;
