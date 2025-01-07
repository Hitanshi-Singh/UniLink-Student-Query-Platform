import mongoose, { Schema } from "mongoose";

const answerSchema = new Schema(
  {
    question: {
      type: Schema.Types.ObjectId,
      ref: "Question",
    },
    answer_content: {
      type: String,
      required: true,
    },
    upvote: {
      type: Number,
      default: 0,
    },
    answeredBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    images: [
      {
        type: String, // cloudinary url
      },
    ],
    replies: {
      type: Schema.Types.ObjectId,
      ref: "Reply"
    }
  },
  { timestamps: true },
);

answerSchema.methods.upvote = async function () {
  this.upvotes += 1; // Increment the upvotes for the answer
  await this.save(); // Save the answer

  // Update the totalUpvotes for the user
  const user = await User.findById(this.user);
  user.totalUpvotes += 1;
  await user.save();
};

// update the upvote functionality with a trigger

// 1. **Increment Upvotes on Answer**: When a user receives an upvote, you can increment the upvote count for the answer.

const incrementUpvotes = async (answerId) => {
  const answer = await Answer.findById(answerId);

  if (!answer) {
    throw new ApiError(404, "Answer not found");
  }

  answer.upvotes += 1;
  await answer.save();
};

answerSchema.post("save", async function (doc) {
  // This will be called after saving the document
  if (this.isModified("upvotes")) {
    await incrementUpvotes(doc._id);
  }
});

export const Answer = mongoose.model("Answer", likeSchema);
