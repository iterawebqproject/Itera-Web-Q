import { FileText } from "lucide-react";
import Header from "@/components/Header";
import SkipToContent from "@/components/SkipToContent";
import usePageMeta from "@/hooks/usePageMeta";

const articles = [
  { title: "Why I Switched to Mechanical Keyboards", date: "Mar 2026", read: "4 min" },
  { title: "Learning Rust as a JS Developer", date: "Feb 2026", read: "7 min" },
  { title: "My Digital Garden Philosophy", date: "Jan 2026", read: "5 min" },
  { title: "Design Systems for Solo Devs", date: "Dec 2025", read: "6 min" },
  { title: "The Joy of Side Projects", date: "Nov 2025", read: "3 min" },
  { title: "On Slow Productivity", date: "Oct 2025", read: "5 min" },
];

const Writing = () => {
  usePageMeta({ title: "Writing", description: "Thoughts and essays from Alice's digital garden — keyboards, Rust, design systems, and more." });

  return (
    <div className="min-h-screen bg-background">
      <SkipToContent />
      <Header />
      <main id="main-content" className="container py-16">
        <h1 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-2">Writing</h1>
        <p className="text-muted-foreground mb-12">Thoughts from my digital garden.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl">
          {articles.map((a) => (
            <article
              key={a.title}
              className="group bg-card border border-border rounded-lg p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:border-primary/40"
            >
              <div className="flex items-start gap-3">
                <FileText size={18} className="text-muted-foreground mt-1 shrink-0" aria-hidden="true" />
                <div>
                  <h2 className="font-display text-base font-semibold text-card-foreground">{a.title}</h2>
                  <p className="text-xs text-muted-foreground mt-1">
                    <time>{a.date}</time> · {a.read} read
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Writing;
