import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "Home", path: "/" },
  { label: "Corporate", path: "/corporate" },
  { label: "Brands", path: "/brands" },
  { label: "Careers", path: "/careers" },
  { label: "Policy", path: "/policy" },
];

const Header = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-secondary/95 backdrop-blur-sm" role="banner">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <Link to="/" className="text-2xl font-black tracking-tight text-primary-foreground" aria-label="A Company – Home">
          A Company
        </Link>
        <nav className="hidden md:flex gap-8" aria-label="Main navigation">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`text-sm font-medium uppercase tracking-widest transition-colors ${
                location.pathname === item.path
                  ? "text-primary"
                  : "text-primary-foreground/70 hover:text-primary-foreground"
              }`}
              aria-current={location.pathname === item.path ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <button
          className="md:hidden text-primary-foreground"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-nav"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {open && (
        <nav id="mobile-nav" className="md:hidden bg-secondary border-t border-primary-foreground/10 px-6 pb-6" aria-label="Mobile navigation">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setOpen(false)}
              className={`block py-3 text-sm font-medium uppercase tracking-widest ${
                location.pathname === item.path
                  ? "text-primary"
                  : "text-primary-foreground/70"
              }`}
              aria-current={location.pathname === item.path ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
};

export default Header;
