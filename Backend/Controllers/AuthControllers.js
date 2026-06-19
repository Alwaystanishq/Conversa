import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../Models/UserModel";

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    const loginUser = await User.findOne({ email: email.toLowerCase() });
    if (!loginUser) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }
    const isMatched = await bcrypt.compare(password, loginUser.password);
    if (!isMatched) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is missing");
    }
    const token = jwt.sign({ id: loginUser._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
    loginUser.password = undefined;
    return res.status(200).json({
      success: true,
      token,
      user: loginUser,
    });
  } catch (error) {
    console.error(`server error in loginController ${error.message}`);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const registerController = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;
    if (!name || !username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    const existingUser = await User.findOne({
      $or: [
        { email: email.toLowerCase() },
        { username: username.toLowerCase() },
      ],
    });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email or username already exists",
      });
    }
    const user = await User.create({
      name,
      username: username.toLowerCase(),
      email: email.toLowerCase(),
      password,
    });
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is missing");
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
    user.password = undefined;
    return res.status(201).json({
      success: true,
      token,
      user,
    });
  } catch (error) {
    console.error(`Server error in registerController: ${error.message}`);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getCurrentUserController = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      user: req.user,
    });
  } catch (error) {
    console.error(
      `Server error in getCurrentUserController: ${error.message}`
    );

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};