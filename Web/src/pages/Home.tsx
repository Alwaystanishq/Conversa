import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/client";

export default function Home() {
  const [posts, setPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const getFeed = async () => {
    try {
      const response = await api.get("/posts/feed");
      setPosts(response.data.posts);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-950">
        <h1 className="text-xl text-white">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 px-6 py-10">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-8 text-4xl font-bold text-white">Home</h1>

        {posts.length === 0 ? (
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-10 text-center">
            <h2 className="text-xl font-semibold text-white">No posts yet</h2>

            <p className="mt-2 text-zinc-400">
              Follow people or create your first post.
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            {posts.map((post) => (
              <div
                key={post._id}
                className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6"
              >
                <Link
                  to={`/profile/${post.author.username}`}
                  className="flex items-center gap-4"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-violet-600 text-lg font-bold text-white">
                    {post.author?.name?.charAt(0)?.toUpperCase() || "U"}
                  </div>

                  <div>
                    <h2 className="font-semibold text-white hover:text-violet-400">
                      {post.author?.name}
                    </h2>

                    <p className="text-sm text-zinc-400">
                      @{post.author?.username}
                    </p>
                  </div>
                </Link>

                <p className="mt-5 whitespace-pre-wrap text-zinc-200">
                  {post.content}
                </p>

                <div className="mt-5 flex items-center justify-between border-t border-zinc-800 pt-4">
                  <span className="text-sm text-zinc-400">
                    ❤️ {post.likes?.length || 0} Likes
                  </span>

                  <span className="text-xs text-zinc-500">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
