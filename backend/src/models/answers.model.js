const mongoose = require("mongoose");
const { User } = require("../models/user.model.js");
const { Schema } = mongoose;

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
    upvotes: {
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
    replies: [{
      type: Schema.Types.ObjectId,
      ref: "Reply"
    }]
  },
  { timestamps: true },
);

answerSchema.methods.addUpvote = async function () {
  this.upvotes += 1; // Increment the upvotes for the answer
  await this.save(); // Save the answer

  // Update the totalUpvotes for the user
  const user = await User.findById(this.answeredBy);
  user.totalUpvotes += 1;
  await user.save();
};

module.exports = mongoose.model("Answer", answerSchema);
