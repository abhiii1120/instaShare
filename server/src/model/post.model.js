import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    caption: {
      type: String,
    },
    media_url: [{
      type: String,
      required: true,
    }],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
      },
    ],
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
      },
    ],
    location: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

const postModel = mongoose.model("posts",postSchema);

export default postModel