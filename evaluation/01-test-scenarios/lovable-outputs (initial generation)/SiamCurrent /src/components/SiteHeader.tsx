import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/business", label: "Business" },
  { to: "/entertainment", label: "Entertainment" },
];

const SiteHeader = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="surface-elevated border-b" role="banner">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-baseline gap-1" aria-label="SiamCurrent – Home">
          <span className="font-serif text-2xl font-black tracking-tight text-foreground">
            Siam<span className="text-primary">Current</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8 font-sans text-sm font-medium" aria-label="Main navigation">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`transition-colors ${
                location.pathname === link.to
                  ? "text-primary font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              aria-current={location.pathname === link.to ? "page" : undefined}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        <div className="text-xs text-muted-foreground font-sans hidden sm:block md:block">
          <time dateTime={new Date().toISOString().split("T")[0]}>
            {new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
          </time>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <nav
          id="mobile-nav"
          className="md:hidden border-t px-4 py-3 surface-elevated"
          aria-label="Mobile navigation"
        >
          <div className="flex flex-col gap-3 font-sans text-sm font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={`py-2 px-3 rounded-md transition-colors ${
                  location.pathname === link.to
                    ? "text-primary bg-accent font-semibold"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                }`}
                aria-current={location.pathname === link.to ? "page" : undefined}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
};

export default SiteHeader;
