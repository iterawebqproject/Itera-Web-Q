import { CommandBar } from "@/components/CommandBar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import PageMeta from "@/components/PageMeta";
import {
  Zap,
  Shield,
  Database,
  Webhook,
  BookOpen,
  Code2,
  Server,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

const quickStartCards = [
  {
    title: "Getting Started",
    description: "Set up your environment and make your first API call in under 5 minutes.",
    icon: Zap,
    link: "/support/getting-started",
  },
  {
    title: "Authentication",
    description: "Configure OAuth 2.0, API keys, and token-based auth for your app.",
    icon: Shield,
    link: "/support/authentication",
  },
  {
    title: "Webhooks",
    description: "Subscribe to real-time events and build reactive integrations.",
    icon: Webhook,
    link: "/support/webhooks",
  },
];

const docCategories = [
  { title: "REST API", icon: Code2, count: 48 },
  { title: "SDKs & Libraries", icon: BookOpen, count: 12 },
  { title: "Database", icon: Database, count: 24 },
  { title: "Infrastructure", icon: Server, count: 16 },
];

const changelog = [
  { date: "Apr 7, 2026", title: "v3.2.0 – Rate limiting improvements", tag: "Enhancement" },
  { date: "Apr 3, 2026", title: "New Python SDK released", tag: "New" },
  { date: "Mar 28, 2026", title: "Webhook retry logic updated", tag: "Fix" },
  { date: "Mar 20, 2026", title: "GraphQL beta endpoint available", tag: "Beta" },
];

const tagColors: Record<string, string> = {
  Enhancement: "bg-primary/10 text-primary",
  New: "bg-success/10 text-success",
  Fix: "bg-warning/10 text-warning",
  Beta: "bg-info/10 text-info",
};

export default function HomePage() {
  return (
    <div className="p-6 lg:p-10 max-w-5xl mx-auto space-y-10 animate-fade-in">
      <PageMeta
        title="Home"
        description="DevPortal – Find guides, API docs, and troubleshooting resources for developers."
        path="/"
      />

      {/* Command Bar */}
      <section aria-labelledby="home-heading" className="space-y-2">
        <h1 id="home-heading" className="text-3xl font-bold tracking-tight">DevPortal</h1>
        <p className="text-muted-foreground">
          Find guides, API docs, and troubleshooting resources.
        </p>
        <div className="mt-4">
          <CommandBar />
        </div>
      </section>

      {/* Platform Status */}
      <div className="flex items-center gap-2" role="status" aria-live="polite">
        <span className="status-badge-operational">
          <CheckCircle className="h-3 w-3" aria-hidden="true" />
          All Systems Operational
        </span>
      </div>

      {/* Quick Start Cards */}
      <section aria-labelledby="quick-start-heading" className="space-y-4">
        <h2 id="quick-start-heading" className="text-xl font-semibold">Quick Start</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {quickStartCards.map((card) => (
            <Link key={card.title} to={card.link}>
              <Card className="h-full hover:border-primary/30 hover:shadow-md transition-all group cursor-pointer">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <card.icon className="h-5 w-5 text-primary" aria-hidden="true" />
                    <CardTitle className="text-base">{card.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{card.description}</p>
                  <span className="inline-flex items-center gap-1 mt-3 text-xs font-medium text-primary group-hover:gap-2 transition-all">
                    Read guide <ArrowRight className="h-3 w-3" aria-hidden="true" />
                  </span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Documentation Categories */}
      <section aria-labelledby="docs-heading" className="space-y-4">
        <h2 id="docs-heading" className="text-xl font-semibold">Documentation</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {docCategories.map((cat) => (
            <Card key={cat.title} className="hover:border-primary/30 transition-colors cursor-pointer">
              <CardContent className="flex items-center gap-3 p-4">
                <cat.icon className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
                <div>
                  <p className="text-sm font-medium">{cat.title}</p>
                  <p className="text-xs text-muted-foreground">{cat.count} articles</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* What's New */}
      <section aria-labelledby="changelog-heading" className="space-y-4">
        <h2 id="changelog-heading" className="text-xl font-semibold">What's New</h2>
        <div className="space-y-3" role="list">
          {changelog.map((entry, i) => (
            <div
              key={i}
              role="listitem"
              className="flex items-center gap-4 rounded-lg border bg-card p-4 hover:border-primary/20 transition-colors"
            >
              <time className="text-xs text-muted-foreground w-24 shrink-0" dateTime={entry.date}>
                {entry.date}
              </time>
              <p className="text-sm font-medium flex-1">{entry.title}</p>
              <Badge variant="secondary" className={tagColors[entry.tag]}>
                {entry.tag}
              </Badge>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
