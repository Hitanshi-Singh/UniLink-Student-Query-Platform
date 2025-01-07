const express = require("express");
const {
  addAnswer,
  deleteAnswer,
  getQuestionAnswers,
  getCurrentAnswer
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
router.route('/answer/:answerId').get(verifyJWT, getCurrentAnswer);
module.exports = router;