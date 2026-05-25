import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="bg-foreground text-background" role="contentinfo">
    <div className="container-tight section-padding">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <h3 className="heading-display text-lg mb-4">
            Aura <span className="text-primary">Kitchenware</span>
          </h3>
          <p className="text-sm opacity-70 leading-relaxed">
            Beautiful tools for modern kitchens. Cook with style, serve with love.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-medium mb-4 uppercase tracking-wider">Shop</h4>
          <div className="flex flex-col gap-2 text-sm opacity-70">
            <Link to="/all-products" className="hover:text-primary transition-colors">All Products</Link>
            <Link to="/all-products" className="hover:text-primary transition-colors">New Arrivals</Link>
            <Link to="/all-products" className="hover:text-primary transition-colors">Best Sellers</Link>
          </div>
        </div>
        <div>
          <h4 className="text-sm font-medium mb-4 uppercase tracking-wider">Learn</h4>
          <div className="flex flex-col gap-2 text-sm opacity-70">
            <Link to="/how-to-use" className="hover:text-primary transition-colors">How to Use</Link>
            <Link to="/recipes" className="hover:text-primary transition-colors">Recipes</Link>
            <Link to="/our-story" className="hover:text-primary transition-colors">Our Story</Link>
          </div>
        </div>
        <div>
          <h4 className="text-sm font-medium mb-4 uppercase tracking-wider">Connect</h4>
          <div className="flex flex-col gap-2 text-sm opacity-70">
            <span>Instagram</span>
            <span>Pinterest</span>
            <span>hello@aurakitchenware.com</span>
          </div>
        </div>
      </div>
      <div className="border-t border-background/20 mt-12 pt-8 text-center text-xs opacity-50">
        © 2026 Aura Kitchenware. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
