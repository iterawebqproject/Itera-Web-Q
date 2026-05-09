import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="no-print border-t border-border bg-muted">
    <div className="container py-12">
      {/* Newsletter signup bar */}
      <div className="mb-10 rounded-lg bg-matcha-warm p-8 text-center">
        <h3 className="font-heading text-xl font-bold text-foreground mb-2">
          Join the Matcha Community
        </h3>
        <p className="font-body text-sm text-muted-foreground mb-4">
          Get recipes, brewing tips, and origin stories in your inbox.
        </p>
        <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="newsletter-email" className="sr-only">Email address</label>
          <input
            id="newsletter-email"
            type="email"
            placeholder="your@email.com"
            autoComplete="email"
            className="flex-1 rounded-md border border-border bg-background px-4 py-2 text-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-secondary"
          />
          <button
            type="submit"
            className="rounded-md bg-primary px-6 py-2 text-sm font-body font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Subscribe
          </button>
        </form>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground font-body">
        <span className="font-heading font-bold text-foreground">抹茶 Matcha Heritage</span>
        <nav className="flex gap-6">
          <Link to="/history-of-matcha" className="hover:text-secondary transition-colors">History</Link>
          <Link to="/origin-regions-japan" className="hover:text-secondary transition-colors">Regions</Link>
          <Link to="/brewing-methods" className="hover:text-secondary transition-colors">Brewing</Link>
          <Link to="/recipes-index" className="hover:text-secondary transition-colors">Recipes</Link>
        </nav>
        <span>© 2026 Matcha Heritage</span>
      </div>
    </div>
  </footer>
);

export default Footer;
