import { useState, useCallback } from "react";
import { ThumbsUp, ThumbsDown, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import StatusBadge from "@/components/StatusBadge";

const sidebarCategories = [
  { label: "Admin", articles: ["Managing user roles", "Audit logs overview", "Workspace settings"] },
  { label: "Billing", articles: ["Upgrading your plan", "Invoice history", "Payment methods"] },
  { label: "Security", articles: ["Two-factor authentication", "SSO configuration", "Data export & deletion"] },
];

const HowTo = () => {
  const [activeCategory, setActiveCategory] = useState(0);
  const [activeArticle, setActiveArticle] = useState(0);
  const [feedback, setFeedback] = useState<null | "up" | "down">(null);

  const category = sidebarCategories[activeCategory];
  const articleTitle = category.articles[activeArticle];

  const handleCategoryChange = useCallback((ci: number) => {
    setActiveCategory(ci);
    setActiveArticle(0);
    setFeedback(null);
  }, []);

  const handleArticleChange = useCallback((ai: number) => {
    setActiveArticle(ai);
    setFeedback(null);
  }, []);

  return (
    <Layout title={`${articleTitle} – How-To`} description={`Learn how to ${articleTitle.toLowerCase()} in your SyncCenter workspace.`}>
      <div className="container py-10 flex gap-8">
        {/* Sticky Sidebar */}
        <aside className="hidden md:block w-56 flex-shrink-0" aria-label="Article categories">
          <nav className="sticky top-24 space-y-1" aria-label="How-to categories">
            {sidebarCategories.map((cat, ci) => (
              <div key={cat.label}>
                <button
                  onClick={() => handleCategoryChange(ci)}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    ci === activeCategory ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-secondary"
                  }`}
                  aria-current={ci === activeCategory ? "true" : undefined}
                >
                  {cat.label}
                </button>
                {ci === activeCategory && (
                  <div className="ml-4 mt-1 space-y-0.5" role="list">
                    {cat.articles.map((a, ai) => (
                      <button
                        key={a}
                        onClick={() => handleArticleChange(ai)}
                        className={`block w-full text-left px-3 py-1.5 text-sm rounded-md transition-colors ${
                          ai === activeArticle ? "text-primary font-medium" : "text-muted-foreground hover:text-foreground"
                        }`}
                        aria-current={ai === activeArticle ? "page" : undefined}
                        role="listitem"
                      >
                        {a}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </aside>

        {/* Article Content */}
        <article className="flex-1 min-w-0">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <li><Link to="/how-to" className="hover:text-foreground transition-colors">How-To</Link></li>
              <li aria-hidden="true"><ChevronRight className="h-3.5 w-3.5" /></li>
              <li>{category.label}</li>
              <li aria-hidden="true"><ChevronRight className="h-3.5 w-3.5" /></li>
              <li aria-current="page" className="text-foreground font-medium">{articleTitle}</li>
            </ol>
          </nav>

          <div className="flex items-center gap-3 mb-4">
            <h1 className="text-3xl font-heading font-bold text-foreground">{articleTitle}</h1>
            <StatusBadge variant={activeCategory === 0 ? "admin" : "all"}>
              {activeCategory === 0 ? "Admin Only" : "All Plans"}
            </StatusBadge>
          </div>

          <div className="prose prose-neutral max-w-none text-foreground/90 space-y-4 leading-relaxed">
            <p>
              This guide walks you through the process of <strong>{articleTitle.toLowerCase()}</strong> in your SyncCenter workspace. Follow the steps below to get started.
            </p>
            <h2 className="font-heading text-xl font-semibold mt-8 mb-3">Prerequisites</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>An active SyncCenter account with the appropriate permissions.</li>
              <li>Access to your workspace admin panel (if applicable).</li>
            </ul>
            <h2 className="font-heading text-xl font-semibold mt-8 mb-3">Step-by-Step Instructions</h2>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Navigate to <strong>Settings</strong> from the left sidebar.</li>
              <li>Select the <strong>{category.label}</strong> tab.</li>
              <li>Follow the on-screen prompts to complete configuration.</li>
              <li>Click <strong>Save</strong> to apply your changes.</li>
            </ol>
            <p className="mt-6">
              If you encounter any issues, please visit our <Link to="/faq" className="text-primary hover:underline">FAQ</Link> or <Link to="/contact" className="text-primary hover:underline">contact support</Link>.
            </p>
          </div>

          {/* Feedback Widget */}
          <div className="mt-12 pt-8 border-t flex items-center gap-4" role="group" aria-label="Article feedback">
            <span className="text-sm text-muted-foreground" id="feedback-label">Was this helpful?</span>
            <button
              onClick={() => setFeedback("up")}
              aria-label="Yes, this was helpful"
              aria-pressed={feedback === "up"}
              className={`p-2 rounded-md transition-colors ${feedback === "up" ? "bg-primary text-primary-foreground" : "hover:bg-secondary text-muted-foreground"}`}
            >
              <ThumbsUp className="h-4 w-4" aria-hidden="true" />
            </button>
            <button
              onClick={() => setFeedback("down")}
              aria-label="No, this was not helpful"
              aria-pressed={feedback === "down"}
              className={`p-2 rounded-md transition-colors ${feedback === "down" ? "bg-destructive text-destructive-foreground" : "hover:bg-secondary text-muted-foreground"}`}
            >
              <ThumbsDown className="h-4 w-4" aria-hidden="true" />
            </button>
            {feedback && <span className="text-sm text-muted-foreground" role="status" aria-live="polite">Thanks for your feedback!</span>}
          </div>
        </article>
      </div>
    </Layout>
  );
};

export default HowTo;
