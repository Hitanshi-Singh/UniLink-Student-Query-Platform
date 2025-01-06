import mongoose, { Schema } from "mongoose";

const questionSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    images: [
      {
        type: String, // cloudinary url
      },
    ],
    relatedTags: [
      {
        type: String,
        required: [true, "Related tags must be specified"],
      },
    ],
    answers: [{ type: Schema.Types.ObjectId, ref: "Answer" }],
  },
  { timestamps: true },
);

export const Question = mongoose.model("Question", questionSchema);
