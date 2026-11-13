import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/client";
import type { Person } from "../types";
import Icon from "../components/Icon";

export default function Search() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<{ query: string; users: Person[]; error: string }>({ query: "", users: [], error: "" });
  const term = query.trim();
  const isLoading = Boolean(term && result.query !== term);

  useEffect(() => {
    if (!term) return;
    const controller = new AbortController();
    const timeout = setTimeout(() => {
      api.get("/users/search", { params: { query: term }, signal: controller.signal }).then((response) => {
        setResult({ query: term, users: response.data.users, error: "" });
      }).catch(() => {
        if (!controller.signal.aborted) setResult({ query: term, users: [], error: "Search couldn't load. Please try another search." });
      });
    }, 350);
    return () => { clearTimeout(timeout); controller.abort(); };
  }, [term]);

  return (
    <>
      <header className="page-header"><div><h1>Find people</h1><p>Search by name or username.</p></div></header>
      <div className="search-field"><Icon name="search" /><input type="search" aria-label="Search people by name or username" placeholder="Search by name or username" value={query} onChange={(event) => setQuery(event.target.value)} /></div>
      <div aria-live="polite" aria-atomic="true">
        {!term ? <div className="empty-state search-empty"><span className="empty-icon"><Icon name="search" size={32} /></span><h2>Who are you looking for?</h2><p>Enter a name above to find their profile.</p></div> : isLoading ? <div className="feed-loading" role="status"><span className="spinner" />Searching…</div> : result.error ? <p className="error-message" role="alert">{result.error}</p> : <><div className="section-heading"><h2>People</h2><span>{result.users.length} {result.users.length === 1 ? "result" : "results"}</span></div>{result.users.length === 0 ? <div className="empty-state"><Icon name="search" size={28} /><h2>No people found</h2><p>Try a different name or check your spelling.</p></div> : <div className="people-list">{result.users.map((person) => <Link key={person._id} to={`/profile/${person.username}`} className="person-card"><span className="avatar">{person.name?.charAt(0).toUpperCase()}</span><span className="user-details"><strong>{person.name}</strong><span>@{person.username}</span>{person.bio && <span className="person-bio">{person.bio}</span>}</span><Icon name="arrow" size={18} /></Link>)}</div>}</>}
      </div>
    </>
  );
}
