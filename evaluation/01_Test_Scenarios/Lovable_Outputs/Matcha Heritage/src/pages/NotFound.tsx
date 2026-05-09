import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const NotFound = () => (
  <div className="flex min-h-screen items-center justify-center bg-muted">
    <Helmet>
      <title>Page Not Found | Matcha Heritage</title>
      <meta name="robots" content="noindex" />
    </Helmet>
    <div className="text-center px-4">
      <h1 className="mb-4 font-heading text-6xl font-bold text-foreground">404</h1>
      <p className="mb-6 font-body text-xl text-muted-foreground">This page doesn't exist</p>
      <Link
        to="/"
        className="font-body text-sm font-semibold text-secondary hover:underline focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded"
      >
        Return to Home
      </Link>
    </div>
  </div>
);

export default NotFound;
