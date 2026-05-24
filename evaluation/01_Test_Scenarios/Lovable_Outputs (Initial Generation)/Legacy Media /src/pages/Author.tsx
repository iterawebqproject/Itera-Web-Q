import authorPortrait from "@/assets/author-portrait.jpg";
import ReadTimeBadge from "@/components/ReadTimeBadge";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import PageMeta from "@/components/PageMeta";
import { Link } from "react-router-dom";

const articles = [
  { title: "Dr. Elena Vasquez: The Scientist Who Rewrote the Rules of Medicine", date: "April 2, 2026", minutes: 8 },
  { title: "The Silent Revolution in Quantum Computing", date: "April 6, 2026", minutes: 12 },
  { title: "How the Global South Is Reshaping Trade Policy", date: "April 5, 2026", minutes: 9 },
  { title: "Inside the Battle for Press Freedom in Southeast Asia", date: "April 4, 2026", minutes: 15 },
  { title: "The New Economics of Climate Migration", date: "April 3, 2026", minutes: 8 },
];

const Author = () => (
  <div className="min-h-screen bg-background">
    <PageMeta title="Catherine Morales" description="Catherine Morales — Pulitzer Prize–winning senior correspondent at Legacy Media covering science, technology, and global affairs." />
    <SiteHeader />
    <main id="main-content" className="pt-28 pb-20">
      <div className="container mx-auto px-6 max-w-2xl">
        {/* Bio */}
        <div className="flex flex-col items-center text-center mb-16">
          <img
            src={authorPortrait}
            alt="Catherine Morales"
            className="w-24 h-24 rounded-full object-cover mb-4"
          />
          <h1 className="font-heading text-3xl font-bold text-foreground">Catherine Morales</h1>
          <p className="font-body text-sm text-muted-foreground mt-1">Senior Correspondent</p>
          <p className="font-body text-base text-foreground mt-4 leading-relaxed max-w-md">
            Catherine Morales is a Pulitzer Prize–winning journalist covering science, technology, and global affairs.
            She has reported from over 40 countries and is a regular contributor to Legacy Media's long-form investigations.
          </p>
        </div>

        {/* Articles */}
        <h2 className="font-body text-xs tracking-[0.3em] uppercase text-muted-foreground mb-6">Published Stories</h2>
        <div>
          {articles.map((a, i) => (
            <Link to="/winner-profile-detail" key={i} className="block group">
              <article className={`py-5 ${i > 0 ? "border-t border-border" : ""}`}>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-heading text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                      {a.title}
                    </h3>
                    <p className="font-body text-xs text-muted-foreground mt-1"><time>{a.date}</time></p>
                  </div>
                  <ReadTimeBadge minutes={a.minutes} />
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </main>
    <SiteFooter />
  </div>
);

export default Author;
