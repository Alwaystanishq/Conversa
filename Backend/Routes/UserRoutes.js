import express from "express";
import {
  followUserController,
  getUserProfileController,
  unfollowUserController,
} from "../Controllers/UserControllers";

const router = express.Router();

router.get("/:username", getUserProfileController);
router.put("/:userId/follow", followUserController);
router.put("/:userId/unfollow", unfollowUserController);

export default router;
