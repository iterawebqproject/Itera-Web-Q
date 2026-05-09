import React from "react";

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  State
> {
  state: State = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-background" role="alert">
          <div className="text-center space-y-4 p-8">
            <h1 className="text-2xl font-heading font-bold text-foreground">Something went wrong</h1>
            <p className="text-muted-foreground">Please refresh the page or try again later.</p>
            <button
              onClick={() => window.location.reload()}
              className="rounded-md bg-primary text-primary-foreground px-6 py-2 font-medium hover:bg-primary/90 transition-colors"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
