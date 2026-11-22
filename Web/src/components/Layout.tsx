import { Link, NavLink, Outlet } from "react-router-dom";
import useAuthStore from "../store/authStore";
import Icon from "./Icon";

export default function Layout() {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <header className="app-header">
        <Link to="/home" className="brand" aria-label="Conversa home">conversa<span className="brand-dot">.</span></Link>
        <nav className="main-nav" aria-label="Main navigation">
          <NavLink to="/home"><Icon name="home" /><span>Home</span></NavLink>
          <NavLink to="/search"><Icon name="search" /><span>Discover</span></NavLink>
          <NavLink to="/profile"><Icon name="user" /><span>Profile</span></NavLink>
          <NavLink to="/create" className="compose-link"><Icon name="plus" /><span>Write</span></NavLink>
        </nav>
        <div className="account-row">
          <Link to="/profile" className="account-link"><span className="avatar">{user?.name.charAt(0).toUpperCase() || "U"}</span><span className="user-details"><strong>{user?.name}</strong><span>@{user?.username}</span></span></Link>
          <button type="button" className="icon-button" onClick={logout} aria-label="Log out" title="Log out"><Icon name="logout" /></button>
        </div>
      </header>

      <div className="app-workspace">
        <main id="main-content" className="main-content" tabIndex={-1}><Outlet /></main>
        <aside className="context-sidebar" aria-label="Quick links">
          <section className="aside-sheet aside-sheet-accent"><h2>Find someone new</h2><p>Search for a friend or someone whose posts caught your eye.</p><Link to="/search" className="text-link">Search people</Link></section>
          <section className="aside-sheet"><h2>A thought to share?</h2><p>A recommendation, a question, or an update from your day.</p><Link to="/create" className="text-link">Write a post</Link></section>
          <p className="sidebar-footer">© {new Date().getFullYear()} Conversa</p>
        </aside>
      </div>
    </div>
  );
}
