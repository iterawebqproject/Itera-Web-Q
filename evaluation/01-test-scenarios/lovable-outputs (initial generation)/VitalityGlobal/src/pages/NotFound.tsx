import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const NotFound = () => (
  <div className="flex min-h-screen items-center justify-center bg-muted">
    <Helmet>
      <title>Page Not Found | VitalityGlobal</title>
      <meta name="robots" content="noindex" />
    </Helmet>
    <div className="text-center">
      <h1 className="mb-4 text-4xl font-bold">404</h1>
      <p className="mb-4 text-xl text-muted-foreground">Oops! Page not found</p>
      <Link to="/" className="text-primary underline hover:text-primary/90 focus-visible:outline-2 focus-visible:outline-primary">
        Return to Home
      </Link>
    </div>
  </div>
);

export default NotFound;
