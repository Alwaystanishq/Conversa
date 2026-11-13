import { Link, NavLink, Outlet } from "react-router-dom";
import useAuthStore from "../store/authStore";
import Icon from "./Icon";

export default function Layout() {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  return (
    <div className="app-layout">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <aside className="sidebar">
        <Link to="/home" className="brand">conversa<span className="brand-dot">.</span></Link>
        
        <nav className="main-nav" aria-label="Main navigation">
          <NavLink to="/home"><Icon name="home" /><span>Home feed</span></NavLink>
          <NavLink to="/search"><Icon name="search" /><span>Discover</span></NavLink>
          <NavLink to="/profile"><Icon name="user" /><span>My profile</span></NavLink>
          <NavLink to="/create" className="compose-link"><Icon name="plus" /><span>Create a post</span></NavLink>
        </nav>
        <div className="sidebar-bottom">
          
          <div className="account-row">
            <Link to="/profile" className="account-link"><span className="avatar">{user?.name.charAt(0).toUpperCase() || "U"}</span><span className="user-details"><strong>{user?.name}</strong><span>@{user?.username}</span></span></Link>
            <button className="icon-button" onClick={logout} aria-label="Log out" title="Log out"><Icon name="logout" size={18} /></button>
          </div>
        </div>
      </aside>
      <main id="main-content" className="main-content" tabIndex={-1}><Outlet /></main>
      <aside className="context-sidebar">
        <div className="community-card"><h2>Find someone new</h2><p>Search for a friend or look up someone whose posts caught your eye.</p><Link to="/search" className="text-link">Search people <Icon name="arrow" size={16} /></Link></div>
        <div className="writing-tip"><h3>A thought to share?</h3><p>A recommendation, a question, or an update from your day.</p><Link to="/create" className="text-link">Write a post <Icon name="arrow" size={16} /></Link></div>
        <p className="sidebar-footer">© {new Date().getFullYear()} Conversa</p>
      </aside>
    </div>
  );
}
