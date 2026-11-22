import express from "express";
import "dotenv/config";
import mongoose from "mongoose";
import { toNodeHandler } from "better-auth/node";
import { createAuth } from "./Config/Auth.js";
import { redis } from "./Config/Redis.js";
import { cacheResponses } from "./Middlewares/Cache.js";
import cors from "cors";
import rateLimit from "express-rate-limit";
import { connectDB } from "./Config/DB.js";
import AuthRouter from "./Routes/AuthRoutes.js";
import { authToken } from "./Middlewares/AuthMiddleware.js";
import PostRouter from "./Routes/PostRoutes.js";
import UserRouter from "./Routes/UserRoutes.js";

const app = express();

await connectDB();
const auth = createAuth(mongoose.connection.db);
app.locals.auth = auth;
void redis.connect().catch((error) => console.error("Redis connection:", error.message));

app.use(
  cors({
    origin: process.env.WEB_ORIGIN || "http://localhost:5173",
    credentials: true,
  }),
);

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: {
    success: false,
    message: "Too many requests. Please try again after 15 minutes.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

app.post("/api/auth/sign-in/social", authLimiter);
app.all(/^\/api\/auth\/(?!login$|register$|me$|google$).+/, toNodeHandler(auth));
app.use(express.json());
app.use("/api/auth", AuthRouter(authLimiter));

app.use("/api/posts", authToken, cacheResponses, PostRouter);
app.use("/api/users", authToken, cacheResponses, UserRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});