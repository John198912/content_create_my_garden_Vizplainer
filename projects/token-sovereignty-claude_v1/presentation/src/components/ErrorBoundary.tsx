import { Component, type ReactNode } from "react";

interface Props {
  chapterId: string;
  fatal?: boolean;
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

/**
 * Per-chapter error boundary. When a single chapter crashes, the
 * presentation shows a fallback instead of going white-screen.
 * The user can still navigate to other chapters via keyboard (1-9)
 * or the progress bar.
 */
export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error) {
    if (this.props.fatal) {
      document.documentElement.dataset.renderError = "true";
      console.error(`[render-fatal] ${this.props.chapterId}`, error);
    }
  }

  componentDidUpdate(prevProps: Props) {
    // Reset when switching to a different chapter
    if (prevProps.chapterId !== this.props.chapterId) {
      this.setState({ hasError: false, error: null });
    }
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fatal) return null;
      return (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "24px",
            padding: "80px",
            fontFamily: "var(--font-mono, monospace)",
            color: "var(--text-mute)",
            background: "var(--surface)",
          }}
        >
          <div
            style={{
              fontSize: "14px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--accent)",
            }}
          >
            Chapter Error
          </div>
          <div
            style={{
              fontSize: "40px",
              fontFamily: "var(--font-display-cn, sans-serif)",
              fontWeight: 700,
              color: "var(--text)",
            }}
          >
            {this.props.chapterId}
          </div>
          <div
            style={{
              fontSize: "16px",
              maxWidth: "480px",
              textAlign: "center",
              lineHeight: 1.6,
              color: "var(--text-2)",
            }}
          >
            {this.state.error?.message ?? "An unexpected error occurred in this chapter."}
          </div>
          <div
            style={{
              fontSize: "13px",
              color: "var(--text-faint)",
            }}
          >
            Press 1-9 to jump to another chapter, or reload the page.
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
