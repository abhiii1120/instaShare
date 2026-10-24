import userModel from "../model/user.model.js";
import { sendEmail } from "../services/email.service.js";
import jwt from "jsonwebtoken";
import { generateToken } from "../../utils/token.js";

export const registerController = async (req, res) => {
  try {
    let { username, fullName, email, mobile, password, bio, dob } = req.body;

    if (!username || !email || !password || !fullName) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const newUser = await userModel.create({
      username,
      fullName,
      email,
      mobile,
      password,
      bio,
      dob,
    });

    const accessToken = generateToken(newUser._id, "15min");
    const refreshToken = generateToken(newUser._id, "1d");

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({
      success: true,
      message: "User registered",
      data: newUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "internal server error",
      error: error.message,
    });
  }
};
