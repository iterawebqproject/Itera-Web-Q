import { Component, type ReactNode } from "react";
import { Link } from "react-router-dom";

interface Props { children: ReactNode; }
interface State { hasError: boolean; }

class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-background" role="alert">
          <div className="text-center px-4">
            <h1 className="font-heading text-3xl font-bold text-foreground mb-4">Something went wrong</h1>
            <p className="font-body text-muted-foreground mb-6">We're sorry — an unexpected error occurred.</p>
            <Link to="/" className="font-body text-sm font-semibold text-secondary hover:underline">
              Return Home
            </Link>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
