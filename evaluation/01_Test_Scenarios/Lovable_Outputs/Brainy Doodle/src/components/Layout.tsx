import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import mascot from "@/assets/mascot.png";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/topics", label: "Topics" },
  { to: "/about", label: "About Us" },
  { to: "/archive", label: "Archive" },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Skip to main content */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:bg-primary focus:text-primary-foreground focus:px-4 focus:py-2 focus:rounded-md focus:outline-none"
      >
        Skip to main content
      </a>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/90 backdrop-blur border-b border-border" role="banner">
        <div className="container flex items-center justify-between py-3">
          <Link to="/" className="flex items-center gap-2 group" aria-label="Brainy Doodle — Home">
            <img src={mascot} alt="" width={40} height={40} className="wiggle" aria-hidden="true" />
            <span className="font-display text-3xl md:text-4xl text-foreground group-hover:text-primary transition-colors">
              Brainy Doodle
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-4 py-2 rounded-lg font-body text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
                  location.pathname === link.to
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                }`}
                aria-current={location.pathname === link.to ? "page" : undefined}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
          </button>
        </div>

        {/* Mobile nav */}
        {menuOpen && (
          <nav className="md:hidden border-t border-border bg-background" aria-label="Mobile navigation">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className={`block px-6 py-3 font-body text-sm font-medium border-b border-border transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
                  location.pathname === link.to
                    ? "bg-accent text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                aria-current={location.pathname === link.to ? "page" : undefined}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}
      </header>

      {/* Main */}
      <main id="main-content" className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/50" role="contentinfo">
        <div className="container py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <img src={mascot} alt="" width={28} height={28} loading="lazy" aria-hidden="true" />
            <span className="font-display text-xl text-foreground">Brainy Doodle</span>
          </div>
          <p className="text-sm text-muted-foreground font-body">
            © 2026 Brainy Doodle. Drawn with questionable artistic talent.
          </p>
          <nav aria-label="Social links" className="flex gap-4">
            {[
              { name: "Twitter", href: "https://twitter.com" },
              { name: "Instagram", href: "https://instagram.com" },
              { name: "YouTube", href: "https://youtube.com" },
            ].map((s) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-body text-muted-foreground hover:text-primary transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                {s.name}
              </a>
            ))}
          </nav>
        </div>
      </footer>
    </div>
  );
}
