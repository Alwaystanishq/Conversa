import express from "express";
import {
  getCurrentUserController,
  loginController,
  registerController,
} from "../Controllers/AuthControllers.js";
import { authToken } from "../Middlewares/AuthMiddleware.js";

export default function createAuthRouter(authLimiter) {
  const router = express.Router();

  router.post("/login", authLimiter, loginController);
  router.post("/register", authLimiter, registerController);
  router.get("/me", authToken, getCurrentUserController);

  return router;
}
