import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectDB } from "./Config/DB";
import AuthRouter from "./Routes/AuthRoutes";
import { authToken } from "./Middlewares/AuthMiddleware";
import PostRouter from "./Routes/PostRoutes";

const app = express();
dotenv.config();
connectDB();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());

app.use("/api/auth",AuthRouter)
app.use("/api/posts", authToken, PostRouter)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
