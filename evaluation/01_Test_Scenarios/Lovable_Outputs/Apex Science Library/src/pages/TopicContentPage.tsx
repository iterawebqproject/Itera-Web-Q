import { useParams, Link } from "react-router-dom";
import { useState, useMemo } from "react";
import { SidebarLayout } from "@/components/SidebarLayout";
import { topicContent, topicOutline, topics } from "@/data/mockData";
import { ThumbsUp, ThumbsDown, BookOpen } from "lucide-react";
import { PageHead } from "@/components/PageHead";

const TopicContentPage = () => {
  const { topicId, sessionId } = useParams();
  const topic = topics.find((t) => t.id === topicId);
  const session = topicOutline.find((s) => s.session === Number(sessionId));
  const [feedback, setFeedback] = useState<"yes" | "no" | null>(null);

  // Memoize content rendering to avoid re-computation
  const renderedContent = useMemo(() => {
    return topicContent.body.split("\n\n").map((block, i) => {
      if (block.startsWith("## ")) {
        return (
          <h2 key={i} className="font-heading text-xl font-bold text-foreground mt-8 mb-3">
            {block.replace("## ", "")}
          </h2>
        );
      }
      if (block.startsWith("- ")) {
        const items = block.split("\n").filter((l) => l.startsWith("- "));
        return (
          <ul key={i} className="list-disc pl-6 space-y-1 mb-4">
            {items.map((item, j) => (
              <li key={j} className="font-body text-foreground/85 leading-relaxed">
                {item.replace("- ", "").split(/\*\*(.*?)\*\*/g).map((part, k) =>
                  k % 2 === 1 ? <strong key={k}>{part}</strong> : part
                )}
              </li>
            ))}
          </ul>
        );
      }
      return (
        <p key={i} className="font-body text-foreground/85 leading-[1.85] mb-4">
          {block.split(/\*\*(.*?)\*\*/g).map((part, k) =>
            k % 2 === 1 ? <strong key={k} className="text-foreground font-semibold">{part}</strong> : part
          )}
        </p>
      );
    });
  }, []);

  if (!topic || !session) {
    return (
      <SidebarLayout>
        <PageHead title="Content Not Found" />
        <div className="p-10 text-center text-muted-foreground" role="status">Content not found.</div>
      </SidebarLayout>
    );
  }

  return (
    <SidebarLayout>
      <PageHead title={session.title} description={`Reading material for ${session.title} in ${topic.title}.`} />
      <div className="max-w-3xl mx-auto px-8 py-10" id="main-content">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-muted-foreground font-body mb-6">
          <Link to={`/topic-outline/${topicId}`} className="hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-ring rounded">
            {topic.title}
          </Link>
          <span aria-hidden="true">/</span>
          <span className="text-foreground" aria-current="page">Session {session.session}</span>
        </nav>

        <h1 className="font-heading text-3xl font-bold text-foreground mb-8 animate-fade-in">
          {session.title}
        </h1>

        {/* Reading Pane */}
        <article className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
          {renderedContent}
        </article>

        {/* Utility Footer */}
        <footer className="mt-16 pt-8 border-t border-border">
          {/* Feedback */}
          <div className="flex items-center gap-4 mb-8" role="group" aria-label="Content feedback">
            <span className="font-body text-sm text-muted-foreground" id="feedback-label">Was this helpful?</span>
            <button
              onClick={() => setFeedback("yes")}
              aria-label="Yes, this was helpful"
              aria-pressed={feedback === "yes"}
              className={`p-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-ring ${
                feedback === "yes" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-primary"
              }`}
            >
              <ThumbsUp className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              onClick={() => setFeedback("no")}
              aria-label="No, this was not helpful"
              aria-pressed={feedback === "no"}
              className={`p-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-ring ${
                feedback === "no" ? "bg-destructive text-destructive-foreground" : "bg-muted text-muted-foreground hover:text-destructive"
              }`}
            >
              <ThumbsDown className="h-5 w-5" aria-hidden="true" />
            </button>
            {feedback && (
              <span className="text-sm text-muted-foreground font-body animate-fade-in" role="status" aria-live="polite">
                Thank you for your feedback!
              </span>
            )}
          </div>

          {/* Related Readings */}
          <nav aria-labelledby="related-heading">
            <h3 id="related-heading" className="font-heading text-base font-bold text-foreground mb-3">Related Readings</h3>
            <div className="space-y-2" role="list">
              {topicContent.relatedReadings.map((reading) => (
                <div
                  key={reading.id}
                  role="listitem"
                  className="flex items-center gap-3 p-3 bg-card border border-border rounded-lg hover:border-primary/30 transition-all"
                >
                  <BookOpen className="h-4 w-4 text-primary shrink-0" aria-hidden="true" />
                  <span className="font-body text-sm text-foreground">{reading.title}</span>
                </div>
              ))}
            </div>
          </nav>
        </footer>
      </div>
    </SidebarLayout>
  );
};

export default TopicContentPage;
