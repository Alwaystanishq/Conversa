import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import api from "../api/client";
import useAuthStore from "../store/authStore";
import type { Post } from "../types";
import PostCard from "../components/PostCard";
import Icon from "../components/Icon";

export default function Home() {
  const user = useAuthStore((state) => state.user);
  const location = useLocation();
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [attempt, setAttempt] = useState(0);

  function updateLikes(id: string, likes: string[]) {
    setPosts((posts) => posts.map((post) => post._id === id ? { ...post, likes } : post));
  }

  useEffect(() => {
    const controller = new AbortController();
    api.get("/posts/feed", { signal: controller.signal }).then((response) => {
      setPosts(response.data.posts);
      setError("");
    }).catch(() => {
      if (!controller.signal.aborted) setError("Your feed couldn't load. Let's try that again.");
    }).finally(() => {
      if (!controller.signal.aborted) setIsLoading(false);
    });
    return () => controller.abort();
  }, [attempt]);

  return (
    <>
      <header className="page-header"><div><h1>Home feed</h1><p>Posts from you and the people you follow.</p></div><span className="header-icon"><Icon name="home" size={24} /></span></header>
      {location.state?.posted && <p className="success-message" role="status"><Icon name="check" size={18} />Your post has been published.</p>}
      <Link to="/create" className="feed-composer"><span className="avatar">{user?.name.charAt(0).toUpperCase() || "U"}</span><span>What's on your mind, {user?.name.split(" ")[0]}?</span><span className="composer-plus"><Icon name="plus" /></span></Link>
      <div className="section-heading"><h2>Recent posts</h2><span>Latest first</span></div>
      {isLoading ? <div className="feed-loading" role="status"><span className="spinner" />Loading posts…</div> : error ? <div className="empty-state"><Icon name="chat" size={30} /><h2>Couldn’t load your feed</h2><p role="alert">{error}</p><button className="button button-secondary" onClick={() => { setIsLoading(true); setAttempt(attempt + 1); }}>Try again</button></div> : posts.length === 0 ? <div className="empty-state"><span className="empty-icon"><Icon name="chat" size={32} /></span><h2>No posts yet</h2><p>Write a post or follow someone to see their updates here.</p><div className="empty-actions"><Link className="button button-primary" to="/create"><Icon name="plus" size={18} />Write a post</Link><Link className="button button-secondary" to="/search">Find people<Icon name="arrow" size={17} /></Link></div></div> : <div className="post-list">{posts.map((post) => <PostCard key={post._id} post={post} onLike={updateLikes} />)}</div>}
      {!isLoading && !error && posts.length > 0 && <p className="feed-end">You're all caught up.</p>}
    </>
  );
}
