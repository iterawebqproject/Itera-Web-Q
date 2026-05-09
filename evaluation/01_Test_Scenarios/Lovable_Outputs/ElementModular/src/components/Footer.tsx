import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="bg-charcoal text-charcoal-foreground" role="contentinfo">
    <div className="container py-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
        <div>
          <h3 className="font-display text-lg font-bold mb-4">
            Element<span className="text-secondary">Modular</span>
          </h3>
          <p className="text-sm opacity-70">Configure once. Upgrade forever.</p>
        </div>
        <div>
          <h4 className="font-semibold text-sm mb-3 uppercase tracking-wider opacity-50">Products</h4>
          <ul className="space-y-2 text-sm opacity-70">
            <li><Link to="/categories" className="hover:text-secondary transition-colors">Laptops</Link></li>
            <li><Link to="/categories" className="hover:text-secondary transition-colors">Desktops</Link></li>
            <li><Link to="/product-overview" className="hover:text-secondary transition-colors">Expansion Cards</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-sm mb-3 uppercase tracking-wider opacity-50">Resources</h4>
          <ul className="space-y-2 text-sm opacity-70">
            <li><Link to="/spec-sheet" className="hover:text-secondary transition-colors">Spec Sheets</Link></li>
            <li><Link to="/about-us" className="hover:text-secondary transition-colors">About Us</Link></li>
            <li><Link to="/about-us" className="hover:text-secondary transition-colors">Community</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-sm mb-3 uppercase tracking-wider opacity-50">Stay Updated</h4>
          <form onSubmit={(e) => e.preventDefault()} aria-label="Newsletter signup">
            <label htmlFor="footer-email" className="sr-only">Email address</label>
            <div className="flex gap-2">
              <input
                id="footer-email"
                type="email"
                placeholder="your@email.com"
                autoComplete="email"
                className="flex-1 px-3 py-2 bg-foreground/10 rounded-md text-sm placeholder:opacity-50 focus:outline-none focus:ring-2 focus:ring-secondary"
              />
              <button type="submit" className="px-4 py-2 bg-secondary text-secondary-foreground rounded-md text-sm font-medium hover:opacity-90 transition-opacity">
                Join
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="border-t border-foreground/10 pt-6 text-center text-xs opacity-50">
        © 2026 ElementModular. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
