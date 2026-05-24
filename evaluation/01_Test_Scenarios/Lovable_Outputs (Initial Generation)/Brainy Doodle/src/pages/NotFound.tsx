import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";

const NotFound = () => {
  return (
    <Layout>
      <SEOHead title="404 — Page Not Found" description="This page doesn't exist. The doodle you're looking for has wandered off." />
      <div className="container py-20 text-center">
        <h1 className="font-display text-5xl text-foreground mb-4">404</h1>
        <p className="font-body text-lg text-muted-foreground mb-6">
          This doodle seems to have wandered off the page.
        </p>
        <Link
          to="/"
          className="inline-block sketch-border bg-primary text-primary-foreground font-body font-semibold px-6 py-3 hover:opacity-90 transition-opacity focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          ← Back to Home
        </Link>
      </div>
    </Layout>
  );
};

export default NotFound;
