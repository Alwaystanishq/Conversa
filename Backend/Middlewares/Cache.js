import { redis } from "../Config/Redis.js";

export async function cacheResponses(req, res, next) {
  if (!redis.isReady) return next();
  try {
    const version = await redis.get("conversa:cache:version") || "0";
    const key = `conversa:cache:${version}:${req.user._id}:${req.originalUrl}`;
    if (req.method === "GET") {
      const cached = await redis.get(key);
      if (cached) return res.json(JSON.parse(cached));
    }
    const json = res.json.bind(res);
    res.json = (body) => {
      if (res.statusCode >= 200 && res.statusCode < 300) {
        const update = req.method === "GET"
          ? redis.set(key, JSON.stringify(body), { EX: 30 })
          : redis.incr("conversa:cache:version");
        void update.catch((error) => console.error("Redis cache:", error.message));
      }
      return json(body);
    };
  } catch (error) {
    console.error("Redis cache:", error.message);
  }
  next();
}
