const asyncHandler  = require("../utils/asynchandler.utils.js");
const  ApiError  = require("../utils/API_Error.js");
const { User } = require("../models/user.model.js");
const { Question } = require("../models/user.model.js");
const uploadOnCloudinary = require("../utils/cloudinary.js");
const  ApiResponse  = require("../utils/API_Response.js");

const addAnswer = asyncHandler(async (req, res) => {
    const { content, questionId, owner } = req.body;
  
    // Validate required fields
    if ([content, questionId, owner].some((field) => field?.trim() === "")) {
      throw new ApiError(400, "Answer content, question ID, or owner is missing");
    }
  
    // Check if the question exists
    const question = await Question.findById(questionId);
    if (!question) {
      throw new ApiError(404, "Question not found");
    }
  
    // Create the answer
    const answer = await Answer.create({
      content,
      question: questionId,
      owner,
    });
  
    if (!answer) {
      throw new ApiError(500, "Failed to create answer");
    }
  
    // Link the answer to the question
    question.answers.push(answer._id);
    await question.save();
  
    // Return the newly created answer
    return res.status(201).json(
      new ApiResponse(200, answer, "Answer created successfully")
    );
  });
  
  const deleteAnswer = asyncHandler(async (req, res) => {
    const answer = await Answer.findById(req.params.id);
  
    if (!answer) {
      throw new ApiError(404, "Answer not found");
    }
  
    if (answer.owner.toString() !== req.user.id) {
      throw new ApiError(403, "Not authorized to delete this answer");
    }
  
    const question = await Question.findById(answer.question);
    question.answers.pull(answer._id);
    await question.save();
  
    await answer.remove();
    res.status(200).json(new ApiResponse(200, null, "Answer deleted successfully"));
  });

  const getAllAnswers = asyncHandler(async (req, res) => {
    const answers = await Question.find()
      .populate("owner", "username")
      .select("content owner createdAt");
    res.status(200).json(new ApiResponse(200, answers, "All answers fetched successfully"));
  });
  
  
module.exports= {
  addAnswer, deleteAnswer, getAllAnswers
}