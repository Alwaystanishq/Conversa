import User from "../Models/UserModel.js";
import Post from "../Models/PostModel.js";

export const getUserProfileController = async (req, res) => {
  try {
    const user = await User.findOne({
      username: req.params.username.toLowerCase(),
    }).select("-password");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    const userPosts = await Post.find({
      author: user._id,
    })
      .populate("author", "name username bio")
      .sort({ createdAt: -1 });
    const likedPosts = await Post.find({
      likes: user._id,
    })
      .populate("author", "name username bio")
      .sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      user,
      userPosts,
      likedPosts,
    });
  } catch (error) {
    console.error(`Profile error: ${error.message}`);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const followUserController = async (req, res) => {
  try {
    const currentUserId = req.user._id;
    const targetUserId = req.params.userId;
    if (currentUserId.toString() === targetUserId) {
      return res.status(400).json({
        success: false,
        message: "You cannot follow yourself",
      });
    }
    const targetUser = await User.findById(targetUserId);
    if (!targetUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    await User.findByIdAndUpdate(targetUserId, {
      $addToSet: { followers: currentUserId },
    });
    await User.findByIdAndUpdate(currentUserId, {
      $addToSet: { following: targetUserId },
    });
    return res.status(200).json({
      success: true,
      message: "User followed successfully",
    });
  } catch (error) {
    console.error(`Follow error: ${error.message}`);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
