const express = require("express");
const {
  addAnswer,
  deleteAnswer,
  getQuestionAnswers,
  getCurrentAnswer,
  upvoteAnswer
} = require("../controllers/answer.controller.js");
const { upload } = require("../middlewares/multer.middleware.js");
const { verifyJWT } = require("../middlewares/auth.middleware.js");

const router = express.Router();

// Add your routes here using `router`

router
  .route("/questions/:questionId/answers")
  .get(getQuestionAnswers)
router.route("/answers").post(verifyJWT, upload.fields([{ name: "images", maxCount: 5 }]), addAnswer);

router.route("/:questionId/answer/delete/:id").delete(verifyJWT, deleteAnswer);
router.route('/:answerId').get(verifyJWT, getCurrentAnswer);
router.route('/:answerId/upvote').patch(verifyJWT, upvoteAnswer);
module.exports = router;