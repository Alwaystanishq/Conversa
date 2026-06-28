import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/client";

export default function Search() {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      searchUsers();
    }, 400);

    return () => clearTimeout(timeout);
  }, [query]);

  const searchUsers = async () => {
    if (!query.trim()) {
      setUsers([]);
      return;
    }

    try {
      setIsLoading(true);

      const response = await api.get("/users/search", {
        params: {
          query,
        },
      });

      setUsers(response.data.users);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 px-6 py-10">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-bold text-white">Search Users</h1>

        <p className="mt-2 text-zinc-400">Find people to follow.</p>

        <input
          type="text"
          placeholder="Search by name or username..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="mt-8 w-full rounded-xl border border-zinc-800 bg-zinc-900 px-5 py-3 text-white outline-none focus:border-violet-500"
        />

        {isLoading && <p className="mt-6 text-zinc-400">Searching...</p>}

        {!isLoading && users.length === 0 && query && (
          <p className="mt-6 text-zinc-500">No users found.</p>
        )}

        <div className="mt-8 space-y-4">
          {users.map((user) => (
            <Link
              key={user._id}
              to={`/profile/${user.username}`}
              className="flex items-center gap-4 rounded-2xl border border-zinc-800 bg-zinc-900 p-5 transition hover:border-violet-500"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-violet-600 text-lg font-bold text-white">
                {user.name?.charAt(0).toUpperCase()}
              </div>

              <div>
                <h2 className="font-semibold text-white">{user.name}</h2>

                <p className="text-sm text-zinc-400">@{user.username}</p>

                {user.bio && (
                  <p className="mt-1 text-sm text-zinc-500">{user.bio}</p>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
