import { Router } from express
import {addQuestion, updateQuestion, deleteQuestion, getAllQuestions, getQuestionsRelatedToUserSubscribedTags}
from "../controllers/question.controller.js"
import {upload} from "../middlewares/multer.middleware.js"

const router= Router();

router.route('/questions').get(getAllQuestions);

router.route('/addQuestion').post(verifyJWT,
    upload.fields([{ name: 'images', maxCount: 5}]),
    addQuestion ).patch( verifyJWT, 
    upload.fields([{ name: 'images', maxCount: 5}]),
    updateQuestion);

router.route('/questions/delete/:id'). delete(verifyJWT, deleteQuestion); 

router.route('/user/subscribed-tags').get(verifyJWT, getQuestionsRelatedToUserSubscribedTags);

router.route('/user/history').get(verifyJWT, getUserQuestionHistory);

export default router;