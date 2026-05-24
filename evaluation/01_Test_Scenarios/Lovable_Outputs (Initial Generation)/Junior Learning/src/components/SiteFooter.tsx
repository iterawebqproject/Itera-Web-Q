import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const SiteFooter = () => {
  return (
    <footer className="border-t border-border bg-card py-10" role="contentinfo">
      <div className="container flex flex-col items-center gap-4">
        <Link to="/subjects" aria-label="Start learning – browse subjects">
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 text-base font-bold rounded-full">
            Start Learning
          </Button>
        </Link>
        <p className="text-sm text-muted-foreground">© 2026 Junior Learning. Free for everyone.</p>
      </div>
    </footer>
  );
};

export default SiteFooter;
