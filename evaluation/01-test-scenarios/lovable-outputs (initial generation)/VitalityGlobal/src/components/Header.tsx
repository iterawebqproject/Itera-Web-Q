import { useState, useCallback, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "About Us", path: "/about-us" },
  { label: "Leadership", path: "/leadership" },
  { label: "Sustainability & Brands", path: "/sustainability-brands" },
  { label: "Careers", path: "/careers" },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const mobileNavRef = useRef<HTMLElement>(null);

  const toggleMobile = useCallback(() => setMobileOpen((o) => !o), []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  // Trap focus inside mobile nav when open
  useEffect(() => {
    if (mobileOpen && mobileNavRef.current) {
      const firstLink = mobileNavRef.current.querySelector("a");
      firstLink?.focus();
    }
  }, [mobileOpen]);

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b">
      {/* Skip to content */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[60] focus:bg-primary focus:text-primary-foreground focus:px-4 focus:py-2 focus:rounded-md"
      >
        Skip to main content
      </a>

      <div className="container flex items-center justify-between h-16">
        <Link to="/" className="text-xl font-bold tracking-tight" aria-label="VitalityGlobal Home">
          <span className="text-primary">Vitality</span>
          <span className="text-foreground">Global</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
          {navLinks.map((link) => {
            const isCurrent = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                aria-current={isCurrent ? "page" : undefined}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-primary ${
                  isCurrent
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 text-foreground focus-visible:outline-2 focus-visible:outline-primary rounded-md"
          onClick={toggleMobile}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
          aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
        >
          {mobileOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <nav
          id="mobile-nav"
          ref={mobileNavRef}
          className="md:hidden border-t bg-background pb-4"
          aria-label="Mobile navigation"
        >
          {navLinks.map((link) => {
            const isCurrent = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                aria-current={isCurrent ? "page" : undefined}
                className={`block px-6 py-3 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-primary ${
                  isCurrent
                    ? "text-primary bg-muted"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      )}
    </header>
  );
};

export default Header;
