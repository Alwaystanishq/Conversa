import express from "express";
import {
  getCurrentUserController,
  loginController,
  registerController,
} from "../Controllers/AuthControllers";
import { authToken } from "../Middlewares/AuthMiddleware";

const router = express.Router();

router.post("/login", loginController);
router.post("/register", registerController);
router.get("/me", authToken, getCurrentUserController);

export default router;
