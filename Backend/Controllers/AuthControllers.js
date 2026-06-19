import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../Models/UserModel";

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(401).json({
        success: false,
        message: "All fields are required",
      });
    }
    const loginUser = await User.findOne({ email: email });
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
  } catch (error) {}
};
