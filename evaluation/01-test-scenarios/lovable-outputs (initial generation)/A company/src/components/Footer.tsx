import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="bg-secondary text-secondary-foreground/70" role="contentinfo">
    <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-8">
      <div>
        <h3 className="text-xl font-black text-primary-foreground mb-4">A Company</h3>
        <p className="text-sm leading-relaxed text-secondary-foreground/50">
          Building brands that make a difference. Committed to sustainability, innovation, and transparency.
        </p>
      </div>
      <nav aria-label="Footer navigation – pages">
        <h4 className="text-sm font-bold uppercase tracking-widest text-primary-foreground mb-4">Navigate</h4>
        <div className="flex flex-col gap-2">
          {[
            { label: "Home", path: "/" },
            { label: "Corporate", path: "/corporate" },
            { label: "Brands", path: "/brands" },
          ].map((l) => (
            <Link key={l.path} to={l.path} className="text-sm hover:text-primary-foreground transition-colors">
              {l.label}
            </Link>
          ))}
        </div>
      </nav>
      <nav aria-label="Footer navigation – company">
        <h4 className="text-sm font-bold uppercase tracking-widest text-primary-foreground mb-4">Company</h4>
        <div className="flex flex-col gap-2">
          {[
            { label: "Careers", path: "/careers" },
            { label: "Policy", path: "/policy" },
          ].map((l) => (
            <Link key={l.path} to={l.path} className="text-sm hover:text-primary-foreground transition-colors">
              {l.label}
            </Link>
          ))}
        </div>
      </nav>
      <div>
        <h4 className="text-sm font-bold uppercase tracking-widest text-primary-foreground mb-4">Contact</h4>
        <address className="not-italic text-sm space-y-1">
          <a href="mailto:info@acompany.com" className="hover:text-primary-foreground transition-colors block">info@acompany.com</a>
          <a href="tel:+15550000000" className="hover:text-primary-foreground transition-colors block">+1 (555) 000-0000</a>
        </address>
      </div>
    </div>
    <div className="border-t border-primary-foreground/10 text-center py-6 text-xs text-secondary-foreground/40">
      © {new Date().getFullYear()} A Company. All rights reserved.
    </div>
  </footer>
);

export default Footer;
