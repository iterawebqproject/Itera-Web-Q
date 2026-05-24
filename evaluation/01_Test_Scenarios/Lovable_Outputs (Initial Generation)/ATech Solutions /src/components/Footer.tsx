import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="bg-accent text-accent-foreground py-12 mt-20">
    <div className="container grid grid-cols-1 md:grid-cols-3 gap-8">
      <div>
        <h3 className="text-lg font-bold mb-3">
          <span className="text-primary">A</span>Tech Solutions
        </h3>
        <p className="text-sm opacity-80">
          Precision technology for enterprise businesses. Innovating since 2010.
        </p>
      </div>
      <div>
        <h4 className="font-semibold mb-3 text-sm uppercase tracking-wider">Navigation</h4>
        <ul className="space-y-2 text-sm opacity-80">
          <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
          <li><Link to="/products" className="hover:text-primary transition-colors">Products</Link></li>
          <li><Link to="/our-company" className="hover:text-primary transition-colors">Our Company</Link></li>
          <li><Link to="/leadership" className="hover:text-primary transition-colors">Leadership</Link></li>
          <li><Link to="/faq" className="hover:text-primary transition-colors">FAQ</Link></li>
        </ul>
      </div>
      <div>
        <h4 className="font-semibold mb-3 text-sm uppercase tracking-wider">Contact</h4>
        <p className="text-sm opacity-80">info@atech-solutions.com</p>
        <p className="text-sm opacity-80">+1 (555) 012-3456</p>
      </div>
    </div>
    <div className="container mt-8 pt-6 border-t border-accent-foreground/20 text-center text-xs opacity-60">
      © {new Date().getFullYear()} ATech Solutions. All rights reserved.
    </div>
  </footer>
);

export default Footer;
