import type { ReactNode } from "react";
import { Link } from "react-router-dom";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="auth-layout">
      <section className="auth-story" aria-label="Welcome to Conversa">
        <Link to="/" className="brand">conversa<span className="brand-dot">.</span></Link>
        <div className="auth-story-content"><h1>Keep the<br /><em>conversation</em><br />going.</h1><p>A place for everyday updates, good recommendations, and the people you like hearing from.</p></div>
        <Link to="/" className="text-link">← Back to Conversa</Link>
      </section>
      <main className="auth-main"><div className="auth-form-wrap">{children}</div><p className="auth-footer">© {new Date().getFullYear()} Conversa</p></main>
    </div>
  );
}
