import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { isAxiosError } from "axios";
import api from "../api/client";
import useAuthStore from "../store/authStore";
import type { Person, Post } from "../types";
import Icon from "../components/Icon";
import PostCard from "../components/PostCard";

export default function Profile() {
  const { username } = useParams();
  const currentUser = useAuthStore((state) => state.user);
  const profileUsername = username || currentUser?.username;
  const [data, setData] = useState<{ profile: Person; posts: Post[]; likedPosts: Post[] } | null>(null);
  const [loadedUsername, setLoadedUsername] = useState<string>();
  const [error, setError] = useState("");
  const [tab, setTab] = useState("posts");
  const [isFollowing, setIsFollowing] = useState(false);
  const [followError, setFollowError] = useState("");
  const [attempt, setAttempt] = useState(0);

  function updateLikes(id: string, likes: string[]) {
    setData((data) => data && ({
      ...data,
      posts: data.posts.map((post) => post._id === id ? { ...post, likes } : post),
      likedPosts: data.likedPosts.map((post) => post._id === id ? { ...post, likes } : post),
    }));
  }

  useEffect(() => {
    const controller = new AbortController();
    api.get(`/users/${profileUsername}`, { signal: controller.signal }).then((response) => {
      setData({ profile: response.data.user, posts: response.data.userPosts || [], likedPosts: response.data.likedPosts || [] });
      setError("");
      setFollowError("");
      setTab("posts");
    }).catch((error) => {
      if (!controller.signal.aborted) {
        setData(null);
        setError(isAxiosError(error) && error.response?.status === 404 ? "This person couldn't be found." : "This profile couldn't load. Please try again.");
      }
    }).finally(() => {
      if (!controller.signal.aborted) setLoadedUsername(profileUsername);
    });
    return () => controller.abort();
  }, [profileUsername, attempt]);

  async function toggleFollow() {
    if (!data || !currentUser || isFollowing) return;
    const following = data.profile.followers?.includes(currentUser._id);
    setIsFollowing(true);
    setFollowError("");
    try {
      await api.put(`/users/${data.profile._id}/${following ? "unfollow" : "follow"}`);
      setData({ ...data, profile: { ...data.profile, followers: following ? data.profile.followers?.filter((id) => id !== currentUser._id) : [...(data.profile.followers || []), currentUser._id] } });
    } catch {
      setFollowError("Couldn't update your follow. Please try again.");
    } finally {
      setIsFollowing(false);
    }
  }

  if (loadedUsername !== profileUsername) return <div className="feed-loading" role="status"><span className="spinner" />Loading profile…</div>;
  if (!data) return <div className="empty-state"><Icon name="user" size={32} /><h1>Profile unavailable</h1><p role="alert">{error}</p><div className="empty-actions"><button className="button button-secondary" onClick={() => { setLoadedUsername(undefined); setAttempt(attempt + 1); }}>Try again</button><Link className="text-link" to="/search">Discover people<Icon name="arrow" size={16} /></Link></div></div>;

  const { profile, posts, likedPosts } = data;
  const ownProfile = currentUser?._id === profile._id;
  const following = profile.followers?.includes(currentUser?._id || "");
  const visiblePosts = tab === "posts" ? posts : likedPosts;

  return (
    <>
      <header className="page-header"><div><h1>{ownProfile ? "Your profile" : "Profile"}</h1><p>{ownProfile ? "Your posts and connections." : `Posts and updates from @${profile.username}.`}</p></div></header>
      <section className="profile-card" aria-label="Profile"><div className="profile-cover" aria-hidden="true" /><div className="profile-body"><div className="profile-top"><span className="avatar profile-avatar">{profile.name?.charAt(0).toUpperCase()}</span>{ownProfile ? <Link to="/create" className="button button-secondary"><Icon name="plus" size={16} />Write a post</Link> : <button onClick={toggleFollow} disabled={isFollowing} className={`button ${following ? "button-secondary" : "button-primary"}`} aria-pressed={Boolean(following)}>{isFollowing ? "Updating…" : following ? "Following" : "Follow"}{following && <Icon name="check" size={16} />}</button>}</div><h2>{profile.name}</h2><p className="profile-handle">@{profile.username}</p>{profile.bio && <p className="profile-bio">{profile.bio}</p>}{followError && <p className="error-message" role="alert">{followError}</p>}<dl className="profile-stats"><div><dt>Posts</dt><dd>{posts.length}</dd></div><div><dt>Followers</dt><dd>{profile.followers?.length || 0}</dd></div><div><dt>Following</dt><dd>{profile.following?.length || 0}</dd></div></dl></div></section>
      <div className="profile-tabs" role="group" aria-label="Profile post filter"><button onClick={() => setTab("posts")} aria-pressed={tab === "posts"}>Posts <span>{posts.length}</span></button><button onClick={() => setTab("likes")} aria-pressed={tab === "likes"}><Icon name="heart" size={16} />Liked posts <span>{likedPosts.length}</span></button></div>
      {visiblePosts.length === 0 ? <div className="empty-state"><span className="empty-icon"><Icon name={tab === "posts" ? "chat" : "heart"} size={28} /></span><h2>{tab === "posts" ? "No posts yet" : "No liked posts"}</h2><p>{tab === "posts" ? "Posts will appear here once they’re published." : "Liked posts will appear here."}</p>{ownProfile && tab === "posts" && <Link to="/create" className="button button-primary">Write your first post<Icon name="arrow" size={17} /></Link>}</div> : <div className="post-list">{visiblePosts.map((post) => <PostCard key={post._id} post={post} onLike={updateLikes} />)}</div>}
    </>
  );
}
