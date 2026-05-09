import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import { Star, ThumbsUp } from "lucide-react";

const overallScore = 92;

const reviews = [
  { user: "MissionControl_42", score: 9.2, date: "2024-03-15", text: "Perfectly balances espionage tension with family comedy. The character dynamics are unmatched in modern anime.", likes: 234 },
  { user: "AnyaFanatic", score: 9.8, date: "2024-03-10", text: "Waku waku! Every episode is a rollercoaster of emotions. Anya is the greatest anime character of this decade.", likes: 567 },
  { user: "AnimeCritic_Pro", score: 8.7, date: "2024-02-28", text: "WIT Studio and CloverWorks deliver stunning animation with heartfelt storytelling. A must-watch for any anime fan.", likes: 189 },
  { user: "SpyHunter99", score: 9.0, date: "2024-02-20", text: "The spy thriller elements are genuinely engaging. Twilight is one of the best written protagonists in recent memory.", likes: 145 },
  { user: "ComedyKing", score: 8.5, date: "2024-02-15", text: "Laugh-out-loud moments in every episode. The situational comedy from the family's secrets is pure genius.", likes: 98 },
  { user: "YorSimp2024", score: 10, date: "2024-01-30", text: "Yor is the best character. The action scenes with her are absolutely phenomenal. Perfect 10 from me!", likes: 412 },
  { user: "SliceOfLifeFan", score: 8.9, date: "2024-01-25", text: "The domestic scenes are where this show really shines. Watching the Forgers navigate everyday life is pure joy.", likes: 76 },
  { user: "MangaReader_OG", score: 9.1, date: "2024-01-10", text: "Faithful adaptation of the manga with beautiful added details. The anime elevates an already fantastic source material.", likes: 203 },
];

const FanReviews = () => (
  <div className="min-h-screen flex flex-col">
    <PageMeta
      title="Fan Reviews"
      description="Read community reviews and ratings for Spy x Family from fellow anime fans."
      path="/reviews"
    />
    <Navbar />
    <main id="main-content" className="flex-1 pt-24 container mx-auto px-4">
      <h1 className="font-display font-bold text-4xl text-foreground mb-8">Community Intel</h1>

      {/* Score Dashboard */}
      <section aria-labelledby="community-score" className="glass rounded-2xl p-8 md:p-12 mb-12 flex flex-col md:flex-row items-center gap-8">
        <div className="flex-shrink-0 relative w-36 h-36" role="img" aria-label={`Community score: ${overallScore}%`}>
          <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90" aria-hidden="true">
            <circle cx="50" cy="50" r="44" fill="none" stroke="hsl(var(--muted))" strokeWidth="8" />
            <circle
              cx="50" cy="50" r="44"
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${overallScore * 2.76} 276`}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-display font-bold text-4xl text-foreground">{overallScore}%</span>
          </div>
        </div>
        <div>
          <h2 id="community-score" className="font-display font-bold text-2xl text-foreground">Community Score</h2>
          <p className="text-muted-foreground mt-1">Based on {reviews.length} field agent reports</p>
          <div className="flex items-center gap-1 mt-3" aria-label="4.6 out of 5 stars">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={18} className={i < 4 ? "text-secondary fill-secondary" : "text-secondary fill-secondary/30"} aria-hidden="true" />
            ))}
            <span className="text-sm text-muted-foreground ml-2">4.6 / 5</span>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section aria-label="User reviews" className="space-y-4 pb-20">
        {reviews.map((r) => (
          <article key={r.user} className="glass rounded-xl p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm" aria-hidden="true">
                  {r.user[0]}
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">{r.user}</p>
                  <time className="text-xs text-muted-foreground" dateTime={r.date}>{r.date}</time>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Star size={14} className="text-secondary fill-secondary" aria-hidden="true" />
                <span className="font-bold text-foreground text-sm" aria-label={`${r.score} out of 10`}>{r.score}</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">{r.text}</p>
            <div className="flex items-center gap-2 mt-3 text-muted-foreground">
              <ThumbsUp size={14} aria-hidden="true" />
              <span className="text-xs">{r.likes} likes</span>
            </div>
          </article>
        ))}
      </section>
    </main>
    <Footer />
  </div>
);

export default FanReviews;
