import { Link } from "react-router-dom";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-secondary/30 mt-20" role="contentinfo">
      <div className="container mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="font-serif text-xl font-bold mb-3">
            Aura<span className="text-primary">News</span>
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Deep stories on culture, society, and healthy living for the modern reader.
          </p>
        </div>
        <nav aria-label="Footer navigation">
          <h4 className="font-serif text-sm font-semibold uppercase tracking-wider mb-3 text-headline">Sections</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/health" className="hover:text-primary transition-colors">Health & Wellness</Link></li>
            <li><Link to="/culture" className="hover:text-primary transition-colors">Culture & Arts</Link></li>
          </ul>
        </nav>
        <div>
          <h4 className="font-serif text-sm font-semibold uppercase tracking-wider mb-3 text-headline">Subscribe</h4>
          <p className="text-muted-foreground text-sm mb-3">Get the best stories in your inbox.</p>
          <form onSubmit={(e) => e.preventDefault()} className="flex gap-2">
            <label htmlFor="footer-email" className="sr-only">Email address</label>
            <input
              id="footer-email"
              type="email"
              placeholder="your@email.com"
              autoComplete="email"
              className="flex-1 bg-background border border-border rounded-sm px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-primary"
            />
            <button type="submit" className="bg-primary text-primary-foreground px-4 py-2 text-sm font-medium rounded-sm hover:opacity-90 transition-opacity">
              Join
            </button>
          </form>
        </div>
      </div>
      <div className="border-t border-border text-center py-4 text-xs text-muted-foreground">
        © 2026 AuraNews. All rights reserved.
      </div>
    </footer>
  );
}
