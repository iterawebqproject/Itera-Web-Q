import { Link } from "react-router-dom";

const SiteFooter = () => (
  <footer className="border-t bg-card py-6">
    <div className="container flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
      <p>&copy; {new Date().getFullYear()} LearnNova. All rights reserved.</p>
      <nav aria-label="Footer navigation" className="flex gap-4">
        <Link to="/category/all" className="hover:text-foreground transition-colors">Explore</Link>
        <Link to="/faq" className="hover:text-foreground transition-colors">FAQ</Link>
      </nav>
    </div>
  </footer>
);

export default SiteFooter;
