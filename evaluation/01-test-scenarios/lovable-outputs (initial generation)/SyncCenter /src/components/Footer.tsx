import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="border-t bg-card py-10" role="contentinfo">
    <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
      <p className="font-heading font-semibold text-foreground">SyncCenter</p>
      <nav className="flex gap-6 text-sm text-muted-foreground" aria-label="Footer navigation">
        <Link to="/faq" className="hover:text-foreground transition-colors">FAQ</Link>
        <Link to="/contact" className="hover:text-foreground transition-colors">Contact</Link>
        <Link to="/how-to" className="hover:text-foreground transition-colors">Guides</Link>
      </nav>
      <p className="text-xs text-muted-foreground">© 2026 SyncCenter. All rights reserved.</p>
    </div>
  </footer>
);

export default Footer;
