const {Router}= require ("express");
const {
    addReply
}= require("../controllers/replies.controller.js");
const {verifyJWT} = require("../middlewares/auth.middleware.js");

const router= Router();
router.route("/reply").post(verifyJWT, addReply);

module.exports = router; 
