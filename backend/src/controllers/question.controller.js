const asyncHandler = require("../utils/asynchandler.utils.js");
const ApiError = require("../utils/API_Error.js");
const { User } = require("../models/user.model.js");
const { Question } = require("../models/user.model.js");
const uploadOnCloudinary = require("../utils/cloudinary.js");
const ApiResponse = require("../utils/API_Response.js");

const addQuestion = asyncHandler(async (req, res) => {
  const { content, owner, relatedTags } = req.body;
  if (
    [content, owner].some((field) => field?.trim() === "") ||
    !Array.isArray(relatedTags) ||
    relatedTags.length === 0
  ) {
    throw new ApiError(
      400,
      "Question content, owner, or tags are unselected/invalid",
    );
  }

  // Handle image uploads
  let imageUrls = [];
  if (req.files?.images) {
    const uploadPromises = req.files.images.map(async (file) => {
      const uploadedImage = await uploadOnCloudinary(file.path);
      return uploadedImage?.url;
    });

    imageUrls = await Promise.all(uploadPromises);
  }

  // Create the question
  const question = await Question.create({
    content,
    owner,
    images: imageUrls,
  });

  if (!question) {
    throw new ApiError(500, "Failed to create question");
  }

  // Return the newly created question
  return res
    .status(201)
    .json(new ApiResponse(200, { question }, "Question created successfully"));
});

const getAllQuestions = asyncHandler(async (_, res) => {
  const questions = await Question.find()
    .populate("owner", "username")
    .select("content owner createdAt");
  res
    .status(200)
    .json(
      new ApiResponse(200, questions, "All questions fetched successfully"),
    );
});

const updateQuestion = asyncHandler(async (req, res) => {
  const { content } = req.body;
  const question = await Question.findById(req.params.id);

  if (!question) {
    throw new ApiError(404, "Question not found");
  }

  if (question.owner.toString() !== req.user.id) {
    throw new ApiError(403, "Not authorized to update this question");
  }

  question.content = content || question.content;
  const updatedQuestion = await question.save();
  res
    .status(200)
    .json(
      new ApiResponse(200, updatedQuestion, "Question updated successfully"),
    );
});

const deleteQuestion = asyncHandler(async (req, res) => {
  const question = await Question.findById(req.params.id);

  if (!question) {
    throw new ApiError(404, "Question not found");
  }

  if (question.owner.toString() !== req.user.id) {
    throw new ApiError(403, "Not authorized to delete this question");
  }

  await question.remove();
  res
    .status(200)
    .json(new ApiResponse(200, null, "Question deleted successfully"));
});

const getUserQuestionHistory = async (req, res) => {
  try {
    // Get the current logged-in user from the token
    const user = await User.findById(req.user._id);
    if (!user) throw new ApiError(404, "User not found");

    // Fetch all questions asked by this user
    const questions = await Question.find({ owner: user._id });
    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          questions,
          "User's questions fetched duccessfully",
        ),
      );
  } catch (error) {
    res.status(500).json(new ApiError(500, "Error has occured"));
  }
};
const getQuestionsRelatedToUserSubscribedTags = asyncHandler(async (req, res) => {
  try {
    // Get the current logged-in user from the token
    const user = await User.findById(req.user._id);
    if (!user) throw new ApiError(404, 'User not found');

    // Fetch only questions related to user's tags
    const questions = await Question.find({ 
      relatedTags: { $in: user.subscribedTags } 
    })
      .populate({
        path: 'answers',
        populate: {
          path: 'answeredBy',
          select: 'username'
        }
      })
      .populate({
        path: 'owner', // Populate question owner details
        select: 'username profileImage'
      });

    res.status(200).json(new ApiResponse(200, questions, "User's interested questions fetched successfully"));
  } catch (error) {
    res.status(500).json(new ApiError(500, "Error has occurred"));
  }
});

module.exports = {
  addQuestion,
  updateQuestion,
  deleteQuestion,
  getAllQuestions,
  getUserQuestionHistory,
  getQuestionsRelatedToUserSubscribedTags
};
