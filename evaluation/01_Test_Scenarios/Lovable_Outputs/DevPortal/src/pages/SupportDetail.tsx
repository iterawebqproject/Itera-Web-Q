import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { ThumbsUp, ThumbsDown, ChevronRight, ArrowRight } from "lucide-react";
import PageMeta from "@/components/PageMeta";

const articles: Record<string, { title: string; steps: { heading: string; content: string; code?: string }[]; related: { title: string; slug: string }[] }> = {
  "getting-started": {
    title: "Getting Started Guide",
    steps: [
      {
        heading: "1. Install the SDK",
        content: "Choose your language and install via your package manager.",
        code: `npm install @devportal/sdk\n# or\npip install devportal`,
      },
      {
        heading: "2. Configure Authentication",
        content: "Create an API key from your dashboard and set it as an environment variable.",
        code: `export DEVPORTAL_API_KEY="your_key_here"`,
      },
      {
        heading: "3. Make Your First Request",
        content: "Use the SDK to verify your connection.",
        code: `import { DevPortal } from '@devportal/sdk';\n\nconst client = new DevPortal();\nconst status = await client.ping();\nconsole.log(status); // { ok: true }`,
      },
    ],
    related: [
      { title: "Authentication Deep Dive", slug: "authentication" },
      { title: "Webhooks Setup", slug: "webhooks" },
      { title: "Error Handling Best Practices", slug: "error-handling" },
    ],
  },
  authentication: {
    title: "Authentication Setup",
    steps: [
      { heading: "1. Choose an Auth Method", content: "DevPortal supports API keys, OAuth 2.0, and JWT tokens." },
      { heading: "2. Generate Credentials", content: "Navigate to Dashboard → Settings → API Keys to create credentials.", code: `curl -H "Authorization: Bearer YOUR_TOKEN" \\\n  https://api.devportal.io/v1/me` },
      { heading: "3. Implement Token Refresh", content: "For OAuth flows, implement automatic token refresh to avoid interruptions.", code: `const token = await client.auth.refresh(refreshToken);` },
    ],
    related: [
      { title: "Getting Started Guide", slug: "getting-started" },
      { title: "Security Best Practices", slug: "security" },
    ],
  },
};

const fallback = articles["getting-started"];

export default function SupportDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const article = articles[slug || ""] || fallback;
  const [feedback, setFeedback] = useState<"up" | "down" | null>(null);
  const [feedbackText, setFeedbackText] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="flex animate-fade-in">
      <PageMeta
        title={article.title}
        description={`${article.title} – Step-by-step technical guide on DevPortal.`}
        path={`/support/${slug || "getting-started"}`}
      />

      {/* Main Content */}
      <article className="flex-1 p-6 lg:p-10 max-w-3xl space-y-8">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
          <ChevronRight className="h-3 w-3" aria-hidden="true" />
          <Link to="/support" className="hover:text-foreground transition-colors">Support</Link>
          <ChevronRight className="h-3 w-3" aria-hidden="true" />
          <span className="text-foreground font-medium" aria-current="page">{article.title}</span>
        </nav>

        <h1 className="text-2xl font-bold tracking-tight">{article.title}</h1>

        {/* Steps */}
        <div className="space-y-8">
          {article.steps.map((step, i) => (
            <section key={i} className="space-y-3" aria-labelledby={`step-${i}`}>
              <h2 id={`step-${i}`} className="text-lg font-semibold">{step.heading}</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">{step.content}</p>
              {step.code && (
                <pre className="code-block" aria-label={`Code example for ${step.heading}`}>
                  <code>{step.code}</code>
                </pre>
              )}
            </section>
          ))}
        </div>

        <Separator />

        {/* Feedback */}
        <section className="space-y-4" aria-labelledby="feedback-heading">
          <p id="feedback-heading" className="text-sm font-medium">Was this article helpful?</p>
          {!submitted ? (
            <div className="space-y-3">
              <div className="flex gap-2" role="group" aria-label="Feedback buttons">
                <Button
                  variant={feedback === "up" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFeedback("up")}
                  aria-pressed={feedback === "up"}
                >
                  <ThumbsUp className="h-4 w-4 mr-1" aria-hidden="true" /> Yes
                </Button>
                <Button
                  variant={feedback === "down" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFeedback("down")}
                  aria-pressed={feedback === "down"}
                >
                  <ThumbsDown className="h-4 w-4 mr-1" aria-hidden="true" /> No
                </Button>
              </div>
              {feedback && (
                <div className="space-y-2">
                  <label htmlFor="feedback-text" className="sr-only">Additional feedback</label>
                  <Textarea
                    id="feedback-text"
                    placeholder="Any additional feedback? (optional)"
                    value={feedbackText}
                    onChange={(e) => setFeedbackText(e.target.value)}
                    className="max-w-md"
                    rows={3}
                  />
                  <Button size="sm" onClick={() => setSubmitted(true)}>
                    Submit Feedback
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <p className="text-sm text-success font-medium" role="status">Thanks for your feedback!</p>
          )}
        </section>
      </article>

      {/* Related Articles Sidebar */}
      <aside className="hidden xl:block w-64 border-l p-6 space-y-4" aria-label="Related articles">
        <h3 className="text-sm font-semibold">Related Articles</h3>
        <nav className="space-y-2" aria-label="Related article links">
          {article.related.map((rel) => (
            <Link key={rel.slug} to={`/support/${rel.slug}`}>
              <Card className="hover:border-primary/30 transition-colors cursor-pointer">
                <CardContent className="p-3 flex items-center justify-between">
                  <span className="text-sm">{rel.title}</span>
                  <ArrowRight className="h-3 w-3 text-muted-foreground" aria-hidden="true" />
                </CardContent>
              </Card>
            </Link>
          ))}
        </nav>
      </aside>
    </div>
  );
}
