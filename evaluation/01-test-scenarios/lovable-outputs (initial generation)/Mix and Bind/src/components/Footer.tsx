import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="border-t bg-card py-12" role="contentinfo">
    <div className="container">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-xl font-black mb-3 text-foreground">
            Mix <span className="text-primary">&</span> Bind
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Create your own notebooks. Choose your cover, paper, and size to make a journal that is perfect for you.
          </p>
        </div>
        <div>
          <h4 className="font-bold text-sm mb-3 text-foreground">Shop</h4>
          <div className="space-y-2">
            <Link to="/books" className="block text-sm text-muted-foreground hover:text-primary transition-colors">All Books</Link>
            <Link to="/paper-textures" className="block text-sm text-muted-foreground hover:text-primary transition-colors">Paper Textures</Link>
            <Link to="/how-to-diy" className="block text-sm text-muted-foreground hover:text-primary transition-colors">How To DIY</Link>
          </div>
        </div>
        <div>
          <h4 className="font-bold text-sm mb-3 text-foreground">Company</h4>
          <div className="space-y-2">
            <Link to="/about-us" className="block text-sm text-muted-foreground hover:text-primary transition-colors">About Us</Link>
          </div>
        </div>
      </div>
      <div className="mt-10 pt-6 border-t text-center text-xs text-muted-foreground">
        © 2026 Mix & Bind. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
