import { Link } from "react-router-dom";
import PageMeta from "@/components/PageMeta";

const NotFound = () => (
  <main id="main-content" className="flex min-h-screen items-center justify-center bg-muted">
    <PageMeta title="Page Not Found" description="The page you're looking for doesn't exist." />
    <div className="text-center">
      <h1 className="mb-4 text-6xl font-black text-primary">404</h1>
      <p className="mb-6 text-xl text-muted-foreground">Page not found</p>
      <Link to="/" className="inline-block bg-primary text-primary-foreground px-6 py-3 font-bold hover:bg-primary/90 transition-colors">
        Return to Home
      </Link>
    </div>
  </main>
);

export default NotFound;
