import { Link } from "react-router-dom";
import PageMeta from "@/components/PageMeta";

const NotFound = () => (
  <div className="flex min-h-screen items-center justify-center bg-background">
    <PageMeta title="Page Not Found" description="The requested page could not be found." path="/404" />
    <main className="text-center px-4">
      <h1 className="mb-4 text-6xl font-bold text-foreground">404</h1>
      <p className="mb-6 text-xl text-muted-foreground">Mission not found — this page doesn't exist.</p>
      <Link
        to="/"
        className="inline-block px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-all focus-visible:outline-2 focus-visible:outline-primary"
      >
        Return to Base
      </Link>
    </main>
  </div>
);

export default NotFound;
