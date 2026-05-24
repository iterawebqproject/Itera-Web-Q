import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="border-t border-border/40 mt-20">
    <div className="container mx-auto px-4 py-10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
      <p>&copy; {new Date().getFullYear()} Forger Case Files — A fan project. Not affiliated with Tatsuya Endo or Shueisha.</p>
      <nav aria-label="Footer navigation" className="flex gap-4">
        <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
        <Link to="/characters" className="hover:text-foreground transition-colors">Characters</Link>
        <Link to="/reviews" className="hover:text-foreground transition-colors">Reviews</Link>
      </nav>
    </div>
  </footer>
);

export default Footer;
