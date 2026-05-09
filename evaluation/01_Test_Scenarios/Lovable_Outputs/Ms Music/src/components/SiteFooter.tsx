import { Link } from "react-router-dom";

const SiteFooter = () => (
  <footer className="bg-secondary text-secondary-foreground py-16" role="contentinfo">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <h3 className="text-2xl font-black tracking-tighter mb-4">
            <span className="editorial-gradient-text">Ms</span> Music
          </h3>
          <p className="text-sm text-secondary-foreground/70 leading-relaxed">
            The boldest voice in music journalism. Reviews, interviews, and culture — unfiltered.
          </p>
        </div>
        <div>
          <h4 className="font-bold uppercase text-xs tracking-widest mb-4 text-primary">Navigate</h4>
          <div className="flex flex-col gap-2">
            <Link to="/" className="text-sm text-secondary-foreground/70 hover:text-primary transition-colors">Home</Link>
            <Link to="/music" className="text-sm text-secondary-foreground/70 hover:text-primary transition-colors">Music</Link>
            <Link to="/singer" className="text-sm text-secondary-foreground/70 hover:text-primary transition-colors">Singers</Link>
            <Link to="/about-us" className="text-sm text-secondary-foreground/70 hover:text-primary transition-colors">About Us</Link>
          </div>
        </div>
        <div>
          <h4 className="font-bold uppercase text-xs tracking-widest mb-4 text-primary">Categories</h4>
          <div className="flex flex-col gap-2 text-sm text-secondary-foreground/70">
            <span>Indie</span><span>Pop</span><span>Rock</span><span>Hip-Hop</span>
          </div>
        </div>
        <div>
          <h4 className="font-bold uppercase text-xs tracking-widest mb-4 text-primary">Stay Connected</h4>
          <p className="text-sm text-secondary-foreground/70">
            Subscribe to our newsletter for the latest reviews and exclusives.
          </p>
        </div>
      </div>
      <div className="mt-12 pt-8 border-t border-secondary-foreground/10 text-center text-xs text-secondary-foreground/50">
        © 2026 Ms Music Magazine. All rights reserved.
      </div>
    </div>
  </footer>
);

export default SiteFooter;
