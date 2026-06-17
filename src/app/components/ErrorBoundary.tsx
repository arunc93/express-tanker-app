import { Component, type ErrorInfo, type ReactNode } from "react";
import { Droplets } from "lucide-react";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("[ErrorBoundary] Uncaught render error:", error, errorInfo.componentStack);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4">
          <div className="bg-card border border-border rounded-2xl p-8 max-w-md w-full text-center">
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4"
              style={{ background: "linear-gradient(135deg, #0560a6, #06b6d4)" }}
            >
              <Droplets size={24} className="text-white" />
            </div>
            <h2 className="text-foreground mb-2" style={{ fontWeight: 700, fontSize: "1.2rem" }}>
              Something went wrong
            </h2>
            <p className="text-muted-foreground text-sm mb-6">
              An unexpected error occurred. Please try again or refresh the page.
            </p>
            {this.state.error && (
              <pre className="text-left bg-secondary rounded-xl p-3 text-xs text-muted-foreground mb-6 overflow-auto max-h-32">
                {this.state.error.message}
              </pre>
            )}
            <div className="flex gap-3 justify-center">
              <button
                onClick={this.handleRetry}
                className="bg-primary text-primary-foreground px-5 py-2.5 rounded-xl text-sm cursor-pointer hover:opacity-90 transition-opacity"
                style={{ fontWeight: 600 }}
              >
                Try Again
              </button>
              <button
                onClick={() => window.location.reload()}
                className="border border-border text-foreground px-5 py-2.5 rounded-xl text-sm cursor-pointer hover:bg-secondary transition-colors"
                style={{ fontWeight: 500 }}
              >
                Refresh Page
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
