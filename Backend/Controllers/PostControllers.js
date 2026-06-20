import Post from "../Models/Postmodel";

const createPostController = async (req, res) => {
  try {
    const { content } = req.body;
    if (!content || !content.trim()) {
      return res.status(400).json({
        success: false,
        message: "Post Content is required",
      });
    }
    const post = await Post.create({
      author: req.user._id,
      content: content.trim(),
    });
    return res.status(201).json({
      success: true,
      message: "Post created successfully",
      post,
    });
  } catch (error) {
    console.error(`Server error in createPostController: ${error.message}`);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const getFeedController = async (req, res) => {
  try {
    const userIds = [req.user._id, ...req.user.following];

    const posts = await Post.find({
      author: { $in: userIds },
    })
      .populate("author", "name username bio")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      posts,
    });
  } catch (error) {
    console.error(`Server error in getFeedController: ${error.message}`);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const likePostController = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      {
        $addToSet: {
          likes: req.user._id,
        },
      },
      { new: true },
    );
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Post liked",
    });
  } catch (error) {
    console.error(`Server error in likePostController: ${error.message}`);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const unlikePostController = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      {
        $pull: {
          likes: req.user._id,
        },
      },
      { new: true },
    );

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Post unliked",
    });
  } catch (error) {
    console.error(`Server error in unlikePostController: ${error.message}`);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
