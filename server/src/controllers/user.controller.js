import userModel from "../model/user.model.js";
import BadRequest from "../shared/error/BadRequest.js";
import Conflict from "../shared/error/Conflict.js";
import Notfound from "../shared/error/NotFound.js";
import BuildSuccessResponse from "../shared/utils/BuildSuccessResponse.js";

export const getMeController = async (req, res) => {
  const user = await userModel.findById(req.user.id).select("-password");

  if (!user) throw new Notfound("User not found");

  BuildSuccessResponse(res, "user data fetched successfully", user);
};

export const updateProfile = async (req, res) => {
  const { username, fullName, mobile, dob, bio } = req.body;

  const updateData = {};
  if (username) updateData.username = username;
  if (fullName) updateData.fullName = fullName;
  if (mobile) updateData.mobile = mobile;
  if (dob) updateData.dob = dob;
  if (bio) updateData.bio = bio;

  const updatedUser = await userModel.findByIdAndUpdate(
    req.user.id,
    updateData,
    {
      new: true,
    },
  );

  if (!updatedUser) throw new Notfound("User not found");

  BuildSuccessResponse(res, "User profile updated successfully");
};

export const getUserProfile = async () => {
  const { username } = req.params;

  const user = await userModel.findOne({ username }).select("-password");

  if (!user) throw new Notfound("User not found");

  BuildSuccessResponse(res, "Fetched UserProfile successfully");
};

export const searchUser = async (req, res) => {
  const { query } = req.query;

  if (!query) throw new BadRequest("Search query is required");

  const user = await userModel
    .find({
      $or: [
        { username: { $regex: query, $options: "i" } },
        { fullName: { $regex: query, $options: "i" } },
      ],
    })
    .select("username fullName profile_pic");

  if (user.length === 0) throw new Notfound("User not found");

  BuildSuccessResponse(res, "User fetched successfully", user);
};

export const followUser = async (req, res) => {
  const targetUserId = req.params.id;

  if (targetUserId === req.user.id)
    throw new BadRequest("You cannot follow yourself");

  const loggedInUser = await userModel.findById(req.user.id);
  const targetUser = await userModel.findById(targetUserId);

  if (!targetUser) throw new Notfound("Target user not found");

  const alreadyExist = loggedInUser.followings.includes(targetUserId);

  if (alreadyExist) throw new BadRequest("You already follow this user");

  loggedInUser.followings.push(targetUserId);
  targetUser.followers.push(req.user.id);

  await loggedInUser.save();
  await targetUser.save();

  BuildSuccessResponse(res, "User followed successfully", {
    targetUser,
    loggedInUser,
  });
};

export const unfollowUser = async (req, res) => {
  const targetUserId = req.params.id;

  if (req.user.id === targetUserId)
    throw new BadRequest("You cannot unfollow yourself");

  const loggedInUser = await userModel.findById(req.user.id);
  const targetUser = await userModel.findById(targetUserId);

  if (!targetUser) throw new Notfound("Target user not found");

  const alreadyExist = loggedInUser.followings.includes(targetUserId);

  if (!alreadyExist) throw new BadRequest("You did not follow this user");

  loggedInUser.followings.pull(targetUserId);
  targetUser.followers.pull(req.user.id);

  await loggedInUser.save();
  await targetUser.save();

  BuildSuccessResponse(res, "User unfollowed sucessfully", {
    targetUser,
    loggedInUser,
  });
};

export const getFollowers = async (req, res) => {
  const targetUserId = req.params.id;

  if (!targetUserId) throw new BadRequest("ID is required");

  const user = await userModel
    .findById(targetUserId)
    .populate("followers", "username fullName profile_pic");

  if (!user) throw new Notfound("Target user not found");

  BuildSuccessResponse(res, "followers fetched successfully", {
    followers: user.followers,
    count: user.followers.length,
  });
};

export const changePassword = async (req, res) => {
  const { password, newPassword } = req.body;

  if (!password || !newPassword)
    throw new BadRequest("All fields are required");

  if (password === newPassword)
    throw new Conflict("Both password are same choose different password");

  const user = await userModel.findById(req.user.id);

  if (!user) throw new Notfound("User not found");

  const isPasswordMatched = user.comparePass(password);

  if (!isPasswordMatched) throw new BadRequest("Incorrect password");

  user.password = password;
  await user.save();

  BuildSuccessResponse(res, "Password changed successfully");
};
