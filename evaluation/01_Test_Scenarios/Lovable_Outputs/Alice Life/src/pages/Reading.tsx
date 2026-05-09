import { Bookmark, CheckCircle2 } from "lucide-react";
import Header from "@/components/Header";
import SkipToContent from "@/components/SkipToContent";
import usePageMeta from "@/hooks/usePageMeta";

const books = [
  { title: "Klara and the Sun", author: "Kazuo Ishiguro", status: "finished" as const },
  { title: "Tomorrow, and Tomorrow, and Tomorrow", author: "Gabrielle Zevin", status: "reading" as const },
  { title: "Project Hail Mary", author: "Andy Weir", status: "finished" as const },
  { title: "The Design of Everyday Things", author: "Don Norman", status: "reading" as const },
  { title: "Piranesi", author: "Susanna Clarke", status: "finished" as const },
  { title: "Atomic Habits", author: "James Clear", status: "finished" as const },
];

const Reading = () => {
  usePageMeta({ title: "Reading", description: "Alice's bookshelf — currently reading and finished books." });

  return (
    <div className="min-h-screen bg-background">
      <SkipToContent />
      <Header />
      <main id="main-content" className="container py-16">
        <h1 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-2">Reading</h1>
        <p className="text-muted-foreground mb-12">Books on my shelf.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl">
          {books.map((b) => (
            <article
              key={b.title}
              className="bg-card border border-border rounded-lg p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:border-primary/40"
            >
              <h2 className="font-display text-base font-semibold text-card-foreground">{b.title}</h2>
              <p className="text-sm text-muted-foreground mt-1">{b.author}</p>
              <div className="mt-4">
                {b.status === "reading" ? (
                  <span className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full bg-primary/20 text-primary-foreground" role="status">
                    <Bookmark size={12} aria-hidden="true" /> Reading
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full bg-secondary text-secondary-foreground">
                    <CheckCircle2 size={12} aria-hidden="true" /> Finished
                  </span>
                )}
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Reading;
