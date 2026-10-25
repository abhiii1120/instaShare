import userModel from "../model/user.model.js";
import { sendEmail } from "../services/email.service.js";
import { generateToken, verifyToken } from "../shared/utils/token.js";
import BadRequest from "../shared/error/BadRequest.js";
import Notfound from "../shared/error/NotFound.js";
import Unauthorized from "../shared/error/Unauthorized.js";
import { setAuthCookies } from "../shared/utils/authCookies.js";
import BuildSuccessResponse from "../shared/utils/BuildSuccessResponse.js";

export const registerController = async (req, res) => {
  let { username, fullName, email, mobile, password, bio, dob } = req.body;

  if (!username || !email || !password || !fullName) {
    throw new BadRequest("All fields are required");
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

  const userData = newUser.toObject();
  delete userData.password;

  const accessToken = generateToken(newUser._id, "15m");
  const refreshToken = generateToken(newUser._id, "1d");

  setAuthCookies(res, accessToken, refreshToken);

  BuildSuccessResponse(res, "User registered Successfully", userData);
};

export const loginController = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequest("All fields are required");
  }

  const user = await userModel.findOne({ email });

  if (!user) throw new Notfound("User not found");

  const isPasswordCorrect = user.comparePass(password);

  if (!isPasswordCorrect) throw new Unauthorized("Invalid credentials");

  const accessToken = generateToken(user._id, "15m");
  const refreshToken = generateToken(user._id, "7d");

  setAuthCookies(res, accessToken, refreshToken);

  const userData = user.toObject();
  delete userData.password;

  BuildSuccessResponse(res, "User Login Successfully", userData);
};

export const refreshTokenController = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    throw new Unauthorized("Unauhorized access");
  }

  const verifyRefreshToken = verifyToken(refreshToken);

  const user = await userModel.findById(verifyRefreshToken.id);

  if (!user) {
    throw new Notfound("User not found");
  }

  const accessToken = generateToken(user._id, "15m");

  setAuthCookies(res, accessToken, null);

  BuildSuccessResponse(res, "access token generated successfully");
};

export const forgotPasswordController = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    throw new BadRequest("email is required");
  }

  const user = await userModel.findOne({ email });

  if (!user) {
    throw new Notfound("user not found");
  }

  console.log(user)

  const resetToken = generateToken(user._id, "15m");

  const resetUrl = `http://localhost:5173/reset-password?token=${resetToken}`;

  await sendEmail(
    user.email,
    "Reset your InstaShare Password",
    `Reset your password using this link: ${resetUrl}`,
    `
      <h2>Reset your password</h2>
      <p>Click the button below to reset your password.</p>

      <a href="${resetUrl}">
        Reset password
      </a>

      <p>This link expires in 10 minutes.</p>
    `,
  );

  BuildSuccessResponse(res, "email sent successfully");
};
