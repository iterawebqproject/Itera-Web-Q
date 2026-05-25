import { useState, useMemo } from "react";
import athlete1 from "@/assets/athlete-1.jpg";
import athlete2 from "@/assets/athlete-2.jpg";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import PageMeta from "@/components/PageMeta";

type SortBy = "gold" | "total";

const medalData = [
  { country: "Norway", gold: 18, silver: 14, bronze: 11 },
  { country: "Germany", gold: 14, silver: 10, bronze: 7 },
  { country: "United States", gold: 12, silver: 13, bronze: 15 },
  { country: "Canada", gold: 11, silver: 8, bronze: 14 },
  { country: "Japan", gold: 9, silver: 6, bronze: 5 },
  { country: "South Korea", gold: 7, silver: 5, bronze: 4 },
  { country: "France", gold: 6, silver: 9, bronze: 8 },
  { country: "Italy", gold: 5, silver: 7, bronze: 10 },
];

const athletes = [
  { name: "Marcus Okafor", sport: "100m Sprint", country: "United States", image: athlete1 },
  { name: "Liam Torres", sport: "200m Butterfly", country: "Canada", image: athlete2 },
];

const liveUpdates = [
  { time: "14:32", text: "Norway takes gold in Men's Cross-Country 50km Freestyle" },
  { time: "13:15", text: "Germany wins silver in Women's Biathlon Relay" },
  { time: "12:48", text: "New Olympic record set in Men's 500m Speed Skating by Japan" },
  { time: "11:20", text: "United States secures bronze in Women's Ice Hockey" },
  { time: "10:05", text: "Italy advances to semifinals in Men's Curling" },
];

const Olympics2026 = () => {
  const [sortBy, setSortBy] = useState<SortBy>("gold");

  const sorted = useMemo(
    () =>
      [...medalData].sort((a, b) =>
        sortBy === "gold"
          ? b.gold - a.gold
          : b.gold + b.silver + b.bronze - (a.gold + a.silver + a.bronze)
      ),
    [sortBy]
  );

  return (
    <div className="min-h-screen bg-background">
      <PageMeta title="Olympics 2026" description="Live medal table, athlete spotlights, and real-time updates from the Milano–Cortina 2026 Winter Olympics." />
      <SiteHeader />
      <main id="main-content" className="pt-28 pb-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <p className="font-body text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4">Legacy Media Coverage</p>
            <h1 className="font-heading text-4xl md:text-6xl font-bold text-foreground">Olympics 2026</h1>
            <p className="font-body text-base text-muted-foreground mt-3">Milano–Cortina, Italy</p>
          </div>

          {/* Medal Table */}
          <section className="max-w-3xl mx-auto mb-20" aria-label="Medal table">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-heading text-2xl font-bold text-foreground">Medal Table</h2>
              <div className="flex gap-2" role="group" aria-label="Sort medals by">
                {(["gold", "total"] as SortBy[]).map((s) => (
                  <button
                    key={s}
                    onClick={() => setSortBy(s)}
                    aria-pressed={sortBy === s}
                    className={`font-body text-xs tracking-widest uppercase px-4 py-2 border transition-colors focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 ${
                      sortBy === s
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-transparent text-foreground border-border hover:border-primary"
                    }`}
                  >
                    {s === "gold" ? "Gold" : "Total"}
                  </button>
                ))}
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full font-body text-sm" role="table">
                <caption className="sr-only">Olympic medal counts by country, sorted by {sortBy === "gold" ? "gold medals" : "total medals"}</caption>
                <thead>
                  <tr className="border-b-2 border-foreground">
                    <th scope="col" className="text-left py-3 font-semibold">#</th>
                    <th scope="col" className="text-left py-3 font-semibold">Country</th>
                    <th scope="col" className="text-center py-3 font-semibold"><span aria-label="Gold medals">🥇</span></th>
                    <th scope="col" className="text-center py-3 font-semibold"><span aria-label="Silver medals">🥈</span></th>
                    <th scope="col" className="text-center py-3 font-semibold"><span aria-label="Bronze medals">🥉</span></th>
                    <th scope="col" className="text-center py-3 font-semibold">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {sorted.map((row, i) => (
                    <tr key={row.country} className="border-b border-border hover:bg-muted/50 transition-colors">
                      <td className="py-3 text-muted-foreground">{i + 1}</td>
                      <td className="py-3 font-medium text-foreground">{row.country}</td>
                      <td className="py-3 text-center">{row.gold}</td>
                      <td className="py-3 text-center">{row.silver}</td>
                      <td className="py-3 text-center">{row.bronze}</td>
                      <td className="py-3 text-center font-semibold">{row.gold + row.silver + row.bronze}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Athlete Spotlight */}
          <section className="max-w-3xl mx-auto mb-20" aria-label="Athlete spotlight">
            <h2 className="font-heading text-2xl font-bold text-foreground mb-8">Athlete Spotlight</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {athletes.map((a) => (
                <div key={a.name} className="group">
                  <div className="overflow-hidden">
                    <img
                      src={a.image}
                      alt={`${a.name}, ${a.sport} athlete from ${a.country}`}
                      loading="lazy"
                      className="w-full aspect-[4/5] object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <h3 className="font-heading text-lg font-bold text-foreground mt-3">{a.name}</h3>
                  <p className="font-body text-sm text-muted-foreground">{a.sport} · {a.country}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Live Updates */}
          <section className="max-w-3xl mx-auto" aria-label="Live news feed">
            <h2 className="font-heading text-2xl font-bold text-foreground mb-8">Live News Feed</h2>
            <div className="space-y-0" role="log" aria-live="polite">
              {liveUpdates.map((u, i) => (
                <div key={i} className={`flex gap-4 py-4 ${i > 0 ? "border-t border-border" : ""}`}>
                  <time className="font-body text-xs text-primary font-semibold tracking-wider min-w-[50px]">{u.time}</time>
                  <p className="font-body text-sm text-foreground">{u.text}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
};

export default Olympics2026;
