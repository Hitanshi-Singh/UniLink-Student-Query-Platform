const asyncHandler = require("../utils/asynchandler.utils.js");
const ApiError = require("../utils/API_Error.js");
const { Answer } = require("../models/answers.model.js");
const  Question  = require("../models/question.model.js");
const uploadOnCloudinary = require("../utils/cloudinary.js");
const ApiResponse = require("../utils/API_Response.js");

const addAnswer = asyncHandler(async (req, res) => {
  const { content, questionId } = req.body;

  // Validate required fields
  if ([content, questionId].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "Answer content or question ID is missing");
  }

  // Check if the question exists
  const question = await Question.findById(questionId);
  if (!question) {
    throw new ApiError(404, "Question not found");
  }

  // Get the owner from the authenticated user
  const owner = req.user._id;

  // Create the answer
  const answer = await Answer.create({
    content,
    question: questionId,
    owner,
  });

  // Add the answer ID to the question's answers array
  question.answers.push(answer._id);
  await question.save();

  res
    .status(201)
    .json(new ApiResponse(201, answer, "Answer added successfully"));
});


const deleteAnswer = asyncHandler(async (req, res) => {
  const { questionId, id: answerId } = req.params;
  const answer = await Answer.findById(answerId);

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
  res
    .status(200)
    .json(new ApiResponse(200, null, "Answer deleted successfully"));
});

const getQuestionAnswers = asyncHandler(async (req, res) => {
  const id=req.params.id
  const answers = await Answer.find({question_id:id})
    .populate("owner", "username")
    .select("content owner createdAt");
    const enhancedAnswers = answers.map((answer) => ({
      ...answer.toObject(),
      totalAnswers: answer.replies.length,
    }));
  res
    .status(200)
    .json(new ApiResponse(200, enhancedAnswers, "All answers fetched successfully"));
});

const getCurrentAnswer = asyncHandler(async (req, res) => {
  try {
    // Extract the answer ID from the request parameters
    const { answerId } = req.params;

    if (!answerId) {
      throw new ApiError(400, "Answer ID is required");
    }

    // Find the answer by ID and populate relevant fields
    const answer = await Answer.findById(answerId)
      .populate({
        path: 'answeredBy',
        select: 'username profileImage'
      })
      .populate({
        path: 'question', 
        select: 'content owner relatedTags'
      })
      .populate({
        path: 'replies', 
        select: 'content'
      });

    if (!answer) {
      throw new ApiError(404, "Answer not found");
    }

    res.status(200).json(new ApiResponse(200, answer, "Answer fetched successfully"));
  } catch (error) {
    res.status(500).json(new ApiError(500, "An error occurred while fetching the answer"));
  }
});


module.exports = {
  addAnswer,
  deleteAnswer,
  getQuestionAnswers,
  getCurrentAnswer
};
