import { Link } from "react-router-dom";

const SiteFooter = () => (
  <footer className="border-t bg-card mt-16" role="contentinfo">
    <div className="container mx-auto px-4 py-10">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <Link to="/" className="font-serif text-xl font-black tracking-tight" aria-label="SiamCurrent – Home">
          Siam<span className="text-primary">Current</span>
        </Link>
        <nav className="flex gap-6 font-sans text-sm text-muted-foreground" aria-label="Footer navigation">
          <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
          <Link to="/business" className="hover:text-foreground transition-colors">Business</Link>
          <Link to="/entertainment" className="hover:text-foreground transition-colors">Entertainment</Link>
        </nav>
        <p className="text-xs text-muted-foreground font-sans">© 2026 SiamCurrent. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

export default SiteFooter;
