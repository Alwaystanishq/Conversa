import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/client";
import useAuthStore from "../store/authStore";

export default function Profile() {
  const { username } = useParams();

  const currentUser = useAuthStore((state) => state.user);

  const [profile, setProfile] = useState<any>(null);
  const [posts, setPosts] = useState<any[]>([]);
  const [likedPosts, setLikedPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getProfile();
  }, [username]);

  const getProfile = async () => {
    try {
      setIsLoading(true);

      const profileUsername = username || currentUser?.username;

      const response = await api.get(`/users/${profileUsername}`);

      setProfile(response.data.user);
      setPosts(response.data.posts || []);
      setLikedPosts(response.data.likedPosts || []);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-950">
        <h1 className="text-white text-xl">Loading...</h1>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-950">
        <h1 className="text-white text-xl">User not found.</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 px-6 py-10">
      <div className="mx-auto max-w-3xl">
        {/* Profile Card */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8">
          <div className="flex items-center gap-5">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-violet-600 text-3xl font-bold text-white">
              {profile.name?.charAt(0).toUpperCase()}
            </div>

            <div>
              <h1 className="text-3xl font-bold text-white">{profile.name}</h1>

              <p className="text-zinc-400">@{profile.username}</p>

              {profile.bio && (
                <p className="mt-3 text-zinc-300">{profile.bio}</p>
              )}
            </div>
          </div>

          <div className="mt-8 flex gap-10">
            <div>
              <p className="text-2xl font-bold text-white">{posts.length}</p>

              <p className="text-zinc-500">Posts</p>
            </div>

            <div>
              <p className="text-2xl font-bold text-white">
                {profile.followers?.length || 0}
              </p>

              <p className="text-zinc-500">Followers</p>
            </div>

            <div>
              <p className="text-2xl font-bold text-white">
                {profile.following?.length || 0}
              </p>

              <p className="text-zinc-500">Following</p>
            </div>
          </div>
        </div>

        {/* Posts */}
        <div className="mt-10">
          <h2 className="mb-5 text-2xl font-bold text-white">Posts</h2>

          {posts.length === 0 ? (
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8 text-center text-zinc-500">
              No posts yet.
            </div>
          ) : (
            <div className="space-y-4">
              {posts.map((post) => (
                <div
                  key={post._id}
                  className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6"
                >
                  <p className="whitespace-pre-wrap text-white">
                    {post.content}
                  </p>

                  <p className="mt-4 text-sm text-zinc-500">
                    ❤️ {post.likes?.length || 0} Likes
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Liked Posts */}
        <div className="mt-12">
          <h2 className="mb-5 text-2xl font-bold text-white">Liked Posts</h2>

          {likedPosts.length === 0 ? (
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8 text-center text-zinc-500">
              No liked posts.
            </div>
          ) : (
            <div className="space-y-4">
              {likedPosts.map((post) => (
                <div
                  key={post._id}
                  className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6"
                >
                  <p className="whitespace-pre-wrap text-white">
                    {post.content}
                  </p>

                  <p className="mt-4 text-sm text-zinc-500">
                    @{post.author?.username}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
