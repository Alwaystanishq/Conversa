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

