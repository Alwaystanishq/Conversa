import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import rateLimit from "express-rate-limit";
import { connectDB } from "./Config/DB.js";
import AuthRouter from "./Routes/AuthRoutes.js";
import { authToken } from "./Middlewares/AuthMiddleware.js";
import PostRouter from "./Routes/PostRoutes.js";
import UserRouter from "./Routes/UserRoutes.js";

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

app.use("/api/auth", AuthRouter(authLimiter));

app.use("/api/posts", authToken, PostRouter);
app.use("/api/users", authToken, UserRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});