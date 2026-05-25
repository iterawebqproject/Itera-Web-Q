import { Play } from "lucide-react";
import Layout from "@/components/Layout";
import StatusBadge from "@/components/StatusBadge";

const steps = [
  {
    step: 1,
    title: "Create Your Account",
    description: "Sign up with your email and set a strong password. You'll receive a confirmation email to verify your address.",
    badge: "All Plans" as const,
  },
  {
    step: 2,
    title: "Set Up Your Workspace",
    description: "Name your workspace, invite team members, and choose your default preferences for notifications and privacy.",
    badge: "All Plans" as const,
  },
  {
    step: 3,
    title: "Configure Integrations",
    description: "Connect your favorite tools — Slack, Jira, GitHub, and more — to streamline your workflow from day one.",
    badge: "Admin Only" as const,
  },
];

const Starter = () => (
  <Layout title="Get Started" description="Follow our step-by-step onboarding guide to set up your SyncCenter workspace.">
    {/* Onboarding Hero */}
    <section className="bg-primary py-16" aria-labelledby="starter-heading">
      <div className="container text-center">
        <h1 id="starter-heading" className="text-4xl font-heading font-bold text-primary-foreground mb-3">Welcome to SyncCenter</h1>
        <p className="text-primary-foreground/70 mb-8 max-w-lg mx-auto">
          Follow these steps to get set up quickly and start making the most of the platform.
        </p>
        <a
          href="#steps"
          className="inline-flex items-center rounded-md bg-primary-foreground text-primary px-6 py-3 font-semibold hover:bg-primary-foreground/90 transition-colors"
        >
          Start Here
        </a>
      </div>
    </section>

    {/* Step Modules */}
    <section id="steps" className="container py-16 max-w-2xl" aria-labelledby="steps-heading">
      <h2 id="steps-heading" className="sr-only">Setup Steps</h2>
      <ol className="space-y-8" role="list">
        {steps.map((s) => (
          <li key={s.step} className="flex gap-5 items-start">
            <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground font-heading font-bold text-sm" aria-hidden="true">
              {s.step}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-heading font-semibold text-lg text-foreground">
                  <span className="sr-only">Step {s.step}: </span>{s.title}
                </h3>
                <StatusBadge variant={s.badge === "Admin Only" ? "admin" : "all"}>{s.badge}</StatusBadge>
              </div>
              <p className="text-muted-foreground leading-relaxed">{s.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>

    {/* Video Section */}
    <section className="bg-card border-t" aria-labelledby="video-heading">
      <div className="container py-16 text-center max-w-3xl">
        <h2 id="video-heading" className="text-2xl font-heading font-semibold mb-6">Quick Tour</h2>
        <div className="aspect-video rounded-lg bg-muted flex items-center justify-center border" role="img" aria-label="Video walkthrough placeholder – coming soon">
          <div className="flex flex-col items-center gap-3 text-muted-foreground">
            <Play className="h-12 w-12" aria-hidden="true" />
            <span className="text-sm">Video walkthrough coming soon</span>
          </div>
        </div>
      </div>
    </section>
  </Layout>
);

export default Starter;
