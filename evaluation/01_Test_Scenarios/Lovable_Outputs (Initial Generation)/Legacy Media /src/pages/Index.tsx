import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-story.jpg";
import portrait1 from "@/assets/portrait-1.jpg";
import portrait2 from "@/assets/portrait-2.jpg";
import portrait3 from "@/assets/portrait-3.jpg";
import portrait4 from "@/assets/portrait-4.jpg";
import PortraitCard from "@/components/PortraitCard";
import ReadTimeBadge from "@/components/ReadTimeBadge";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import PageMeta from "@/components/PageMeta";
import { useState } from "react";

const latestNews = [
  { title: "The Silent Revolution in Quantum Computing", date: "April 6, 2026", minutes: 12 },
  { title: "How the Global South Is Reshaping Trade Policy", date: "April 5, 2026", minutes: 9 },
  { title: "Inside the Battle for Press Freedom in Southeast Asia", date: "April 4, 2026", minutes: 15 },
  { title: "The New Economics of Climate Migration", date: "April 3, 2026", minutes: 8 },
  { title: "Why the World's Central Banks Are Watching Tokyo", date: "April 2, 2026", minutes: 11 },
];

const honorees = [
  { name: "Dr. Elena Vasquez", image: portrait1 },
  { name: "Amir Khaled", image: portrait2 },
  { name: "Prof. Henrik Larsson", image: portrait3 },
  { name: "Maya Chen", image: portrait4 },
];

const Index = () => {
  const [email, setEmail] = useState("");

  return (
    <div className="min-h-screen bg-background">
      <PageMeta
        title="Home"
        description="World-class journalism since 1923. Deep analytical stories, People of the Year, and more from Legacy Media."
      />
      <SiteHeader />

      {/* Hero */}
      <section className="relative pt-20" aria-label="Featured story">
        <div className="relative h-[70vh] md:h-[85vh] overflow-hidden">
          <img
            src={heroImage}
            alt="Leaders who defined a decade of change — featured cover story"
            width={1920}
            height={1080}
            className="w-full h-full object-cover"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-16">
            <ReadTimeBadge minutes={14} />
            <h1 className="font-heading text-3xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mt-4 max-w-3xl leading-tight">
              The Leaders Who Defined a Decade of Change
            </h1>
            <p className="font-body text-sm md:text-base text-primary-foreground/80 mt-4 max-w-xl">
              An exclusive investigation into the figures shaping global policy, technology, and culture in 2026.
            </p>
          </div>
        </div>
      </section>

      {/* The Latest */}
      <section className="container mx-auto px-6 py-16 md:py-24" aria-label="Latest news" id="main-content">
        <h2 className="font-body text-xs tracking-[0.3em] uppercase text-muted-foreground mb-8">The Latest</h2>
        <div className="max-w-2xl">
          {latestNews.map((item, i) => (
            <Link to="/winner-profile-detail" key={i} className="block group">
              <article className={`py-6 ${i > 0 ? "border-t border-border" : ""}`}>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-heading text-xl md:text-2xl font-semibold text-foreground group-hover:text-primary transition-colors leading-snug">
                      {item.title}
                    </h3>
                    <p className="font-body text-xs text-muted-foreground mt-2">
                      <time>{item.date}</time>
                    </p>
                  </div>
                  <ReadTimeBadge minutes={item.minutes} />
                </div>
              </article>
            </Link>
          ))}
        </div>
      </section>

      {/* People of the Year Preview */}
      <section className="container mx-auto px-6 py-16 md:py-24 border-t border-border" aria-label="People of the Year">
        <div className="flex items-end justify-between mb-10">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">People of the Year</h2>
          <Link
            to="/people-of-the-year"
            className="font-body text-xs tracking-widest uppercase text-primary hover:underline"
          >
            View All →
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {honorees.map((h) => (
            <PortraitCard key={h.name} name={h.name} image={h.image} slug="/winner-profile-detail" />
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-primary py-16 md:py-20" aria-label="Newsletter signup">
        <div className="container mx-auto px-6 text-center max-w-lg">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-primary-foreground">
            Subscribe to Legacy Digital
          </h2>
          <p className="font-body text-sm text-primary-foreground/80 mt-3">
            Get our best stories delivered to your inbox every morning.
          </p>
          <form onSubmit={(e) => e.preventDefault()} className="flex mt-6 gap-0">
            <label htmlFor="newsletter-email" className="sr-only">Email address</label>
            <input
              id="newsletter-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              autoComplete="email"
              className="flex-1 px-4 py-3 font-body text-sm bg-primary-foreground text-foreground placeholder:text-muted-foreground outline-none focus-visible:ring-2 focus-visible:ring-accent"
            />
            <button
              type="submit"
              className="px-6 py-3 font-body text-xs tracking-widest uppercase bg-charcoal text-primary-foreground hover:bg-foreground transition-colors focus-visible:outline-2 focus-visible:outline-primary-foreground focus-visible:outline-offset-2"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
};

export default Index;
