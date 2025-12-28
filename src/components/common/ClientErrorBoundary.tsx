"use client";

import React from "react";

export default class ClientErrorBoundary extends React.Component<
  { children: React.ReactNode; label?: string },
  { hasError: boolean; message?: string; stack?: string }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(err: any) {
    return {
      hasError: true,
      message: err?.message || String(err),
      stack: err?.stack || "",
    };
  }

  componentDidCatch(err: any) {
    // still log to console
    console.error("[ClientErrorBoundary]", err);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 16, border: "1px solid #ef4444", borderRadius: 12 }}>
          <h2 style={{ fontWeight: 700, marginBottom: 8 }}>
            CareerMindAI crashed while loading {this.props.label || "this page"}
          </h2>
          <div style={{ fontFamily: "monospace", whiteSpace: "pre-wrap", fontSize: 12 }}>
            {this.state.message}
            {"\n\n"}
            {this.state.stack}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
