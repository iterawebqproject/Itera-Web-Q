import { Link } from "react-router-dom";
import usePageMeta from "@/hooks/usePageMeta";

const NotFound = () => {
  usePageMeta({ title: "Page Not Found", description: "The page you're looking for doesn't exist." });

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="mb-4 font-display text-6xl font-bold text-foreground">404</h1>
        <p className="mb-6 text-xl text-muted-foreground">Oops! Page not found</p>
        <Link
          to="/"
          className="inline-block px-6 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium transition-colors hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
