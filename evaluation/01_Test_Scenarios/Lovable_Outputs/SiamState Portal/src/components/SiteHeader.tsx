import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Shield } from "lucide-react";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/environment-hub", label: "Environment", dept: "environment" },
  { to: "/health-services", label: "Health", dept: "health" },
  { to: "/employment-hub", label: "Employment", dept: "employment" },
  { to: "/contact-support", label: "Contact" },
];

const deptColorMap: Record<string, string> = {
  environment: "bg-dept-environment",
  health: "bg-primary",
  employment: "bg-dept-employment",
};

export default function SiteHeader() {
  const location = useLocation();

  const currentDept = navLinks.find((l) => l.to === location.pathname)?.dept;
  const navBg = currentDept ? deptColorMap[currentDept] : "bg-primary";

  return (
    <header>
      {/* Security Banner */}
      <div className="bg-muted border-b">
        <div className="container flex items-center gap-2 py-1.5 text-xs text-muted-foreground">
          <Shield className="h-3.5 w-3.5" aria-hidden="true" />
          <span>Official Government Site — SiamState Portal</span>
        </div>
      </div>

      {/* Main Nav */}
      <nav className={`${navBg} transition-colors duration-300`} aria-label="Primary navigation">
        <div className="container flex items-center justify-between py-3">
          <Link to="/" className="text-lg font-bold text-primary-foreground tracking-tight" aria-label="SiamState Home">
            SiamState
          </Link>
          <ul className="hidden md:flex items-center gap-1" role="menubar">
            {navLinks.map((link) => {
              const active = location.pathname === link.to;
              return (
                <li key={link.to} role="none">
                  <Link
                    to={link.to}
                    role="menuitem"
                    aria-current={active ? "page" : undefined}
                    className={`px-3 py-1.5 rounded text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary-foreground ${
                      active
                        ? "bg-primary-foreground/20 text-primary-foreground"
                        : "text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          {/* Mobile toggle */}
          <MobileMenu navBg={navBg} />
        </div>
      </nav>
    </header>
  );
}

function MobileMenu({ navBg }: { navBg: string }) {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="md:hidden">
      <button
        onClick={() => setOpen(!open)}
        className="text-primary-foreground p-1 focus:outline-none focus:ring-2 focus:ring-primary-foreground rounded"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
      >
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          {open ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>
      {open && (
        <div className={`absolute left-0 right-0 ${navBg} z-50 border-t border-primary-foreground/10 animate-slide-down`}>
          <ul className="container py-2 space-y-1" role="menu">
            {navLinks.map((link) => (
              <li key={link.to} role="none">
                <Link
                  to={link.to}
                  role="menuitem"
                  onClick={() => setOpen(false)}
                  aria-current={location.pathname === link.to ? "page" : undefined}
                  className={`block px-3 py-2 rounded text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary-foreground ${
                    location.pathname === link.to
                      ? "bg-primary-foreground/20 text-primary-foreground"
                      : "text-primary-foreground/80"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
