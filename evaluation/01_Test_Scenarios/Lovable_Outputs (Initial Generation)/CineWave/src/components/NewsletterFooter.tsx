import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const NewsletterFooter = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success("You're on the list! Welcome to CineWave.");
      setEmail("");
    }
  };

  return (
    <footer className="bg-foreground text-background py-20" role="contentinfo">
      <div className="container max-w-2xl text-center">
        <p className="cw-label mb-4 text-primary" aria-hidden="true">Stay Ahead</p>
        <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter mb-4">
          Get Trends Before Anyone Else
        </h2>
        <p className="text-background/60 mb-8">
          Subscribe to the CineWave newsletter for underground cinema, viral trends, and creator culture — delivered weekly.
        </p>
        <form onSubmit={handleSubmit} className="flex gap-3 max-w-md mx-auto" aria-label="Newsletter subscription">
          <Input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-background/10 border-background/20 text-background placeholder:text-background/40"
            required
            aria-label="Email address"
          />
          <Button type="submit" className="bg-primary text-primary-foreground hover:bg-cw-glow shrink-0">
            Subscribe
          </Button>
        </form>
        <div className="mt-16 pt-8 border-t border-background/10 text-sm text-background/40">
          © 2026 CineWave. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default NewsletterFooter;
