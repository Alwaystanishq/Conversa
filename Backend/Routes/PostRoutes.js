import express from "express";
import {
  createPostController,
  deletePostController,
  getFeedController,
  likePostController,
  unlikePostController,
} from "../Controllers/PostControllers.js";

const router = express.Router();

router.post("/", createPostController);
router.get("/feed", getFeedController);
router.post("/:id/like", likePostController);
router.post("/:id/unlike", unlikePostController);
router.delete("/:id", deletePostController);

export default router;
