import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="bg-deep-blue text-deep-blue-foreground py-12 mt-20" role="contentinfo">
    <div className="container grid grid-cols-1 md:grid-cols-4 gap-8">
      <div>
        <h3 className="text-lg font-bold mb-3">
          <span className="text-secondary">Vitality</span>Global
        </h3>
        <p className="text-sm opacity-70">
          Building a sustainable future through ethical innovation and responsible growth.
        </p>
      </div>
      <nav aria-label="Company links">
        <h4 className="font-semibold mb-3 text-sm uppercase tracking-wider opacity-70">Company</h4>
        <ul className="flex flex-col gap-2 text-sm">
          <li><Link to="/about-us" className="hover:text-secondary transition-colors">About Us</Link></li>
          <li><Link to="/leadership" className="hover:text-secondary transition-colors">Leadership</Link></li>
          <li><Link to="/careers" className="hover:text-secondary transition-colors">Careers</Link></li>
        </ul>
      </nav>
      <nav aria-label="Impact links">
        <h4 className="font-semibold mb-3 text-sm uppercase tracking-wider opacity-70">Impact</h4>
        <ul className="flex flex-col gap-2 text-sm">
          <li><Link to="/sustainability-brands" className="hover:text-secondary transition-colors">Sustainability</Link></li>
          <li><Link to="/sustainability-brands" className="hover:text-secondary transition-colors">Our Brands</Link></li>
        </ul>
      </nav>
      <div>
        <h4 className="font-semibold mb-3 text-sm uppercase tracking-wider opacity-70">Contact</h4>
        <address className="not-italic text-sm opacity-70">
          <p>info@vitalityglobal.com</p>
          <p>+1 (555) 900-1234</p>
        </address>
      </div>
    </div>
    <div className="container mt-8 pt-6 border-t border-white/10 text-center text-xs opacity-50">
      © {new Date().getFullYear()} VitalityGlobal. All rights reserved.
    </div>
  </footer>
);

export default Footer;
