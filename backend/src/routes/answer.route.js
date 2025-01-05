import { Router } from express
import {addAnswer, deleteAnswer, getAllAnswers}
from "../controllers/answer.controller.js"
import {upload} from "../middlewares/multer.middleware.js"

const router= Router();

router.route('/:questionId/answers')
.get(getAllAnswers).post(verifyJWT, upload.fields([{ name: 'images', maxCount: 5}]),
addAnswer);

router.route('/questionId/answer/delete/:id'). delete(verifyJWT, deleteAnswer); 
router.route()