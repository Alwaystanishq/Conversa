import { Link } from "react-router-dom";
import Icon from "../components/Icon";
import useAuthStore from "../store/authStore";

export default function Landing() {
  const user = useAuthStore((state) => state.user);
  const destination = user ? "/home" : "/register";

  return (
    <div className="landing">
      <a className="skip-link" href="#landing-content">Skip to content</a>
      <header className="landing-nav landing-container">
        <Link to="/" className="brand" aria-label="Conversa home">conversa<span className="brand-dot">.</span></Link>
        <div className="landing-nav-actions">
          {!user && <Link to="/login" className="landing-login">Log in</Link>}
          <Link to={destination} className="button button-primary">{user ? "Open feed" : "Sign up"}<Icon name="arrow" size={16} /></Link>
        </div>
      </header>
      <main id="landing-content" tabIndex={-1}>
        <section className="landing-hero landing-container" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow">A place to keep in touch</p>
            <h1 id="hero-title">Something<br />worth <em>talking<br className="hero-break" /> about.</em></h1>
            <p>What you’re reading. What happened on the way home. That question you keep coming back to. Share it with your people.</p>
            <div className="hero-actions">
              <Link to={destination} className="button button-primary">{user ? "Go to your feed" : "Join Conversa"}<Icon name="arrow" size={18} /></Link>
            </div>
          </div>
          <div className="hero-preview" aria-label="Example Conversa posts">
            <div className="preview-heading"><span>From the feed</span><span>Illustrative posts</span></div>
            <article className="preview-post">
              <div className="account-link"><span className="avatar avatar-peach">J</span><span className="user-details"><strong>Jamie</strong><span>@jamie · 12 min ago</span></span></div>
              <p>Found a secondhand bookshop round the corner. Went in for ten minutes, came out an hour later with three books.</p>
              <div className="preview-post-footer"><Icon name="heart" size={17} /><span>8</span></div>
            </article>
            <article className="preview-post">
              <div className="account-link"><span className="avatar avatar-sage">R</span><span className="user-details"><strong>Riley</strong><span>@riley · 28 min ago</span></span></div>
              <p>What’s a book you wish you could read for the first time again?</p>
              <div className="preview-post-footer"><Icon name="heart" size={17} /><span>12</span></div>
            </article>
            <p className="preview-caption">Short posts. People you choose to follow.</p>
          </div>
        </section>
        <section id="how-it-works" className="landing-how landing-container" aria-labelledby="how-title">
          <div className="landing-section-heading"><p className="eyebrow">How it works</p><h2 id="how-title">Keep it simple.</h2><p>A few words and a few familiar faces.<br />That’s a good place to start.</p></div>
          <div className="landing-steps">
            <article><span className="step-number">01</span><div><h3>Introduce yourself</h3><p>Pick a username and add a little about yourself. Give people a name to put to your posts.</p></div></article>
            <article><span className="step-number">02</span><div><h3>Put a thought out there</h3><p>You have 280 characters. Ask a question, share a recommendation, or tell us about your day.</p></div></article>
            <article><span className="step-number">03</span><div><h3>Make your own feed</h3><p>Look up friends and follow people whose posts you enjoy. Their updates will appear alongside yours.</p></div></article>
          </div>
        </section>
        <section className="landing-invitation landing-container" aria-labelledby="invitation-title">
          <div><h2 id="invitation-title">See you in the feed.</h2><p>Make an account. Say hello. Take it from there.</p></div>
          <Link to={destination} className="button button-primary">{user ? "Open your feed" : "Create an account"}<Icon name="arrow" size={18} /></Link>
        </section>
      </main>
      <footer className="landing-footer landing-container"><Link to="/" className="brand">conversa<span className="brand-dot">.</span></Link><span>© {new Date().getFullYear()} Conversa</span></footer>
    </div>
  );
}
