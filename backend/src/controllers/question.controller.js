const asyncHandler = require("../utils/asynchandler.utils.js");
const ApiError = require("../utils/API_Error.js");
const { User } = require("../models/user.model.js");
const Question  = require("../models/question.model.js");
const { Tag } = require("../models/tag.model.js");
const uploadOnCloudinary = require("../utils/cloudinary.js");
const ApiResponse = require("../utils/API_Response.js");

const addQuestion = asyncHandler(async (req, res) => {
  const { content, relatedTags } = req.body;
  const owner=req.user?._id;
  console.log("req.body:", req.body);
console.log("req.user:", req.user);

  console.log(owner)
  if (
    !content?.trim() || // Check if content is a non-empty string
    !owner ||   // Check if owner exists
    !Array.isArray(relatedTags) || // Ensure relatedTags is an array
    relatedTags.length === 0       // Ensure the array is not empty
  ) {
    throw new ApiError(
      400,
      "Question content, owner, or tags are unselected",
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
    owner: req.user._id,
    relatedTags: [],
    images: imageUrls,
  });
  const tagIds = [];
  for (const tagName of relatedTags) {
    let tag = await Tag.findOne({ name: tagName });

    if (!tag) {
      // Tag doesn't exist, create it and associate the `createdBy` field
      tag = await Tag.create({
        name: tagName,
        createdBy: req.user._id, // Associate the tag with the currently registering user
      });
    }

    tagIds.push(tag._id); // Collect tag IDs to associate with the user
  }

  // Update the question's related tags
  question.relatedTags = tagIds;
  await question.save();

  if (!question) {
    throw new ApiError(500, "Failed to create question");
  }

  // Return the newly created question
  return res
    .status(201)
    .json(new ApiResponse(200, { question }, "Question created successfully"));
});

const getAllQuestions = asyncHandler(async (req, res) => {
  const questions = await Question.find()
    .populate("owner", "username")
    .select("content owner createdAt relatedTags");
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
          "User's questions fetched successfully",
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

    // If no subscribed tags, return an empty list or handle it gracefully
    if (!user.subscribedTags || user.subscribedTags.length === 0) {
      return res.status(200).json(new ApiResponse(200, [], "User has no subscribed tags"));
    }

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
      const enhancedQuestions = questions.map((question) => ({
        ...question.toObject(),
        totalAnswers: question.answers.length,
      }));
        
    res.status(200).json(new ApiResponse(200, enhancedQuestions, "User's interested questions fetched successfully"));
  } catch (error) {
    console.error(error);  // Log error for debugging
    res.status(500).json(new ApiError(500, "Error has occurred"));
  }
});

module.exports = {
  addQuestion,
  updateQuestion,
  deleteQuestion,
  getAllQuestions,
  getUserQuestionHistory,
  getQuestionsRelatedToUserSubscribedTags,
};
