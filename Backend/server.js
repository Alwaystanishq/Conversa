import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import rateLimit from "express-rate-limit";
import { connectDB } from "./Config/DB";
import AuthRouter from "./Routes/AuthRoutes";
import { authToken } from "./Middlewares/AuthMiddleware";
import PostRouter from "./Routes/PostRoutes";
import UserRouter from "./Routes/UserRoutes";

dotenv.config();

const app = express();

connectDB();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: {
    success: false,
    message: "Too many requests. Please try again after 15 minutes.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use("/api/auth", authLimiter, AuthRouter);

app.use("/api/posts", authToken, PostRouter);
app.use("/api/users", authToken, UserRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});