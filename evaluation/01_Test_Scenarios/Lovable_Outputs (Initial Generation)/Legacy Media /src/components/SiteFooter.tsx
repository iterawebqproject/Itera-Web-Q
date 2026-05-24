import { Link } from "react-router-dom";

const SiteFooter = () => (
  <footer className="border-t border-border bg-card py-12" role="contentinfo">
    <div className="container mx-auto px-6">
      <div className="grid md:grid-cols-3 gap-8">
        <div>
          <h3 className="font-heading text-xl font-bold text-foreground mb-3">Legacy Media</h3>
          <p className="font-body text-sm text-muted-foreground leading-relaxed">
            World-class journalism since 1923. Delivering deep analytical stories to discerning readers worldwide.
          </p>
        </div>
        <nav aria-label="Footer navigation">
          <h4 className="font-body text-xs tracking-widest uppercase text-muted-foreground mb-3">Navigate</h4>
          <ul className="space-y-2 font-body text-sm">
            {[
              { to: "/", label: "Home" },
              { to: "/people-of-the-year", label: "People of the Year" },
              { to: "/olympics-2026", label: "Olympics 2026" },
              { to: "/author", label: "Author" },
              { to: "/about-us", label: "About Us" },
            ].map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="text-foreground hover:text-primary transition-colors">{l.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <h4 className="font-body text-xs tracking-widest uppercase text-muted-foreground mb-3">Contact</h4>
          <p className="font-body text-sm text-foreground">
            <a href="mailto:editorial@legacymedia.com" className="hover:text-primary transition-colors">editorial@legacymedia.com</a>
          </p>
          <p className="font-body text-sm text-muted-foreground mt-1">New York · London · Tokyo</p>
        </div>
      </div>
      <div className="mt-10 pt-6 border-t border-border text-center">
        <p className="font-body text-xs text-muted-foreground tracking-wider">© 2026 Legacy Media. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

export default SiteFooter;
