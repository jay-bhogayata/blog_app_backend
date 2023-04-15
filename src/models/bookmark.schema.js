import mongoose from "mongoose";

const bookmarkSchema = new mongoose.Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    articles: [
      {
        type: Schema.Types.ObjectId,
        ref: "Article",
        required: true,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Bookmark", bookmarkSchema);
