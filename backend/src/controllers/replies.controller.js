const asyncHandler = require("../utils/asynchandler.utils.js");
const ApiError = require("../utils/API_Error.js");
const Answer = require("../models/answers.model.js");
const ApiResponse = require("../utils/API_Response.js");
const Reply = require("../models/replies.model.js");

const addReply = asyncHandler(async (req, res) => {
    const { content, answerId } = req.body;

    // Validate input
    if (!content?.trim() || !answerId?.trim()) {
        throw new ApiError(400, "Reply content or answer ID is missing");
    }

    // Check if the answer exists
    const answer = await Answer.findById(answerId);
    if (!answer) {
        throw new ApiError(404, "Answer not found");
    }

    // Create a new reply
    const owner = req.user._id;
    const reply = await Reply.create({
        content,
        answer: answerId,
        createdBy: owner,
    });

    // Add reply to the answer's replies array
    answer.replies.push(reply._id);
    await answer.save();

    // Return success response with updated answer (optional: populate replies)
    res.status(201).json(new ApiResponse(201, reply, "Reply added successfully"));
});

module.exports = { addReply };
