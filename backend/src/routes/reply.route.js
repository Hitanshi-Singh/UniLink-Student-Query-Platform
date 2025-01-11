const { Router } = require("express");
const { addReply } = require("../controllers/replies.controller.js");
const { verifyJWT } = require("../middlewares/auth.middleware.js");

const router = Router(); // Initialize a new Router instance

// Define a POST route for "/reply"
router.route("/reply").post(verifyJWT, addReply);

module.exports = router;
