import { useState, useEffect, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/budget-2026", label: "Budget 2026" },
  { to: "/national-day-rally-2025", label: "NDR 2025" },
  { to: "/factually-checkpulse", label: "CheckPulse" },
  { to: "/corrections-and-clarifications", label: "Corrections" },
  { to: "/about-us", label: "About Us" },
];

const SiteHeader = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const onScroll = useCallback(() => {
    setScrolled(window.scrollY > 20);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  useEffect(() => setMobileOpen(false), [location]);

  return (
    <header className={`sticky-header ${scrolled ? "scrolled py-2" : "py-3"}`} role="banner">
      <div className="container flex items-center justify-between">
        <Link to="/" className="text-lg font-bold tracking-wide" aria-label="UrbanConnect Home">
          UrbanConnect
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`px-3 py-1.5 rounded text-sm font-medium transition-colors hover:bg-primary-foreground/15 ${
                location.pathname === link.to ? "bg-primary-foreground/20" : ""
              }`}
              aria-current={location.pathname === link.to ? "page" : undefined}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-1"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
          aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
        >
          {mobileOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
        </button>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <nav
          id="mobile-nav"
          className="md:hidden border-t border-primary-foreground/20 px-4 pb-3 pt-2 flex flex-col gap-1"
          aria-label="Mobile navigation"
        >
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`px-3 py-2 rounded text-sm font-medium hover:bg-primary-foreground/15 ${
                location.pathname === link.to ? "bg-primary-foreground/20" : ""
              }`}
              aria-current={location.pathname === link.to ? "page" : undefined}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
};

export default SiteHeader;
