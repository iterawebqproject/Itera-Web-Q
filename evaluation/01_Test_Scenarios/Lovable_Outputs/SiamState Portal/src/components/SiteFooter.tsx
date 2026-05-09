import { Link } from "react-router-dom";

export default function SiteFooter() {
  return (
    <footer className="bg-primary text-primary-foreground mt-auto" role="contentinfo">
      <div className="container py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 className="font-bold text-lg mb-2">SiamState Portal</h3>
            <p className="text-primary-foreground/70 text-sm">
              Your central hub for government services and information.
            </p>
          </div>
          <nav aria-label="Footer department links">
            <h4 className="font-semibold mb-2 text-sm uppercase tracking-wider text-primary-foreground/60">Departments</h4>
            <ul className="space-y-1 text-sm">
              <li><Link to="/environment-hub" className="text-primary-foreground/80 hover:text-primary-foreground focus:outline-none focus:ring-2 focus:ring-primary-foreground rounded">Environment</Link></li>
              <li><Link to="/health-services" className="text-primary-foreground/80 hover:text-primary-foreground focus:outline-none focus:ring-2 focus:ring-primary-foreground rounded">Health Services</Link></li>
              <li><Link to="/employment-hub" className="text-primary-foreground/80 hover:text-primary-foreground focus:outline-none focus:ring-2 focus:ring-primary-foreground rounded">Employment</Link></li>
            </ul>
          </nav>
          <nav aria-label="Footer support links">
            <h4 className="font-semibold mb-2 text-sm uppercase tracking-wider text-primary-foreground/60">Support</h4>
            <ul className="space-y-1 text-sm">
              <li><Link to="/contact-support" className="text-primary-foreground/80 hover:text-primary-foreground focus:outline-none focus:ring-2 focus:ring-primary-foreground rounded">Contact Us</Link></li>
            </ul>
          </nav>
        </div>
        <div className="border-t border-primary-foreground/10 mt-6 pt-4 text-center text-xs text-primary-foreground/50">
          © {new Date().getFullYear()} SiamState Government Portal. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
