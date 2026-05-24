import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Search, X, Menu } from "lucide-react";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Health", to: "/health" },
  { label: "Culture", to: "/culture" },
];

export function SiteHeader() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!searchOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSearchOpen(false);
    };
    document.addEventListener("keydown", handleKey);
    searchInputRef.current?.focus();
    return () => document.removeEventListener("keydown", handleKey);
  }, [searchOpen]);

  return (
    <>
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
        <div className="container mx-auto flex items-center justify-between h-16 px-4">
          <button
            className="md:hidden text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            <Menu className="w-5 h-5" />
          </button>

          <Link to="/" className="font-serif text-2xl font-bold tracking-tight text-headline">
            Aura<span className="text-primary">News</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="text-sm font-medium tracking-wide uppercase text-muted-foreground hover:text-primary transition-colors article-link"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <button
            onClick={() => setSearchOpen(true)}
            className="text-muted-foreground hover:text-primary transition-colors"
            aria-label="Open search"
          >
            <Search className="w-5 h-5" />
          </button>
        </div>

        {mobileOpen && (
          <nav className="md:hidden border-t border-border bg-background px-4 py-4 space-y-3" aria-label="Mobile navigation">
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setMobileOpen(false)}
                className="block text-sm font-medium uppercase text-muted-foreground hover:text-primary"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        )}
      </header>

      {/* Full-screen search overlay */}
      {searchOpen && (
        <div
          className="fixed inset-0 z-[60] bg-background/98 backdrop-blur-sm flex flex-col items-center justify-start pt-32"
          role="dialog"
          aria-modal="true"
          aria-label="Search"
        >
          <button
            onClick={() => setSearchOpen(false)}
            className="absolute top-6 right-6 text-muted-foreground hover:text-foreground"
            aria-label="Close search"
          >
            <X className="w-6 h-6" />
          </button>
          <h2 className="font-serif text-3xl mb-8 text-headline">Search AuraNews</h2>
          <label htmlFor="site-search" className="sr-only">Search articles</label>
          <input
            ref={searchInputRef}
            id="site-search"
            type="search"
            placeholder="Type to search..."
            className="w-full max-w-lg bg-transparent border-b-2 border-primary/30 focus:border-primary outline-none text-xl py-3 px-2 text-foreground placeholder:text-muted-foreground transition-colors"
          />
          <div className="mt-8 text-muted-foreground text-sm">
            <p>Popular: <span className="text-primary cursor-pointer">Wellness</span> · <span className="text-primary cursor-pointer">Cinema</span> · <span className="text-primary cursor-pointer">Mental Health</span></p>
          </div>
        </div>
      )}
    </>
  );
}
