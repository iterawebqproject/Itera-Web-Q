import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { MessageSquare, Github, Slack, Mail, CheckCircle } from "lucide-react";
import PageMeta from "@/components/PageMeta";

const channels = [
  { title: "Community Forum", description: "Ask questions and share knowledge", icon: MessageSquare, link: "#" },
  { title: "GitHub Issues", description: "Report bugs and request features", icon: Github, link: "#" },
  { title: "Slack Community", description: "Real-time chat with developers", icon: Slack, link: "#" },
  { title: "Email Support", description: "Direct engineering support (Pro+)", icon: Mail, link: "#" },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="p-6 lg:p-10 max-w-4xl mx-auto space-y-10 animate-fade-in">
      <PageMeta
        title="Contact Support"
        description="Submit a support ticket or reach DevPortal through community channels."
        path="/contact"
      />

      <section aria-labelledby="contact-heading" className="space-y-2">
        <h1 id="contact-heading" className="text-3xl font-bold tracking-tight">Contact Support</h1>
        <p className="text-muted-foreground">
          Submit a ticket or reach us through our community channels.
        </p>
      </section>

      {/* Support Ticket Form */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Submit a Support Ticket</CardTitle>
        </CardHeader>
        <CardContent>
          {!submitted ? (
            <form
              className="space-y-5"
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
              aria-label="Support ticket form"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="Jane Doe" required autoComplete="name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="jane@company.com" required autoComplete="email" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select>
                  <SelectTrigger id="category" aria-label="Select a support category">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="infrastructure">Infrastructure</SelectItem>
                    <SelectItem value="account">Account</SelectItem>
                    <SelectItem value="security">Security</SelectItem>
                    <SelectItem value="billing">Billing</SelectItem>
                    <SelectItem value="api">API / SDK</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" placeholder="Brief description of your issue" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Description</Label>
                <Textarea
                  id="message"
                  placeholder="Please include relevant details: error messages, steps to reproduce, environment info..."
                  rows={5}
                  required
                />
              </div>

              <Button type="submit">Submit Ticket</Button>
            </form>
          ) : (
            <div className="flex flex-col items-center gap-3 py-8 text-center" role="status">
              <CheckCircle className="h-10 w-10 text-success" aria-hidden="true" />
              <h3 className="text-lg font-semibold">Ticket Submitted</h3>
              <p className="text-sm text-muted-foreground max-w-sm">
                We've received your request. Our engineering team will respond within 24 hours.
              </p>
              <Button variant="outline" onClick={() => setSubmitted(false)} className="mt-2">
                Submit Another
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Community Channels */}
      <section aria-labelledby="channels-heading" className="space-y-4">
        <h2 id="channels-heading" className="text-xl font-semibold">Community & Support Channels</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {channels.map((ch) => (
            <a key={ch.title} href={ch.link} aria-label={`${ch.title} – ${ch.description}`}>
              <Card className="h-full hover:border-primary/30 hover:shadow-md transition-all cursor-pointer">
                <CardContent className="flex items-start gap-4 p-5">
                  <ch.icon className="h-6 w-6 text-primary mt-0.5 shrink-0" aria-hidden="true" />
                  <div>
                    <p className="text-sm font-semibold">{ch.title}</p>
                    <p className="text-sm text-muted-foreground mt-1">{ch.description}</p>
                  </div>
                </CardContent>
              </Card>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
