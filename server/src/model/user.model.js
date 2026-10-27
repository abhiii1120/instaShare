import mongoose from "mongoose";
import bcrypt from "bcrypt";

let commonTypes = {
  unique: true,
  trim: true,
};

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      ...commonTypes,
    },
    fullName: {
      type: String,
      required: [true, "FullName is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      ...commonTypes,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 8,
    },
    mobile: {
      type: String,
      sparse: true,
      trim: true,
      minlength: 10,
      maxlength: 30,
    },
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
      },
    ],
    followings: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
      },
    ],
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "posts",
      },
    ],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "comments",
      },
    ],
    stories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "stories",
      },
    ],
    bio: {
      type: String,
    },
    dob: {
      type: String,
    },
    reels: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "reels",
      },
    ],
    profile_pic: {
      type: String,
    },
    saves: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "posts",
      },
    ],
  },
  {
    timestamps: true,
  },
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePass = async function (password) {
  return bcrypt.compare(password, this.password);
};

const userModel = mongoose.model("users",userSchema);

export default userModel;