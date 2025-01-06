<<<<<<< HEAD
const express = require("express");
const {
  addAnswer,
  deleteAnswer,
  getAllAnswers,
} = require("../controllers/answer.controller.js");
const { upload } = require("../middlewares/multer.middleware.js");
const { verifyJWT } = require("../middlewares/auth.middleware.js");

const router = express.Router();

// Add your routes here using `router`

router
  .route("/:questionId/answers")
  .get(getAllAnswers)
  .post(verifyJWT, upload.fields([{ name: "images", maxCount: 5 }]), addAnswer);

router.route("/:questionId/answer/delete/:id").delete(verifyJWT, deleteAnswer);

// router.route()
module.exports = router;
=======
import { Router } from express
import {addAnswer, deleteAnswer, getAllAnswers, getCurrentAnswer}
from "../controllers/answer.controller.js"
import {upload} from "../middlewares/multer.middleware.js"

const router= Router();

router.route('/:questionId/answers').get(getAllAnswers)
router.route('/addAnswer').post(verifyJWT, upload.fields([{ name: 'images', maxCount: 5}]),
addAnswer);

router.route('/questionId/answer/delete/:id'). delete(verifyJWT, deleteAnswer); 
router.route('/answer'). get(verifyJWT, getCurrentAnswer)
>>>>>>> fe678e2 (Queries added)
