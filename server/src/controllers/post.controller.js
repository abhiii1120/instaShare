import postModel from "../model/post.model.js";
import userModel from "../model/user.model.js";
import { sendFiles } from "../services/storage.service.js";
import BadRequest from "../shared/error/BadRequest.js";
import Notfound from "../shared/error/NotFound.js";
import BuildSuccessResponse from "../shared/utils/BuildSuccessResponse.js";

export const createPost = async (req, res) => {
  const { caption, location } = req.body;

  const files = req.files;

  console.log(files);

  if (!files) throw new BadRequest("Files are required");

  const user = await userModel.findById(req.user.id);

  if (!user) throw new Notfound("User not found");

  const uploadedFiles = await Promise.all(
    files.map(async (file) => {
      return await sendFiles(file.buffer, file.originalname);
    }),
  );

  const post = postModel.create({
    caption,
    location,
    media_url: uploadedFiles.map((file) => file.url),
    user: req.user.id,
  });

  user.posts.push(post._id);

  await user.save();

  BuildSuccessResponse(res, "post created successfully", post);
};
