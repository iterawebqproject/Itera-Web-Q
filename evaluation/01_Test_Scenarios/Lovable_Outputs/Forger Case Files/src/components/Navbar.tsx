import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import SkipToContent from "./SkipToContent";

const navItems = [
  { label: "Home", path: "/" },
  { label: "Seasons & Movies", path: "/seasons" },
  { label: "Synopsis", path: "/synopsis" },
  { label: "Characters", path: "/characters" },
  { label: "Reviews", path: "/reviews" },
];

const Navbar = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-strong">
      <SkipToContent />
      <nav aria-label="Main navigation" className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className="font-display font-bold text-lg tracking-tight text-foreground">
          <span className="text-primary">FORGER</span> Case Files
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              aria-current={location.pathname === item.path ? "page" : undefined}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 ${
                location.pathname === item.path
                  ? "bg-primary/20 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <button
          className="md:hidden text-foreground focus-visible:outline-2 focus-visible:outline-primary"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden glass-strong border-t border-border/30 px-4 pb-4">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setOpen(false)}
              aria-current={location.pathname === item.path ? "page" : undefined}
              className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                location.pathname === item.path
                  ? "bg-primary/20 text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
};

export default Navbar;
