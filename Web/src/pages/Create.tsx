import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/client";

export default function Create() {
  const navigate = useNavigate();

  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleCreatePost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!content.trim()) {
      return alert("Write something before posting.");
    }

    try {
      setIsLoading(true);

      await api.post("/posts", {
        content,
      });

      navigate("/home");
    } catch (error: any) {
      alert(error.response?.data?.message || "Could not create post.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 px-6 py-10">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-bold text-white">Create Post</h1>

        <p className="mt-2 text-zinc-400">Share what's on your mind.</p>

        <form onSubmit={handleCreatePost} className="mt-8">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={8}
            maxLength={280}
            placeholder="Write something..."
            className="w-full resize-none rounded-2xl border border-zinc-800 bg-zinc-900 p-5 text-white outline-none focus:border-violet-500"
          />

          <div className="mt-2 flex justify-end">
            <span className="text-sm text-zinc-500">{content.length}/280</span>
          </div>

          <button
            type="submit"
            disabled={isLoading || !content.trim()}
            className="mt-6 w-full rounded-xl bg-violet-600 py-3 font-semibold text-white transition hover:bg-violet-700 disabled:opacity-50"
          >
            {isLoading ? "Posting..." : "Post"}
          </button>
        </form>
      </div>
    </div>
  );
}
