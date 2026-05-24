import { Link } from "react-router-dom";
import { SEOHead } from "@/components/SEOHead";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <SEOHead title="Page Not Found" description="The page you're looking for doesn't exist." path="/404" />
      <div className="text-center">
        <h1 className="mb-4 text-6xl font-bold text-primary neon-text">404</h1>
        <p className="mb-6 text-xl text-muted-foreground">Signal lost. Page not found.</p>
        <Link
          to="/"
          className="btn-neon inline-flex items-center gap-2 focus-visible:outline-2 focus-visible:outline-primary"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
}
