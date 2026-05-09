import { Link, useLocation } from "react-router-dom";
import { Coffee, Menu, X } from "lucide-react";
import { useState, useCallback } from "react";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/our-company-and-history", label: "Our Company" },
  { to: "/menu", label: "Menu" },
  { to: "/career-and-benefit", label: "Careers" },
];

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeMobile = useCallback(() => setMobileOpen(false), []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Skip to main content */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md"
      >
        Skip to main content
      </a>

      <header className="border-b border-border sticky top-0 z-50 bg-background/95 backdrop-blur-sm" role="banner">
        <div className="container flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2" aria-label="Arbor Coffee & Co. — Home">
            <Coffee className="w-6 h-6 text-primary" aria-hidden="true" />
            <span className="font-display text-xl font-bold text-primary">Arbor Coffee & Co.</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-sm tracking-wide transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary rounded ${
                  location.pathname === link.to ? "text-primary font-semibold" : "text-muted-foreground"
                }`}
                aria-current={location.pathname === link.to ? "page" : undefined}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <button
            className="md:hidden text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary rounded"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X className="w-6 h-6" aria-hidden="true" /> : <Menu className="w-6 h-6" aria-hidden="true" />}
          </button>
        </div>
        {mobileOpen && (
          <nav id="mobile-nav" className="md:hidden border-t border-border py-4 px-6 flex flex-col gap-4" aria-label="Mobile navigation">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={closeMobile}
                className={`text-sm tracking-wide ${
                  location.pathname === link.to ? "text-primary font-semibold" : "text-muted-foreground"
                }`}
                aria-current={location.pathname === link.to ? "page" : undefined}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}
      </header>

      <main id="main-content" className="flex-1">{children}</main>

      <footer className="border-t border-border py-12 mt-16" role="contentinfo">
        <div className="container text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Coffee className="w-5 h-5 text-primary" aria-hidden="true" />
            <span className="font-display text-lg font-bold text-primary">Arbor Coffee & Co.</span>
          </div>
          <p className="text-sm text-muted-foreground">© 2026 Arbor Coffee & Co. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
