import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const navItems = [
  { label: "Home", path: "/" },
  { label: "Services", path: "/services-hub" },
  { label: "Government Info", path: "/government-info" },
  { label: "My Portal", path: "/user-portal" },
  { label: "Contact & Support", path: "/contact-support" },
];

const SiteHeader = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-primary shadow-lg">
      <div className="civic-container flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2" aria-label="CivicHub home">
          <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center font-bold text-accent-foreground text-sm" aria-hidden="true">CH</div>
          <span className="text-primary-foreground font-bold text-lg tracking-tight">CivicHub</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              aria-current={location.pathname === item.path ? "page" : undefined}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                location.pathname === item.path
                  ? "bg-primary-foreground/20 text-primary-foreground"
                  : "text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          className="md:hidden text-primary-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
          aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileOpen && (
        <nav id="mobile-nav" className="md:hidden bg-primary border-t border-primary-foreground/10 animate-slide-down" aria-label="Mobile navigation">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setMobileOpen(false)}
              aria-current={location.pathname === item.path ? "page" : undefined}
              className={`block px-6 py-3 text-sm font-medium ${
                location.pathname === item.path
                  ? "bg-primary-foreground/20 text-primary-foreground"
                  : "text-primary-foreground/70 hover:bg-primary-foreground/10"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
};

export default SiteHeader;
