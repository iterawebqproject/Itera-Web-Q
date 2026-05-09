import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="bg-card border-t border-border py-12 mt-16">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="font-heading text-xl font-bold text-primary mb-3">Yum Yum Yummy</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Simple, beautiful recipes for every kitchen. Made with love for beginners and food lovers alike.
          </p>
        </div>
        <div>
          <h4 className="font-heading text-sm font-semibold text-foreground mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            {[
              { to: "/", label: "Home" },
              { to: "/food", label: "Browse Food" },
              { to: "/recipes", label: "Recipes" },
              { to: "/about", label: "About Us" },
              { to: "/contact", label: "Contact" },
            ].map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="text-muted-foreground hover:text-primary transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-heading text-sm font-semibold text-foreground mb-3">Stay Connected</h4>
          <p className="text-muted-foreground text-sm">Follow us for daily recipe inspiration and cooking tips!</p>
        </div>
      </div>
      <div className="border-t border-border mt-8 pt-6 text-center text-xs text-muted-foreground">
        © 2026 Yum Yum Yummy. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
