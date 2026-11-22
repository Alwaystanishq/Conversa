import { Link } from "react-router-dom";
import useAuthStore from "../store/authStore";

export default function Landing() {
  const user = useAuthStore((state) => state.user);
  const destination = user ? "/home" : "/register";

  return (
    <div className="landing">
      <a className="skip-link" href="#landing-content">Skip to content</a>
      <header className="public-nav">
        <div className="public-nav-inner">
          <Link to="/" className="brand" aria-label="Conversa home">conversa<span className="brand-dot">.</span></Link>
          <nav aria-label="Public navigation">
            <a href="#how-it-works">How it works</a>
            {!user && <Link to="/login">Log in</Link>}
            <Link to={destination} className="button button-primary">{user ? "Open feed" : "Join Conversa"}</Link>
          </nav>
        </div>
      </header>

      <main id="landing-content" tabIndex={-1}>
        <section className="landing-hero" aria-labelledby="hero-title">
          <div className="landing-hero-copy">
            <h1 id="hero-title">Something worth talking about.</h1>
            <p>Share small updates with the people you choose to follow.</p>
            <Link to={destination} className="button button-primary">{user ? "Go to your feed" : "Create an account"}</Link>
          </div>

          <div className="conversation-wall" aria-label="Illustrative posts from a Conversa feed">
            <article className="wall-sheet wall-sheet-lead">
              <header className="wall-author">
                <span className="avatar avatar-peach">J</span>
                <span><strong>Jamie</strong><small>@jamie</small></span>
                <time>12 min ago</time>
              </header>
              <p>Found a secondhand bookshop round the corner. Went in for ten minutes, came out an hour later with three books.</p>
              <footer><span aria-label="8 likes">♡ 8</span></footer>
            </article>
            <article className="wall-sheet wall-sheet-reply">
              <header className="wall-author">
                <span className="avatar avatar-sage">R</span>
                <span><strong>Riley</strong><small>@riley</small></span>
                <time>28 min ago</time>
              </header>
              <p>What’s a book you wish you could read for the first time again?</p>
              <footer><span aria-label="12 likes">♡ 12</span></footer>
            </article>
          </div>
        </section>

        <section className="landing-statement" aria-label="What makes Conversa different">
          <p>Short posts.<br />People you choose to follow.</p>
        </section>

        <section id="how-it-works" className="landing-process" aria-labelledby="how-title">
          <div className="process-heading">
            <h2 id="how-title">Keep it simple.</h2>
            <p>A few words and a few familiar faces. That’s a good place to start.</p>
          </div>
          <ol>
            <li><h3>Introduce yourself</h3><p>Pick a username and add a little about yourself.</p></li>
            <li><h3>Put a thought out there</h3><p>Ask a question, share a recommendation, or tell us about your day.</p></li>
            <li><h3>Make your own feed</h3><p>Follow people whose posts you enjoy. Their updates appear alongside yours.</p></li>
          </ol>
        </section>

        <section className="landing-invitation" aria-labelledby="invitation-title">
          <div>
            <h2 id="invitation-title">See you in the feed.</h2>
            <p>Make an account. Say hello. Take it from there.</p>
          </div>
          <Link to={destination} className="button button-primary">{user ? "Open your feed" : "Create an account"}</Link>
        </section>
      </main>

      <footer className="landing-footer">
        <Link to="/" className="brand" aria-label="Conversa home">conversa<span className="brand-dot">.</span></Link>
        <p>Short posts from people you follow.</p>
        <span>© {new Date().getFullYear()} Conversa</span>
      </footer>
    </div>
  );
}
