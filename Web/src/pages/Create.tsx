import { useState } from "react";
import { isAxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import api from "../api/client";
import useAuthStore from "../store/authStore";
import Icon from "../components/Icon";

export default function Create() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCreatePost = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!content.trim() || isLoading) return;
    setError("");
    setIsLoading(true);
    try {
      await api.post("/posts", { content: content.trim() });
      navigate("/home", { state: { posted: true } });
    } catch (error) {
      setError(isAxiosError(error) && error.response?.data?.message || "Your post couldn't be published. Your words are still here; try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <header className="page-header"><div><h1>Write a post</h1><p>Share an update with your followers.</p></div></header>
      <form onSubmit={handleCreatePost} className="create-card" aria-busy={isLoading}>
        <div className="account-link"><span className="avatar">{user?.name.charAt(0).toUpperCase() || "U"}</span><span className="user-details"><strong>{user?.name}</strong><span>Posting on Conversa</span></span></div>
        <label htmlFor="post-content" className="sr-only">Your post</label><textarea id="post-content" value={content} onChange={(event) => setContent(event.target.value)} rows={8} maxLength={280} required placeholder="What's on your mind?" aria-describedby="character-count post-tip" />
        <p id="post-tip" className="compose-tip">Up to 280 characters.</p>
        {error && <p className="error-message" role="alert">{error}</p>}
        <div className="create-footer"><span id="character-count" className={content.length > 259 ? "character-count near-limit" : "character-count"}>{content.length}<span> / 280</span></span><button type="submit" disabled={isLoading || !content.trim()} className="button button-primary">{isLoading ? "Publishing…" : "Publish post"}<Icon name="arrow" size={18} /></button></div>
      </form>
    </>
  );
}
