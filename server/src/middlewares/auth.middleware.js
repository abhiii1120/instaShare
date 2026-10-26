import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
import userModel from "../model/user.model.js";
import Notfound from "../shared/error/NotFound.js";
import Unauthorized from "../shared/error/Unauthorized.js";
import { asyncHandler } from "./asyncHandler.js";

export const authMiddleware = asyncHandler(async (req, res, next) => {
  let token = req.cookies.accessToken;

  if (!token) {
    throw new Notfound("Token not found");
  }

  let decode = jwt.verify(token, process.env.JWT_SECRET);

  if (!decode) {
    throw new Unauthorized("Unauthorized access");
  }

  let user = await userModel.findById(decode.id).select("-password");

  req.user = user;
  next();
});
