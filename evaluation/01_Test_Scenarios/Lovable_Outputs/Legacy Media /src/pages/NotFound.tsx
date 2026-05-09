import { Link } from "react-router-dom";
import PageMeta from "@/components/PageMeta";

const NotFound = () => (
  <div className="flex min-h-screen items-center justify-center bg-background">
    <PageMeta title="Page Not Found" description="The page you're looking for doesn't exist." />
    <div className="text-center px-6">
      <h1 className="font-heading text-6xl font-bold text-foreground mb-4">404</h1>
      <p className="font-body text-lg text-muted-foreground mb-6">Page not found</p>
      <Link to="/" className="font-body text-sm text-primary underline hover:text-accent">
        Return to Home
      </Link>
    </div>
  </div>
);

export default NotFound;
