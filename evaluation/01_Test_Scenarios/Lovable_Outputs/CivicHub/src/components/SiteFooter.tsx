import { Link } from "react-router-dom";
import { Facebook, Twitter, Youtube, Mail } from "lucide-react";

const socialLinks = [
  { Icon: Facebook, label: "Facebook" },
  { Icon: Twitter, label: "Twitter" },
  { Icon: Youtube, label: "YouTube" },
  { Icon: Mail, label: "Email" },
];

const SiteFooter = () => (
  <footer className="bg-muted border-t border-border" role="contentinfo">
    <div className="civic-container py-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center font-bold text-primary-foreground text-sm" aria-hidden="true">CH</div>
            <span className="font-bold text-lg text-foreground">CivicHub</span>
          </div>
          <p className="text-muted-foreground text-sm">Your one-stop portal for government services and information.</p>
        </div>
        <nav aria-label="Quick links">
          <h4 className="font-bold text-foreground mb-3 text-sm uppercase tracking-wider">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/services-hub" className="text-muted-foreground hover:text-primary transition-colors">Services</Link></li>
            <li><Link to="/government-info" className="text-muted-foreground hover:text-primary transition-colors">Government Info</Link></li>
            <li><Link to="/user-portal" className="text-muted-foreground hover:text-primary transition-colors">My Portal</Link></li>
            <li><Link to="/contact-support" className="text-muted-foreground hover:text-primary transition-colors">Contact</Link></li>
          </ul>
        </nav>
        <nav aria-label="Resources">
          <h4 className="font-bold text-foreground mb-3 text-sm uppercase tracking-wider">Resources</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Accessibility</a></li>
            <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Terms of Service</a></li>
            <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Sitemap</a></li>
          </ul>
        </nav>
        <div>
          <h4 className="font-bold text-foreground mb-3 text-sm uppercase tracking-wider">Connect</h4>
          <div className="flex gap-3">
            {socialLinks.map(({ Icon, label }) => (
              <a key={label} href="#" className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-colors" aria-label={`Follow us on ${label}`}>
                <Icon size={18} aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-10 pt-6 border-t border-border text-center text-sm text-muted-foreground">
        © 2026 CivicHub. All rights reserved.
      </div>
    </div>
  </footer>
);

export default SiteFooter;
