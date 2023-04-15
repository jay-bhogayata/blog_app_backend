import mongoose, { Schema } from "mongoose";

const articleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxLength: [150, "title can not be more then 150 chars."],
    },
    description: {
      type: String,
      trim: true,
      maxLength: [400, "title can not be more then 400 chars."],
    },
    body: {
      type: String,
      required: true,
      trim: true,
      minLength: [50, "article must be min 50 char. long"],
    },
    tags: [
      {
        type: String,
        trim: true,
        maxLength: [15, "tag must be less then 15 char."],
      },
    ],
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    likeCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    likedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Article", articleSchema);
