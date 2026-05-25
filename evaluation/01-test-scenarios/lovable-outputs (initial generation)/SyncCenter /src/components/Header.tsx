import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Get Started", to: "/starter" },
  { label: "How-To Guides", to: "/how-to" },
  { label: "Contact", to: "/contact" },
  { label: "FAQ", to: "/faq" },
];

const Header = () => {
  const { pathname } = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="bg-primary" role="banner">
      <div className="container flex items-center justify-between h-16">
        <Link to="/" className="text-primary-foreground font-heading font-bold text-xl tracking-tight" aria-label="SyncCenter home">
          SyncCenter
        </Link>
        <nav className="hidden md:flex items-center gap-6" aria-label="Main navigation">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-sm font-medium transition-colors ${
                pathname === link.to
                  ? "text-primary-foreground"
                  : "text-primary-foreground/70 hover:text-primary-foreground"
              }`}
              aria-current={pathname === link.to ? "page" : undefined}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <Link
          to="/contact"
          className="hidden md:inline-flex items-center rounded-md bg-primary-foreground text-primary px-4 py-2 text-sm font-semibold hover:bg-primary-foreground/90 transition-colors"
        >
          Sign Up
        </Link>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 text-primary-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile navigation */}
      {mobileOpen && (
        <nav id="mobile-nav" className="md:hidden border-t border-primary-foreground/20 pb-4" aria-label="Mobile navigation">
          <div className="container flex flex-col gap-1 pt-2">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  pathname === link.to
                    ? "bg-primary-foreground/20 text-primary-foreground"
                    : "text-primary-foreground/70 hover:text-primary-foreground"
                }`}
                aria-current={pathname === link.to ? "page" : undefined}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={() => setMobileOpen(false)}
              className="mt-2 inline-flex items-center justify-center rounded-md bg-primary-foreground text-primary px-4 py-2 text-sm font-semibold hover:bg-primary-foreground/90 transition-colors"
            >
              Sign Up
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
