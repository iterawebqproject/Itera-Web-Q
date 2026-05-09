import { useState, useEffect, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const SiteHeader = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape" && menuOpen) setMenuOpen(false);
    },
    [menuOpen]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <header
      role="banner"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-background/95 backdrop-blur-sm border-b border-border ${
        scrolled ? "py-2" : "py-4"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-6">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-controls="main-nav"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          className="font-body text-sm tracking-widest uppercase text-foreground hover:text-primary transition-colors focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
        >
          {menuOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
        </button>

        <Link to="/" className="absolute left-1/2 -translate-x-1/2" aria-label="Legacy Media — Home">
          <span
            className={`font-heading font-bold tracking-tight text-foreground transition-all duration-300 block ${
              scrolled ? "text-xl" : "text-2xl md:text-3xl"
            }`}
          >
            Legacy Media
          </span>
        </Link>

        <Link
          to="/"
          className="font-body text-xs tracking-widest uppercase px-4 py-2 bg-primary text-primary-foreground hover:bg-accent transition-colors focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
        >
          Subscribe
        </Link>
      </div>

      {menuOpen && (
        <nav id="main-nav" ref={menuRef} aria-label="Main navigation" className="container mx-auto px-6 py-6 border-t border-border mt-2">
          <ul className="flex flex-col md:flex-row gap-4 md:gap-8 font-body text-sm tracking-widest uppercase" role="list">
            {[
              { to: "/", label: "Home" },
              { to: "/people-of-the-year", label: "People of the Year" },
              { to: "/olympics-2026", label: "Olympics 2026" },
              { to: "/author", label: "Author" },
              { to: "/about-us", label: "About Us" },
            ].map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  onClick={() => setMenuOpen(false)}
                  className="text-foreground hover:text-primary transition-colors focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
};

export default SiteHeader;
