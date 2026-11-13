import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/client";
import useAuthStore from "../store/authStore";
import type { Post } from "../types";
import Icon from "./Icon";

export default function PostCard({ post, onLike }: { post: Post; onLike: (id: string, likes: string[]) => void }) {
  const user = useAuthStore((state) => state.user);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState("");
  const likes = post.likes || [];
  const liked = Boolean(user && likes.includes(user._id));

  async function toggleLike() {
    if (!user || isUpdating) return;
    setIsUpdating(true);
    setError("");
    try {
      await api.post(`/posts/${post._id}/${liked ? "unlike" : "like"}`);
      onLike(post._id, liked ? likes.filter((id) => id !== user._id) : [...likes, user._id]);
    } catch {
      setError("Couldn't update your like. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  }

  const date = new Date(post.createdAt);
  return (
    <article className="post-card">
      <div className="post-heading">
        <Link to={post.author ? `/profile/${post.author.username}` : "/home"} className="account-link"><span className="avatar">{post.author?.name.charAt(0).toUpperCase() || "?"}</span><span className="user-details"><strong>{post.author?.name || "Deleted account"}</strong><span>@{post.author?.username || "unknown"}</span></span></Link>
        <time dateTime={post.createdAt} title={date.toLocaleString()}>{date.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}</time>
      </div>
      <p className="post-content">{post.content}</p>
      <div className="post-footer"><button type="button" className="like-button" onClick={toggleLike} disabled={isUpdating || !user} aria-pressed={liked} aria-label={liked ? "Unlike post" : "Like post"} aria-busy={isUpdating}><Icon name="heart" size={17} /><span>{likes.length}</span></button></div>
      {error && <p className="error-message" role="alert">{error}</p>}
    </article>
  );
}
