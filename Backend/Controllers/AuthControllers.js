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
